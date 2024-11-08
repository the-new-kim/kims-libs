import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-demo';
  show = false;

  toggle(event: Event) {
    const { checked } = event.target as HTMLInputElement;
    this.show = checked;
  }
}
