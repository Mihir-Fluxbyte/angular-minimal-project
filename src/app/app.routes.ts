import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dnd',
    pathMatch: 'full',
  },
  {
    path: 'dnd',
    loadChildren: () => import('./dnd/dnd.module').then((m) => m.DndModule),
  },
];
