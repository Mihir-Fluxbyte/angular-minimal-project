import { Component } from '@angular/core';

@Component({
  selector: 'app-page1',
  template: `
    <p>page1 works!</p>
    <ng-container *appHeadingPortal> Page1 </ng-container>
  `,
  styles: [],
})
export class Page1Component {
  log() {
    console.log(this);
  }
}
