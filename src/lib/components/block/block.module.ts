import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { BlockComponent } from './block.component';
import { BlockSwatchesComponent } from './block-swatches.component';

const components = [
  BlockComponent,
  BlockSwatchesComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorBlockModule { }
