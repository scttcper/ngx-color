import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboardComponent } from '../common/checkboard.component';
import { ColorWrap } from '../common/color-wrap.component';
import { EditableInputComponent } from '../common/editable-input.component';
import { SwatchComponent } from '../common/swatch.component';
import { BlockComponent } from './block.component';
import { BlockSwatchesComponent } from './block-swatches.component';

const components = [
  ColorWrap,
  BlockComponent,
  BlockSwatchesComponent,
  CheckboardComponent,
  EditableInputComponent,
  SwatchComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule],
})
export class ColorBlockModule { }
