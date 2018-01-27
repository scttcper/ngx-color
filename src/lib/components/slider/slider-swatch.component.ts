import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { HSL } from 'ngx-color';

@Component({
  selector: 'color-slider-swatch',
  template: `
  <div class="slider-swatch" [style.background]="background"
    [class.first]="first" [class.last]="last" [class.active]="active"
    (click)="handleClick($event)"
  ></div>
  `,
  styles: [
    `
    .slider-swatch {
      height: 12px;
      background: rgb(121, 211, 166);
      cursor: pointer;
    }
    .slider-swatch.active {
      transform: scaleY(1.8);
      border-top-right-radius: 3.6px 2px;
      border-top-left-radius: 3.6px 2px;
      border-bottom-right-radius: 3.6px 2px;
      border-bottom-left-radius: 3.6px 2px;
    }
    .slider-swatch.first {
      border-radius: 2px 0px 0px 2px;
    }
    .slider-swatch.last {
      border-radius: 0px 2px 2px 0px;
    }

  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SliderSwatchComponent implements OnChanges {
  @Input() hsl: HSL;
  @Input() active: boolean;
  @Input() offset: number;
  @Input() first = false;
  @Input() last = false;
  @Output() onClick = new EventEmitter<any>();
  background: string;

  ngOnChanges() {
    this.background = `hsl(${this.hsl.h}, 50%, ${this.offset * 100}%)`;
  }
  handleClick($event) {
    this.onClick.emit({
      data: {
        h: this.hsl.h,
        s: 0.5,
        l: this.offset,
        source: 'hsl',
      },
      $event,
    });
  }
}
