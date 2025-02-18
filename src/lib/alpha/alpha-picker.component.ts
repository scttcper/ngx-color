import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';

import { AlphaModule, CheckboardModule, ColorWrap, toState } from 'ngx-color';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'color-alpha-picker',
  template: `
    <div class="alpha-picker {{ className }}" [style.width.px]="width" [style.height.px]="height">
      <color-alpha
        [hsl]="hsl"
        [rgb]="rgb"
        [pointer]="pointer"
        [direction]="direction"
        (onChange)="handlePickerChange($event)"
      ></color-alpha>
    </div>
  `,
  styles: [
    `
      .alpha-picker {
        position: relative;
      }
      .color-alpha {
        radius: 2px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AlphaPickerComponent),
      multi: true,
    },
    {
      provide: ColorWrap,
      useExisting: forwardRef(() => AlphaPickerComponent),
    },
  ],
  standalone: false,
})
export class AlphaPickerComponent extends ColorWrap implements OnChanges {
  /** Pixel value for picker width */
  @Input() width: string | number = 316;
  /** Pixel value for picker height */
  @Input() height: string | number = 16;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  pointer: { [key: string]: string } = {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    transform: 'translate(-9px, -2px)',
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
    this.handleChange(data, $event);
  }
}

@NgModule({
  declarations: [AlphaPickerComponent],
  exports: [AlphaPickerComponent],
  imports: [CommonModule, AlphaModule, CheckboardModule],
})
export class ColorAlphaModule {}
