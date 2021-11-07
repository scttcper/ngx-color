import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, NgModule, OnChanges } from '@angular/core';

import { ColorWrap, HueModule, toState } from 'ngx-color';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'color-hue-picker',
  template: `
  <div class="hue-picker {{ className }}"
    [style.width.px]="width" [style.height.px]="height"
  >
    <color-hue [hsl]="hsl" [pointer]="pointer"
      [direction]="direction" [radius]="radius"
      (onChange)="handlePickerChange($event)"
    ></color-hue>
  </div>
  `,
  styles: [
    `
    .hue-picker {
      position: relative;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HuePickerComponent),
      multi: true,
    },
    {
      provide: ColorWrap,
      useExisting: forwardRef(() => HuePickerComponent),
    },
  ]
})
export class HuePickerComponent extends ColorWrap implements OnChanges {
  /** Pixel value for picker width */
  @Input() width: string | number = 316;
  /** Pixel value for picker height */
  @Input() height: string | number = 16;
  @Input() radius = 2;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  pointer: {[key: string]: string} = {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    transform: 'translate(-9px, -2px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  };

  constructor() {
    super();
  }

  ngOnChanges() {
    if (this.direction === 'vertical') {
      this.pointer.transform = 'translate(-3px, -9px)';
    }
    this.setState(toState(this.color, this.oldHue));
  }
  handlePickerChange({ data, $event }) {
    this.handleChange({ a: 1, h: data.h, l: 0.5, s: 1 }, $event);
  }
}

@NgModule({
  declarations: [HuePickerComponent],
  exports: [HuePickerComponent],
  imports: [CommonModule, HueModule],
})
export class ColorHueModule {}
