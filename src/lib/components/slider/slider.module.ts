import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HueModule, SwatchModule } from '../../common';
import { SliderComponent } from './slider.component';
import { SliderSwatchesComponent } from './slider-swatches.component';
import { SliderSwatchComponent } from './slider-swatch.component';

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
