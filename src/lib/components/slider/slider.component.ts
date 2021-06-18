import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, NgModule } from '@angular/core';

import { ColorWrap, HueModule, SwatchModule } from 'ngx-color';
import { SliderSwatchComponent } from './slider-swatch.component';
import { SliderSwatchesComponent } from './slider-swatches.component';

@Component({
  selector: 'color-slider',
  template: `
  <div class="slider-picker {{ className }}">
    <div class="slider-hue">
      <color-hue
        [hsl]="hsl" [radius]="radius" [pointer]="pointer"
        (onChange)="handlePickerChange($event)"
      ></color-hue>
    </div>
    <div class="slider-swatches">
      <color-slider-swatches [hsl]="hsl"
        (onClick)="handlePickerChange($event)"
      ></color-slider-swatches>
    </div>
  </div>
  `,
  styles: [
    `
    .slider-hue {
      height: 12px;
      position: relative;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: ColorWrap,
      useExisting: forwardRef(() => SliderComponent),
    },
  ],
})
export class SliderComponent extends ColorWrap {
  @Input()
  pointer: Record<string, string> = {
    width: '14px',
    height: '14px',
    borderRadius: '6px',
    transform: 'translate(-7px, -2px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  };
  @Input() radius = 2;

  constructor() {
    super();
  }

  handlePickerChange({ data, $event }) {
    this.handleChange(data, $event);
  }
}

@NgModule({
  declarations: [
    SliderComponent,
    SliderSwatchComponent,
    SliderSwatchesComponent,
  ],
  exports: [SliderComponent, SliderSwatchComponent, SliderSwatchesComponent],
  imports: [CommonModule, HueModule, SwatchModule],
})
export class ColorSliderModule {}
