import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';

import { AlphaModule, ColorWrap } from 'ngx-color';
import { toState } from 'ngx-color';
import { ShadeModule } from 'src/lib/common/shade.component';

@Component({
  selector: 'color-shade-slider',
  template: `
    <div class="shade-slider {{ className }}"
      [style.width.px]="width" [style.height.px]="height">
      <color-shade
        [hsl]="hsl"
        [rgb]="rgb"
        [pointer]="pointer"
        [direction]="direction"
        (onChange)="handlePickerChange($event)"
      ></color-shade>
    </div>
  `,
  styles: [
    `
    .shade-slider {
      position: relative;
    }
    .color-alpha {
      radius: 2px;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ShadeSliderComponent extends ColorWrap implements OnChanges {
  /** Pixel value for picker width */
  @Input() width: string | number = 316;
  /** Pixel value for picker height */
  @Input() height: string | number = 16;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  pointer: {[key: string]: string} = {
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
  declarations: [ShadeSliderComponent],
  exports: [ShadeSliderComponent],
  imports: [CommonModule, ShadeModule],
})
export class ColorShadeSliderModule {}