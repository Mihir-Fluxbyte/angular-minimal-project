import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import {
  GridStatusComponent,
  IGridStatusComponentParams,
} from './grid-status.component';

@Component({
  selector: 'app-root',
  template: `
    <div
      style="display: flex; height: 100vh; flex-direction: column;  gap: 10px; padding: 10px;"
    >
      <div
        *ngIf="getCounts as count"
        style="display: flex; align-items: center;"
      >
        <label [for]="check">Load on scroll</label>
        <input
          style="margin: 0 5px;"
          #check
          type="checkbox"
          [(ngModel)]="loadOnScroll"
        />
        &nbsp;&sdot; filtered :&nbsp;<b>{{ count.filtered }} </b>&nbsp;&sdot;
        Rows : &nbsp; <b>{{ count.loaded }}</b> &nbsp;of&nbsp;
        <b>{{ count.total }}</b>
        <button
          style="margin-left: 5px; border: none; background: transparent; cursor: pointer; color: #2196f3;"
          type="button"
          (click)="loadMore()"
          *ngIf="hasMore"
        >
          Load more
        </button>
      </div>
      <div style="flex-grow: 1;">
        <ag-grid-angular
          id="grid"
          style="width: 100%; height: 100%"
          class="ag-theme-alpine"
          [rowData]="rowData"
          [columnDefs]="columnDefs"
          [gridOptions]="gridOptions"
        >
        </ag-grid-angular>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'app-test';
  httpClient = inject(HttpClient);
  nextPage = 1;
  dataPerPage = 30;
  totalData = 200;

  get getCounts() {
    return {
      filtered: this.gridApi?.getDisplayedRowCount() ?? 0,
      total: this.totalData,
      loaded: this.data.length,
    };
  }

  columnDefs: ColDef<DataType>[] = [
    {
      headerName: '#',
      width: 50,
      valueFormatter: (params) => {
        if (!params.node?.id || params.node.group) return '';
        return `${parseInt(params.node.id) + 1}`;
      },
    },
    { field: 'id', filter: 'agNumberColumnFilter' },
    { field: 'userId', filter: 'agNumberColumnFilter' },
    { field: 'title', filter: 'agTextColumnFilter' },
    { field: 'completed', filter: 'agSetColumnFilter', enableValue: true },
  ];

  loadOnScroll = false;

  data: DataType[] = [];
  rowData: DataType[] = [];

  gridApi?: GridApi<DataType>;

  gridOptions: GridOptions<DataType> = {
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      rowGroup: false,
      resizable: true,
      enableRowGroup: true,
    },
    multiSortKey: 'ctrl',
    rowHeight: 25,
    sideBar: true,
    statusBar: {
      statusPanels: [
        {
          statusPanel: GridStatusComponent,
          align: 'left',
          statusPanelParams: {
            total: this.getCounts.total,
            getLoadedCount: () => this.getCounts.loaded,
            loadMore: this.loadMore.bind(this),
          } as IGridStatusComponentParams,
        },
      ],
    },
    onBodyScroll: (event) => {
      if (
        !this.gridApi ||
        !this.loadOnScroll ||
        event.direction === 'horizontal'
      )
        return;
      const scrollPosition = event.top;
      const gridEl = document.querySelector('#grid');
      if (!gridEl) throw Error('grid element not found');
      const gridHeaderEl = gridEl.querySelector('.ag-header-row');
      if (!gridHeaderEl) throw Error('grid element header not found');
      const gridBodyHeight = gridEl.clientHeight - gridHeaderEl.clientHeight;

      // Calculate the height of all rows in the grid
      const allRowsHeight =
        this.gridApi.getDisplayedRowCount() *
        this.gridApi.getSizesForCurrentTheme().rowHeight;

      // Calculate the position of the last row
      const lastRowPosition = allRowsHeight - gridBodyHeight;

      // Determine if the last row is in view
      const isLastRowInView = scrollPosition >= lastRowPosition;

      if (isLastRowInView) {
        this.loadMore();
      }
    },
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.loadData(this.nextPage);
    },
  };
  loading = false;

  loadMore() {
    this.loadData(this.nextPage);
  }

  loadData(page: number) {
    if (this.loading || !this.hasMore) return;
    this.loading = true;
    this.gridApi?.showLoadingOverlay();
    this.apiCall(page).subscribe((pageData) => {
      this.data.push(...pageData);
      // temporary splice it by totalData length
      this.data.splice(this.totalData);
      // This will scroll to top ☠️
      // this.rowData = [...this.data];
      // This will not change scroll
      this.gridApi?.applyTransactionAsync({
        add: pageData,
      });
      this.nextPage++;
      this.loading = false;
    });
  }

  apiCall(page: number) {
    return this.httpClient.get<DataType[]>(
      `https://jsonplaceholder.typicode.com/todos?_start=${
        (page - 1) * this.dataPerPage
      }&_limit=${this.dataPerPage}`,
    );
  }

  get hasMore() {
    return this.totalData !== this.data.length;
  }
}

export type DataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
