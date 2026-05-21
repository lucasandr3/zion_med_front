import { Component, OnInit, ViewChild, ElementRef, inject, signal, DestroyRef, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { AuthService, User } from '../../core/services/auth.service';
import { ContaPerfilService } from '../../core/services/conta-perfil.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ToastService } from '../../core/services/toast.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonContaPerfilComponent } from '../../shared/components/skeletons';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';

type ModoAssinatura = 'desenhar' | 'modelo';

interface DefinicaoFonteAssinatura {
  id: string;
  label: string;
  family: string;
  size: number;
}

const FONTES_ASSINATURA: DefinicaoFonteAssinatura[] = [
  { id: 'great-vibes', label: 'Cursiva clássica', family: '"Great Vibes", cursive', size: 38 },
  { id: 'dancing-script', label: 'Cursiva suave', family: '"Dancing Script", cursive', size: 36 },
  { id: 'allura', label: 'Traço fluido uniforme', family: '"Allura", cursive', size: 36 },
  { id: 'pacifico', label: 'Arredondada moderna', family: '"Pacifico", cursive', size: 32 },
  { id: 'sacramento', label: 'Cursiva elegante alta', family: '"Sacramento", cursive', size: 40 },
  { id: 'alex-brush', label: 'Pincel suave', family: '"Alex Brush", cursive', size: 40 },
  { id: 'mr-dafoe', label: 'Estilo hollywoodiano', family: '"Mr Dafoe", cursive', size: 38 },
  { id: 'italianno', label: 'Tradicional fina', family: '"Italianno", cursive', size: 42 },
  { id: 'tangerine', label: 'Minimalista fina', family: '"Tangerine", cursive', size: 44 },
  { id: 'sofia', label: 'Manuscrito simples', family: '"Sofia", cursive', size: 34 },
  { id: 'caveat', label: 'Informal à mão', family: '"Caveat", cursive', size: 40 },
];

function mensagemErroApi(err: { error?: { message?: string; errors?: Record<string, string[]> } }): string {
  const e = err.error;
  if (!e) return 'Não foi possível salvar. Tente de novo.';
  if (typeof e.message === 'string') return e.message;
  if (e.errors) return Object.values(e.errors).flat().join(' ');
  return 'Não foi possível salvar. Tente de novo.';
}

@Component({
  selector: 'app-conta-perfil',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    CommonModule,
    RouterLink,
    FormsModule,
    ZardCardComponent,
    ZardButtonComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardComboboxComponent,
    ZardCheckboxComponent,
    ZmSkeletonContaPerfilComponent,
  ],
  templateUrl: './conta-perfil.component.html',
  styleUrl: './conta-perfil.component.css',
})
export class ContaPerfilComponent implements OnInit {
  @ViewChild('canvasDesenho') canvasDesenhoRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasModelo') canvasModeloRef?: ElementRef<HTMLCanvasElement>;

