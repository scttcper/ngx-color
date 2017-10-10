import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  CheckboardModule,
  EditableInputModule,
  SwatchModule,
} from '../../common';
import { BlockSwatchesComponent } from './block-swatches.component';
import { BlockComponent } from './block.component';

const components = [BlockComponent, BlockSwatchesComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, CheckboardModule, SwatchModule, EditableInputModule],
})
export class ColorBlockModule {}
