import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCommonModule } from '../common/common.module';
import { GithubComponent } from './github.component';
import { GithubSwatchComponent } from './github-swatch.component';

const components = [
  GithubComponent,
  GithubSwatchComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, ColorCommonModule],
})
export class ColorGithubModule { }
