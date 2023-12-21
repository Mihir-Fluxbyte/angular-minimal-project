import { Routes } from '@angular/router';
import { Test1Component } from './test1.component';
import { Test11Component } from './test11/test11.component';
import { Test12Component } from './test12/test12.component';

export const routes: Routes = [
  {
    path: '',
    component: Test1Component,
    children: [
      {
        path: '1',
        component: Test11Component,
      },
      {
        path: '2',
        component: Test12Component,
      },
    ],
  },
];
