import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { SketchComponent } from './sketch.component';
import { SketchFieldsComponent } from './sketch-fields.component';
import { SketchPresetColorsComponent } from './sketch-preset-colors.component';

const components = [
  SketchComponent,
  SketchFieldsComponent,
  SketchPresetColorsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorSketchModule { }
