import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnChanges } from '@angular/core';

import { ColorWrap, EditableInputModule, RaisedModule } from 'ngx-color';
import { isValidHex, toState } from 'ngx-color/helpers';

@Component({
  selector: 'color-material',
  template: `
    <color-raised>
      <div class="material-picker {{ className }}">
        <color-editable-input
          [value]="hex"
          label="hex"
          (onChange)="handleValueChange($event)"
          [style]="{input: HEXinput, label: HEXlabel}"
        ></color-editable-input>
        <div class="material-split">
          <div class="material-third">
            <color-editable-input
              [style]="{ input: RGBinput, label: RGBlabel }"
              label="r"
              [value]="rgb.r"
              (onChange)="handleInputChange($event)"
            ></color-editable-input>
          </div>
          <div class="material-third">
            <color-editable-input
              [style]="{ input: RGBinput, label: RGBlabel }"
              label="g"
              [value]="rgb.g"
              (onChange)="handleInputChange($event)"
            ></color-editable-input>
          </div>
          <div class="material-third">
            <color-editable-input
              [style]="{ input: RGBinput, label: RGBlabel }"
              label="b"
              [value]="rgb.b"
              (onChange)="handleInputChange($event)"
            ></color-editable-input>
          </div>
        </div>
      </div>
    </color-raised>
  `,
  styles: [
    `
  .material-picker {
    width: 130px;
    height: 130px;
    padding: 16px;
    font-family: Roboto;
  }
  .material-split {
    display: flex;
    margin-right: -10px;
    padding-top: 11px;
  }
  .material-third {
    flex: 1 1 0%;
    padding-right: 10px;
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MaterialComponent extends ColorWrap implements OnChanges {
  HEXinput = {
    width: '100%',
    'margin-top': '12px',
    'font-size': '15px',
    color: 'rgb(51, 51, 51)',
    padding: '0px',
    'border-width': '0px 0px 2px',
    outline: 'none',
    height: '30px',
  };
  HEXlabel = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    'font-size': '11px',
    color: 'rgb(153, 153, 153)',
    'text-transform': 'capitalize',
  };
  RGBinput = {
    width: '100%',
    marginTop: '12px',
    fontSize: '15px',
    color: '#333',
    padding: '0px',
    border: '0px',
    'border-bottom': '1px solid #eee',
    outline: 'none',
    height: '30px',
  };
  RGBlabel = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    'font-size': '11px',
    color: '#999999',
    'text-transform': 'capitalize',
  };
  constructor() {
    super();
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
  handleInputChange({ data, $event }) {
    if (data.hex) {
      if (isValidHex(data.hex)) {
        this.handleValueChange({
          data: {
            hex: data.hex,
            source: 'hex',
          },
          $event,
        });
      }
    } else if (data.r || data.g || data.b) {
      this.handleValueChange({
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
  ngOnChanges() {
    this.setState(toState(this.color, this.oldHue));
    this.HEXinput['border-bottom-color'] = this.hex;
  }
}

@NgModule({
  exports: [MaterialComponent],
  declarations: [MaterialComponent],
  imports: [CommonModule, EditableInputModule, RaisedModule],
})
export class ColorMaterialModule { }
