import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { getContrastingColor } from 'ngx-color/helpers';

@Component({
  selector: 'color-compact-color',
  template: `
    <div class="compact-color">
      <color-swatch class="swatch"
        [color]="color" [style]="swatchStyle"
        [focusStyle]="swatchFocus"
        (onClick)="handleClick($event)" (onHover)="onSwatchHover.emit($event)"
        >
        <div class="compact-dot"
          [class.active]="active" [style.background]="getContrastingColor(color)"
        ></div>
      </color-swatch>
    </div>
  `,
  styles: [
    `
  .compact-dot {
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    border-radius: 50%;
    opacity: 0;
  }
  .compact-dot.active {
    opacity: 1;
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CompactColorComponent implements OnChanges {
  @Input() color: string;
  @Input() active: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  swatchStyle: any = {
    width: '15px',
    height: '15px',
    float: 'left',
    'margin-right': '5px',
    'margin-bottom': '5px',
    position: 'relative',
    cursor: 'pointer',
  };
  swatchFocus: any = {};
  getContrastingColor = getContrastingColor;

  ngOnChanges() {
    this.swatchStyle.background = this.color;
    this.swatchFocus['box-shadow'] = `0 0 4px ${this.color}`;
    if (this.color.toLowerCase() === '#ffffff') {
      this.swatchStyle['box-shadow'] = 'inset 0 0 0 1px #ddd';
    }
  }
  handleClick({ hex, $event }) {
    this.onClick.emit({ hex, $event });
  }
}
