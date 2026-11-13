import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type Showcase = {
  model: number;
  title: string;
  blurb: string;
};

@Component({
  selector: 'app-link-na-bio-vitrine',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './link-na-bio-vitrine.component.html',
  styleUrl: './link-na-bio-vitrine.component.css',
})
export class LinkNaBioVitrineComponent {
  readonly featured: Showcase[] = [
    {
      model: 3,
      title: 'Estética facial',
      blurb: 'Procedimentos, contato e fichas públicas com a identidade da clínica.',
    },
    {
      model: 8,
      title: 'Fisioterapia dermatofuncional',
      blurb: 'Página enxuta para quem atende solo e precisa de documentos digitais.',
    },
    {
      model: 6,
      title: 'Pediatria',
      blurb: 'Orientação por faixa etária e formulários adequados à família.',
    },
    {
      model: 7,
      title: 'Clínicas multiprofissionais',
      blurb: 'Várias especialidades na mesma página, sem misturar agendas inventadas.',
    },
  ];
}
