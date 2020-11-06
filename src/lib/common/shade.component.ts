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
import { HSLA, RGBA } from './helpers/color.interfaces';
import { TinyColor } from '@ctrl/tinycolor';


@Component({
  selector: 'color-shade',
  template: `
    <div class="shade" [style.border-radius]="radius">
      <div
        class="shade-gradient"
        [ngStyle]="gradient"
        [style.box-shadow]="shadow"
        [style.border-radius]="radius"
      ></div>
      <div
        ngx-color-coordinates
        (coordinatesChange)="handleChange($event)"
        class="shade-container"
      >
        <div
          class="shade-pointer"
          [style.left.%]="pointerLeft"
          [style.top.%]="pointerTop"
        >
          <div class="shade-slider" [ngStyle]="pointer"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .shade {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .shade-gradient {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .shade-container {
      position: relative;
      height: 100%;
      margin: 0 3px;
    }
    .shade-pointer {
      position: absolute;
    }
    .shade-slider {
      width: 4px;
      border-radius: 1px;
      height: 8px;
      box-shadow: 0 0 2px rgba(0, 0, 0, .6);
      background: #fff;
      margin-top: 1px;
      transform: translateX(-2px);
    },
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ShadeComponent implements OnChanges {
  @Input() hsl!: HSLA;
  @Input() rgb!: RGBA;
  @Input() pointer!: Record<string, string>;
  @Input() shadow!: string;
  @Input() radius!: string;
  @Output() onChange = new EventEmitter<any>();
  gradient!: Record<string, string>;
  pointerLeft!: number;
  pointerTop?: number;

  ngOnChanges() {
    this.gradient = {
      background: `linear-gradient(to right,
          hsl(${this.hsl.h}, 90%, 55%),
          #000)`,
    };
    const hsv = new TinyColor(this.hsl).toHsv();
    this.pointerLeft = 100 - (hsv.v * 100);
  }

  handleChange({ left, containerWidth, $event }): void {
    let data;
    let v: number;
    if (left < 0) {
      v = 0;
    } else if (left > containerWidth) {
      v = 1;
    } else {
      v = Math.round((left * 100) / containerWidth) / 100;
    }

    const hsv = new TinyColor(this.hsl).toHsv();
    if (hsv.v !== v) {
      data = {
        h: this.hsl.h,
        s: 100,
        v: 1 - v,
        l: this.hsl.l,
        a: this.hsl.a,
        source: 'rgb',
      };
    }

    if (!data) {
      return;
    }

    this.onChange.emit({ data, $event });
  }
}

@NgModule({
  declarations: [ShadeComponent],
  exports: [ShadeComponent],
  imports: [CommonModule, CoordinatesModule],
})
export class ShadeModule {}
