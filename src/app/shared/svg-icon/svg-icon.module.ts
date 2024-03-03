import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconDirective } from './svg-icon.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SvgIconDirective],
  exports: [SvgIconDirective],
})
export class SvgIconModule {}
