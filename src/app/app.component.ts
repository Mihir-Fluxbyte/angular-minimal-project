import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center" class="content">
    <h1>
      Welcome to {{title}}!
    </h1>
    <app-form></app-form>
  </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'app-test';
}
