import { Component, OnInit, ViewChild, ElementRef, inject, signal, DestroyRef, Signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { AppUpdateService } from '../../core/services/app-update.service';
import { AuthService, User } from '../../core/services/auth.service';
import { ContaPerfilService } from '../../core/services/conta-perfil.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { NovidadesService } from '../../core/services/novidades.service';
import { ToastService } from '../../core/services/toast.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonContaPerfilComponent } from '../../shared/components/skeletons';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { GestgoCardComponent } from '@/shared/components/card/card.component';

import { GestgoTabComponent, GestgoTabGroupComponent } from '@/shared/components/tabs';

type ModoAssinatura = 'desenhar' | 'modelo';

interface DefinicaoFonteAssinatura {
  id: string;
  label: string;
  family: string;
  size: number;
  /** Agrupa estilos bem diferentes na grade. */
  group: 'elegante' | 'moderna' | 'mao' | 'impacto' | 'formal';
}

const FONTES_ASSINATURA: DefinicaoFonteAssinatura[] = [
  // Elegantes (cursivas clássicas)
  { id: 'great-vibes', label: 'Cursiva clássica', family: '"Great Vibes", cursive', size: 38, group: 'elegante' },
  { id: 'allura', label: 'Traço fluido', family: '"Allura", cursive', size: 36, group: 'elegante' },
  { id: 'alex-brush', label: 'Pincel suave', family: '"Alex Brush", cursive', size: 40, group: 'elegante' },
  { id: 'parisienne', label: 'Francesa leve', family: '"Parisienne", cursive', size: 36, group: 'elegante' },
  { id: 'pinyon-script', label: 'Convite clássico', family: '"Pinyon Script", cursive', size: 34, group: 'elegante' },
  { id: 'italianno', label: 'Tradicional fina', family: '"Italianno", cursive', size: 42, group: 'elegante' },
  // Modernas / arredondadas
  { id: 'pacifico', label: 'Arredondada moderna', family: '"Pacifico", cursive', size: 32, group: 'moderna' },
  { id: 'satisfy', label: 'Fluxo contemporâneo', family: '"Satisfy", cursive', size: 36, group: 'moderna' },
  { id: 'yellowtail', label: 'Retrô ousada', family: '"Yellowtail", cursive', size: 38, group: 'moderna' },
  { id: 'marck-script', label: 'Script marcada', family: '"Marck Script", cursive', size: 34, group: 'moderna' },
  { id: 'style-script', label: 'Estilo editorial', family: '"Style Script", cursive', size: 36, group: 'moderna' },
  { id: 'meow-script', label: 'Cursiva jovial', family: '"Meow Script", cursive', size: 36, group: 'moderna' },
  // À mão / casuais (bem distintas das cursivas)
  { id: 'caveat', label: 'Caderno à mão', family: '"Caveat", cursive', size: 40, group: 'mao' },
  { id: 'kalam', label: 'Caneta escolar', family: '"Kalam", cursive', size: 34, group: 'mao' },
  { id: 'architects-daughter', label: 'Letra de arquiteto', family: '"Architects Daughter", cursive', size: 30, group: 'mao' },
  { id: 'homemade-apple', label: 'Rabisco natural', family: '"Homemade Apple", cursive', size: 32, group: 'mao' },
  { id: 'shadows-into-light', label: 'Impressa solta', family: '"Shadows Into Light", cursive', size: 34, group: 'mao' },
  { id: 'nothing-you-could-do', label: 'Traço fino irregular', family: '"Nothing You Could Do", cursive', size: 34, group: 'mao' },
  { id: 'reenie-beanie', label: 'Bilhete rápido', family: '"Reenie Beanie", cursive', size: 40, group: 'mao' },
  { id: 'gloria-hallelujah', label: 'Agenda pessoal', family: '"Gloria Hallelujah", cursive', size: 28, group: 'mao' },
  // Impacto / marcador
  { id: 'rock-salt', label: 'Carimbo à mão', family: '"Rock Salt", cursive', size: 28, group: 'impacto' },
  { id: 'permanent-marker', label: 'Marcador grosso', family: '"Permanent Marker", cursive', size: 30, group: 'impacto' },
  { id: 'mr-dafoe', label: 'Hollywood bold', family: '"Mr Dafoe", cursive', size: 38, group: 'impacto' },
  { id: 'norican', label: 'Assinatura firme', family: '"Norican", cursive', size: 36, group: 'impacto' },
  // Formais / cerimônia
  { id: 'sacramento', label: 'Elegante alta', family: '"Sacramento", cursive', size: 40, group: 'formal' },
  { id: 'tangerine', label: 'Minimalista fina', family: '"Tangerine", cursive', size: 44, group: 'formal' },
  { id: 'dancing-script', label: 'Cursiva suave', family: '"Dancing Script", cursive', size: 36, group: 'formal' },
  { id: 'windsong', label: 'Caligrafia aérea', family: '"WindSong", cursive', size: 34, group: 'formal' },
  { id: 'imperial-script', label: 'Imperial cerimonial', family: '"Imperial Script", cursive', size: 36, group: 'formal' },
  { id: 'birthstone', label: 'Joia tipográfica', family: '"Birthstone", cursive', size: 40, group: 'formal' },
];

const GRUPOS_FONTE_ASSINATURA: Array<{ id: DefinicaoFonteAssinatura['group']; title: string }> = [
  { id: 'elegante', title: 'Elegantes' },
  { id: 'moderna', title: 'Modernas' },
  { id: 'mao', title: 'À mão / casuais' },
  { id: 'impacto', title: 'Marcador / impacto' },
  { id: 'formal', title: 'Formais' },
];

function mensagemErroApi(err: { error?: { message?: string; errors?: Record<string, string[]> } }): string {
  const e = err.error;
  if (!e) return 'Não foi possível salvar. Tente de novo.';
  if (typeof e.message === 'string') return e.message;
  if (e.errors) return Object.values(e.errors).flat().join(' ');
  return 'Não foi possível salvar. Tente de novo.';
}

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-conta-perfil',
  standalone: true,
  host: { class: 'n-page n-page--flush' },
  imports: [
    ...NORD_FORM_IMPORTS,
    RouterLink,
    FormsModule,
    GestgoCardComponent,
    GestgoTabComponent,
    GestgoTabGroupComponent,
    ZmSkeletonContaPerfilComponent],
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
  private appUpdate = inject(AppUpdateService);
  private novidades = inject(NovidadesService);

  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  readonly verificandoAtualizacao = signal(false);
  readonly versaoNovidades = signal<string | null>(null);

  readonly previewUrlServidor = signal<string | null>(null);

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

  /** Pré-seleciona o primeiro estilo para o botão Salvar já ficar utilizável. */
  fonteSelecionadaId = FONTES_ASSINATURA[0]?.id ?? '';

  /** Marca se o canvas de desenho tem traço (habilita Salvar). */
  readonly desenhoTemTraco = signal(false);

  salvando = false;
  readonly fontesAssinatura = FONTES_ASSINATURA;
  readonly gruposFonteAssinatura = GRUPOS_FONTE_ASSINATURA;

  fontesDoGrupo(group: DefinicaoFonteAssinatura['group']): DefinicaoFonteAssinatura[] {
    return FONTES_ASSINATURA.filter((f) => f.group === group);
  }
  senhaExclusao = '';
  confirmouExclusao = false;
  excluindoConta = false;
  exportandoDados = false;

  ngOnInit(): void {
    this.novidades.latest().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (latest) => this.versaoNovidades.set(latest.latest_version?.trim() || null),
      error: () => this.versaoNovidades.set(null),
    });

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

  verificarAtualizacao(): void {
    if (this.verificandoAtualizacao()) return;
    this.verificandoAtualizacao.set(true);
    void this.appUpdate.checkNow().then((result) => {
      this.verificandoAtualizacao.set(false);
      switch (result) {
        case 'ready':
          this.toast.success('Atualização pronta', 'Clique em Atualizar agora no banner do topo.');
          break;
        case 'none':
          this.toast.info('Você já está na versão mais recente', 'Nenhuma atualização pendente.');
          break;
        case 'unavailable':
          this.toast.info(
            'Verificação indisponível aqui',
            'A atualização automática funciona na versão publicada do sistema.',
          );
          break;
        default:
          this.toast.warning('Não foi possível verificar', 'Tente novamente em alguns instantes.');
          break;
      }
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

  selecionarFonte(id: string): void {
    this.fonteSelecionadaId = id;
    this.onFonteChange();
  }

  textoPreviewFonte(fonte: DefinicaoFonteAssinatura): string {
    const nome = this.textoNomeModelo().trim() || this.nomeExibicao();
    const curto = nome.split(/\s+/).slice(0, 2).join(' ');
    return curto || fonte.label;
  }

  podeSalvarModelo(): boolean {
    return !!this.fonteSelecionadaId && this.textoNomeModelo().trim().length > 0 && !this.salvando;
  }

  podeSalvarDesenho(): boolean {
    return this.desenhoTemTraco() && !this.salvando;
  }

  setModo(m: ModoAssinatura): void {
    this.modo = m;
    if (m === 'modelo') {
      queueMicrotask(() => {
        void this.desenharModeloQuandoFontesProntas();
      });
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
    // Fundo transparente — no PDF a assinatura não tapa o papel/guilhoché.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    this.desenhoTemTraco.set(this.canvasTemTraço(canvas));
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
    this.desenhoTemTraco.set(false);
  }

  onFonteChange(): void {
    void this.desenharModeloQuandoFontesProntas();
  }

  private async desenharModeloQuandoFontesProntas(): Promise<void> {
    const def = this.definicaoFonteSelecionada();
    if (def && typeof document !== 'undefined' && document.fonts?.load) {
      try {
        await document.fonts.load(`${def.size}px ${def.family}`);
      } catch {
        /* segue com fallback do sistema */
      }
    }
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
    ctx.clearRect(0, 0, w, h);

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

  /** Exporta PNG com pixels brancos/quase brancos transparentes. */
  private canvasToTransparentPng(canvas: HTMLCanvasElement): string {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return canvas.toDataURL('image/png');
    const w = canvas.width;
    const h = canvas.height;
    const src = ctx.getImageData(0, 0, w, h);
    const out = document.createElement('canvas');
    out.width = w;
    out.height = h;
    const octx = out.getContext('2d');
    if (!octx) return canvas.toDataURL('image/png');
    const copy = octx.createImageData(w, h);
    const s = src.data;
    const d = copy.data;
    for (let i = 0; i < s.length; i += 4) {
      const r = s[i]!;
      const g = s[i + 1]!;
      const b = s[i + 2]!;
      const a = s[i + 3]!;
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = b;
      if (a < 8 || (r >= 245 && g >= 245 && b >= 245)) {
        d[i + 3] = 0;
      } else if (r >= 230 && g >= 230 && b >= 230) {
        const brightness = (r + g + b) / 3;
        d[i + 3] = Math.round(Math.max(0, Math.min(a, (255 - brightness) * 4)));
      } else {
        d[i + 3] = a;
      }
    }
    octx.putImageData(copy, 0, 0);
    return out.toDataURL('image/png');
  }

  private canvasTemTraço(canvas: HTMLCanvasElement | null): boolean {
    if (!canvas) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // Amostra a cada 4 pixels (16 bytes) — traços finos ainda são detectados.
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a > 8 && (r < 248 || g < 248 || b < 248)) return true;
    }
    return false;
  }

  salvarDesenho(): void {
    if (this.salvando) return;
    const canvas = this.getCanvasDesenho();
    const ok = this.canvasTemTraço(canvas);
    this.desenhoTemTraco.set(ok);
    if (!canvas || !ok) {
      this.toast.warning('Assinatura vazia', 'Desenhe no quadro antes de salvar.');
      return;
    }
    this.enviar(this.canvasToTransparentPng(canvas));
  }

  async salvarModelo(): Promise<void> {
    if (this.salvando) return;
    if (!this.fonteSelecionadaId) {
      this.toast.warning('Estilo obrigatório', 'Escolha o tipo de assinatura.');
      return;
    }
    if (!this.textoNomeModelo().trim()) {
      this.toast.warning('Nome vazio', 'Informe como o nome deve aparecer na assinatura.');
      return;
    }

    await this.desenharModeloQuandoFontesProntas();
    const canvas = this.getCanvasModelo();
    if (!canvas) return;
    this.enviar(this.canvasToTransparentPng(canvas));
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
