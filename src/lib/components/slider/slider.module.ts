import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HueModule, SwatchModule } from 'ngx-color';
import { SliderSwatchComponent } from './slider-swatch.component';
import { SliderSwatchesComponent } from './slider-swatches.component';
import { SliderComponent } from './slider.component';

const components = [
  SliderComponent,
  SliderSwatchComponent,
  SliderSwatchesComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, HueModule, SwatchModule],
})
export class ColorSliderModule {}
