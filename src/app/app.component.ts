import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styles: [
    `
      main {
        padding: 16px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'first-ng-app';
}
