import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HueModule } from '../../common';
import { HuePickerComponent } from './hue-picker.component';

const components = [
  HuePickerComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, HueModule],
})
export class ColorHueModule { }
