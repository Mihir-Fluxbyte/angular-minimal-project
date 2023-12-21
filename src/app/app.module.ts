import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { HeadingPortalDirective } from './heading-portal.directive';
import { HomeComponent } from './home/home.component';
import { PortalModule } from '@angular/cdk/portal';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    Page1Component,
    Page2Component,
    HeadingPortalDirective,
    HomeComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), PortalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
