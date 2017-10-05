import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { CircleComponent } from './circle.component';
import { CircleSwatchComponent } from './circle-swatch.component';

const components = [
  CircleComponent,
  CircleSwatchComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorCircleModule { }
