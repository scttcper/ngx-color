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
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { distinctUntilChanged } from 'rxjs/operators';

import { HSLA, HSVA, HSVAsource } from './helpers/color.interfaces';

@Component({
  selector: 'color-saturation',
  template: `
  <div class="color-saturation" #container [style.background]="background">
    <div class="saturation-white">
      <div class="saturation-black"></div>
      <div class="saturation-pointer" [ngStyle]="pointer" [style.top]="pointerTop" [style.left]="pointerLeft">
        <div class="saturation-circle" [ngStyle]="circle"></div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .saturation-white {
      background: linear-gradient(to right, #fff, rgba(255,255,255,0));
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .saturation-black {
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
      box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
      border-radius: 50%;
      cursor: hand;
      transform: translate(-2px, -2px);
    }
  `,
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaturationComponent implements OnChanges, OnInit {
  @Input() hsl: HSLA;
  @Input() hsv: HSVA;
  @Input() radius: number;
  @Input() pointer: { [key: string]: string };
  @Input() circle: { [key: string]: string };
  @Output() onChange = new EventEmitter<{ data: HSVAsource; $event: Event }>();
  @ViewChild('container') container: ElementRef;
  background: string;
  pointerTop: string;
  pointerLeft: string;
  private mouseListening = false;
  private mousechange = new EventEmitter<{
    x: number;
    y: number;
    $event: any;
  }>();
  @HostListener('window:mousemove', ['$event', '$event.pageX', '$event.pageY'])
  @HostListener('window:touchmove', [
    '$event',
    '$event.touches[0].clientX',
    '$event.touches[0].clientY',
  ])
  mousemove($event: Event, x: number, y: number) {
    if (this.mouseListening) {
      $event.preventDefault();
      this.mousechange.emit({ $event, x, y });
    }
  }
  @HostListener('window:mouseup', ['$event'])
  mouseup(e: MouseEvent) {
    this.mouseListening = false;
  }
  @HostListener('mousedown', ['$event', '$event.pageX', '$event.pageY'])
  @HostListener('touchstart', [
    '$event',
    '$event.touches[0].clientX',
    '$event.touches[0].clientY',
  ])
  mousedown($event: Event, x: number, y: number) {
    $event.preventDefault();
    this.mouseListening = true;
    this.mousechange.emit({ $event, x, y });
  }

  ngOnInit() {
    this.mousechange
      .pipe(
        // limit times it is updated for the same area
        distinctUntilChanged((p: any, q: any) => p.x === q.x && p.y === q.y),
      )
      .subscribe(n => this.handleChange(n));
  }
  ngOnChanges() {
    this.background = `hsl(${this.hsl.h}, 100%, 50%)`;
    this.pointerTop = -(this.hsv.v * 100) + 1 + 100 + '%';
    this.pointerLeft = this.hsv.s * 100 + '%';
  }
  handleChange({ x, y, $event }) {
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const { width: containerWidth, height: containerHeight } = containerRect;
    let left = x - (containerRect.left + window.pageXOffset);
    let top = y - (containerRect.top + window.pageYOffset);

    if (left < 0) {
      left = 0;
    } else if (left > containerWidth) {
      left = containerWidth;
    } else if (top < 0) {
      top = 0;
    } else if (top > containerHeight) {
      top = containerHeight;
    }

    const saturation = left / containerWidth;
    let bright = -(top / containerHeight) + 1;
    bright = bright > 0 ? bright : 0;
    bright = bright > 1 ? 1 : bright;

    const data: HSVAsource = {
      h: this.hsl.h,
      s: saturation,
      v: bright,
      a: this.hsl.a,
      source: 'hsva',
    };
    this.onChange.emit({ data, $event });
  }
}

@NgModule({
  declarations: [SaturationComponent],
  exports: [SaturationComponent],
  imports: [CommonModule],
})
export class SaturationModule {}
