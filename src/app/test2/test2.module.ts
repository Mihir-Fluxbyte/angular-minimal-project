import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test2Component } from './test2.component';
import { routes } from './test2.routes';
import { RouterModule } from '@angular/router';
import { ProvideNewTheme } from '../THEME';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [Test2Component],
  providers: [ProvideNewTheme],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class Test2Module {}
