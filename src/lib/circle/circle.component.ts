import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, NgModule } from '@angular/core';
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from 'material-colors';
import { TinyColor } from '@ctrl/tinycolor';

import { ColorWrap, isValidHex, SwatchModule } from 'ngx-color';
import { CircleSwatchComponent } from './circle-swatch.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'color-circle',
  template: `
    <div
      class="circle-picker {{ className }}"
      [style.width.px]="width"
      [style.margin-right.px]="-circleSpacing"
      [style.margin-bottom.px]="-circleSpacing"
    >
      <color-circle-swatch
        *ngFor="let color of colors"
        [circleSize]="circleSize"
        [circleSpacing]="circleSpacing"
        [color]="color"
        [focus]="isActive(color)"
        [tickStyling]="tickStyling"
        (onClick)="handleBlockChange($event)"
        (onSwatchHover)="onSwatchHover.emit($event)"
      ></color-circle-swatch>
    </div>
  `,
  styles: [
    `
      .circle-picker {
        display: flex;
        flex-wrap: wrap;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CircleComponent),
      multi: true,
    },
    {
      provide: ColorWrap,
      useExisting: forwardRef(() => CircleComponent),
    },
  ]
})
export class CircleComponent extends ColorWrap {
  /** Pixel value for picker width */
  @Input() width: string | number = 252;
  /** Whether or not to add an 'empty color' option */
  @Input() emptyColor: boolean = false;
  /** Whether or not to add an add color button option */
  @Input() addColorButton: boolean = false;
  /** Whether or not to use a 'tick' when a color is selected */
  @Input() tickStyling: boolean = false;
  /** Color squares to display */
  @Input()
  colors: string[] = [
    red['500'],
    pink['500'],
    purple['500'],
    deepPurple['500'],
    indigo['500'],
    blue['500'],
    lightBlue['500'],
    cyan['500'],
    teal['500'],
    green['500'],
    lightGreen['500'],
    lime['500'],
    yellow['500'],
    amber['500'],
    orange['500'],
    deepOrange['500'],
    brown['500'],
    blueGrey['500'],
  ];
  /** Value for circle size */
  @Input() circleSize = 28;
  /** Value for spacing between circles */
  @Input() circleSpacing = 14;

  constructor() {
    super();
  }
  isActive(color: string) {
    return new TinyColor(this.hex).equals(color);
  }
  handleBlockChange({ hex, $event }: { hex: string, $event: Event }) {
    if (isValidHex(hex)) {
      this.handleChange({ hex, source: 'hex' }, $event);
    }
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
}

@NgModule({
  declarations: [CircleComponent, CircleSwatchComponent],
  exports: [CircleComponent, CircleSwatchComponent],
  imports: [CommonModule, SwatchModule],
})
export class ColorCircleModule {}
