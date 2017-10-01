import { Component, OnInit, Input } from '@angular/core';

import { ColorWrap } from '../common/color-wrap.component';


@Component({
  selector: 'color-hue-picker',
  template: `
    <div class="color-hue-picker {{ className }}"
      [style.width.px]="width" [style.height.px]="height"
    >
      <color-hue
        [hsl]="hsl"
        [pointer]="pointer"
        [direction]="direction"
        [radius]="radius"
        (onChange)="handlePickerChange($event)"
      ></color-hue>
    </div>
  `,
  styles: [`
    .color-hue-picker {
      position: relative;
    }
  `],
})
export class HuePickerComponent extends ColorWrap implements OnInit {
  @Input() width = 316;
  @Input() height = 16;
  @Input() radius = 2;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className: string;
  pointer = {
    width: '18px',
    height: '18px',
    'border-radius': '50%',
    transform: 'translate(-9px, -2px)',
    'background-color': 'rgb(248, 248, 248)',
    'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  };

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.direction === 'vertical') {
      this.pointer.transform = 'translate(-3px, -9px)';
    }
  }
  handlePickerChange({ data, $event }) {
    this.handleChange({ a: 1, h: data.h, l: 0.5, s: 1 }, $event);
  }
}
