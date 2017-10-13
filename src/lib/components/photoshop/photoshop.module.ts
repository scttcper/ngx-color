import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditableInputModule, HueModule, AlphaModule, SwatchModule, SaturationModule } from 'ngx-color';
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
  imports: [CommonModule, EditableInputModule, HueModule, AlphaModule, SwatchModule, SaturationModule],
})
export class ColorPhotoshopModule { }
