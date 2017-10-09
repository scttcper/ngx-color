import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AlphaModule } from '../lib/components/alpha/alpha.module';
import { ColorBlockModule } from '../lib/components/block/block.module';
import { ColorChromeModule } from '../lib/components/chrome/chrome.module';
import { ColorCircleModule } from '../lib/components/circle/circle.module';
import { ColorCompactModule } from '../lib/components/compact/compact.module';
import { ColorGithubModule } from '../lib/components/github/github.module';
import { ColorHueModule } from '../lib/components/hue/hue.module';
import { ColorMaterialModule } from '../lib/components/material/material.module';
import { ColorPhotoshopModule } from '../lib/components/photoshop/photoshop.module';
import { ColorSketchModule } from '../lib/components/sketch/sketch.module';
import { ColorSliderModule } from '../lib/components/slider/slider.module';
import { ColorSwatchesModule } from '../lib/components/swatches/swatches.module';
import { ColorTwitterModule } from '../lib/components/twitter/twitter.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AlphaModule,
    ColorBlockModule,
    ColorChromeModule,
    ColorCircleModule,
    ColorCompactModule,
    ColorGithubModule,
    ColorHueModule,
    ColorMaterialModule,
    ColorPhotoshopModule,
    ColorSketchModule,
    ColorSliderModule,
    ColorSwatchesModule,
    ColorTwitterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
