import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlphaModule, CheckboardModule } from 'ngx-color';
import { AlphaPickerComponent } from './alpha-picker.component';

const components = [
  AlphaPickerComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, AlphaModule, CheckboardModule],
})
export class ColorAlphaModule { }
