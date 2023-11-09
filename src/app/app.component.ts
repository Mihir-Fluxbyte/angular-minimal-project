import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    AppComponent: {{ title }} | list length: {{ list.length }}
    <br />
    Testomponent: <app-test [title]="title" [list]="list"></app-test>
    <br />
    <button (click)="add()">add</button>
    <button (click)="reset()">reset</button>
  `,
  styles: [],
})
export class AppComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    OnDestroy,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  title = 'app-test';
  list = ['a', 'b'];

  add() {
    this.list.push('c');
  }

  reset() {
    this.list = ['a', 'b'];
  }

  constructor() {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
}
