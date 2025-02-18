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

let nextUniqueId = 0;

@Component({
    selector: 'color-editable-input',
    template: `
    <div class="wrap" [ngStyle]="wrapStyle">
      <input
        [ngStyle]="inputStyle"
        spellCheck="false"
        [value]="currentValue"
        [placeholder]="placeholder"
        (keydown)="handleKeydown($event)"
        (keyup)="handleKeyup($event)"
        (focus)="handleFocus($event)"
        (focusout)="handleFocusOut($event)"
        [attr.aria-labelledby]="uniqueId"
        />
      @if (label) {
        <span [id]="uniqueId" [ngStyle]="labelStyle" (mousedown)="handleMousedown($event)">
          {{ label }}
        </span>
      }
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
    standalone: false
})
export class EditableInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() style!: {
    wrap?: Record<string, any>;
    input?: Record<string, any>;
    label?: Record<string, any>;
  };
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() arrowOffset!: number;
  @Input() dragLabel!: boolean;
  @Input() dragMax!: number;
  @Input() placeholder = '';
  @Output() onChange = new EventEmitter();
  currentValue!: string | number;
  blurValue!: string;
  wrapStyle!: Record<string, string>;
  inputStyle!: Record<string, string>;
  labelStyle!: Record<string, string>;
  focus = false;
  mousemove!: Subscription;
  mouseup!: Subscription;
  uniqueId: string = `editableInput-${++nextUniqueId}`;

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
    const num = Number(stringValue.replace(/%/g, ''));
    if (isNaN(num)) {
      return;
    }
    const amount = this.arrowOffset || 1;

    // Up
    if ($event.keyCode === 38) {
      if (this.label) {
        this.onChange.emit({
          data: { [this.label]: num + amount },
          $event,
        });
      } else {
        this.onChange.emit({ data: num + amount, $event });
      }

      if (isPercentage) {
        this.currentValue = `${num + amount}%`;
      } else {
        this.currentValue = num + amount;
      }
    }

    // Down
    if ($event.keyCode === 40) {
      if (this.label) {
        this.onChange.emit({
          data: { [this.label]: num - amount },
          $event,
        });
      } else {
        this.onChange.emit({ data: num - amount, $event });
      }

      if (isPercentage) {
        this.currentValue = `${num - amount}%`;
      } else {
        this.currentValue = num - amount;
      }
    }
  }
  handleKeyup($event) {
    if ($event.keyCode === 40 || $event.keyCode === 38) {
      return;
    }
    if (`${this.currentValue}` === $event.target.value) {
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
    this.mousemove = fromEvent(document, 'mousemove').subscribe((ev: Event) => this.handleDrag(ev));
    this.mouseup = fromEvent(document, 'mouseup').subscribe(() => this.unsubscribe());
  }
  unsubscribe() {
    this.mousemove?.unsubscribe();
    this.mouseup?.unsubscribe();
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
