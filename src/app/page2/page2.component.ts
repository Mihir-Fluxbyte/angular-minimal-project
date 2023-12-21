import { Component } from '@angular/core';

@Component({
  selector: 'app-page2',
  template: `
    <p>page2 works!</p>
    <ng-container *appHeadingPortal>Page2</ng-container>
  `,
  styles: [],
})
export class Page2Component {}
