import { Component, inject } from '@angular/core';
import { THEME } from '../../THEME';

@Component({
  selector: 'app-test',
  template: `<app-theme-boundary>
    <span style="color: cyan; background: gray;">test works! {{ theme }}</span>
  </app-theme-boundary>`,
  styles: [],
})
export class TestComponent {
  theme = inject(THEME);
}
