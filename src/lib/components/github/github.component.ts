import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

import { ColorWrap, SwatchModule } from 'ngx-color';
import { isValidHex } from 'ngx-color/helpers';
import { GithubSwatchComponent } from './github-swatch.component';

@Component({
  selector: 'color-github',
  template: `
  <div class="github-picker {{ triangle }}-triangle" [style.width.px]="width">
    <div class="triangleShadow"></div>
    <div class="triangle"></div>
    <color-github-swatch
      *ngFor="let color of colors"
      [color]="color"
      (onClick)="handleBlockChange($event)"
      (onSwatchHover)="onSwatchHover.emit($event)"
    ></color-github-swatch>
  </div>
  `,
  styles: [
    `
  .github-picker {
    background: rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 12px;
    border-radius: 4px;
    position: relative;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  .triangleShadow {
    position: absolute;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.15);
    border-image: initial;
  }
  .triangle {
    position: absolute;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent rgb(255, 255, 255);
    border-image: initial;
  }
  .hide-triangle > .triangle {
    display: none;
  }
  .hide-triangle > .triangleShadow {
    display: none;
  }
  .top-left-triangle > .triangle {
    top: -14px;
    left: 10px;
  }
  .top-left-triangle > .triangleShadow {
    top: -16px;
    left: 9px;
  }
  .top-right-triangle > .triangle {
    top: -14px;
    right: 10px;
  }
  .top-right-triangle > .triangleShadow {
    top: -16px;
    right: 9px;
  }
  .bottom-right-triangle > .triangle {
    top: 35px;
    right: 10px;
    transform: rotate(180deg);
  }
  .bottom-right-triangle > .triangleShadow {
    top: 37px;
    right: 9px;
    transform: rotate(180deg);
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class GithubComponent extends ColorWrap {
  @Input() width = 212;
  @Input()
  triangle: 'hide' | 'top-left' | 'top-right' | 'bottom-right' = 'top-left';
  @Input()
  colors = [
    '#B80000',
    '#DB3E00',
    '#FCCB00',
    '#008B02',
    '#006B76',
    '#1273DE',
    '#004DCF',
    '#5300EB',
    '#EB9694',
    '#FAD0C3',
    '#FEF3BD',
    '#C1E1C5',
    '#BEDADC',
    '#C4DEF6',
    '#BED3F3',
    '#D4C4FB',
  ];

  constructor() {
    super();
  }

  handleBlockChange({ hex, $event }) {
    if (isValidHex(hex)) {
      this.handleChange({ hex, source: 'hex' }, $event);
    }
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
}

@NgModule({
  declarations: [GithubComponent, GithubSwatchComponent],
  exports: [GithubComponent, GithubSwatchComponent],
  imports: [CommonModule, SwatchModule],
})
export class ColorGithubModule {}
