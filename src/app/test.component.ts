import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    {{ title }}
    | list length: {{ list.length }}
  `,
  styles: [``],
})
export class TestComponent
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
  @Input() title!: string;
  @Input() list!: string[];

  constructor() {
    console.log('Test: constructor');
  }

  ngOnInit(): void {
    console.log('Test: ngOnInit');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Test: ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('Test: ngDoCheck');
  }
  ngOnDestroy(): void {
    console.log('Test: ngOnDestroy');
  }
  ngAfterContentInit(): void {
    console.log('Test: ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('Test: ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('Test: ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('Test: ngAfterViewChecked');
  }
}
