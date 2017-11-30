import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SwatchModule } from 'ngx-color';
import { GithubSwatchComponent } from './github-swatch.component';
import { GithubComponent } from './github.component';

const components = [
  GithubComponent,
  GithubSwatchComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, SwatchModule],
})
export class ColorGithubModule { }
