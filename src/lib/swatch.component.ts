import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';

import { CheckboardModule } from './checkboard.component';

@Component({
  selector: 'color-swatch',
  template: `
    <div
      class="swatch"
      [ngStyle]="currentStyles()"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus()"
      (blur)="handleFocusOut()"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
      @if (color === 'transparent') {
        <color-checkboard boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"></color-checkboard>
      }
    </div>
  `,
  styles: [
    `
      .swatch {
        outline: none;
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SwatchComponent implements OnInit {
  @Input() color!: string;
  @Input() style: Record<string, string> = {};
  @Input() focusStyle: Record<string, string> = {};
  @Input() focus!: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Output() onHover = new EventEmitter<any>();
  divStyles: Record<string, string> = {};
  focusStyles: Record<string, string> = {};
  inFocus = false;

  ngOnInit() {
    this.divStyles = {
      background: this.color as string,
      ...this.style,
    };
  }
  currentStyles() {
    this.focusStyles = {
      ...this.divStyles,
      ...this.focusStyle,
    };
    return this.focus || this.inFocus ? this.focusStyles : this.divStyles;
  }
  handleFocusOut() {
    this.inFocus = false;
  }
  handleFocus() {
    this.inFocus = true;
  }
  handleHover(hex: string, $event) {
    this.onHover.emit({ hex, $event });
  }
  handleClick(hex: string, $event) {
    this.onClick.emit({ hex, $event });
  }
}

@NgModule({
  declarations: [SwatchComponent],
  exports: [SwatchComponent],
  imports: [CommonModule, CheckboardModule],
})
export class SwatchModule {}
