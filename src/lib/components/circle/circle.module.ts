import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwatchModule } from 'ngx-color';
import { CircleComponent } from './circle.component';
import { CircleSwatchComponent } from './circle-swatch.component';

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
