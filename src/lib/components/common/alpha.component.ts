import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ElementRef, ViewChild, HostListener } from '@angular/core';

import * as alpha from '../../helpers/alpha';

@Component({
  selector: 'color-alpha',
  template: `
  <div class="alpha" [style.border-radius]="radius">
    <div class="alpha-checkboard">
      <color-checkboard></color-checkboard>
    </div>
    <div class="alpha-gradient"
      [style.box-shadow]="shadow" [style.border-radius]="radius"
      [ngStyle]="gradient"
    ></div>
    <div
      #container
      class="alpha-container color-alpha-{{direction}}"
      (mousedown)="handleMousedown($event)"
    >
      <div class="alpha-pointer" [style.left.%]="pointerLeft" [style.top.%]="pointerTop">
        <div class="alpha-slider" [ngStyle]="pointer"></div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .alpha {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .alpha-checkboard {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .alpha-gradient {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .alpha-container {
      position: relative;
      height: 100%;
      margin: 0 3px;
    }
    .alpha-pointer {
      position: absolute;
    }
    .alpha-slider {
      width: 4px;
      border-radius: 1px;
      height: 8px;
      box-shadow: 0 0 2px rgba(0, 0, 0, .6);
      background: #fff;
      margin-top: 1px;
      transform: translateX(-2px);
    },
  `],
})
export class AlphaComponent implements OnInit, OnChanges {
  @Input() hsl: ColorFormats.HSL;
  @Input() rgb: ColorFormats.RGBA;
  @Input() pointer: any;
  @Input() shadow: string;
  @Input() radius: string;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Output() onChange = new EventEmitter<any>();
  @ViewChild('container') container: ElementRef;
  gradient: any;
  pointerLeft: number;
  pointerTop: number;
  private active = false;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.direction === 'vertical') {
      this.pointerLeft = 0;
      this.pointerTop = this.rgb.a * 100;
      this.gradient = {
        background: `linear-gradient(to bottom, rgba(${ this.rgb.r },${ this.rgb.g },${ this.rgb.b }, 0) 0%,
          rgba(${ this.rgb.r },${ this.rgb.g },${ this.rgb.b }, 1) 100%)`,
      };
    } else {
      this.gradient = {
        background: `linear-gradient(to right, rgba(${ this.rgb.r },${ this.rgb.g },${ this.rgb.b }, 0) 0%,
          rgba(${ this.rgb.r },${ this.rgb.g },${ this.rgb.b }, 1) 100%)`,
      };
      this.pointerLeft = this.rgb.a * 100;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  handleMousemove($event: Event) {
    if (!this.active) {
      return;
    }
    this.handleChange($event);
  }
  handleMousedown($event: Event) {
    this.handleChange($event);
    this.active = true;
  }

  @HostListener('window:mouseup', ['$event'])
  handleMouseUp() {
    this.active = false;
  }
  handleChange($event: Event) {
    const data = alpha.calculateChange($event, this, this.container.nativeElement);
    if (data) {
      this.onChange.emit({ data, $event });
      console.log(data);
    }
  }


}
