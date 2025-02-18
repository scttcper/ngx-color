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
import { HSLA, HSVA, HSVAsource } from './helpers/color.interfaces';

@Component({
  selector: 'color-saturation',
  template: `
    <div
      class="color-saturation"
      ngx-color-coordinates
      (coordinatesChange)="handleChange($event)"
      [style.background]="background"
    >
      <div class="saturation-white">
        <div class="saturation-black"></div>
        <div
          class="saturation-pointer"
          [ngStyle]="pointer"
          [style.top]="pointerTop"
          [style.left]="pointerLeft"
        >
          <div class="saturation-circle" [ngStyle]="circle"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .saturation-white {
        background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .saturation-black {
        background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .color-saturation {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .saturation-pointer {
        position: absolute;
        cursor: default;
      }
      .saturation-circle {
        width: 4px;
        height: 4px;
        box-shadow:
          0 0 0 1.5px #fff,
          inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
          0 0 1px 2px rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        cursor: hand;
        transform: translate(-2px, -4px);
      }
    `,
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SaturationComponent implements OnChanges {
  @Input() hsl!: HSLA;
  @Input() hsv!: HSVA;
  @Input() radius!: number;
  @Input() pointer!: Record<string, string>;
  @Input() circle!: Record<string, string>;
  @Output() onChange = new EventEmitter<{ data: HSVAsource; $event: Event }>();
  background!: string;
  pointerTop!: string;
  pointerLeft!: string;

  ngOnChanges() {
    this.background = `hsl(${this.hsl.h}, 100%, 50%)`;
    this.pointerTop = -(this.hsv.v * 100) + 1 + 100 + '%';
    this.pointerLeft = this.hsv.s * 100 + '%';
  }
  handleChange({ top, left, containerHeight, containerWidth, $event }) {
    if (left < 0) {
      left = 0;
    } else if (left > containerWidth) {
      left = containerWidth;
    } else if (top < 0) {
      top = 0;
    } else if (top > containerHeight) {
      top = containerHeight;
    }

    const saturation = left / containerWidth;
    let bright = -(top / containerHeight) + 1;
    bright = bright > 0 ? bright : 0;
    bright = bright > 1 ? 1 : bright;

    const data: HSVAsource = {
      h: this.hsl.h,
      s: saturation,
      v: bright,
      a: this.hsl.a,
      source: 'hsva',
    };
    this.onChange.emit({ data, $event });
  }
}

@NgModule({
  declarations: [SaturationComponent],
  exports: [SaturationComponent],
  imports: [CommonModule, CoordinatesModule],
})
export class SaturationModule {}
