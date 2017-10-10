import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwatchModule } from '../../common';
import { GithubComponent } from './github.component';
import { GithubSwatchComponent } from './github-swatch.component';

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
