import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'color-circle-swatch',
  template: `
  <div class="circle-swatch"
    [style.width.px]="circleSize" [style.height.px]="circleSize"
    [style.margin-right.px]="circleSpacing" [style.margin-bottom.px]="circleSpacing"
    >
    <color-swatch class="swatch"
      [color]="color" [style]="swatchStyle" [focus]="focus" [focusStyle]="focusStyle"
      (onClick)="handleClick($event)" (onHover)="onSwatchHover.emit($event)">
    </color-swatch>
    <div class="clear"></div>
  </div>
  `,
  styles: [
    `
  .circle-swatch {
    transform: scale(1);
    transition: transform 100ms ease;
  }
  .circle-swatch:hover {
    transform: scale(1.2);
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class CircleSwatchComponent implements OnChanges {
  @Input() color: string;
  @Input() circleSize = 28;
  @Input() circleSpacing = 14;
  @Input() focus = false;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  focusStyle: { [key: string]: string };
  swatchStyle: { [key: string]: string } = {
    borderRadius: '50%',
    background: 'transparent',
    transition: '100ms box-shadow ease',
  };

  ngOnChanges() {
    this.focusStyle = {
      boxShadow: `${this.color} 0px 0px 0px 3px inset`,
    };
    this.swatchStyle.boxShadow = `inset 0 0 0 ${this.circleSize / 2}px ${this.color}`;
  }
  handleClick({ hex, $event }) {
    this.onClick.emit({ hex, $event });
  }
}
