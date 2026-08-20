import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LinkBioClinic,
  LinkBioService,
  LinkBioState,
} from '../../core/services/link-bio.service';
import { ClinicaService } from '../../core/services/clinica.service';
import { ToastService } from '../../core/services/toast.service';
import { normalizeThemeKey } from '../../core/services/user-appearance.sync';
import { normalizeLinkBioClinic } from '../../core/utils/link-bio-clinic-normalize.util';
import {
  extractPlaceIdFromMapsUrl,
  normalizeGooglePlaceId,
} from './link-bio-google-review-link.util';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';

@Component({
  selector: 'zm-link-bio-aparencia-tab',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    FormsModule,
    RouterLink,
    ZardButtonComponent,
    ZardCardComponent,
  ],
  templateUrl: './link-bio-aparencia-tab.component.html',
  styleUrl: './link-bio-aparencia-tab.component.css',
})
export class LinkBioAparenciaTabComponent implements OnChanges {
  @Input({ required: true }) state!: LinkBioState;
  @Input() linkAvaliePlaceIdManual = '';

  @Output() reload = new EventEmitter<void>();
  @Output() previewRefresh = new EventEmitter<void>();
  @Output() linkAvaliePlaceIdManualChange = new EventEmitter<string>();

  publicTheme = '';
  customAccent = '#c9a84c';
  coverColor = '#1a1a2e';
  coverMode: 'banner' | 'solid' | 'none' = 'banner';
  shortDescription = '';
  specialties = '';
  foundedYear: number | null = null;
  contactEmail = '';
  mapsUrl = '';
  enviandoCover = false;
  nomeArquivoCover = '';
  salvando = false;

  private linkBioService = inject(LinkBioService);
  private clinicaService = inject(ClinicaService);
  private toast = inject(ToastService);

  get themeKeys(): string[] {
    return Object.keys(this.state?.available_themes ?? {});
  }

  get availableThemes(): Record<string, { label: string; primary: string }> {
    return this.state?.available_themes ?? {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']?.currentValue) {
      this.syncFromClinic(this.state.clinic);
    }
  }

  private syncFromClinic(c: LinkBioClinic): void {
    this.publicTheme = c.public_theme ? normalizeThemeKey(String(c.public_theme)) : '';
    this.customAccent = this.normalizarHex(c.accent_hex) ?? '#c9a84c';
    this.coverColor = c.cover_color ?? '#1a1a2e';
    this.coverMode = (c.cover_mode as 'banner' | 'solid' | 'none') ?? 'banner';
    this.shortDescription = c.short_description ?? '';
    this.specialties = c.specialties ?? '';
    this.foundedYear = (c.founded_year as number | null) ?? null;
    this.contactEmail = c.contact_email ?? '';
    this.mapsUrl = c.maps_url ?? '';
  }

  selecionarTema(themeKey: string): void {
    this.publicTheme = themeKey === '' ? '' : normalizeThemeKey(themeKey);
  }

  onCustomAccentChange(value: string): void {
    const hex = this.normalizarHex(value);
    if (hex) this.customAccent = hex;
  }

  onSelecionarCoverImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.state?.clinic?.name) return;
    this.enviandoCover = true;
    this.nomeArquivoCover = file.name;
    this.clinicaService.uploadCoverImage(file, this.state.clinic.name).subscribe({
      next: () => {
        this.coverMode = 'banner';
        this.enviandoCover = false;
        this.reload.emit();
        this.previewRefresh.emit();
        this.toast.success('Capa enviada', 'A imagem de capa foi atualizada.');
      },
      error: () => {
        this.enviandoCover = false;
        this.toast.error('Erro no upload', 'Não foi possível enviar a imagem.');
      },
    });
  }

  salvarAparencia(): void {
    this.salvando = true;
    const isCustom = this.publicTheme === 'custom';
    const mapsUrlTrimmed = this.mapsUrl?.trim() || null;
    const placeId =
      normalizeGooglePlaceId(this.linkAvaliePlaceIdManual) ||
      extractPlaceIdFromMapsUrl(mapsUrlTrimmed) ||
      null;
    const payload: Partial<LinkBioClinic> & Record<string, unknown> = {
      public_theme: this.publicTheme,
      cover_color: this.coverColor || null,
      cover_mode: this.coverMode,
      short_description: this.shortDescription || null,
      specialties: this.specialties || null,
      founded_year: this.foundedYear || null,
      contact_email: this.contactEmail || null,
      maps_url: mapsUrlTrimmed,
      google_place_id: placeId,
      accent_hex: isCustom ? this.customAccent : null,
    };
    this.linkBioService.updateAparencia(payload).subscribe({
      next: (clinic) => {
        this.salvando = false;
        const normalized = normalizeGooglePlaceId(clinic.google_place_id) ?? '';
        if (normalized !== this.linkAvaliePlaceIdManual) {
          this.linkAvaliePlaceIdManualChange.emit(normalized);
        }
        this.syncFromClinic(normalizeLinkBioClinic({ ...this.state.clinic, ...clinic }));
        this.previewRefresh.emit();
        this.toast.success('Aparência salva', 'As configurações visuais foram atualizadas.');
      },
      error: () => {
        this.salvando = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar a aparência.');
      },
    });
  }

  private normalizarHex(value: string | null | undefined): string | null {
    const v = (value ?? '').trim();
    if (!v) return null;
    const short = /^#([0-9a-f]{3})$/i.exec(v);
    if (short) {
      const [r, g, b] = short[1]!.split('');
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    const long = /^#([0-9a-f]{6})$/i.exec(v);
    if (long) return v.toLowerCase();
    return null;
  }
}
