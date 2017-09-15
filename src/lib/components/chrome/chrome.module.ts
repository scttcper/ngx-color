import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboardComponent, ColorWrap, EditableInputComponent } from '../common';
import { SwatchComponent } from '../common/swatch.component';
import { ChromeComponent } from './chrome.component';

const components = [
  ChromeComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule],
})
export class ColorChromeModule { }
