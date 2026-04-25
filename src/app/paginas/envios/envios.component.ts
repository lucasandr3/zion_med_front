import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DocumentSendsService, DocumentSendItem } from '../../core/services/document-sends.service';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmPaginationComponent, ZmEmptyStateComponent } from '../../shared/components/ui';
import { ZmSearchableSelectComponent, ZmSearchableSelectOption } from '../../shared/components/ui/zm-searchable-select.component';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

type Caixa = 'pendentes' | 'assinados' | 'expirados' | 'cancelados';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [CommonModule, FormsModule, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent, ZmSearchableSelectComponent],
  templateUrl: './envios.component.html',
  styleUrl: './envios.component.css',
})
export class EnviosComponent implements OnInit {
  envios: DocumentSendItem[] = [];
  templates: Template[] = [];
  caixaAtual: Caixa = 'pendentes';
  meta = { current_page: 1, last_page: 1, per_page: 20, total: 0 };
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  acaoId: number | null = null;

  mostrarNovoEnvio = false;
  novoEnvio = {
    template_id: 0,
    channel: 'email' as 'email' | 'whatsapp',
    destino: 'manual' as 'manual' | 'pessoa',
    person_id: null as number | null,
    recipient_email: '',
    recipient_phone: '',
  };
  pessoaBusca = '';
  pessoaSugestoes: Pessoa[] = [];
  pessoaSelecionada: Pessoa | null = null;
  buscandoPessoas = false;
  enviando = false;
  erroNovo = '';
  private pessoaBusca$ = new Subject<string>();
  private suprimirBuscaAutomatica = false;

