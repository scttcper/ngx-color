import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { HSLA, HSLAsource, HSVAsource } from './helpers/color.interfaces';

@Component({
  selector: 'color-hue',
  template: `
  <div class="color-hue color-hue-{{direction}}" [style.border-radius.px]="radius" [style.box-shadow]="shadow">
    <div #container class="color-hue-container">
      <div class="color-hue-pointer" [style.left]="left" [style.top]="top" *ngIf="!hidePointer">
        <div class="color-hue-slider" [ngStyle]="pointer"></div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
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
  `,
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HueComponent implements OnChanges, OnDestroy, OnInit {
  @Input() hsl: HSLA;
  @Input() pointer: { [key: string]: string };
  @Input() radius: number;
  @Input() shadow: string;
  @Input() hidePointer = false;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Output() onChange = new EventEmitter<{ data: HSLAsource; $event: Event }>();
  @ViewChild('container') container: ElementRef;
  left = '0px';
  top = '';
  private mouseListening = false;
  private mousechange = new Subject<{
    x: number;
    y: number;
    $event: any;
    isTouch: boolean;
  }>();
  private sub: Subscription;
  @HostListener('window:mousemove', ['$event', '$event.pageX', '$event.pageY'])
  @HostListener('window:touchmove', [
    '$event',
    '$event.touches[0].clientX',
    '$event.touches[0].clientY',
  ])
  mousemove($event: Event, x: number, y: number, isTouch = false) {
    if (this.mouseListening) {
      $event.preventDefault();
      this.mousechange.next({ $event, x, y, isTouch });
    }
  }
  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  mouseup() {
    this.mouseListening = false;
  }
  @HostListener('mousedown', ['$event', '$event.pageX', '$event.pageY'])
  @HostListener('touchstart', [
    '$event',
    '$event.touches[0].clientX',
    '$event.touches[0].clientY',
  ])
  mousedown($event: Event, x: number, y: number, isTouch = false) {
    $event.preventDefault();
    this.mouseListening = true;
      this.mousechange.next({ $event, x, y, isTouch });
  }

  ngOnInit() {
    this.sub = this.mousechange
      .pipe(
        // limit times it is updated for the same area
        distinctUntilChanged((p, q) => p.x === q.x && p.y === q.y),
      )
      .subscribe(n => this.handleChange(n.x, n.y, n.$event, n.isTouch));
  }

  ngOnChanges() {
    if (this.direction === 'horizontal') {
      this.left = `${this.hsl.h * 100 / 360}%`;
    } else {
      this.top = `${-(this.hsl.h * 100 / 360) + 100}%`;
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  handleChange(x: number, y: number, $event: Event, isTouch: boolean) {
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const containerWidth = this.container.nativeElement.clientWidth;
    const containerHeight = this.container.nativeElement.clientHeight;
    const left = x - (containerRect.left + window.pageXOffset);
    let top = y - containerRect.top;

    if (!isTouch) {
      top = top - window.pageYOffset;
    }

    let data: HSLAsource;
    if (this.direction === 'vertical') {
      let h;
      if (top < 0) {
        h = 359;
      } else if (top > containerHeight) {
        h = 0;
      } else {
        const percent = -(top * 100 / containerHeight) + 100;
        h = 360 * percent / 100;
      }

      if (this.hsl.h !== h) {
        data = {
          h,
          s: this.hsl.s,
          l: this.hsl.l,
          a: this.hsl.a,
          source: 'rgb',
        };
      }
    } else {
      let h;
      if (left < 0) {
        h = 0;
      } else if (left > containerWidth) {
        h = 359;
      } else {
        const percent = left * 100 / containerWidth;
        h = 360 * percent / 100;
      }

      if (this.hsl.h !== h) {
        data = {
          h,
          s: this.hsl.s,
          l: this.hsl.l,
          a: this.hsl.a,
          source: 'rgb',
        };
      }
    }
    if (!data) {
      return null;
    }
    this.onChange.emit({ data, $event });
  }
}

@NgModule({
  declarations: [HueComponent],
  exports: [HueComponent],
  imports: [CommonModule],
})
export class HueModule {}
