import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MdoButtonModule } from '@ctrl/ngx-github-buttons';

import { ColorAlphaModule } from '../lib/components/alpha/alpha-picker.component';
import { ColorBlockModule } from '../lib/components/block/block.component';
import { ColorChromeModule } from '../lib/components/chrome/chrome.component';
import { ColorCircleModule } from '../lib/components/circle/circle.component';
import { ColorCompactModule } from '../lib/components/compact/compact.component';
import { ColorGithubModule } from '../lib/components/github/github.component';
import { ColorHueModule } from '../lib/components/hue/hue-picker.component';
import { ColorMaterialModule } from '../lib/components/material/material.component';
import { ColorPhotoshopModule } from '../lib/components/photoshop/photoshop.component';
import { ColorSketchModule } from '../lib/components/sketch/sketch.component';
import { ColorSliderModule } from '../lib/components/slider/slider.component';
import { ColorSwatchesModule } from '../lib/components/swatches/swatches.component';
import { ColorTwitterModule } from '../lib/components/twitter/twitter.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,

    MdoButtonModule,

    ColorAlphaModule,
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
