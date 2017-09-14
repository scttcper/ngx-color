import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ColorBlockModule } from '../lib/components/block/block.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    ColorBlockModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
