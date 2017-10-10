import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditableInputModule, SwatchModule } from '../../common';
import { TwitterComponent } from './twitter.component';

const components = [TwitterComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, SwatchModule, EditableInputModule],
})
export class ColorTwitterModule {}
