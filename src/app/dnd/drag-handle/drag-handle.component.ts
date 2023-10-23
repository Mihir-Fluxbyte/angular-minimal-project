import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-handle',
  template: `
    <div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
      <div
        class="example-box"
        *ngFor="let movie of movies"
        cdkDrag
        [cdkDragData]="movie"
      >
        {{ movie }}
        <div *cdkDragPreview class="expamle-preview">
          Custom preview: {{ movie }}
        </div>
        <div class="example-handle" cdkDragHandle>
          <svg width="24px" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"
            ></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .example-list {
        width: 500px;
        max-width: 100%;
        border: solid 1px #ccc;
        min-height: 60px;
        display: block;
        background: white;
        border-radius: 4px;
        overflow: hidden;
      }

      .example-box,
      .expamle-preview {
        padding: 20px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background: white;
        font-size: 14px;
      }

      .example-handle {
        cursor: move;
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
        opacity: 0.3;
        background: #c0c0c0;
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
export class DragHandleComponent {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log({ event });
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
