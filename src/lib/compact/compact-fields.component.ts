import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { isValidHex, RGBA } from 'ngx-color';

@Component({
  selector: 'color-compact-fields',
  template: `
    <div class="compact-fields">
      <div class="compact-active" [style.background]="hex"></div>
      <div style="flex: 6 1 0%;">
        <color-editable-input
          [style]="{ wrap: HEXWrap, input: HEXinput, label: HEXlabel }"
          label="hex"
          [value]="hex"
          (onChange)="handleChange($event)"
        ></color-editable-input>
      </div>
      <div style="flex: 3 1 0%">
        <color-editable-input
          [style]="{ wrap: RGBwrap, input: RGBinput, label: RGBlabel }"
          label="r"
          [value]="rgb.r"
          (onChange)="handleChange($event)"
        ></color-editable-input>
      </div>
      <div style="flex: 3 1 0%">
        <color-editable-input
          [style]="{ wrap: RGBwrap, input: RGBinput, label: RGBlabel }"
          label="g"
          [value]="rgb.g"
          (onChange)="handleChange($event)"
        ></color-editable-input>
      </div>
      <div style="flex: 3 1 0%">
        <color-editable-input
          [style]="{ wrap: RGBwrap, input: RGBinput, label: RGBlabel }"
          label="b"
          [value]="rgb.b"
          (onChange)="handleChange($event)"
        ></color-editable-input>
      </div>
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
  standalone: false,
})
export class CompactFieldsComponent {
  @Input() hex!: string;
  @Input() rgb!: RGBA;
  @Output() onChange = new EventEmitter<any>();
  HEXWrap: { [key: string]: string } = {
    marginTop: '-3px',
    marginBottom: '-3px',
    // flex: '6 1 0%',
    position: 'relative',
  };
  HEXinput: { [key: string]: string } = {
    width: '80%',
    padding: '0px',
    paddingLeft: '20%',
    border: 'none',
    outline: 'none',
    background: 'none',
    fontSize: '12px',
    color: '#333',
    height: '16px',
  };
  HEXlabel: { [key: string]: string } = {
    display: 'none',
  };
  RGBwrap: { [key: string]: string } = {
    marginTop: '-3px',
    marginBottom: '-3px',
    // flex: '3 1 0%',
    position: 'relative',
  };
  RGBinput: { [key: string]: string } = {
    width: '80%',
    padding: '0px',
    paddingLeft: '30%',
    border: 'none',
    outline: 'none',
    background: 'none',
    fontSize: '12px',
    color: '#333',
    height: '16px',
  };
  RGBlabel: { [key: string]: string } = {
    position: 'absolute',
    top: '6px',
    left: '0px',
    'line-height': '16px',
    'text-transform': 'uppercase',
    fontSize: '12px',
    color: '#999',
  };

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
