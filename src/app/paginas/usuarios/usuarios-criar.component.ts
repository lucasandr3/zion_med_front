import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-criar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios-criar.component.html',
  styleUrl: './usuarios-criar.component.css',
})
export class UsuariosCriarComponent {}
