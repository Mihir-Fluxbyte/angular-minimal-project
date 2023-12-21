import { Component, inject } from '@angular/core';
import { THEME } from '../THEME';

@Component({
  selector: 'app-test1',
  template: ` <app-theme-boundary
    ><p>test1 works! {{ theme }}</p>
    <app-test></app-test>
    <router-outlet />
  </app-theme-boundary>`,
  styles: [],
})
export class Test1Component {
  theme = inject(THEME);
}
