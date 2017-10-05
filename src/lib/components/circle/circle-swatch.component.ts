import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'color-circle-swatch',
  template: `
    <div class="circle-swatch"
      [style.width.px]="circleSize" [style.height.px]="circleSize"
      [style.margin-right.px]="circleSpacing" [style.margin-bottom.px]="circleSpacing"
    >
      <color-swatch
        [color]="color"
        [style]="swatchStyle"
        (onClick)="handleClick($event)"
        (onHover)="onSwatchHover.emit($event)"
        class="swatch"
      ></color-swatch>
      <div class="clear"></div>
    </div>
  `,
  styles: [`
    .color-swatch {
      transform: scale(1);
      transition: 100ms transform ease;
    }
    .color-swatch:hover {
      transform: scale(1.2);
    }
  `],
})
export class CircleSwatchComponent implements OnInit, OnChanges {
  @Input() color: string;
  @Input() circleSize = 28;
  @Input() circleSpacing = 14;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();

  swatchStyle = {
    'border-radius': '50%',
    background: 'transparent',
    transition: '100ms box-shadow ease',
  };

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.swatchStyle['box-shadow'] = `inset 0 0 0 ${ this.circleSize / 2 }px ${ this.color }`;
  }
  handleClick({hex, $event}) {
    this.onClick.emit({hex, $event});
  }

}
