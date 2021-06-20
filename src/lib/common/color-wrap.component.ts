import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  isDevMode,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { simpleCheckForValidColor, toState } from './helpers/color';
import { Color, HSLA, HSVA, RGBA } from './helpers/color.interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ColorEvent {
  $event: Event;
  color: Color;
}

export enum ColorMode {
  HEX = 'hex',
  HSL = 'hsl',
  HSV = 'hsv',
  RGB = 'rgb'
}

@Component({
  // create seletor base for test override property
  selector: 'color-wrap',
  template: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorWrap),
      multi: true,
    }
  ]
})
export class ColorWrap implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() className?: string;

  /**
   * Descriptors the return color format if the component is used with two-way binding
   */
  @Input() mode: ColorMode = ColorMode.HEX;

  @Input() color: HSLA | HSVA | RGBA | string = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  };
  @Output() colorChange = new EventEmitter<HSLA | HSVA | RGBA | string>();
  @Output() onChange = new EventEmitter<ColorEvent>();
  @Output() onChangeComplete = new EventEmitter<ColorEvent>();
  @Output() onSwatchHover = new EventEmitter<ColorEvent>();
  oldHue!: number;
  hsl!: HSLA;
  hsv!: HSVA;
  rgb!: RGBA;
  hex!: string;
  source!: string;
  currentColor!: string;
  changes!: Subscription;
  disableAlpha?: boolean;

  private _onChangeCompleteSubscription = new Subscription();
  private _onSwatchHoverSubscription = new Subscription();

  ngOnInit() {
    this.changes = this.onChange
      .pipe(
        debounceTime(100),
        tap(event => {
          this.onChangeComplete.emit(event);
          switch (this.mode) {
            case ColorMode.HEX:
              this.colorChange.emit(event.color.hex);
              break;
            case ColorMode.HSL:
              this.colorChange.emit(event.color.hsl);
              break;
            case ColorMode.HSV:
              this.colorChange.emit(event.color.hsv);
              break;
            case ColorMode.RGB:
              this.colorChange.emit(event.color.rgb);
              break;
            default:
              const msg = `The mode '${this.mode}' is not supported`;
              if (isDevMode()) {
                throw new Error(msg);
              } else {
                console.warn(msg);
              }
              break;
          }
        })
      )
      .subscribe();
    this.setState(toState(this.color, 0));
    this.currentColor = this.hex;
  }
  ngOnChanges() {
    this.setState(toState(this.color, this.oldHue));
  }
  ngOnDestroy() {
    this.changes.unsubscribe();
    this._onChangeCompleteSubscription.unsubscribe();
    this._onSwatchHoverSubscription.unsubscribe();
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
      const color = toState(data, data.h || this.oldHue, this.disableAlpha);
      this.setState(color);
      this.onChange.emit({ color, $event });
      this.afterValidChange();
    }
  }
  /** hook for components after a complete change */
  afterValidChange() {}

  handleSwatchHover(data, $event) {
    const isValidColor = simpleCheckForValidColor(data);
    if (isValidColor) {
      const color = toState(data, data.h || this.oldHue);
      this.setState(color);
      this.onSwatchHover.emit({ color, $event });
    }
  }

  registerOnChange(fn: (hex: string) => void): void {
    this._onChangeCompleteSubscription.add(this.onChangeComplete.pipe(
      tap(event => fn(event.color.hex)),
    ).subscribe());
  }

  registerOnTouched(fn: () => void): void {
    this._onSwatchHoverSubscription.add(this.onSwatchHover.pipe(
      tap(() => fn()),
    ).subscribe());
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(hex: string): void {
    this.color = hex;
  }

}

@NgModule({
  declarations: [ColorWrap],
  exports: [ColorWrap],
  imports: [CommonModule],
})
export class ColorWrapModule {}
