import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
} from '@angular/core';

import { CheckboardModule } from './checkboard.component';
import { CoordinatesModule } from './coordinates.directive';
import { HSLA, RGBA } from './helpers/color.interfaces';

@Component({
    selector: 'color-alpha',
    template: `
  <div class="alpha" [style.border-radius]="radius">
    <div class="alpha-checkboard">
      <color-checkboard></color-checkboard>
    </div>
    <div class="alpha-gradient" [ngStyle]="gradient" [style.box-shadow]="shadow" [style.border-radius]="radius"></div>
    <div ngx-color-coordinates (coordinatesChange)="handleChange($event)" class="alpha-container color-alpha-{{direction}}">
      <div class="alpha-pointer" [style.left.%]="pointerLeft" [style.top.%]="pointerTop">
        <div class="alpha-slider" [ngStyle]="pointer"></div>
      </div>
    </div>
  </div>
  `,
    styles: [
        `
    .alpha {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .alpha-checkboard {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .alpha-gradient {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .alpha-container {
      position: relative;
      height: 100%;
      margin: 0 3px;
    }
    .alpha-pointer {
      position: absolute;
    }
    .alpha-slider {
      width: 4px;
      border-radius: 1px;
      height: 8px;
      box-shadow: 0 0 2px rgba(0, 0, 0, .6);
      background: #fff;
      margin-top: 1px;
      transform: translateX(-2px);
    }
  `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    standalone: false
})
export class AlphaComponent implements OnChanges {
  @Input() hsl!: HSLA;
  @Input() rgb!: RGBA;
  @Input() pointer!: Record<string, string>;
  @Input() shadow!: string;
  @Input() radius!: number | string;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Output() onChange = new EventEmitter<any>();
  gradient!: Record<string, string>;
  pointerLeft!: number;
  pointerTop!: number;

  ngOnChanges() {
    if (this.direction === 'vertical') {
      this.pointerLeft = 0;
      this.pointerTop = this.rgb.a * 100;
      this.gradient = {
        background: `linear-gradient(to bottom, rgba(${this.rgb.r},${
          this.rgb.g
        },${this.rgb.b}, 0) 0%,
          rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b}, 1) 100%)`,
      };
    } else {
      this.gradient = {
        background: `linear-gradient(to right, rgba(${this.rgb.r},${
          this.rgb.g
        },${this.rgb.b}, 0) 0%,
          rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b}, 1) 100%)`,
      };
      this.pointerLeft = this.rgb.a * 100;
    }
  }
  handleChange({ top, left, containerHeight, containerWidth, $event }): void {
    let data: any;
    if (this.direction === 'vertical') {
      let a: number;
      if (top < 0) {
        a = 0;
      } else if (top > containerHeight) {
        a = 1;
      } else {
        a = Math.round(top * 100 / containerHeight) / 100;
      }

      if (this.hsl.a !== a) {
        data = {
          h: this.hsl.h,
          s: this.hsl.s,
          l: this.hsl.l,
          a,
          source: 'rgb',
        };
      }
    } else {
      let a: number;
      if (left < 0) {
        a = 0;
      } else if (left > containerWidth) {
        a = 1;
      } else {
        a = Math.round(left * 100 / containerWidth) / 100;
      }

      if (this.hsl.a !== a) {
        data = {
          h: this.hsl.h,
          s: this.hsl.s,
          l: this.hsl.l,
          a,
          source: 'rgb',
        };
      }
    }

    if (!data) {
      return;
    }

    this.onChange.emit({ data, $event });
  }
}

@NgModule({
  declarations: [AlphaComponent],
  exports: [AlphaComponent],
  imports: [CommonModule, CheckboardModule, CoordinatesModule],
})
export class AlphaModule {}
