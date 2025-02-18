import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { HSL } from 'ngx-color';

@Component({
  selector: 'color-slider-swatches',
  template: `
    <div class="slider-swatches">
      <div class="slider-swatch-wrap">
        <color-slider-swatch
          [hsl]="hsl"
          [offset]="0.8"
          [active]="active(0.8, 0.5)"
          (onClick)="handleClick($event)"
          [first]="true"
        ></color-slider-swatch>
      </div>
      <div class="slider-swatch-wrap">
        <color-slider-swatch
          [hsl]="hsl"
          [offset]="0.65"
          [active]="active(0.65, 0.5)"
          (onClick)="handleClick($event)"
        ></color-slider-swatch>
      </div>
      <div class="slider-swatch-wrap">
        <color-slider-swatch
          [hsl]="hsl"
          [offset]="0.5"
          [active]="active(0.5, 0.5)"
          (onClick)="handleClick($event)"
        ></color-slider-swatch>
      </div>
      <div class="slider-swatch-wrap">
        <color-slider-swatch
          [hsl]="hsl"
          [offset]="0.35"
          [active]="active(0.35, 0.5)"
          (onClick)="handleClick($event)"
        ></color-slider-swatch>
      </div>
      <div class="slider-swatch-wrap">
        <color-slider-swatch
          [hsl]="hsl"
          [offset]="0.2"
          [active]="active(0.2, 0.5)"
          (onClick)="handleClick($event)"
          [last]="true"
        ></color-slider-swatch>
      </div>
    </div>
  `,
  styles: [
    `
      .slider-swatches {
        margin-top: 20px;
      }
      .slider-swatch-wrap {
        box-sizing: border-box;
        width: 20%;
        padding-right: 1px;
        float: left;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: false,
})
export class SliderSwatchesComponent {
  @Input() hsl!: HSL;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();

  active(l: number, s: number) {
    return Math.round(this.hsl.l * 100) / 100 === l && Math.round(this.hsl.s * 100) / 100 === s;
  }
  handleClick({ data, $event }) {
    this.onClick.emit({ data, $event });
  }
}
