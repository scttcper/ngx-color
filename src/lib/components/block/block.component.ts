import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ColorWrap } from '../common/color-wrap.component';
import color from '../../helpers/color';

@Component({
  selector: 'color-block',
  template: `
  <div class="blockCard block-picker">
    <div class="triangle"
      [style.border-color]="'transparent transparent ' + this.hex + ' transparent'"
      *ngIf="triangle !== 'hide'"
    >
    </div>

    <div class="blockHead" [style.background]="hex">
      <color-checkboard
       *ngIf="hex === 'transparent'"
        borderRadius="6px 6px 0 0"
      ></color-checkboard>
      <div
        class="blockLabel"
        [style.color]="hex === 'transparent' ? 'rgba(0, 0, 0, 0.4)' : '#fff'"
      >
        {{ hex }}
      </div>
    </div>

    <div class="blockBody">
      <color-block-swatches
        [colors]="colors"
        (onClick)="handleBlockChange($event)"
        (onSwatchHover)="onSwatchHover.emit($event)"
      ></color-block-swatches>
      <color-editable-input
        [value]="hex"
        (valueChange)="handleValueChange($event)"
        [style]="inputStyles"
      ></color-editable-input>
    </div>
  </div>
  `,
  styleUrls: ['./block.component.css'],
})
export class BlockComponent extends ColorWrap {
  @Input() colors = [
    '#D9E3F0',
    '#F47373',
    '#697689',
    '#37D67A',
    '#2CCCE4',
    '#555555',
    '#dce775',
    '#ff8a65',
    '#ba68c8',
  ];
  @Input() width: string | number = 170;
  @Input() triangle: 'top' | 'hide' = 'top';
  triangleBorderColor: string;
  inputStyles = {
    width: '100%',
    'font-size': '12px',
    color: '#666',
    border: '0px',
    outline: 'none',
    height: '22px',
    'box-shadow': 'inset 0 0 0 1px #ddd',
    'border-radius': '4px',
    padding: '0 7px',
    'box-sizing': 'border-box',
  };

  constructor() {
    super();
  }

  handleValueChange(hex) {
    this.handleBlockChange({ hex, $event: null });
  }

  handleBlockChange({ hex, $event }) {
    if (color.isValidHex(hex)) {
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
