import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test1Component } from './test1.component';
import { Test11Component } from './test11/test11.component';
import { Test12Component } from './test12/test12.component';
import { RouterModule } from '@angular/router';
import { routes } from './test1.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [Test1Component, Test11Component, Test12Component],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [],
})
export class Test1Module {}
