import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form" (submit)="submitHandler($event)">
      <div>
        <label for="name"> Name </label>
        <input type="text" formControlName="name" id="name" />
      </div>
      <div>
        <label for="email"> Email </label>
        <input type="text" formControlName="email" id="email" />
      </div>
      <app-sub-form controlName="location" />
      <button type="submit">Submit</button>
    </form>
  `,
  styles: [],
})
export class FormComponent {
  form = new FormGroup({
    name: new FormControl('John'),
    email: new FormControl(''),
  });

  submitHandler(event: SubmitEvent) {
    console.log(event);
    console.log(this.form.value);
  }
}
