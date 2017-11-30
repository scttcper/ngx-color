import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlphaModule, EditableInputModule, HueModule, SaturationModule, SwatchModule } from 'ngx-color';
import { PhotoshopButtonComponent } from './photoshop-button.component';
import { PhotoshopFieldsComponent } from './photoshop-fields.component';
import { PhotoshopPreviewsComponent } from './photoshop-previews.component';
import { PhotoshopComponent } from './photoshop.component';

const components = [
  PhotoshopComponent,
  PhotoshopPreviewsComponent,
  PhotoshopButtonComponent,
  PhotoshopFieldsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, EditableInputModule, HueModule, AlphaModule, SwatchModule, SaturationModule],
})
export class ColorPhotoshopModule { }
