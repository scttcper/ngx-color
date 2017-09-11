import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { debounce } from 'lodash-es';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/from';

import color from '../../helpers/color';

export default class ColorWrap implements OnInit, OnChanges {
  @Output() onChange = new EventEmitter();
  @Output() onChangeComplete = new EventEmitter();
  @Output() onSwatchHover = new EventEmitter();
  @Input()
  color: any = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  };
  oldHue;
  hsl;
  hsv;
  rgb;
  hex: string;
  source: string;

  constructor() {
    Observable.from(this.onChange)
      .debounceTime(100)
      .subscribe(({ colors, $event }) =>
        this.onChangeComplete.emit({ colors, $event }),
      );
  }
  ngOnInit() {
    this.setState(color.toState(this.color, 0));
  }
  ngOnChanges() {
    this.setState(color.toState(this.color, this.oldHue));
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
    const isValidColor = color.simpleCheckForValidColor(data);
    if (isValidColor) {
      const colors = color.toState(data, data.h || this.oldHue);
      this.setState(colors);
      this.onChange.emit({ colors, $event });
    }
  }

  handleSwatchHover(data, $event) {
    const isValidColor = color.simpleCheckForValidColor(data);
    if (isValidColor) {
      const colors = color.toState(data, data.h || this.oldHue);
      this.setState(colors);
      this.onSwatchHover.emit({ colors, $event });
    }
  }
}
