import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-swatch',
  template: `
    <div
      class="swatch"
      [ngStyle]="divStyle"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      tab-index="0"
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
  @Input() style;
  @Output() onClick = new EventEmitter<any>();
  divStyle;
  transparent = false;

  constructor() { }

  ngOnInit() {
    this.divStyle = {
      background: this.color,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      ...this.style,
    };
  }
  handleClick(hex, $event) {
    this.onClick.emit({hex, $event});
  }
  ngOnChanges() {
    this.transparent = this.color === 'transparent';
  }

}
