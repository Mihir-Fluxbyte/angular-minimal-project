import { NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { BodyScrollEvent, IStatusPanelParams } from 'ag-grid-community';

export interface IGridStatusComponentParams extends IStatusPanelParams {
  total: number;
  getLoadedCount: () => number;
  loadMore: () => void;
}

@Component({
  selector: 'app-grid-status-component',
  template: `
    <label [for]="check">Load on scroll</label>
    <input
      style="margin: 0 5px;"
      #check
      type="checkbox"
      [(ngModel)]="loadOnScroll"
    />
    &nbsp;&sdot; filtered :&nbsp;<b>{{ counts.filtered }} </b>&nbsp;&sdot; Rows
    : &nbsp; <b>{{ counts.loaded }}</b> &nbsp;of&nbsp;
    <b>{{ counts.total }}</b>
    <button
      style="margin-left: 5px; border: none; background: transparent; cursor: pointer; color: #2196f3;"
      type="button"
      (click)="params.loadMore()"
      *ngIf="hasMore"
    >
      Load more
    </button>
  `,
  standalone: true,
  imports: [NgIf, FormsModule],
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    `,
  ],
})
export class GridStatusComponent implements IStatusPanelAngularComp, OnDestroy {
  protected params!: IGridStatusComponentParams;
  loadOnScroll = true;
  counts = {
    filtered: 0,
    total: 0,
    loaded: 0,
  };

  agInit(params: IGridStatusComponentParams): void {
    this.params = params;
    params.api.addEventListener('modelUpdated', this.update);
    params.api.addEventListener('bodyScroll', this.handleScroll);
  }

  handleScroll = (event: BodyScrollEvent<unknown, unknown>) => {
    if (!this.loadOnScroll || event.direction === 'horizontal') return;
    const scrollPosition = event.top;
    const gridEl = document.querySelector('#grid');
    if (!gridEl) throw Error('grid element not found');
    const gridHeaderEl = gridEl.querySelector('.ag-header-row');
    if (!gridHeaderEl) throw Error('grid element header not found');
    const gridBodyHeight = gridEl.clientHeight - gridHeaderEl.clientHeight;
    // Calculate the height of all rows in the grid
    const allRowsHeight =
      this.params.api.getDisplayedRowCount() *
      this.params.api.getSizesForCurrentTheme().rowHeight;

    // Calculate the position of the last row
    const lastRowPosition = allRowsHeight - gridBodyHeight;

    // Determine if the last row is in view
    const isLastRowInView = scrollPosition >= lastRowPosition;

    if (isLastRowInView) {
      this.params.loadMore();
    }
  };

  update = () => {
    this.counts.filtered = this.params.api.getDisplayedRowCount();
    this.counts.loaded = this.params.getLoadedCount();
    this.counts.total = this.params.total;
  };

  get hasMore() {
    return this.counts.total !== this.counts.loaded;
  }

  ngOnDestroy(): void {
    this.params.api.removeEventListener('modelUpdated', this.update);
  }
}
