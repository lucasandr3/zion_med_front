import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erro-404',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './erro-404.component.html',
  styleUrl: './erro-404.component.css',
})
export class Erro404Component {}
