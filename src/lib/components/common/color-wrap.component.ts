import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { debounce } from 'lodash-es';
import color from '../../helpers/color';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/from';

export default class ColorWrap implements OnInit {
  @Output() onChange = new EventEmitter();
  @Output() onChangeComplete = new EventEmitter();
  @Input()
  color: any = {
    h: 250,
    s: 0.50,
    l: 0.20,
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
      .subscribe(({ colors, $event }) => this.onChangeComplete.emit({ colors, $event }));
  }
  ngOnInit() {
    this.setState(color.toState(this.color, 0));
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
      const colors = this.color = color.toState(data, data.h || this.oldHue);
      this.setState(colors);
      this.onChange.emit({colors, $event});
    }
  }
  //
  // handleSwatchHover(data, event) {
  //   const isValidColor = color.simpleCheckForValidColor(data);
  //   if (isValidColor) {
  //     const colors = color.toState(data, data.h || this.state.oldHue);
  //     this.setState(colors);
  //     this.props.onSwatchHover && this.props.onSwatchHover(colors, event);
  //   }
  // }
}
