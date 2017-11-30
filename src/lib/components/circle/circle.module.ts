import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SwatchModule } from 'ngx-color';
import { CircleSwatchComponent } from './circle-swatch.component';
import { CircleComponent } from './circle.component';

const components = [
  CircleComponent,
  CircleSwatchComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, SwatchModule],
})
export class ColorCircleModule { }
