import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlphaModule,
  CheckboardModule,
  EditableInputModule,
  HueModule,
  SaturationModule,
  SwatchModule,
} from '../../common';
import { SketchFieldsComponent } from './sketch-fields.component';
import { SketchPresetColorsComponent } from './sketch-preset-colors.component';
import { SketchComponent } from './sketch.component';

const components = [
  SketchComponent,
  SketchFieldsComponent,
  SketchPresetColorsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,

    AlphaModule,
    CheckboardModule,
    EditableInputModule,
    HueModule,
    SaturationModule,
    SwatchModule,
  ],
})
export class ColorSketchModule {}
