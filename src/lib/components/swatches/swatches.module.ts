import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RaisedModule, SwatchModule } from '../../common';
import { SwatchesColorComponent } from './swatches-color.component';
import { SwatchesGroupComponent } from './swatches-group.component';
import { SwatchesComponent } from './swatches.component';

const components = [
  SwatchesComponent,
  SwatchesGroupComponent,
  SwatchesColorComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, SwatchModule, RaisedModule],
})
export class ColorSwatchesModule {}
