import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

import {
  AlphaModule,
  CheckboardModule,
  ColorWrap,
  EditableInputModule,
  HueModule,
  SaturationModule,
} from 'ngx-color';
import { ChromeFieldsComponent } from './chrome-fields.component';

@Component({
  selector: 'color-chrome',
  template: `
  <div class="chrome-picker {{ className }}">
    <div class="saturation">
      <color-saturation
        [hsl]="hsl"
        [hsv]="hsv"
        [circle]="circle"
        (onChange)="handleValueChange($event)"
      ></color-saturation>
    </div>
    <div class="chrome-body">
      <div class="chrome-controls">
        <div class="chrome-color">
          <div class="chrome-swatch">
            <div class="chrome-active"
              [style.background]="activeBackground"
            ></div>
            <color-checkboard></color-checkboard>
          </div>
        </div>
        <div class="chrome-toggles">
          <div class="chrome-hue">
            <color-hue
              [radius]="2"
              [hsl]="hsl"
              [pointer]="pointer"
              (onChange)="handleValueChange($event)"
            ></color-hue>
          </div>
          <div class="chrome-alpha" *ngIf="!disableAlpha">
            <color-alpha
              [radius]="2" [rgb]="rgb" [hsl]="hsl"
              [pointer]="pointer" (onChange)="handleValueChange($event)"
            ></color-alpha>
          </div>
        </div>
      </div>
      <color-chrome-fields
        [rgb]="rgb" [hsl]="hsl" [hex]="hex"
        [disableAlpha]="disableAlpha"
        (onChange)="handleValueChange($event)"
      ></color-chrome-fields>
    </div>
  </div>
  `,
  styles: [
    `
    .chrome-picker {
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);
      box-sizing: initial;
      width: 225px;
      font-family: 'Menlo';
    }
    .chrome-controls {
      display: flex;
    }
    .chrome-color {
      width: 42px;
    }
    .chrome-body {
      padding: 14px 14px 12px;
    }
    .chrome-active {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 8px;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
      z-index: 2;
    }
    .chrome-swatch {
      width: 28px;
      height: 28px;
      border-radius: 15px;
      position: relative;
      overflow: hidden;
    }
    .saturation {
      width: 100%;
      padding-bottom: 55%;
      position: relative;
      border-radius: 2px 2px 0 0;
      overflow: hidden;
    }
    .chrome-toggles {
      flex: 1;
    }
    .chrome-hue {
      height: 10px;
      position: relative;
      margin-bottom: 8px;
    }
    .chrome-alpha {
      height: 10px;
      position: relative;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ChromeComponent extends ColorWrap {
  /** Remove alpha slider and options from picker */
  @Input() disableAlpha = false;
  circle: {[key: string]: string} = {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 1px inset',
    transform: 'translate(-6px, -6px)',
  };
  pointer: {[key: string]: string} = {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    transform: 'translate(-6px, -2px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  };
  activeBackground: string;
  constructor() {
    super();
  }
  afterValidChange() {
    this.activeBackground = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.rgb.a})`;
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
}

@NgModule({
  declarations: [ChromeComponent, ChromeFieldsComponent],
  exports: [ChromeComponent, ChromeFieldsComponent],
  imports: [
    CommonModule,
    AlphaModule,
    CheckboardModule,
    EditableInputModule,
    HueModule,
    SaturationModule,
  ],
})
export class ColorChromeModule {}
