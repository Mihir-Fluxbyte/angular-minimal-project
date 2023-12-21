import { Component, inject } from '@angular/core';
import { THEME } from '../THEME';

@Component({
  selector: 'app-test2',
  template: ` <app-theme-boundary>
    <p>test2 works! {{ theme }}</p>
    <app-test></app-test>
  </app-theme-boundary>`,
  styles: [],
})
export class Test2Component {
  theme = inject(THEME);
}
