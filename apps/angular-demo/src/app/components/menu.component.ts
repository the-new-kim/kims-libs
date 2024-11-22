import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuRouts } from '../app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  routes = menuRouts;
}