  private documentSendsService = inject(DocumentSendsService);
  private pessoasService = inject(PessoasService);
  private templatesService = inject(TemplatesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  readonly caixas: { key: Caixa; label: string }[] = [
    { key: 'pendentes', label: 'Pendentes' },
    { key: 'assinados', label: 'Assinados' },
    { key: 'expirados', label: 'Expirados' },
    { key: 'cancelados', label: 'Cancelados' },
  ];

  get templatesPublicos(): Template[] {
    return this.templates.filter((template) => template.is_active !== false && template.public_enabled === true);
  }

  get opcoesTemplatesPublicos(): ZmSearchableSelectOption[] {
    return this.templatesPublicos.map((template) => ({
      key: String(template.id),
      label: template.name,
    }));
  }

  get templateSelecionadoKey(): string {
    return this.novoEnvio.template_id ? `${this.novoEnvio.template_id}` : '';
  }

  ngOnInit(): void {
    this.templatesService.list({ is_active: true }).subscribe({
      next: (templates) => {
        this.templates = templates;
        const primeiroTemplatePublico = this.templatesPublicos[0];
        if (primeiroTemplatePublico && this.novoEnvio.template_id <= 0) {
          this.novoEnvio.template_id = primeiroTemplatePublico.id;
        }
      },
    });
    this.pessoaBusca$
      .pipe(debounceTime(280), distinctUntilChanged())
      .subscribe((termo) => this.buscarPessoasPorTermo(termo));
    this.carregar();
  }

  setCaixa(c: Caixa): void {
    this.caixaAtual = c;
    this.carregar(1);
  }

  carregar(page = 1): void {
    this.erro = '';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.documentSendsService.list({ caixa: this.caixaAtual, per_page: 20, page }),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.envios = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar os envios.';
      },
    });
  }

  dataFormatada(s: string | null): string {
    if (!s) return '—';
    try {
      const d = new Date(s);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return s;
    }
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      pendente: 'Aguardando assinatura',
      assinado: 'Assinado',
      expirado: 'Expirado',
      cancelado: 'Cancelado',
    };
    return map[status] ?? status;
  }

  entregaLabel(item: DocumentSendItem): string {
    const status = item.delivery_status ?? 'enviado';
    if (status === 'enviado') return 'Enviado';
    if (status === 'nao_enviado') return 'Não enviado';
    return status;
  }

  assinaturaLabel(item: DocumentSendItem): string {
    const status = item.signature_status;
    if (!status) return this.statusLabel(item.status);
    const map: Record<string, string> = {
      aguardando_assinatura: 'Aguardando assinatura',
      assinado: 'Assinado',
      expirado: 'Expirado',
      cancelado: 'Cancelado',
    };
    return map[status] ?? status;
  }

  corStatusEnvio(status: string): string {
    switch (status) {
      case 'assinado':
        return 'var(--c-success)';
      case 'expirado':
        return 'var(--c-warning)';
      case 'cancelado':
        return 'var(--c-muted)';
      default:
        return 'var(--c-muted)';
    }
  }

  corEntrega(item: DocumentSendItem): string {
    return item.delivery_status === 'nao_enviado' ? 'var(--c-danger)' : 'var(--c-success)';
  }

  canalLabel(channel: string): string {
    return channel === 'whatsapp' ? 'WhatsApp' : 'E-mail';
  }

  destinatario(item: DocumentSendItem): string {
    if (item.channel === 'whatsapp' && item.recipient_phone) return item.recipient_phone;
    return item.recipient_email ?? '—';
  }

  async cancelar(item: DocumentSendItem): Promise<void> {
    if (item.status !== 'pendente') return;
    const ok = await this.confirm.request({
      title: 'Cancelar envio?',
      message: 'O destinatário não poderá mais usar o link deste envio.',
      confirmLabel: 'Sim, cancelar',
      variant: 'danger',
    });
    if (!ok) return;
    this.acaoId = item.id;
    this.documentSendsService.cancel(item.id).subscribe({
      next: () => {
        this.acaoId = null;
        this.carregar();
        this.toast.success('Envio cancelado', 'O link foi invalidado.');
      },
      error: (err) => {
        this.acaoId = null;
        this.erro = err.error?.message ?? 'Não foi possível cancelar.';
        this.toast.error('Erro', this.erro);
      },
    });
  }

  reenviar(item: DocumentSendItem): void {
    if (item.status !== 'pendente') return;
    this.acaoId = item.id;
    this.documentSendsService.reenvio(item.id).subscribe({
      next: () => {
        this.acaoId = null;
        this.carregar();
        this.toast.success('Link reenviado', 'Uma nova tentativa foi registrada.');
      },
      error: (err) => {
        this.acaoId = null;
        this.erro = err.error?.message ?? 'Não foi possível reenviar.';
        this.toast.error('Erro', this.erro);
      },
    });
  }

  abrirNovoEnvio(): void {
    this.mostrarNovoEnvio = true;
    this.erroNovo = '';
    this.pessoaBusca = '';
    this.pessoaSugestoes = [];
    this.pessoaSelecionada = null;
    const primeiroTemplatePublico = this.templatesPublicos[0];
    this.novoEnvio = {
      template_id: primeiroTemplatePublico?.id ?? 0,
      channel: 'email',
      destino: 'manual',
      person_id: null,
      recipient_email: '',
      recipient_phone: '',
    };
  }

  buscarPessoas(): void {
    this.buscarPessoasPorTermo(this.pessoaBusca.trim());
  }

  selecionarPessoa(p: Pessoa): void {
    this.pessoaSelecionada = p;
    this.novoEnvio.person_id = p.id;
    this.pessoaSugestoes = [];
    this.suprimirBuscaAutomatica = true;
    this.pessoaBusca = `${p.name} · ${this.documentoPessoaDisplay(p)}`;
  }

  limparPessoa(): void {
    this.pessoaSelecionada = null;
    this.novoEnvio.person_id = null;
    this.pessoaBusca = '';
    this.pessoaSugestoes = [];
  }

  onPessoaBuscaChange(value: string): void {
    if (this.suprimirBuscaAutomatica) {
      this.suprimirBuscaAutomatica = false;
      return;
    }
    if (this.pessoaSelecionada && this.pessoaBusca !== `${this.pessoaSelecionada.name} · ${this.documentoPessoaDisplay(this.pessoaSelecionada)}`) {
      this.pessoaSelecionada = null;
      this.novoEnvio.person_id = null;
    }
    this.pessoaBusca$.next(value.trim());
  }

  onRecipientPhoneChange(value: string): void {
    this.novoEnvio.recipient_phone = this.formatPhoneMask(value);
  }

  documentoPessoaDisplay(pessoa: Pessoa): string {
    const cpf = (pessoa.cpf ?? '').replace(/\D/g, '');
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    if ((pessoa.rg ?? '').trim()) return pessoa.rg!.trim();
    if ((pessoa.code ?? '').trim()) return pessoa.code.trim();
    return 'Sem documento';
  }

  private buscarPessoasPorTermo(termo: string): void {
    if (termo.length < 2) {
      this.pessoaSugestoes = [];
      this.buscandoPessoas = false;
      return;
    }
    this.buscandoPessoas = true;
    const termoCapitalizado = termo.charAt(0).toUpperCase() + termo.slice(1);
    this.pessoasService.list({ search: termo, per_page: 15, page: 1 }).subscribe({
      next: (res) => {
        const ativos = res.data.filter((p) => p.status === 'active');
        if (ativos.length > 0 || termoCapitalizado === termo) {
          this.buscandoPessoas = false;
          this.pessoaSugestoes = this.filtrarPessoasCaseInsensitive(ativos, termo);
          return;
        }
        this.pessoasService.list({ search: termoCapitalizado, per_page: 15, page: 1 }).subscribe({
          next: (fallbackRes) => {
            this.buscandoPessoas = false;
            const fallbackAtivos = fallbackRes.data.filter((p) => p.status === 'active');
            this.pessoaSugestoes = this.filtrarPessoasCaseInsensitive(fallbackAtivos, termo);
          },
          error: () => {
            this.buscandoPessoas = false;
            this.pessoaSugestoes = [];
          },
        });
      },
      error: () => {
        this.buscandoPessoas = false;
        this.pessoaSugestoes = [];
      },
    });
  }

  private filtrarPessoasCaseInsensitive(pessoas: Pessoa[], termo: string): Pessoa[] {
    const normalized = termo.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) return pessoas;
    return pessoas.filter((pessoa) => {
      const name = (pessoa.name ?? '').toLocaleLowerCase('pt-BR');
      const code = (pessoa.code ?? '').toLocaleLowerCase('pt-BR');
      const cpf = (pessoa.cpf ?? '').toLocaleLowerCase('pt-BR');
      const rg = (pessoa.rg ?? '').toLocaleLowerCase('pt-BR');
      return name.includes(normalized) || code.includes(normalized) || cpf.includes(normalized) || rg.includes(normalized);
    });
  }

  private formatPhoneMask(raw: string): string {
    const digits = (raw ?? '').replace(/\D/g, '').slice(0, 13);
    if (!digits) return '';

    let country = '';
    let local = digits;
    if (digits.length > 11) {
      country = digits.slice(0, digits.length - 11);
      local = digits.slice(-11);
    }

    const ddd = local.slice(0, 2);
    const number = local.slice(2);
    let formatted = '';

    if (ddd) formatted += `(${ddd}`;
    if (ddd.length === 2) formatted += ') ';
    if (number.length <= 4) {
      formatted += number;
    } else if (number.length <= 8) {
      formatted += `${number.slice(0, 4)}-${number.slice(4)}`;
    } else {
      formatted += `${number.slice(0, 5)}-${number.slice(5, 9)}`;
    }

    return country ? `+${country} ${formatted}`.trim() : formatted.trim();
  }

  private phoneDigits(value: string): string {
    return (value ?? '').replace(/\D/g, '');
  }

  fecharNovoEnvio(): void {
    this.mostrarNovoEnvio = false;
  }

  enviarNovo(): void {
    this.erroNovo = '';
    if (this.novoEnvio.template_id <= 0) {
      this.erroNovo = 'Selecione um documento público.';
      return;
    }
    const templateSelecionadoEhPublico = this.templatesPublicos.some((template) => template.id === this.novoEnvio.template_id);
    if (!templateSelecionadoEhPublico) {
      this.erroNovo = 'Selecione um documento público válido da clínica.';
      return;
    }
    if (this.novoEnvio.destino === 'pessoa') {
      if (!this.novoEnvio.person_id) {
        this.erroNovo = 'Busque e selecione uma pessoa.';
        return;
      }
      if (this.novoEnvio.channel === 'email' && !this.pessoaSelecionada?.email && !this.novoEnvio.recipient_email?.trim()) {
        this.erroNovo = 'A pessoa não tem e-mail cadastrado. Informe manualmente ou cadastre o e-mail na ficha.';
        return;
      }
      if (this.novoEnvio.channel === 'whatsapp' && !this.pessoaSelecionada?.phone && !this.novoEnvio.recipient_phone?.trim()) {
        this.erroNovo = 'A pessoa não tem telefone cadastrado. Informe manualmente ou cadastre na ficha.';
        return;
      }
      if (this.novoEnvio.channel === 'whatsapp' && !this.pessoaSelecionada?.phone && this.phoneDigits(this.novoEnvio.recipient_phone).length < 10) {
        this.erroNovo = 'A pessoa não tem telefone cadastrado. Informe manualmente ou cadastre na ficha.';
        return;
      }
    } else {
      if (this.novoEnvio.channel === 'email') {
        if (!this.novoEnvio.recipient_email?.trim()) {
          this.erroNovo = 'Informe o e-mail do destinatário.';
          return;
        }
      } else {
        if (this.phoneDigits(this.novoEnvio.recipient_phone).length < 10) {
          this.erroNovo = 'Informe o telefone (WhatsApp).';
          return;
        }
      }
    }
    this.enviando = true;
    const payload: Parameters<DocumentSendsService['store']>[0] = {
      template_id: this.novoEnvio.template_id,
      channel: this.novoEnvio.channel,
    };
    if (this.novoEnvio.destino === 'pessoa' && this.novoEnvio.person_id) {
      payload.person_id = this.novoEnvio.person_id;
      if (this.novoEnvio.channel === 'email' && this.novoEnvio.recipient_email?.trim()) {
        payload.recipient_email = this.novoEnvio.recipient_email.trim();
      }
      if (this.novoEnvio.channel === 'whatsapp' && this.novoEnvio.recipient_phone?.trim()) {
        payload.recipient_phone = this.phoneDigits(this.novoEnvio.recipient_phone);
      }
    } else {
      if (this.novoEnvio.channel === 'email') {
        payload.recipient_email = this.novoEnvio.recipient_email.trim();
      } else {
        payload.recipient_phone = this.phoneDigits(this.novoEnvio.recipient_phone);
      }
    }
    this.documentSendsService.store(payload).subscribe({
      next: () => {
        this.enviando = false;
        this.fecharNovoEnvio();
        this.setCaixa('pendentes');
        this.toast.success('Envio criado', 'O link do documento foi enviado.');
      },
      error: (err) => {
        this.enviando = false;
        this.erroNovo = err.error?.message ?? 'Não foi possível enviar.';
        this.toast.error('Erro no envio', this.erroNovo);
      },
    });
  }

  selecionarTemplatePublico(templateId: string): void {
    this.novoEnvio.template_id = Number(templateId) || 0;
  }
}
