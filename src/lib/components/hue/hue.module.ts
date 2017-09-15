import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HueComponent } from '../common';
import { HuePickerComponent } from './hue-picker.component';

const components = [
  HuePickerComponent,
  HueComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule],
})
export class HueModule { }
