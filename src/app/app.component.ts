import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="text-3xl font-bold text-slate-500">Form elements</div>
    <form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="form-element transition-all">
        <label for="text">text</label>
        <input name="text" type="text" />
      </div>
      <div class="form-element">
        <label for="number">number</label>
        <input name="number" type="number" />
      </div>
      <div class="form-element">
        <label for="email">email</label>
        <input name="email" type="email" />
      </div>
      <div class="form-element">
        <label for="password">password</label>
        <input name="password" type="password" />
      </div>
      <div class="form-element">
        <label for="search">search</label>
        <input name="search" type="search" />
      </div>
      <div class="form-element">
        <label for="time">time</label>
        <input name="time" type="time" />
      </div>
      <div class="form-element">
        <label for="month">month</label>
        <input name="month" type="month" />
      </div>
      <div class="form-element">
        <label for="checkbox">checkbox</label>
        <input name="checkbox" type="checkbox" />
      </div>
      <div class="form-element">
        <label for="tel">tel</label>
        <input name="tel" type="tel" />
      </div>
      <div class="form-element">
        <label for="radio">radio</label>
        <input name="radio" type="radio" />
      </div>
      <div class="form-element">
        <label for="select">select</label>
        <select name="select">
          <option value="option 1">Option 1</option>
          <option value="option 2">Option 2</option>
          <option value="option 3">Option 3</option>
        </select>
      </div>
      <div class="form-element">
        <label for="multiselect">multiselect</label>
        <select name="multiselect" multiple="true">
          <option value="option 1">Option 1</option>
          <option value="option 2">Option 2</option>
          <option value="option 3">Option 3</option>
          <option value="option 4">Option 4</option>
          <option value="option 5">Option 5</option>
          <option value="option 6">Option 6</option>
        </select>
      </div>
      <div class="form-element">
        <label for="textarea">textarea</label>
        <textarea name="textarea"></textarea>
      </div>
    </form>
  `,
  styles: [
    `
      .form-element {
        display: flex;
        flex-direction: column;
        margin-block: 10px;
        padding-inline: 10px;
      }

      .form-element label {
        font-size: 14px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'app-test';
}
