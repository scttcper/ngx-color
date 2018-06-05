import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'color-editable-input',
  template: `
  <div class="wrap" [ngStyle]="wrapStyle">
    <input [ngStyle]="inputStyle" spellCheck="false"
      [value]="currentValue" [placeholder]="placeholder"
      (keydown)="handleKeydown($event)" (keyup)="handleKeyup($event)"
      (focus)="handleFocus($event)" (focusout)="handleFocusOut($event)" />
    <span *ngIf="label" [ngStyle]="labelStyle" (mousedown)="handleMousedown($event)">
      {{ label }}
    </span>
  </div>
  `,
  styles: [
    `
    :host {
      display: flex;
    }
    .wrap {
      position: relative;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() style: {
    wrap: { [key: string]: string };
    input: { [key: string]: string };
    label: { [key: string]: string };
  };
  @Input() label: string;
  @Input() value: string | number;
  @Input() arrowOffset: number;
  @Input() dragLabel: boolean;
  @Input() dragMax: number;
  @Input() placeholder = '';
  @Output() onChange = new EventEmitter();
  currentValue: string | number;
  blurValue: string;
  wrapStyle: { [key: string]: string };
  inputStyle: { [key: string]: string };
  labelStyle: { [key: string]: string };
  focus = false;
  mousemove: Subscription;
  mouseup: Subscription;

  ngOnInit() {
    this.wrapStyle = this.style && this.style.wrap ? this.style.wrap : {};
    this.inputStyle = this.style && this.style.input ? this.style.input : {};
    this.labelStyle = this.style && this.style.label ? this.style.label : {};
    if (this.dragLabel) {
      this.labelStyle.cursor = 'ew-resize';
    }
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
          this.onChange.emit({
            data: { [this.label]: number + amount },
            $event,
          });
        } else {
          this.onChange.emit({ data: number + amount, $event });
        }

        if (isPercentage) {
          this.currentValue = `${number + amount}%`;
        } else {
          this.currentValue = number + amount;
        }
      }

      // Down
      if ($event.keyCode === 40) {
        if (this.label) {
          this.onChange.emit({
            data: { [this.label]: number - amount },
            $event,
          });
        } else {
          this.onChange.emit({ data: number - amount, $event });
        }

        if (isPercentage) {
          this.currentValue = `${number - amount}%`;
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
      this.onChange.emit({
        data: { [this.label]: $event.target.value },
        $event,
      });
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
  ngOnDestroy() {
    this.unsubscribe();
  }
  subscribe() {
    this.mousemove = fromEvent(document, 'mousemove').subscribe((ev: Event) =>
      this.handleDrag(ev),
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
  handleMousedown($event: Event) {
    if (this.dragLabel) {
      $event.preventDefault();
      this.handleDrag($event);
      this.subscribe();
    }
  }
  handleDrag($event) {
    if (this.dragLabel) {
      const newValue = Math.round(this.value + $event.movementX);
      if (newValue >= 0 && newValue <= this.dragMax) {
        this.onChange.emit({ data: { [this.label]: newValue }, $event });
      }
    }
  }
}

@NgModule({
  declarations: [EditableInputComponent],
  exports: [EditableInputComponent],
  imports: [CommonModule],
})
export class EditableInputModule {}
