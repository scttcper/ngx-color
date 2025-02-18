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
    <color-swatch
      [color]="color"
      [style]="colorStyle"
      [focusStyle]="focusStyle"
      [class.first]="first"
      [class.last]="last"
      (click)="handleClick($event)"
      (keydown.enter)="handleClick($event)"
      (onHover)="onSwatchHover.emit($event)"
      >
    @if (active) {
      <div class="swatch-check" [class.first]="first" [class.last]="last">
        <svg
          style="width: 24px; height: 24px;"
          viewBox="0 0 24 24"
          [style.fill]="getContrastingColor(color)"
          >
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </div>
    }
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
        display: flex;
        margin-left: 8px;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    standalone: false
})
export class SwatchesColorComponent implements OnInit {
  @Input() color!: string;
  @Input() first = false;
  @Input() last = false;
  @Input() active!: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  getContrastingColor = getContrastingColor;
  colorStyle: Record<string, string> = {
    width: '40px',
    height: '24px',
    cursor: 'pointer',
    marginBottom: '1px',
  };
  focusStyle: Record<string, string> = {};

  ngOnInit() {
    this.colorStyle.background = this.color;
    this.focusStyle.boxShadow = `0 0 4px ${this.color}`;
    if (this.first) {
      this.colorStyle.borderRadius = '2px 2px 0 0';
    }
    if (this.last) {
      this.colorStyle.borderRadius = '0 0 2px 2px';
    }
    if (this.color === '#FFFFFF') {
      this.colorStyle.boxShadow = 'inset 0 0 0 1px #ddd';
    }
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
