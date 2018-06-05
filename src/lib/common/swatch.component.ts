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
  <div class="swatch"
    [ngStyle]="activeStyles()" [attr.title]="color"
    (click)="handleClick(color, $event)"
    (keydown.enter)="handleClick(color, $event)"
    (focus)="handleFocus()"
    (focusout)="handleFocusOut()"
    (mouseover)="handleHover(color, $event)"
    tabindex="0"
  >
    <ng-content></ng-content>
    <color-checkboard
      *ngIf="color === 'transparent'"
      boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
    ></color-checkboard>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SwatchComponent implements OnInit {
  @Input() color;
  @Input() style: { [key: string]: string } = {};
  @Input() focusStyle: { [key: string]: string } = {};
  @Input() focus: boolean;
  @Output() onClick = new EventEmitter<{ hex: string, $event: Event}>();
  @Output() onHover = new EventEmitter<{ hex: string, $event: Event}>();
  divStyles: {[key: string]: string} = {};
  focusStyles: {[key: string]: string} = {};
  inFocus = false;

  ngOnInit() {
    this.divStyles = {
      background: this.color,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      ...this.style,
    };
    this.focusStyles = {
      ...this.divStyles,
      ...this.focusStyle,
    };
  }
  activeStyles() {
    return this.focus || this.inFocus ? this.focusStyles : this.divStyles;
  }
  handleFocusOut() {
    this.inFocus = false;
  }
  handleFocus() {
    this.inFocus = true;
  }
  handleHover(hex, $event) {
    this.onHover.emit({ hex, $event });
  }
  handleClick(hex, $event) {
    this.onClick.emit({ hex, $event });
  }
}

@NgModule({
  declarations: [SwatchComponent],
  exports: [SwatchComponent],
  imports: [CommonModule, CheckboardModule],
})
export class SwatchModule {}
