import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plataforma-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plataforma-placeholder.component.html',
  styleUrl: './plataforma-placeholder.component.css',
})
export class PlataformaPlaceholderComponent {
  @Input() titulo = 'Em breve';
  @Input() mensagem = 'Esta seção estará disponível em breve.';
}
