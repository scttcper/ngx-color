import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, NgModule } from '@angular/core';

import {
  AlphaModule,
  CheckboardModule,
  ColorWrap,
  EditableInputModule,
  HueModule,
  isValidHex,
  SaturationModule,
  SwatchModule,
} from 'ngx-color';
import { SketchFieldsComponent } from './sketch-fields.component';
import { SketchPresetColorsComponent } from './sketch-preset-colors.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'color-sketch',
  template: `
  <div class="sketch-picker {{ className }}" [style.width]="width">
    <div class="sketch-saturation">
      <color-saturation [hsl]="hsl" [hsv]="hsv"
        (onChange)="handleValueChange($event)"
      >
      </color-saturation>
    </div>
    <div class="sketch-controls">
      <div class="sketch-sliders">
        <div class="sketch-hue">
          <color-hue [hsl]="hsl"
            (onChange)="handleValueChange($event)"
          ></color-hue>
        </div>
        <div class="sketch-alpha" *ngIf="disableAlpha === false">
          <color-alpha
            [radius]="2" [rgb]="rgb" [hsl]="hsl"
            (onChange)="handleValueChange($event)"
          ></color-alpha>
        </div>
      </div>
      <div class="sketch-color">
        <color-checkboard></color-checkboard>
        <div class="sketch-active" [style.background]="activeBackground"></div>
      </div>
    </div>
    <div class="sketch-fields-container">
      <color-sketch-fields
        [rgb]="rgb" [hsl]="hsl" [hex]="hex"
        [disableAlpha]="disableAlpha"
        (onChange)="handleValueChange($event)"
      ></color-sketch-fields>
    </div>
    <div class="sketch-swatches-container" *ngIf="presetColors && presetColors.length">
      <color-sketch-preset-colors
        [colors]="presetColors"
        (onClick)="handleBlockChange($event)"
        (onSwatchHover)="onSwatchHover.emit($event)"
      ></color-sketch-preset-colors>
    </div>
  </div>
  `,
  styles: [
    `
    .sketch-picker {
      padding: 10px 10px 3px;
      box-sizing: initial;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
    }
    .sketch-saturation {
      width: 100%;
      padding-bottom: 75%;
      position: relative;
      overflow: hidden;
    }
    .sketch-fields-container {
      display: block;
    }
    .sketch-swatches-container {
      display: block;
    }
    .sketch-controls {
      display: flex;
    }
    .sketch-sliders {
      padding: 4px 0px;
      -webkit-box-flex: 1;
      flex: 1 1 0%;
    }
    .sketch-hue {
      position: relative;
      height: 10px;
      overflow: hidden;
    }
    .sketch-alpha {
      position: relative;
      height: 10px;
      margin-top: 4px;
      overflow: hidden;
    }
    .sketch-color {
      width: 24px;
      height: 24px;
      position: relative;
      margin-top: 4px;
      margin-left: 4px;
      border-radius: 3px;
    }
    .sketch-active {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      border-radius: 2px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.25) 0px 0px 4px inset;
    }
    :host-context([dir=rtl]) .sketch-color {
      margin-right: 4px;
      margin-left: 0;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SketchComponent),
      multi: true,
    }
  ]
})
export class SketchComponent extends ColorWrap {
  /** Remove alpha slider and options from picker */
  @Input() disableAlpha = false;
  /** Hex strings for default colors at bottom of picker */
  @Input() presetColors = [
    '#D0021B',
    '#F5A623',
    '#F8E71C',
    '#8B572A',
    '#7ED321',
    '#417505',
    '#BD10E0',
    '#9013FE',
    '#4A90E2',
    '#50E3C2',
    '#B8E986',
    '#000000',
    '#4A4A4A',
    '#9B9B9B',
    '#FFFFFF',
  ];
  /** Width of picker */
  @Input() width = 200;
  activeBackground!: string;
  constructor() {
    super();
  }
  afterValidChange() {
    const alpha = this.disableAlpha ? 1 : this.rgb.a;
    this.activeBackground = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${alpha})`;
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
  handleBlockChange({ hex, $event }) {
    if (isValidHex(hex)) {
      // this.hex = hex;
      this.handleChange(
        {
          hex,
          source: 'hex',
        },
        $event,
      );
    }
  }
}

@NgModule({
  declarations: [
    SketchComponent,
    SketchFieldsComponent,
    SketchPresetColorsComponent,
  ],
  exports: [
    SketchComponent,
    SketchFieldsComponent,
    SketchPresetColorsComponent,
  ],
  imports: [
    CommonModule,
    AlphaModule,
    CheckboardModule,
    EditableInputModule,
    HueModule,
    SaturationModule,
    SwatchModule,
  ],
})
export class ColorSketchModule {}
