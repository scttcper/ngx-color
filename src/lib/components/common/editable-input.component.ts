import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'color-editable-input',
  template: `
    <div class="wrap" [ngStyle]="wrapStyle">
      <input
        [value]="currentValue"
        (keydown)="handleKeydown($event)"
        (keyup)="handleKeyup($event)"
        [ngStyle]="inputStyle"
        (focus)="handleFocus($event)"
        (focusout)="handleFocusOut($event)"
        [placeholder]="placeholder"
        spellCheck="false"
      />
      <span *ngIf="label" [ngStyle]="labelStyle">
        {{ label }}
      </span>
    </div>
  `,
  styles: [
    `
    .wrap {
      position: relative;
    }
  `,
  ],
})
export class EditableInputComponent implements OnInit, OnChanges {
  @Input() style: any;
  @Input() label: string;
  @Input() value: string | number;
  @Input() arrowOffset: number;
  @Input() placeholder = '';
  @Output() onChange = new EventEmitter();
  currentValue: string | number;
  blurValue: string;
  wrapStyle: any;
  inputStyle: any;
  labelStyle: any;
  focus = false;

  constructor() {}

  ngOnInit() {
    this.wrapStyle = this.style && this.style.wrap ? this.style.wrap : {};
    this.inputStyle = this.style && this.style.input ? this.style.input : {};
    this.labelStyle = this.style && this.style.label ? this.style.label : {};
  }
  handleFocus($event) {
    this.focus = true;
  }
  handleFocusOut($event) {
    this.focus = false;
    this.currentValue = this.blurValue;
  }
  handleKeydown($event) {
    // In case `e.target.value` is a percentage remove the `%` character
    // and update accordingly with a percentage
    // https://github.com/casesandberg/react-color/issues/383
    const stringValue = String($event.target.value);
    const isPercentage = stringValue.indexOf('%') > -1;
    const number = Number(stringValue.replace(/%/g, ''));
    if (!isNaN(number)) {
      const amount = this.arrowOffset || 1;

      // Up
      if ($event.keyCode === 38) {
        if (this.label) {
          this.onChange.emit({ data: { [this.label]: number + amount }, $event });
        } else {
          this.onChange.emit({ data: number + amount, $event });
        }

        if (isPercentage) {
          this.currentValue = `${ number + amount }%`;
        } else {
          this.currentValue = number + amount;
        }
      }

      // Down
      if ($event.keyCode === 40) {
        if (this.label) {
          this.onChange.emit({ data: { [this.label]: number - amount }, $event });
        } else {
          this.onChange.emit({ data: number - amount, $event });
        }

        if (isPercentage) {
          this.currentValue = `${ number - amount }%`;
        } else {
          this.currentValue = number - amount;
        }
      }
    }
  }
  handleKeyup($event) {
    if ($event.keyCode === 40 || $event.keyCode === 38) {
      return;
    }
    if (this.label) {
      this.onChange.emit({ data: { [this.label]: $event.target.value }, $event });
    } else {
      this.onChange.emit({ data: $event.target.value, $event });
    }
  }
  ngOnChanges() {
    if (!this.focus) {
      this.currentValue = String(this.value).toUpperCase();
      this.blurValue = String(this.value).toUpperCase();
    } else {
      this.blurValue = String(this.value).toUpperCase();
    }
  }
}
