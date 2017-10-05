import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ColorBlockModule } from '../lib/components/block/block.module';
import { HueModule } from '../lib/components/hue/hue.module';
import { AlphaModule } from '../lib/components/alpha/alpha.module';
import { ColorChromeModule } from '../lib/components/chrome/chrome.module';
import { ColorSketchModule } from '../lib/components/sketch/sketch.module';
import { ColorPhotoshopModule } from '../lib/components/photoshop/photoshop.module';
import { ColorGithubModule } from '../lib/components/github/github.module';
import { ColorTwitterModule } from '../lib/components/twitter/twitter.module';
import { ColorCircleModule } from '../lib/components/circle/circle.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    ColorBlockModule,
    HueModule,
    AlphaModule,
    ColorChromeModule,
    ColorSketchModule,
    ColorPhotoshopModule,
    ColorGithubModule,
    ColorTwitterModule,
    ColorCircleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
