import { Component } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  template: `
    <div style="display: flex; gap: 10px;">
      <ng-template [cdkPortalOutlet]="headingPortal$ | async"></ng-template>
      <div style="margin-left: auto; display: flex; gap: 10px;">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        >
        <a routerLink="/page1" routerLinkActive="active">Page1</a>
        <a routerLink="/page2" routerLinkActive="active">Page2</a>
      </div>
    </div>
    <router-outlet></router-outlet>
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
export class LayoutComponent {
  private _headingPortal = new Subject<TemplatePortal | null>();
  readonly headingPortal$ = this._headingPortal.asObservable();

  setPageHeadingPortal(portal: TemplatePortal | null) {
    setTimeout(() => {
      this._headingPortal.next(portal);
    });
  }
}
