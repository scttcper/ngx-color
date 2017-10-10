import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
