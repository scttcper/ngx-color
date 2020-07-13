import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Shape } from 'ngx-color';

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
export class BlockSwatchesComponent implements OnInit {
  @Input() colors!: string[] | Shape[];
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  swatchStyle?: {[key: string]: string};

  constructor() { }

  ngOnInit() {
    this.swatchStyle = {
      width: '22px',
      height: '22px',
      float: 'left',
      marginRight: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
    };
  }
  handleClick({hex, $event}) {
    this.onClick.emit({hex, $event});
  }
  focusStyle(c) {
    return {
      boxShadow: `${ c } 0 0 4px`,
    };
  }

}
