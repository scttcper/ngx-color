import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import * as saturation from '../../helpers/saturation';
import { HSLA, HSVA } from '../../helpers/color.interfaces';

@Component({
  selector: 'color-saturation',
  template: `
    <div class="color-saturation"
      [style.background]="background"
      (mousedown)="handleMousedown($event)"
      #container
    >
      <div [ngStyle]="white" class="saturation-white">
        <div [ngStyle]="black" class="saturation-black"></div>
        <div class="saturation-pointer" [ngStyle]="pointer" [style.top.%]="pointerTop" [style.left.%]="pointerLeft">
          <div class="saturation-circle" [ngStyle]="circle"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .saturation-white {
      background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
      background: linear-gradient(to right, #fff, rgba(255,255,255,0));
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .saturation-black {
      background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
      background: linear-gradient(to top, #000, rgba(0,0,0,0));
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .color-saturation {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .saturation-pointer {
      position: absolute;
      cursor: default;
    }
    .saturation-circle {
      width: 4px;
      height: 4px;
      box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3);
        0 0 1px 2px rgba(0,0,0,.4);
      border-radius: 50%;
      cursor: hand;
      transform: translate(-2px, -2px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaturationComponent implements OnChanges, OnDestroy {
  @Input() hsl: HSLA;
  @Input() hsv: HSVA;
  @Input() radius: number;
  @Input() shadow: any;
  background: string;
  pointerTop: number;
  pointerLeft: number;
  white: any = {
    // borderRadius: this.radius,
  };
  black: any = {
    // 'box-shadow': this.shadow,
    // 'border-radius': this.radius,
  };
  @Input() pointer: any;
  @Input() circle: any;
  @Output() onChange = new EventEmitter<any>();
  @ViewChild('container') container: ElementRef;
  mousemove: Subscription;
  mouseup: Subscription;

  ngOnChanges() {
    this.background = `hsl(${this.hsl.h}, 100%, 50%)`;
    this.pointerTop = -(this.hsv.v * 100) + 100;
    this.pointerLeft = this.hsv.s * 100;
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
    $event.preventDefault();
    const data = saturation.calculateChange($event, this, this.container.nativeElement);
    this.onChange.emit({ data, $event });
  }
}
