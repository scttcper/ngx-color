import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditableInputModule, RaisedModule } from 'ngx-color';
import { MaterialComponent } from './material.component';

const components = [MaterialComponent];

@NgModule({
  exports: components,
  declarations: components,
  imports: [CommonModule, EditableInputModule, RaisedModule],
})
export class ColorMaterialModule { }
