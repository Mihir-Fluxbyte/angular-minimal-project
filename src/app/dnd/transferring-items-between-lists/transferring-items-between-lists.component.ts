import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transferring-items-between-lists',
  template: `
    <h1>Transferring items between lists (cdkDropListConnectedTo)</h1>
    <div class="example-container">
      <h2>To do</h2>

      <div
        cdkDropList
        #todoList="cdkDropList"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        class="example-list"
        (cdkDropListDropped)="drop($event)"
      >
        <div
          class="example-box"
          *ngFor="let item of todo"
          cdkDrag
          [cdkDragData]="item"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="example-container">
      <h2>Done</h2>

      <div
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList]"
        class="example-list"
        (cdkDropListDropped)="drop($event)"
      >
        <div
          class="example-box"
          *ngFor="let item of done"
          cdkDrag
          [cdkDragData]="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <h1>Drag&Drop connected sorting group (cdkDropListGroup)</h1>
    <div cdkDropListGroup>
      <div class="example-container">
        <h2>To do</h2>

        <div
          cdkDropList
          [cdkDropListData]="todo"
          class="example-list"
          (cdkDropListDropped)="drop($event)"
        >
          <div
            class="example-box"
            *ngFor="let item of todo"
            cdkDrag
            [cdkDragData]="item"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="example-container">
        <h2>Done</h2>

        <div
          cdkDropList
          [cdkDropListData]="done"
          class="example-list"
          (cdkDropListDropped)="drop($event)"
        >
          <div
            class="example-box"
            *ngFor="let item of done"
            cdkDrag
            [cdkDragData]="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .example-container {
        width: 400px;
        max-width: 100%;
        margin: 0 25px 25px 0;
        display: inline-block;
        vertical-align: top;
      }

      .example-list {
        border: solid 1px #ccc;
        min-height: 60px;
        background: white;
        border-radius: 4px;
        overflow: hidden;
        display: block;
      }

      .example-box {
        padding: 20px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        cursor: move;
        background: white;
        font-size: 14px;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow:
          0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14),
          0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0.2;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .example-box:last-child {
        border: none;
      }

      .example-list.cdk-drop-list-dragging
        .example-box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class TransferringItemsBetweenListsComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    console.log({ event });
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
