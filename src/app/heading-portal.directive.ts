import {
  AfterViewInit,
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LayoutComponent } from './shared/layout/layout.component';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appHeadingPortal]',
})
export class HeadingPortalDirective implements AfterViewInit, OnDestroy {
  portal?: TemplatePortal;
  constructor(
    private templateRef: TemplateRef<unknown>,
    private _viewContainerRef: ViewContainerRef,
    private layoutComponent: LayoutComponent,
  ) {}

  ngAfterViewInit(): void {
    const portal = new TemplatePortal(this.templateRef, this._viewContainerRef);
    this.portal = portal;
    this.layoutComponent.setPageHeadingPortal(portal);
  }

  ngOnDestroy(): void {
    if (this.portal && this.portal.isAttached) {
      this.portal.detach();
    }
  }
}
