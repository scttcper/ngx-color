import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditableInputModule, RaisedModule } from '../../common';
import { MaterialComponent } from './material.component';

const components = [MaterialComponent];

@NgModule({
  exports: components,
  declarations: components,
  imports: [CommonModule, EditableInputModule, RaisedModule],
})
export class ColorMaterialModule { }
