import { Component, inject } from '@angular/core';
import { THEME } from 'src/app/THEME';

@Component({
  selector: 'app-test11',
  template: ` <app-theme-boundary
    ><p>test11 works! {{ theme }}</p>
    <app-test></app-test>
  </app-theme-boundary>`,
  styles: [],
})
export class Test11Component {
  theme = inject(THEME);
}
