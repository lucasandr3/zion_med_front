import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-publico-sucesso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './formulario-publico-sucesso.component.html',
  styleUrl: './formulario-publico-sucesso.component.css',
})
export class FormularioPublicoSucessoComponent {}
