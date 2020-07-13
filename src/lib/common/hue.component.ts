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

import { CoordinatesModule } from './coordinates.directive';
import { HSLA, HSLAsource } from './helpers/color.interfaces';

@Component({
  selector: 'color-hue',
  template: `
  <div class="color-hue color-hue-{{direction}}" [style.border-radius.px]="radius" [style.box-shadow]="shadow">
    <div ngx-color-coordinates (coordinatesChange)="handleChange($event)" class="color-hue-container">
      <div class="color-hue-pointer" [style.left]="left" [style.top]="top" *ngIf="!hidePointer">
        <div class="color-hue-slider" [ngStyle]="pointer"></div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .color-hue {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .color-hue-container {
      margin: 0 2px;
      position: relative;
      height: 100%;
    }
    .color-hue-pointer {
      position: absolute;
    }
    .color-hue-slider {
      margin-top: 1px;
      width: 4px;
      border-radius: 1px;
      height: 8px;
      box-shadow: 0 0 2px rgba(0, 0, 0, .6);
      background: #fff;
      transform: translateX(-2px);
    }
    .color-hue-horizontal {
      background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
        33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }
    .color-hue-vertical {
      background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
        #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }
  `,
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HueComponent implements OnChanges {
  @Input() hsl!: HSLA;
  @Input() pointer!: { [key: string]: string };
  @Input() radius!: number;
  @Input() shadow!: string;
  @Input() hidePointer = false;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Output() onChange = new EventEmitter<{ data: HSLAsource; $event: Event }>();
  left = '0px';
  top = '';

  ngOnChanges(): void {
    if (this.direction === 'horizontal') {
      this.left = `${this.hsl.h * 100 / 360}%`;
    } else {
      this.top = `${-(this.hsl.h * 100 / 360) + 100}%`;
    }
  }
  handleChange({ top, left, containerHeight, containerWidth, $event }): void {
    let data: HSLAsource | undefined;
    if (this.direction === 'vertical') {
      let h: number;
      if (top < 0) {
        h = 359;
      } else if (top > containerHeight) {
        h = 0;
      } else {
        const percent = -(top * 100 / containerHeight) + 100;
        h = 360 * percent / 100;
      }

      if (this.hsl.h !== h) {
        data = {
          h,
          s: this.hsl.s,
          l: this.hsl.l,
          a: this.hsl.a,
          source: 'rgb',
        };
      }
    } else {
      let h: number;
      if (left < 0) {
        h = 0;
      } else if (left > containerWidth) {
        h = 359;
      } else {
        const percent = left * 100 / containerWidth;
        h = 360 * percent / 100;
      }

      if (this.hsl.h !== h) {
        data = {
          h,
          s: this.hsl.s,
          l: this.hsl.l,
          a: this.hsl.a,
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
  declarations: [HueComponent],
  exports: [HueComponent],
  imports: [CommonModule, CoordinatesModule],
})
export class HueModule {}