  private auth = inject(AuthService);
  private contaPerfil = inject(ContaPerfilService);
  private confirm = inject(ConfirmDialogService);
  private toast = inject(ToastService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  showSkeleton!: Signal<boolean>;
  listaPronta = false;

  readonly previewUrlServidor = signal<string | null>(null);
  readonly opcoesFontes: ZardComboboxOption[] = FONTES_ASSINATURA.map((f) => ({
    value: f.id,
    label: f.label,
  }));

  usuarioAtual(): User | null {
    return this.auth.getUser();
  }

  nomeExibicao(): string {
    return (this.usuarioAtual()?.name ?? '').trim() || 'Seu nome';
  }

  podeGerenciarUsuarios(): boolean {
    return this.auth.hasPermission('users.manage');
  }

  podeGerenciarClinica(): boolean {
    return this.auth.hasPermission('organization.manage');
  }

  podeGerenciarBilling(): boolean {
    return this.auth.hasPermission('billing.manage');
  }

  onPageTabChange(ev: { index: number }): void {
    if (ev.index === 1) {
      queueMicrotask(() => {
        this.initCanvasDesenho();
        this.desenharModeloNoCanvas();
      });
    }
  }

  modo: ModoAssinatura = 'desenhar';

  /** Nome livre para o modelo tipográfico (pré-preenche com o nome do perfil ao carregar). */
  nomeTextoAssinatura = '';

  /** Nenhuma fonte até o usuário escolher. */
  fonteSelecionadaId = '';

  salvando = false;
  senhaExclusao = '';
  confirmouExclusao = false;
  excluindoConta = false;
  exportandoDados = false;

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.auth.me());
    this.showSkeleton = showSkeleton;
    data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.listaPronta = true;
        this.syncPreviewFromUser();
        this.prefillNomeAssinaturaSeVazio();
        this.scheduleInitAssinatura();
      },
      error: () => {
        this.listaPronta = true;
        this.syncPreviewFromUser();
        this.prefillNomeAssinaturaSeVazio();
        this.scheduleInitAssinatura();
      },
    });
  }

  private scheduleInitAssinatura(): void {
    queueMicrotask(() => {
      this.initCanvasDesenho();
      this.desenharModeloNoCanvas();
    });
  }

  onSigTabChange(ev: { index: number }): void {
    this.setModo(ev.index === 0 ? 'desenhar' : 'modelo');
  }

  onFonteComboboxChange(value: string | null): void {
    this.fonteSelecionadaId = value ?? '';
    this.onFonteChange();
  }

  setModo(m: ModoAssinatura): void {
    this.modo = m;
    if (m === 'modelo') {
      queueMicrotask(() => this.desenharModeloNoCanvas());
    }
  }

  private syncPreviewFromUser(): void {
    const u = this.auth.getUser();
    this.previewUrlServidor.set(u?.electronic_signature_url ?? null);
  }

  private prefillNomeAssinaturaSeVazio(): void {
    if (this.nomeTextoAssinatura.trim() !== '') {
      return;
    }
    const n = (this.auth.getUser()?.name ?? '').trim();
    if (n) {
      this.nomeTextoAssinatura = n;
    }
  }

  /** Texto usado na pré-visualização / exportação PNG do modelo. */
  textoNomeModelo(): string {
    const t = this.nomeTextoAssinatura.trim();
    return t.length > 0 ? t : this.nomeExibicao();
  }

  nomeAssinaturaChange(): void {
    this.desenharModeloNoCanvas();
  }

  private definicaoFonteSelecionada(): DefinicaoFonteAssinatura | undefined {
    if (!this.fonteSelecionadaId) {
      return undefined;
    }
    return FONTES_ASSINATURA.find((f) => f.id === this.fonteSelecionadaId);
  }

  private initCanvasDesenho(): void {
    const canvas = this.canvasDesenhoRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  private getCanvasDesenho(): HTMLCanvasElement | null {
    return this.canvasDesenhoRef?.nativeElement ?? null;
  }

  startDesenho(e: MouseEvent | TouchEvent): void {
    const canvas = this.getCanvasDesenho();
    if (!canvas || this.modo !== 'desenhar') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = this.pontoEvento(e, canvas);
    (canvas as unknown as { _signing?: boolean })._signing = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  moveDesenho(e: MouseEvent | TouchEvent): void {
    const canvas = this.getCanvasDesenho();
    if (!canvas || !(canvas as unknown as { _signing?: boolean })._signing) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = this.pontoEvento(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  endDesenho(): void {
    const canvas = this.getCanvasDesenho();
    if (canvas) (canvas as unknown as { _signing?: boolean })._signing = false;
  }

  private pontoEvento(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX: number;
    let clientY: number;
    if ('touches' in e && e.touches.length) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return { x: 0, y: 0 };
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  limparDesenho(): void {
    this.initCanvasDesenho();
  }

  onFonteChange(): void {
    this.desenharModeloNoCanvas();
  }

  private getCanvasModelo(): HTMLCanvasElement | null {
    return this.canvasModeloRef?.nativeElement ?? null;
  }

  desenharModeloNoCanvas(): void {
    const canvas = this.getCanvasModelo();
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const def = this.definicaoFonteSelecionada();
    const texto = this.textoNomeModelo().trim();

    if (!def) {
      ctx.fillStyle = '#94a3b8';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Escolha um tipo de assinatura acima', w / 2, h / 2);
      return;
    }

    if (!texto) {
      ctx.fillStyle = '#94a3b8';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Digite como o nome deve aparecer', w / 2, h / 2);
      return;
    }

    ctx.fillStyle = '#0f172a';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    let size = def.size;
    ctx.font = `${size}px ${def.family}`;
    let metrics = ctx.measureText(texto);
    const margem = 20;
    while (metrics.width > w - margem && size > 14) {
      size -= 1;
      ctx.font = `${size}px ${def.family}`;
      metrics = ctx.measureText(texto);
    }

    ctx.fillText(texto, w / 2, h / 2);
  }

  private canvasTemTraço(canvas: HTMLCanvasElement | null): boolean {
    if (!canvas) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < data.length; i += 4 * 48) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a > 10 && (r < 250 || g < 250 || b < 250)) return true;
    }
    return false;
  }

  salvarDesenho(): void {
    const canvas = this.getCanvasDesenho();
    if (!canvas || !this.canvasTemTraço(canvas)) {
      this.toast.warning('Assinatura vazia', 'Desenhe no quadro antes de salvar.');
      return;
    }
    this.enviar(canvas.toDataURL('image/png'));
  }

  salvarModelo(): void {
    if (!this.fonteSelecionadaId) {
      this.toast.warning('Estilo obrigatório', 'Escolha o tipo de assinatura no menu.');
      return;
    }
    if (!this.textoNomeModelo().trim()) {
      this.toast.warning('Nome vazio', 'Informe como o nome deve aparecer na assinatura.');
      return;
    }

    this.desenharModeloNoCanvas();
    const canvas = this.getCanvasModelo();
    if (!canvas) return;
    this.enviar(canvas.toDataURL('image/png'));
  }

  private enviar(imageBase64: string): void {
    this.salvando = true;
    this.contaPerfil
      .patchElectronicSignature({ image_base64: imageBase64 })
      .pipe(
        finalize(() => {
          this.salvando = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.toast.success('Assinatura salva', 'Será usada onde o sistema aplicar sua assinatura em documentos.');
          this.syncPreviewFromUser();
        },
        error: (err: unknown) => {
          this.toast.error('Erro ao salvar', mensagemErroApi(err as Parameters<typeof mensagemErroApi>[0]));
        },
      });
  }

  exportarMeusDados(): void {
    this.exportandoDados = true;
    this.contaPerfil
      .exportPersonalData()
      .pipe(
        finalize(() => {
          this.exportandoDados = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          const payload = res.data;
          const json = JSON.stringify(payload, null, 2);
          const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const stamp = (payload.exported_at ?? new Date().toISOString()).slice(0, 10);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `gestgo-meus-dados-${stamp}.json`;
          anchor.click();
          URL.revokeObjectURL(url);
          this.toast.success('Download iniciado', 'Arquivo JSON com os dados da sua conta.');
        },
        error: (err: unknown) => {
          this.toast.error('Erro na exportação', mensagemErroApi(err as Parameters<typeof mensagemErroApi>[0]));
        },
      });
  }

  async excluirMinhaConta(): Promise<void> {
    const email = this.usuarioAtual()?.email ?? '';
    const ok = await this.confirm.request({
      title: 'Excluir sua conta?',
      messageBefore: 'A conta ',
      emphasis: email,
      messageAfter: ' será encerrada permanentemente. Você perderá o acesso ao Gestgo.',
      confirmLabel: 'Sim, excluir conta',
      variant: 'danger',
    });
    if (!ok) return;

    this.excluindoConta = true;
    this.contaPerfil
      .deleteAccount(this.senhaExclusao)
      .pipe(
        finalize(() => {
          this.excluindoConta = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          const msg = res.data?.message ?? 'Conta excluída.';
          const titulo = res.data?.billing_canceled ? 'Conta e assinatura canceladas' : 'Conta excluída';
          this.toast.success(titulo, msg);
          this.auth.logout().subscribe({
            next: () => this.router.navigate(['/autenticacao']),
            error: () => this.router.navigate(['/autenticacao']),
          });
        },
        error: (err: unknown) => {
          this.toast.error('Não foi possível excluir', mensagemErroApi(err as Parameters<typeof mensagemErroApi>[0]));
        },
      });
  }

  removerDoServidor(): void {
    if (!this.previewUrlServidor()) {
      this.toast.info('Sem assinatura', 'Não há assinatura salva para remover.');
      return;
    }
    this.salvando = true;
    this.contaPerfil
      .patchElectronicSignature({ clear: true })
      .pipe(
        finalize(() => {
          this.salvando = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.toast.success('Assinatura removida', '');
          this.limparDesenho();
          this.syncPreviewFromUser();
          this.prefillNomeAssinaturaSeVazio();
          this.desenharModeloNoCanvas();
        },
        error: (err: unknown) => {
          this.toast.error('Erro ao remover', mensagemErroApi(err as Parameters<typeof mensagemErroApi>[0]));
        },
      });
  }
}
