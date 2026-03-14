import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-privacidade',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './privacidade.component.html',
  styleUrl: './privacidade.component.css',
})
export class PrivacidadeComponent {
  dataAtual = new Date();
}
