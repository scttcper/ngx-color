import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { HSLA, calculateHueChange } from 'ngx-color/helpers';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HueComponent implements OnChanges, OnDestroy {
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
  mousemove: Subscription;
  mouseup: Subscription;

  constructor() { }

  ngOnChanges() {
    if (this.direction === 'horizontal') {
      this.left = `${ (this.hsl.h * 100) / 360 }%`;
    } else {
      this.top = `${ -((this.hsl.h * 100) / 360) + 100 }%`;
    }
  }
  ngOnDestroy() {
    this.unsubscribe();
  }
  subscribe() {
    this.mousemove = fromEvent(document, 'mousemove')
      .subscribe((ev: Event) => this.handleMousemove(ev));
    this.mouseup = fromEvent(document, 'mouseup')
      .subscribe(() => this.unsubscribe());
  }
  unsubscribe() {
    if (this.mousemove) {
      this.mousemove.unsubscribe();
    }
    if (this.mouseup) {
      this.mouseup.unsubscribe();
    }
  }
  handleMousemove($event: Event) {
    this.handleChange($event);
  }
  handleMousedown($event: Event) {
    this.handleChange($event);
    this.subscribe();
  }
  handleChange($event: Event) {
    const data = calculateHueChange($event, this, this.container.nativeElement);
    if (data) {
      this.onChange.emit({data, $event});
    }
  }
}

@NgModule({
  declarations: [HueComponent],
  exports: [HueComponent],
  imports: [CommonModule],
})
export class HueModule { }
