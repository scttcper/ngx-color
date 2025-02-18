import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'color-swatches-group',
    template: `
    <div class="swatches-group">
      @for (color of group; track color; let idx = $index) {
        <color-swatches-color
          [active]="color.toLowerCase() === active"
          [color]="color"
          [first]="idx === 0"
          [last]="idx === group.length - 1"
          (onClick)="onClick.emit($event)"
          >
      </color-swatches-color>
    }
    </div>
    `,
    styles: [
        `
      .swatches-group {
        padding-bottom: 10px;
        width: 40px;
        float: left;
        margin-right: 10px;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    standalone: false
})
export class SwatchesGroupComponent {
  @Input() group!: string[];
  @Input() active!: string;
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
}
