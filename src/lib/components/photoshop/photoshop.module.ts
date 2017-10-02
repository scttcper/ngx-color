import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { PhotoshopComponent } from './photoshop.component';
import { PhotoshopPreviewsComponent } from './photoshop-previews.component';
import { PhotoshopButtonComponent } from './photoshop-button.component';
import { PhotoshopFieldsComponent } from './photoshop-fields.component';

const components = [
  PhotoshopComponent,
  PhotoshopPreviewsComponent,
  PhotoshopButtonComponent,
  PhotoshopFieldsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorPhotoshopModule { }
