import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BlockComponent } from '../lib/components/block/block.component';
import { BlockSwatchesComponent } from '../lib/components/block/block-swatches.component';
import { CheckboardComponent } from '../lib/components/common/checkboard.component';
import { SwatchComponent } from '../lib/components/common/swatch.component';
import { EditableInputComponent } from '../lib/components/common/editable-input.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    BlockSwatchesComponent,
    CheckboardComponent,
    SwatchComponent,
    EditableInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
