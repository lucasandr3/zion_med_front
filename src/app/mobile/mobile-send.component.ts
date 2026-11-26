import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentSendsService } from '../core/services/document-sends.service';
import { LinksPublicosService } from '../core/services/links-publicos.service';
import { PessoasService, type Pessoa } from '../core/services/pessoas.service';
import { TemplatesService } from '../core/services/templates.service';
import { openWhatsappShare } from '../core/utils/whatsapp-share.util';
import { MobileShellService } from './mobile-shell.service';

type SendStep = 'template' | 'patient' | 'confirm' | 'done';

@Component({
  selector: 'app-mobile-send',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './mobile-send.component.html',
  styleUrls: ['./mobile-shared.css', './mobile-send.component.css'],
})
export class MobileSendComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly links = inject(LinksPublicosService);
  private readonly templates = inject(TemplatesService);
  private readonly pessoas = inject(PessoasService);
  private readonly sends = inject(DocumentSendsService);
  private readonly shell = inject(MobileShellService);
  private readonly search$ = new Subject<string>();

  readonly step = signal<SendStep>('template');
  readonly loading = signal(true);
  readonly sending = signal(false);
  readonly error = signal<string | null>(null);

  readonly templatesList = signal<Array<{ id: number; name: string; category?: string }>>([]);
  readonly templateQuery = signal('');
  readonly templateId = signal(0);
  readonly templateName = signal('');

  readonly patientQuery = signal('');
  readonly patients = signal<Pessoa[]>([]);
  readonly patientsLoading = signal(false);
  readonly personId = signal(0);
  readonly person = signal<Pessoa | null>(null);
  readonly phoneOverride = signal('');

  readonly resultUrl = signal<string | null>(null);
  readonly resultMessage = signal<string | null>(null);
  readonly resultPhone = signal<string | null>(null);

  readonly filteredTemplates = computed(() => {
    const q = this.templateQuery().trim().toLowerCase();
    const list = this.templatesList();
    if (!q) return list;
    return list.filter(
      (t) => t.name.toLowerCase().includes(q) || (t.category || '').toLowerCase().includes(q),
    );
  });

  ngOnInit(): void {
    const qp = this.route.snapshot.queryParamMap;
    const tid = Number(qp.get('template_id') || 0);
    const pid = Number(qp.get('person_id') || 0);
    if (tid > 0) this.templateId.set(tid);
    if (pid > 0) this.personId.set(pid);

    this.search$
      .pipe(
        debounceTime(280),
        distinctUntilChanged(),
        switchMap((q) => {
          this.patientsLoading.set(true);
          return this.pessoas.list({ search: q || undefined, per_page: 20, page: 1 }).pipe(
            catchError(() =>
              of({
                data: [] as Pessoa[],
                meta: { current_page: 1, last_page: 1, per_page: 20, total: 0 },
              }),
            ),
          );
        }),
      )
      .subscribe((res) => {
        this.patients.set(res.data || []);
        this.patientsLoading.set(false);
      });

    this.carregarModelos(tid, pid);
  }

  private carregarModelos(tid: number, pid: number): void {
    this.loading.set(true);
    this.links.list({ page: 1, per_page: 50 }).subscribe({
      next: ({ data }) => {
        const docs = (data || [])
          .map((item) => ({
            id: Number(item.template_id ?? item.id) || 0,
            name: (item.template_name ?? item.name ?? '').trim(),
            category: item.category_label || undefined,
          }))
          .filter((item) => item.id > 0 && item.name.length > 0);
        if (docs.length) {
          this.templatesList.set(docs);
          this.aplicarPrefill(tid, pid, docs);
          this.loading.set(false);
          return;
        }
        this.carregarTemplatesFallback(tid, pid);
      },
      error: () => this.carregarTemplatesFallback(tid, pid),
    });
  }

  private carregarTemplatesFallback(tid: number, pid: number): void {
    this.templates.list({ is_active: true }).subscribe({
      next: (list) => {
        const docs = (list || [])
          .filter((t) => t.public_enabled !== false)
          .map((t) => ({
            id: t.id,
            name: t.name,
            category: t.category || t.document_kind || undefined,
          }));
        this.templatesList.set(docs);
        this.aplicarPrefill(tid, pid, docs);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os modelos.');
        this.loading.set(false);
      },
    });
  }

  private aplicarPrefill(
    tid: number,
    pid: number,
    docs: Array<{ id: number; name: string }>,
  ): void {
    if (tid > 0) {
      const found = docs.find((d) => d.id === tid);
      if (found) {
        this.templateId.set(found.id);
        this.templateName.set(found.name);
      }
    }
    if (pid > 0) {
      this.pessoas.get(pid).subscribe({
        next: (p) => {
          this.person.set(p);
          this.personId.set(p.id);
          this.phoneOverride.set(p.phone || '');
          this.decidirPassoInicial();
        },
        error: () => this.decidirPassoInicial(),
      });
      return;
    }
    this.decidirPassoInicial();
  }

  private decidirPassoInicial(): void {
    if (!this.templateId()) {
      this.step.set('template');
      return;
    }
    if (!this.personId()) {
      this.step.set('patient');
      this.search$.next('');
      return;
    }
    this.step.set('confirm');
  }

  escolherTemplate(id: number, name: string): void {
    this.templateId.set(id);
    this.templateName.set(name);
    if (this.personId()) this.step.set('confirm');
    else {
      this.step.set('patient');
      this.search$.next(this.patientQuery());
    }
  }

  onPatientQuery(value: string): void {
    this.patientQuery.set(value);
    this.search$.next(value.trim());
  }

  escolherPaciente(p: Pessoa): void {
    this.person.set(p);
    this.personId.set(p.id);
    this.phoneOverride.set(p.phone || '');
    this.step.set('confirm');
  }

  voltar(): void {
    const s = this.step();
    if (s === 'done') {
      void this.router.navigateByUrl('/m');
      return;
    }
    if (s === 'confirm') {
      this.step.set('patient');
      this.search$.next(this.patientQuery());
      return;
    }
    if (s === 'patient') {
      this.step.set('template');
      return;
    }
    void this.router.navigateByUrl('/m');
  }

  phoneDigits(value: string): string {
    return (value || '').replace(/\D+/g, '');
  }

  enviarWhatsApp(): void {
    this.enviar('whatsapp');
  }

  copiarLink(): void {
    this.enviar('whatsapp', true);
  }

  private enviar(channel: 'email' | 'whatsapp', copyOnly = false): void {
    const templateId = this.templateId();
    const personId = this.personId();
    if (!templateId || !personId) {
      this.error.set('Escolha o modelo e a paciente.');
      return;
    }
    const phone = this.phoneDigits(this.phoneOverride() || this.person()?.phone || '');
    if (channel === 'whatsapp' && phone.length < 10) {
      this.error.set('Informe um WhatsApp com DDD (mín. 10 dígitos).');
      return;
    }

    this.sending.set(true);
    this.error.set(null);
    this.sends
      .store({
        template_id: templateId,
        channel,
        delivery_mode: channel === 'whatsapp' ? 'manual' : undefined,
        person_id: personId,
        recipient_phone: channel === 'whatsapp' ? phone : undefined,
      })
      .subscribe({
        next: (res) => {
          this.sending.set(false);
          const data = res.data;
          const url = data?.public_url || null;
          const msg = data?.share_message || null;
          this.resultUrl.set(url);
          this.resultMessage.set(msg);
          this.resultPhone.set(data?.recipient_phone || phone || null);
          this.step.set('done');

          if (copyOnly && (msg || url)) {
            void this.copiarTexto(msg || url || '');
            this.shell.toast('Link pronto para colar');
            return;
          }
          if (channel === 'whatsapp' && msg) {
            openWhatsappShare(msg, data?.recipient_phone || phone);
            this.shell.toast('Abrindo WhatsApp…');
            return;
          }
          this.shell.toast(data?.message || 'Envio criado');
        },
        error: (err) => {
          this.sending.set(false);
          this.error.set(err?.error?.message || 'Não foi possível enviar a ficha.');
        },
      });
  }

  async copiarTexto(text: string): Promise<void> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        this.shell.toast('Copiado!');
        return;
      }
    } catch {
      /* fallback abaixo */
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    this.shell.toast('Copiado!');
  }

  compartilharResultado(): void {
    const msg = this.resultMessage();
    if (!msg) return;
    openWhatsappShare(msg, this.resultPhone());
  }

  iniciais(nome: string): string {
    const parts = (nome || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
  }
}
