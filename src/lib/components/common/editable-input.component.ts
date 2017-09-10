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
    <div class="wrap">
      <input
        [ngModel]="currentValue"
        (ngModelChange)="valueChange.emit($event)"
        spellCheck="false"
        [ngStyle]="style"
        (focus)="handleFocus($event)"
        (focusout)="handleFocusOut($event)"
      />
      <span *ngIf="label">
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
  @Input() value: string;
  @Output() valueChange = new EventEmitter();
  currentValue: string;
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
  handleFocus(e) {
    this.focus = true;
  }
  handleFocusOut(e) {
    this.focus = false;
    this.currentValue = this.blurValue;
  }
  ngOnChanges() {
    if (!this.focus) {
      this.currentValue = String(this.value).toUpperCase();
    } else {
      this.blurValue = String(this.value).toUpperCase();
    }
  }
}
