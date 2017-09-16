import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ColorBlockModule } from '../lib/components/block/block.module';
import { HueModule } from '../lib/components/hue/hue.module';
import { AlphaModule } from '../lib/components/alpha/alpha.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    ColorBlockModule,
    HueModule,
    AlphaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
