import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { getContrastingColor } from 'ngx-color';

@Component({
  selector: 'color-swatches-color',
  template: `
  <color-swatch [color]="color" [style]="colorStyle"
    [class.first]="first" [class.last]="last"
    (click)="handleClick($event)" (onHover)="onSwatchHover.emit($event)"
    [focusStyle]="focusStyle">
    <div class="swatch-check"
      [class.active]="active" [class.first]="first" [class.last]="last">
      <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"
        [style.fill]="getContrastingColor(color)">
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
    </div>
  </color-swatch>
  `,
  styles: [
    `
    .swatches-group {
      padding-bottom: 10px;
      width: 40px;
      float: left;
      margin-right: 10px;
    }
    .swatch-check {
      margin-left: 8px;
      display: none;
    }
    .swatch-check.active {
      display: block;
    }
    .swatch-check.first {
      overflow: hidden;
      border-radius: 2px 2px 0 0;
    }
    .swatch-check.last {
      overflow: hidden;
      border-radius: 0 0 2px 2px;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SwatchesColorComponent implements OnInit {
  @Input() color: string;
  @Input() first: boolean;
  @Input() last: boolean;
  @Input() active: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  getContrastingColor = getContrastingColor;
  colorStyle: {[key: string]: string} = {
    width: '40px',
    height: '24px',
    cursor: 'pointer',
    marginBottom: '1px',
  };
  focusStyle: {[key: string]: string} = {};
  ngOnInit() {
    this.colorStyle.background = this.color;
    this.focusStyle.boxShadow = `0 0 4px ${this.color}`;
  }
  handleClick($event) {
    this.onClick.emit({
      data: {
        hex: this.color,
        source: 'hex',
      },
      $event,
    });
  }
}
