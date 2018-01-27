import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { isValidHex, HSLA, RGBA } from 'ngx-color';

@Component({
  selector: 'color-chrome-fields',
  template: `
    <div class="chrome-wrap">
      <div class="chrome-fields">
        <ng-template [ngIf]="view === 'hex'">
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="hex" [value]="hex"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
        </ng-template>
        <ng-template [ngIf]="view === 'rgb'">
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="r" [value]="rgb.r"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="g" [value]="rgb.g"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="b" [value]="rgb.b"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
          <div class="chrome-field">
            <color-editable-input *ngIf="!disableAlpha"
              [style]="{ input: input, label: label }"
              label="a" [value]="rgb.a"
              [arrowOffset]="0.01"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
        </ng-template>
        <ng-template [ngIf]="view === 'hsl'">
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="h"
              [value]="round(hsl.h)"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="s" [value]="round(hsl.s * 100) + '%'"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
          <div class="chrome-field">
            <color-editable-input
              [style]="{ input: input, label: label }"
              label="l" [value]="round(hsl.l * 100) + '%'"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
          <div class="chrome-field">
            <color-editable-input *ngIf="!disableAlpha"
              [style]="{ input: input, label: label }"
              label="a" [value]="hsl.a"
              [arrowOffset]="0.01"
              (onChange)="handleChange($event)"
            ></color-editable-input>
          </div>
        </ng-template>
      </div>

      <div class="chrome-toggle">
        <div class="chrome-icon" (click)="toggleViews()" #icon>
          <svg class="chrome-toggle-svg" viewBox="0 0 24 24">
            <path #iconUp fill="#333"
              d="M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
            />
            <path #iconDown fill="#333"
              d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15Z"
            />
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
  .chrome-wrap {
    padding-top: 16px;
    display: flex;
  }
  .chrome-fields {
    flex: 1;
    display: flex;
    margin-left: -6px;
  }
  .chrome-field {
    padding-left: 6px;
    width: 100%;
  }
  .chrome-toggle {
    width: 32px;
    text-align: right;
    position: relative;
  }
  .chrome-icon {
    margin-right: -4px;
    margin-top: 12px;
    cursor: pointer;
    position: relative;
  }
  .chrome-toggle-svg {
    width: 24px;
    height: 24px;
    border: 1px transparent solid;
    border-radius: 5px;
  }
  .chrome-toggle-svg:hover {
    background: #eee;
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ChromeFieldsComponent implements OnInit {
  @Input() disableAlpha;
  @Input() hsl: HSLA;
  @Input() rgb: RGBA;
  @Input() hex: string;
  @Output() onChange = new EventEmitter<any>();
  view = '';
  input: {[key: string]: string} = {
    fontSize: '11px',
    color: '#333',
    width: '100%',
    borderRadius: '2px',
    border: 'none',
    boxShadow: 'inset 0 0 0 1px #dadada',
    height: '21px',
    'text-align': 'center',
  };
  label: {[key: string]: string} = {
    'text-transform': 'uppercase',
    fontSize: '11px',
    'line-height': '11px',
    color: '#969696',
    'text-align': 'center',
    display: 'block',
    marginTop: '12px',
  };

  ngOnInit() {
    if (this.hsl.a === 1 && this.view !== 'hex') {
      this.view = 'hex';
    } else if (this.view !== 'rgb' && this.view !== 'hsl') {
      this.view = 'rgb';
    }
  }
  toggleViews() {
    if (this.view === 'hex') {
      this.view = 'rgb';
    } else if (this.view === 'rgb') {
      this.view = 'hsl';
    } else if (this.view === 'hsl') {
      if (this.hsl.a === 1) {
        this.view = 'hex';
      } else {
        this.view = 'rgb';
      }
    }
  }
  round(value) {
    return Math.round(value);
  }
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
    } else if (data.r || data.g || data.b) {
      this.onChange.emit({
        data: {
          r: data.r || this.rgb.r,
          g: data.g || this.rgb.g,
          b: data.b || this.rgb.b,
          source: 'rgb',
        },
        $event,
      });
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 1) {
        data.a = 1;
      }

      this.onChange.emit({
        data: {
          h: this.hsl.h,
          s: this.hsl.s,
          l: this.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: 'rgb',
        },
        $event,
      });
    } else if (data.h || data.s || data.l) {
      this.onChange.emit({
        data: {
          h: data.h || this.hsl.h,
          s: Number((data.s && data.s) || this.hsl.s),
          l: Number((data.l && data.l) || this.hsl.l),
          source: 'hsl',
        },
        $event,
      });
    }
  }
}
