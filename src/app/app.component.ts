import { Component, inject } from '@angular/core';
import { THEME } from './THEME';

@Component({
  selector: 'app-root',
  template: `
    <app-theme-boundary>
      AppComponent {{ theme }}
      <div style="display: flex; gap: 10px;">
        <a routerLink="/1/1" routerLinkActive="active">Comp11</a>
        <a routerLink="/1/2" routerLinkActive="active">Comp12</a>
        <a routerLink="/2" routerLinkActive="active">Comp2</a>
      </div>
      <app-test></app-test>
      <router-outlet></router-outlet>
    </app-theme-boundary>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        &.active {
          color: blue;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'app-test';
  theme = inject(THEME);
}
