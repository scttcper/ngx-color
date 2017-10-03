import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ElementRef, ViewChild, HostListener } from '@angular/core';

import * as hue from '../../helpers/hue';
import { HSLA } from '../../helpers/color.interfaces';

@Component({
  selector: 'color-hue',
  template: `
  <div class="color-hue color-hue-{{direction}}" [style.border-radius.px]="radius" [style.box-shadow]="shadow">
    <div
      class="color-hue-container"
      (mousedown)="handleMousedown($event)"
      #container
    >
      <div class="color-hue-pointer" [style.left]="left" [style.top]="top" *ngIf="!hidePointer">
        <div class="color-hue-slider" [ngStyle]="pointer"></div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .color-hue {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .color-hue-container {
      margin: 0 2px;
      position: relative;
      height: 100%;
    }
    .color-hue-pointer {
      position: absolute;
    }
    .color-hue-slider {
      margin-top: 1px;
      width: 4px;
      border-radius: 1px;
      height: 8px;
      box-shadow: 0 0 2px rgba(0, 0, 0, .6);
      background: #fff;
      transform: translateX(-2px);
    }
    .color-hue-horizontal {
      background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
        33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }
    .color-hue-vertical {
      background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
        #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }
  `],
})
export class HueComponent implements OnInit, OnChanges {
  @Input() hsl: HSLA;
  @Input() pointer: any;
  @Input() radius: number;
  @Input() shadow: any;
  @Input() hidePointer = false;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Output() onChange = new EventEmitter<any>();
  @ViewChild('container') container: ElementRef;
  left = '0px';
  top = '';
  private active = false;

  pointerLeft: any;
  constructor() { }

  ngOnInit() {
    // console.log(this.el.nativeElement.touches)
    // this.pointerLeft = `${ (this.props.hsl.h * 100) / 360 }%`
  }
  ngOnChanges() {
    if (this.direction === 'horizontal') {
      this.left = `${ (this.hsl.h * 100) / 360 }%`;
    } else {
      this.top = `${ -((this.hsl.h * 100) / 360) + 100 }%`;
    }
    // const change = hue.calculateChange(e, this, this.el.nativeElement)
    // change && this.props.onChange && this.props.onChange(change, e)
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
    const data = hue.calculateChange($event, this, this.container.nativeElement);
    if (data) {
      this.onChange.emit({data, $event});
    }
  }


}
