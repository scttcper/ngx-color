import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ColorWrap } from '../common/color-wrap.component';


@Component({
  selector: 'color-alpha-picker',
  template: `
    <div class="color-alpha-picker {{ className }}"
      [style.width.px]="width" [style.height.px]="height"
    >
      <color-alpha class="color-alpha"
        [hsl]="hsl"
        [rgb]="rgb"
        [pointer]="pointer"
        [direction]="direction"
        (onChange)="handlePickerChange($event)"
      ></color-alpha>
    </div>
  `,
  styles: [`
    .color-alpha-picker {
      position: relative;
    }
    .color-alpha {
      radius: 2px;
    }
  `],
})
export class AlphaPickerComponent extends ColorWrap implements OnInit {
  width = 316;
  height = 16;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
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
    this.handleChange(data, $event);
  }
}
