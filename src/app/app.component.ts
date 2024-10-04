import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  template: `
    <router-outlet/>
  `,
})
export class AppComponent {
  title = 'timer-flex';
}
