import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { AlphaPickerComponent } from './alpha-picker.component';

const components = [
  AlphaPickerComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class AlphaModule { }
