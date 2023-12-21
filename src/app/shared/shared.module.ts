import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ThemeBoundaryComponent } from './theme-boundary/theme-boundary.component';

@NgModule({
  declarations: [TestComponent, ThemeBoundaryComponent],
  imports: [CommonModule],
  exports: [TestComponent, ThemeBoundaryComponent],
})
export class SharedModule {}
