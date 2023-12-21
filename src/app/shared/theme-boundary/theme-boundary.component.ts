import { Component, inject } from '@angular/core';
import { THEME } from 'src/app/THEME';

@Component({
  selector: 'app-theme-boundary',
  template: `
    <div [classList]="'boundary ' + themeClass"><ng-content /></div>
  `,
  styles: [
    `
      .boundary {
        box-sizing: border-box;
        border: 5px solid transparent;
        padding: 5px;
        &.old-theme {
          border-color: orange;
        }
        &.new-theme {
          border-color: green;
        }
      }
    `,
  ],
})
export class ThemeBoundaryComponent {
  theme = inject(THEME);
  themeClass = `${this.theme}-theme`;
}
