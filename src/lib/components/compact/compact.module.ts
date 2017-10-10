import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditableInputModule, RaisedModule, SwatchModule } from '../../common';
import { CompactColorComponent } from './compact-color.component';
import { CompactFieldsComponent } from './compact-fields.component';
import { CompactComponent } from './compact.component';

const components = [
  CompactComponent,
  CompactColorComponent,
  CompactFieldsComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, EditableInputModule, SwatchModule, RaisedModule],
})
export class ColorCompactModule {}
