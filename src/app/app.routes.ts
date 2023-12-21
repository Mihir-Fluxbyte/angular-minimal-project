import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '1',
        loadChildren: () =>
          import('./test1/test1.module').then((m) => m.Test1Module),
      },
      {
        path: '2',
        loadChildren: () =>
          import('./test2/test2.module').then((m) => m.Test2Module),
      },
    ],
  },
];
