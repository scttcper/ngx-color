import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import {
  simpleCheckForValidColor,
  toState,
  HSLA,
  HSVA,
  RGBA,
} from 'ngx-color/helpers';

@Component({
  // create seletor base for test override property
  selector: 'color-wrap',
  template: ``,
})
export class ColorWrap implements OnInit, OnChanges, OnDestroy {
  @Input() className = '';
  @Input() color: HSLA = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  };
  @Output() onChange = new EventEmitter();
  @Output() onChangeComplete = new EventEmitter();
  @Output() onSwatchHover = new EventEmitter();
  oldHue: number;
  hsl: HSLA;
  hsv: HSVA;
  rgb: RGBA;
  hex: string;
  source: string;
  currentColor: string;
  changes: Subscription;

  constructor() {}

  ngOnInit() {
    this.changes = this.onChange.pipe(
        debounceTime(100),
        distinctUntilChanged(),
      )
      .subscribe(({ colors, $event }) =>
        this.onChangeComplete.emit({ colors, $event })
      );
    this.setState(toState(this.color, 0));
    this.currentColor = this.hex;
  }
  ngOnChanges() {
    this.setState(toState(this.color, this.oldHue));
  }
  ngOnDestroy() {
    this.changes.unsubscribe();
  }
  setState(data) {
    this.oldHue = data.oldHue;
    this.hsl = data.hsl;
    this.hsv = data.hsv;
    this.rgb = data.rgb;
    this.hex = data.hex;
    this.source = data.source;
    this.afterValidChange();
  }
  handleChange(data, $event) {
    const isValidColor = simpleCheckForValidColor(data);
    if (isValidColor) {
      const colors = toState(data, data.h || this.oldHue);
      this.setState(colors);
      this.onChange.emit({ colors, $event });
      this.afterValidChange();
    }
  }
  /** hook for components after a complete change */
  afterValidChange() {}

  handleSwatchHover(data, $event) {
    const isValidColor = simpleCheckForValidColor(data);
    if (isValidColor) {
      const colors = toState(data, data.h || this.oldHue);
      this.setState(colors);
      this.onSwatchHover.emit({ colors, $event });
    }
  }
}

@NgModule({
  declarations: [ColorWrap],
  exports: [ColorWrap],
  imports: [CommonModule],
})
export class ColorWrapModule {}
