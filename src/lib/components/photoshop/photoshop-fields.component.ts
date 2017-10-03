import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

import { isValidHex } from '../../helpers/color';


@Component({
  selector: 'color-photoshop-fields',
  template: `
  <div class="photoshop-fields">
    <color-editable-input
      [value]="round(hsv.h)"
      label="h"
      (onChange)="handleValueChange($event)"
      [style]="{input: RGBinput, wrap: RGBwrap, label: RGBlabel}"
    ></color-editable-input>
    <color-editable-input
      [value]="round(hsv.s * 100)"
      label="s"
      (onChange)="handleValueChange($event)"
      [style]="{input: RGBinput, wrap: RGBwrap, label: RGBlabel}"
    ></color-editable-input>
    <color-editable-input
      [value]="round(hsv.v * 100)"
      label="v"
      (onChange)="handleValueChange($event)"
      [style]="{input: RGBinput, wrap: RGBwrap, label: RGBlabel}"
    ></color-editable-input>
    <div class="photoshop-divider"></div>
    <color-editable-input
      [value]="rgb.r"
      label="r"
      (onChange)="handleValueChange($event)"
      [style]="{input: RGBinput, wrap: RGBwrap, label: RGBlabel}"
    ></color-editable-input>
    <color-editable-input
      [value]="rgb.g"
      label="g"
      (onChange)="handleValueChange($event)"
      [style]="{input: RGBinput, wrap: RGBwrap, label: RGBlabel}"
    ></color-editable-input>
    <color-editable-input
      [value]="rgb.b"
      label="b"
      (onChange)="handleValueChange($event)"
      [style]="{input: RGBinput, wrap: RGBwrap, label: RGBlabel}"
    ></color-editable-input>
    <div class="photoshop-divider"></div>
    <color-editable-input
      [value]="hex.replace('#', '')"
      label="#"
      (onChange)="handleValueChange($event)"
      [style]="{input: HEXinput, wrap: HEXwrap, label: HEXlabel}"
    ></color-editable-input>
    <div class="photoshop-field-symbols">
      <div class="photoshop-symbol">°</div>
      <div class="photoshop-symbol">%</div>
      <div class="photoshop-symbol">%</div>
    </div>
  </div>
  `,
  styles: [`
    .photoshop-fields {
      padding-top: 5px;
      padding-bottom: 9px;
      width: 85px;
      position: relative;
    }
    .photoshop-field-symbols {
      position: absolute;
      top: 5px;
      right: -7px;
      font-size: 13px;
    }
    .photoshop-symbol {
      height: 24px;
      line-height: 24px;
      padding-bottom: 7px;
    }
    .photoshop-divider {
      height: 5px;
    }
  `],
})
export class PhotoshopFieldsComponent implements OnInit, OnChanges {
  @Input() rgb: any;
  @Input() hsv: any;
  @Input() hex: any;
  @Output() onChange = new EventEmitter<any>();
  RGBinput = {
    'margin-left': '35%',
    width: '40%',
    height: '22px',
    border: '1px solid rgb(136, 136, 136)',
    'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 1px 1px inset, rgb(236, 236, 236) 0px 1px 0px 0px',
    'margin-bottom': '2px',
    'font-size': '13px',
    'padding-left': '3px',
    'margin-right': '10px',
  };
  RGBwrap = {
    position: 'relative',
  };
  RGBlabel = {
    left: '0px',
    width: '34px',
    'text-transform': 'uppercase',
    'font-size': '13px',
    height: '24px',
    'line-height': '24px',
    position: 'absolute',
  };
  HEXinput = {
    'margin-left': '20%',
    width: '80%',
    height: '22px',
    border: '1px solid #888888',
    'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC',
    'margin-bottom': '3px',
    'font-size': '13px',
    'padding-left': '3px',
  };
  HEXwrap = {
    position: 'relative',
  };
  HEXlabel = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '14px',
    'text-transform': 'uppercase',
    'font-size': '13px',
    height: '24px',
    'line-height': '24px',
  };


  constructor() { }

  ngOnInit() {
  }
  round(v) {
    return Math.round(v);
  }
  ngOnChanges() {

  }
  handleValueChange({ data, $event }) {
    if (data['#']) {
      if (isValidHex(data['#'])) {
        this.onChange.emit({ data: {
          hex: data['#'],
          source: 'hex',
        }, $event });
      }
    } else if (data.r || data.g || data.b) {
      this.onChange.emit({ data: {
        r: data.r || this.rgb.r,
        g: data.g || this.rgb.g,
        b: data.b || this.rgb.b,
        source: 'rgb',
      }, $event });
    } else if (data.h || data.s || data.v) {
      this.onChange.emit({ data: {
        h: data.h || this.hsv.h,
        s: data.s || this.hsv.s,
        v: data.v || this.hsv.v,
        source: 'hsv',
      }, $event });
    }
  }

}
