import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndComponent } from './dnd.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { dndRoutes } from './dnd.routes';
import { BasicDragAndDropComponent } from './basic-drag-and-drop/basic-drag-and-drop.component';
import { ReorderingListsComponent } from './reordering-lists/reordering-lists.component';
import { TransferringItemsBetweenListsComponent } from './transferring-items-between-lists/transferring-items-between-lists.component';
import { DragHandleComponent } from './drag-handle/drag-handle.component';

@NgModule({
  declarations: [
    DndComponent,
    BasicDragAndDropComponent,
    ReorderingListsComponent,
    TransferringItemsBetweenListsComponent,
    DragHandleComponent,
  ],
  imports: [CommonModule, DragDropModule, RouterModule.forChild(dndRoutes)],
})
export class DndModule {}
