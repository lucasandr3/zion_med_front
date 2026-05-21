import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardCardComponent } from '@/shared/components/card/card.component';

@Component({
  selector: 'app-plataforma-placeholder',
  standalone: true,
  imports: [CommonModule, ZardCardComponent],
  templateUrl: './plataforma-placeholder.component.html',
  styleUrl: './plataforma-placeholder.component.css',
})
export class PlataformaPlaceholderComponent {
  @Input() titulo = 'Em breve';
  @Input() mensagem = 'Esta seção estará disponível em breve.';
}
