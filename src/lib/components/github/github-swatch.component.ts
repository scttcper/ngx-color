import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'color-github-swatch',
  template: `
  <div class="github-swatch">
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
  styles: [
    `
    .github-swatch {
      width: 25px;
      height: 25px;
      font-size: 0;
    }
    .github-swatch:hover {
      position: relative;
      z-index: 2;
      outline: 2px solid #fff;
      box-shadow: 0 0 5px 2px rgba(0,0,0,0.25);
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class GithubSwatchComponent {
  @Input() color: string;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  swatchStyle: { [key: string]: string };

  constructor() {}

  handleClick({ hex, $event }) {
    this.onClick.emit({ hex, $event });
  }
}
