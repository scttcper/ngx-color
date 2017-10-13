import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ColorWrap } from 'ngx-color';
import { isValidHex } from 'ngx-color/helpers';

@Component({
  selector: 'color-compact',
  template: `
    <color-raised class="color-compact">
      <div class="compact-picker {{ className }}">
        <div>
          <color-compact-color
            *ngFor="let color of colors" [color]="color"
            [active]="color.toLowerCase() === hex.toLowerCase()"
            (onClick)="handleBlockChange($event)"
          ></color-compact-color>
          <div class="compact-clear"></div>
        </div>
        <color-compact-fields
          [hex]="hex"
          [rgb]="rgb"
          (onChange)="handleValueChange($event)"
        ></color-compact-fields>
      </div>
    </color-raised>
  `,
  styles: [`
    .color-compact {
      background: #f6f6f6;
      radius: 4px;
    }
    .compact-picker {
      padding-top: 5px;
      padding-left: 5px;
      box-sizing: border-box;
      width: 245px;
    }
    .compact-clear {
      clear: both;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactComponent extends ColorWrap {
  @Input() colors = [
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E',
  ];

  constructor() {
    super();
  }
  handleBlockChange({ hex, $event }) {
    if (isValidHex(hex)) {
      this.handleChange({ hex, source: 'hex' }, $event);
    }
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
}
