import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { SwatchesComponent } from './swatches.component';
import { SwatchesGroupComponent } from './swatches-group.component';
import { SwatchesColorComponent } from './swatches-color.component';

const components = [
  SwatchesComponent,
  SwatchesGroupComponent,
  SwatchesColorComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorSwatchesModule { }
