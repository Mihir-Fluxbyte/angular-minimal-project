import { Component, inject } from '@angular/core';
import { ProvideNewTheme, THEME } from 'src/app/THEME';

@Component({
  selector: 'app-test12',
  template: ` <app-theme-boundary
    ><p>test12 works! {{ theme }}</p>
    <app-test></app-test>
  </app-theme-boundary>`,
  styles: [],
  providers: [ProvideNewTheme],
})
export class Test12Component {
  theme = inject(THEME);
}
