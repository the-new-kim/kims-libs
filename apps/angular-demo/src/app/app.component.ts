import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedDate?: Date;
  showCalendar = false;
  nextYear = new Date(new Date().getFullYear() + 1, 0, 1);
}
