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
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { CommonModule } from '@angular/common';
import {
  calculateSaturationChange,
  HSLA,
  HSVA,
  HSVAsource,
} from 'ngx-color/helpers';

@Component({
  selector: 'color-saturation',
  template: `
  <div class="color-saturation" #container
    [style.background]="background"
    (mousedown)="handleMousedown($event)"
  >
    <div class="saturation-white">
      <div class="saturation-black"></div>
      <div class="saturation-pointer" [ngStyle]="pointer" [style.top.%]="pointerTop" [style.left.%]="pointerLeft">
        <div class="saturation-circle" [ngStyle]="circle"></div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
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
  `,
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaturationComponent implements OnChanges, OnDestroy {
  @Input() hsl: HSLA;
  @Input() hsv: HSVA;
  @Input() radius: number;
  @Input() pointer: { [key: string]: string };
  @Input() circle: { [key: string]: string };
  @Output() onChange = new EventEmitter<{ data: HSVAsource; $event: Event }>();
  @ViewChild('container') container: ElementRef;
  background: string;
  pointerTop: number;
  pointerLeft: number;
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
    this.mousemove = fromEvent(document, 'mousemove').subscribe((e: Event) =>
      this.handleMousemove(e),
    );
    this.mouseup = fromEvent(document, 'mouseup').subscribe(() =>
      this.unsubscribe(),
    );
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
    const data = calculateSaturationChange(
      $event,
      this,
      this.container.nativeElement,
    );
    this.onChange.emit({ data, $event });
  }
}

@NgModule({
  declarations: [SaturationComponent],
  exports: [SaturationComponent],
  imports: [CommonModule],
})
export class SaturationModule {}
