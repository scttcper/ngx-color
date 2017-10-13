import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlphaModule,
  CheckboardModule,
  EditableInputModule,
  HueModule,
  SaturationModule,
} from 'ngx-color';
import { ChromeFieldsComponent } from './chrome-fields.component';
import { ChromeComponent } from './chrome.component';

const components = [ChromeComponent, ChromeFieldsComponent];

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
  ],
})
export class ColorChromeModule {}
