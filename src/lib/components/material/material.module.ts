import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { MaterialComponent } from './material.component';

const components = [MaterialComponent];

@NgModule({
  imports: [CommonModule, ColorCommonModule],
  exports: components,
  declarations: components,
})
export class ColorMaterialModule { }
