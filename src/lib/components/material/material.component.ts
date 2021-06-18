import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, NgModule } from '@angular/core';

import { ColorWrap, EditableInputModule, isValidHex, RaisedModule, zDepth } from 'ngx-color';

@Component({
  selector: 'color-material',
  template: `
  <color-raised [zDepth]="zDepth" [background]="background" [radius]="radius">
    <div class="material-picker {{ className }}">
      <color-editable-input label="hex" [value]="hex"
        (onChange)="handleValueChange($event)"
        [style]="{input: HEXinput, label: HEXlabel}"
      ></color-editable-input>
      <div class="material-split">
        <div class="material-third">
          <color-editable-input label="r" [value]="rgb.r"
            [style]="{ input: RGBinput, label: RGBlabel }"
            (onChange)="handleInputChange($event)"
          ></color-editable-input>
        </div>
        <div class="material-third">
          <color-editable-input label="g" [value]="rgb.g"
            [style]="{ input: RGBinput, label: RGBlabel }"
            (onChange)="handleInputChange($event)"
          ></color-editable-input>
        </div>
        <div class="material-third">
          <color-editable-input label="b" [value]="rgb.b"
            [style]="{ input: RGBinput, label: RGBlabel }"
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
  providers: [
    {
      provide: ColorWrap,
      useExisting: forwardRef(() => MaterialComponent),
    },
  ],
})
export class MaterialComponent extends ColorWrap {
  HEXinput: {[key: string]: string} = {
    width: '100%',
    marginTop: '12px',
    fontSize: '15px',
    color: 'rgb(51, 51, 51)',
    padding: '0px',
    'border-width': '0px 0px 2px',
    outline: 'none',
    height: '30px',
  };
  HEXlabel: {[key: string]: string} = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    fontSize: '11px',
    color: 'rgb(153, 153, 153)',
    'text-transform': 'capitalize',
  };
  RGBinput: {[key: string]: string} = {
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
  RGBlabel: {[key: string]: string} = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    fontSize: '11px',
    color: '#999999',
    'text-transform': 'capitalize',
  };
  @Input() zDepth: zDepth = 1;
  @Input() radius = 1;
  @Input() background = '#fff';
  disableAlpha = true;

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

  afterValidChange() {
    this.HEXinput['border-bottom-color'] = this.hex;
  }
}

@NgModule({
  exports: [MaterialComponent],
  declarations: [MaterialComponent],
  imports: [CommonModule, EditableInputModule, RaisedModule],
})
export class ColorMaterialModule { }
