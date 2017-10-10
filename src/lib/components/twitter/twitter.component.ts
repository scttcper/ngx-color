import { Component, Input } from '@angular/core';

import { ColorWrap } from '../../common';
import { isValidHex } from 'ngx-color/helpers';

@Component({
  selector: 'color-twitter',
  template: `
  <div class="twitter-picker {{ triangle }}-triangle" [style.width.px]="width">
    <div class="triangleShadow"></div>
    <div class="triangle"></div>
    <div class="twitter-body">
      <div class="twitter-swatch" *ngFor="let color of colors">
        <color-swatch
          [color]="color"
          [style]="swatchStyle"
          [focusStyle]="focus(color)"
          (onClick)="handleBlockChange($event)"
        ></color-swatch>
      </div>
      <div class="twitter-hash">
        <div>#</div>
      </div>
      <div class="twitter-input">
        <color-editable-input
          [style]="{ input: input }"
          [value]="hex.replace('#', '')"
          (onChange)="handleValueChange($event)"
        ></color-editable-input>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .twitter-picker {
      background: rgb(255, 255, 255);
      border: 0px solid rgba(0, 0, 0, 0.25);
      box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px;
      border-radius: 4px;
      position: relative;
      box-sizing: border-box;
    }
    .triangleShadow {
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0px 9px 10px;
      border-color: transparent transparent rgba(0, 0, 0, 0.1);
      position: absolute;
    }
    .triangle {
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0px 9px 10px;
      border-color: transparent transparent rgb(255, 255, 255);
      position: absolute;
    }
    .hide-triangle > .triangle {
      display: none;
    }
    .hide-triangle > .triangleShadow {
      display: none;
    }
    .top-left-triangle > .triangle {
      top: -10px;
      left: 12px;
    }
    .top-left-triangle > .triangleShadow {
      top: -11px;
      left: 12px;
    }
    .top-right-triangle > .triangle {
      top: -10px;
      right: 12px;
    }
    .top-right-triangle > .triangleShadow {
      top: -11px;
      right: 12px;
    }
    .twitter-body {
      padding: 15px 9px 9px 15px;
    }
    .twitter-swatch {
      width: 30px;
      height: 30px;
      display: inline-block;
      margin: 0 6px 0 0;
    }
    .twitter-hash {
      background: rgb(240, 240, 240);
      height: 30px;
      width: 30px;
      border-radius: 4px 0px 0px 4px;
      color: rgb(152, 161, 164);
      margin-left: -3px;
      display: inline-block;

    }
    .twitter-hash > div {
      position: absolute;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
      display: flex;
    }
    .twitter-input {
      position: relative;
      display: inline-block;
      margin-top: -6px;
      font-size: 10px;
      height: 27px;
      padding: 0;
      position: relative;
      top: 6px;
      vertical-align: top;
      width: 108px;
      margin-left: -4px;
    }
  `],
})
export class TwitterComponent extends ColorWrap {
  @Input() width = 276;
  @Input() triangle: 'hide' | 'top-left' | 'top-right' | 'bottom-right' = 'top-left';
  @Input() colors = [
    '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
    '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
  ];
  swatchStyle = {
    width: '30px',
    height: '30px',
    'border-radius': '4px',
    'font-size': 0,
  };
  input = {
    'border-radius': '4px',
    'border-bottom-left-radius': '0',
    'border-top-left-radius': '0',
    'border': '1px solid #e6ecf0',
    '-moz-box-sizing': 'border-box',
    'box-sizing': 'border-box',
    'display': 'inline',
    'font-size': '14px',
    'height': '30px',
    'padding': '0',
    'padding-left': '6px',
    'width': '100%',
    'color': '#657786',

  };

  constructor() {
    super();
  }

  focus(color: string) {
    return { boxShadow: `0 0 4px ${ color }` };
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

  handleValueChange({data, $event}) {
    this.handleBlockChange({ hex: data, $event });
  }


}
