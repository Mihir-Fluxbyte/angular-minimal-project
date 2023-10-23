import { Routes } from '@angular/router';
import { DndComponent } from './dnd.component';
import { BasicDragAndDropComponent } from './basic-drag-and-drop/basic-drag-and-drop.component';
import { ReorderingListsComponent } from './reordering-lists/reordering-lists.component';
import { TransferringItemsBetweenListsComponent } from './transferring-items-between-lists/transferring-items-between-lists.component';
import { DragHandleComponent } from './drag-handle/drag-handle.component';

export const dndRoutes: Routes = [
  {
    path: '',
    component: DndComponent,
    children: [
      {
        path: 'basic-drag-and-drop',
        component: BasicDragAndDropComponent,
      },
      {
        path: 'reordering-lists',
        component: ReorderingListsComponent,
      },
      {
        path: 'transferring-items-between-lists-component',
        component: TransferringItemsBetweenListsComponent,
      },
      {
        path: 'drag-handle',
        component: DragHandleComponent,
      },
    ],
  },
];
