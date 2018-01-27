import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { HSL } from 'ngx-color';

@Component({
  selector: 'color-slider-swatches',
  template: `
  <div class="slider-swatches">
    <div class="slider-swatch-wrap">
      <color-slider-swatch
        [hsl]="hsl"
        offset=".80"
        [active]="active(0.80, 0.50)"
        (onClick)="handleClick($event)"
        first="true"
      ></color-slider-swatch>
    </div>
    <div class="slider-swatch-wrap">
      <color-slider-swatch
        [hsl]="hsl"
        offset=".65"
        [active]="active(0.65, 0.50)"
        (onClick)="handleClick($event)"
      ></color-slider-swatch>
    </div>
    <div class="slider-swatch-wrap">
      <color-slider-swatch
        [hsl]="hsl"
        offset=".50"
        [active]="active(0.50, 0.50)"
        (onClick)="handleClick($event)"
      ></color-slider-swatch>
    </div>
    <div class="slider-swatch-wrap">
      <color-slider-swatch
        [hsl]="hsl"
        offset=".35"
        [active]="active(0.35, 0.50)"
        (onClick)="handleClick($event)"
      ></color-slider-swatch>
    </div>
    <div class="slider-swatch-wrap">
      <color-slider-swatch
        [hsl]="hsl"
        offset=".20"
        [active]="active(0.20, 0.50)"
        (onClick)="handleClick($event)"
        last="true"
      ></color-slider-swatch>
    </div>
  </div>
  `,
  styles: [`
    .slider-swatches {
      margin-top: 20px;
    }
    .slider-swatch-wrap {
      box-sizing: border-box;
      width: 20%;
      padding-right: 1px;
      float: left;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SliderSwatchesComponent {
  @Input() hsl: HSL;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  swatchStyle: any;

  active(l: number, s: number) {
    return (
      Math.round(this.hsl.l * 100) / 100 === l &&
      Math.round(this.hsl.s * 100) / 100 === s
    );
  }
  handleClick({ data, $event }) {
    this.onClick.emit({ data, $event });
  }
}
