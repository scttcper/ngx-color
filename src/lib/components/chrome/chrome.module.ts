import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { ChromeComponent } from './chrome.component';
import { ChromeFieldsComponent } from './chrome-fields.component';

const components = [
  ChromeComponent,
  ChromeFieldsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorChromeModule { }
