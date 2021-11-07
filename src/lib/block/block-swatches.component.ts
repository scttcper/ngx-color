import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'color-block-swatches',
  template: `
    <div class="block-swatches">
      <color-swatch
        *ngFor="let c of colors"
        [color]="c"
        [style]="swatchStyle"
        [focusStyle]="focusStyle(c)"
        (onClick)="handleClick($event)"
        (onHover)="onSwatchHover.emit($event)"
      ></color-swatch>
      <div class="clear"></div>
    </div>
  `,
  styles: [`
    .block-swatches {
      margin-right: -10px;
    }
    .clear {
      clear: both;
    }
  `],
})
export class BlockSwatchesComponent {
  @Input() colors!: string[];
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();

  swatchStyle = {
    width: '22px',
    height: '22px',
    float: 'left',
    marginRight: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
  };

  handleClick({hex, $event}) {
    this.onClick.emit({hex, $event});
  }
  focusStyle(c) {
    return {
      boxShadow: `${ c } 0 0 4px`,
    };
  }

}
