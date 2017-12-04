import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { isValidHex, RGBA } from 'ngx-color/helpers';

@Component({
  selector: 'color-compact-fields',
  template: `
  <div class="compact-fields">
    <div class="compact-active" [style.background]="hex"></div>
    <color-editable-input
      style="flex: 6 1 0%;"
      [style]="{ wrap: HEXWrap, input: HEXinput, label: HEXlabel }"
      label="hex"
      [value]="hex"
      (onChange)="handleChange($event)"
    ></color-editable-input>
    <color-editable-input
      style="flex: 3 1 0%"
      [style]="{ wrap: RGBwrap, input: RGBinput, label: RGBlabel }"
      label="r"
      [value]="rgb.r"
      (onChange)="handleChange($event)"
    ></color-editable-input>
    <color-editable-input
      style="flex: 3 1 0%"
      [style]="{ wrap: RGBwrap, input: RGBinput, label: RGBlabel }"
      label="g"
      [value]="rgb.g"
      (onChange)="handleChange($event)"
    ></color-editable-input>
    <color-editable-input
      style="flex: 3 1 0%"
      [style]="{ wrap: RGBwrap, input: RGBinput, label: RGBlabel }"
      label="b"
      [value]="rgb.b"
      (onChange)="handleChange($event)"
    ></color-editable-input>
  </div>
  `,
  styles: [
    `
  .compact-fields {
    display: flex;
    padding-bottom: 6px;
    padding-right: 5px;
    position: relative;
  }
  .compact-active {
    position: absolute;
    top: 6px;
    left: 5px;
    height: 9px;
    width: 9px;
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CompactFieldsComponent implements OnInit {
  @Input() hex: string;
  @Input() rgb: RGBA;
  @Output() onChange = new EventEmitter<any>();
  HEXWrap = {
    'margin-top': '-3px',
    'margin-bottom': '-3px',
    // flex: '6 1 0%',
    position: 'relative',
  };
  HEXinput = {
    width: '80%',
    padding: '0px',
    'padding-left': '20%',
    border: 'none',
    outline: 'none',
    background: 'none',
    'font-size': '12px',
    color: '#333',
    height: '16px',
  };
  HEXlabel = {
    display: 'none',
  };
  RGBwrap = {
    'margin-top': '-3px',
    'margin-bottom': '-3px',
    // flex: '3 1 0%',
    position: 'relative',
  };
  RGBinput = {
    width: '80%',
    padding: '0px',
    'padding-left': '30%',
    border: 'none',
    outline: 'none',
    background: 'none',
    'font-size': '12px',
    color: '#333',
    height: '16px',
  };
  RGBlabel = {
    position: 'absolute',
    top: '6px',
    left: '0px',
    'line-height': '16px',
    'text-transform': 'uppercase',
    'font-size': '12px',
    color: '#999',
  };

  constructor() {}

  ngOnInit() {}

  handleChange({ data, $event }) {
    if (data.hex) {
      if (isValidHex(data.hex)) {
        this.onChange.emit({
          data: {
            hex: data.hex,
            source: 'hex',
          },
          $event,
        });
      }
    } else {
      this.onChange.emit({
        data: {
          r: data.r || this.rgb.r,
          g: data.g || this.rgb.g,
          b: data.b || this.rgb.b,
          source: 'rgb',
        },
        $event,
      });
    }
  }
}
