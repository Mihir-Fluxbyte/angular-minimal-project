import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

/**
 * @example
 * =@Component({
 *    selector: 'your-component-selector',
 *    template: `Your component template`,
 *    viewProviders: [
 *      ParentControlContainerViewProvider
 *    ],
 *  })
 */
const ParentControlContainerViewProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Component({
  selector: 'app-sub-form',
  template: `
    <div [formGroupName]="controlName">
      <div>
        <label for="state"> State </label>
        <input type="text" formControlName="state" id="state" />
      </div>
      <div>
        <label for="country"> Country </label>
        <input type="text" formControlName="country" id="state" />
      </div>
    </div>
  `,
  viewProviders: [ParentControlContainerViewProvider],
  styles: [],
})
export class SubFormComponent implements OnInit {
  parentContainer = inject(ControlContainer);
  @Input({ required: true }) controlName!: string;

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlName,
      new FormGroup({
        country: new FormControl(''),
        state: new FormControl(''),
      }),
    );
  }
}
