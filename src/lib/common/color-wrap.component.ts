import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';

import {
  HSLA,
  HSVA,
  RGBA,
  simpleCheckForValidColor,
  toState,
} from 'ngx-color/helpers';
import { Observable } from 'rxjs/Observable';

@Component({
  template: '',
})
export class ColorWrap implements OnInit, OnChanges {
  @Input() className: string;
  @Input()
  color: HSLA = {
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

  constructor() {
    Observable.from(this.onChange)
      .debounceTime(100)
      .subscribe(({ colors, $event }) =>
        this.onChangeComplete.emit({ colors, $event })
      );
  }
  ngOnInit() {
    this.setState(toState(this.color, 0));
    this.currentColor = this.hex;
  }
  ngOnChanges() {
    this.setState(toState(this.color, this.oldHue));
  }
  setState(data) {
    this.oldHue = data.oldHue;
    this.hsl = data.hsl;
    this.hsv = data.hsv;
    this.rgb = data.rgb;
    this.hex = data.hex;
    this.source = data.source;
  }
  handleChange(data, $event) {
    const isValidColor = simpleCheckForValidColor(data);
    if (isValidColor) {
      const colors = toState(data, data.h || this.oldHue);
      this.setState(colors);
      this.onChange.emit({ colors, $event });
    }
  }

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
