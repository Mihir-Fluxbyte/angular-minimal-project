import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, delay, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      A1 [text + count] with both parameter: {{ a1.result$ | async }}
      <button (click)="a1.refetch(bs.getValue(), 'REFETCHED-')">Refetch</button>
    </div>
    <div>A2 [delayed count]: {{ a2.result$ | async }}</div>
    <div>
      A3 [delayed count + number with parameter number]:
      {{ a3.result$ | async }}
      <button (click)="a3.refetch(Math.random())">Refetch</button>
    </div>
    <div>A4 [interval random]: {{ a4.result$ | async }}</div>

    <div>
      count: {{ bs | async }}
      <button (click)="bs.next(bs.getValue() + 1)">Increment</button>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'app-test';
  bs = new BehaviorSubject(1);
  Math = Math;
  a1 = this.apiService.API(
    (count: number, pre: string) => of(pre + count).pipe(delay(100)),
    {
      initialParams: [1, 'INITIAL-'],
    },
  );
  a2 = this.apiService.API(this.bs.pipe(delay(100)), {});
  a3 = this.apiService.API(
    (v: number) =>
      this.bs.pipe(
        map((c) => c + v),
        delay(100),
      ),
    {
      initialParams: [0],
    },
  );
  a4 = this.apiService.API(() => of(this.Math.random()), {
    initialParams: [],
    pollInterval: 1000,
  });

  constructor(public apiService: ApiService) {}
}
