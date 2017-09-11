import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-swatch',
  template: `
    <div
      class="swatch"
      [ngStyle]="divStyles"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus(color)"
      (focusout)="handleFocusOut(color)"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
      <color-checkboard
        *ngIf="transparent"
        boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
      ></color-checkboard>
    </div>
  `,
})
export class SwatchComponent implements OnInit, OnChanges {
  @Input() color;
  @Input() style = {};
  @Input() focusStyle = {};
  @Output() onClick = new EventEmitter<any>();
  @Output() onHover = new EventEmitter<any>();
  unfocusStyles;
  divStyles;
  focusStyles;
  transparent = false;
  focus = false;

  constructor() { }

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
  handleFocusOut(color) {
    this.divStyles = this.unfocusStyles;
  }
  handleFocus(color) {
    this.unfocusStyles = this.divStyles;
    this.divStyles = this.focusStyles;
    this.focus = true;
  }
  handleHover(hex, $event) {
    this.onHover.emit({hex, $event});
  }
  handleClick(hex, $event) {
    this.onClick.emit({hex, $event});
  }
  ngOnChanges() {
    this.transparent = this.color === 'transparent';
  }

}
