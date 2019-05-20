import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'color-photoshop-button',
  template: `
    <div class="photoshop-button"  [class.active]="active"
      (click)="onClick.emit($event)"
    >
      {{ label }}
    </div>
  `,
  styles: [
    `
    .photoshop-button {
      background-image: linear-gradient(
        -180deg,
        rgb(255, 255, 255) 0%,
        rgb(230, 230, 230) 100%
      );
      border: 1px solid rgb(135, 135, 135);
      border-radius: 2px;
      height: 22px;
      box-shadow: rgb(234, 234, 234) 0px 1px 0px 0px;
      font-size: 14px;
      color: rgb(0, 0, 0);
      line-height: 20px;
      text-align: center;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .photoshop-button.active {
      box-shadow: 0 0 0 1px #878787;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class PhotoshopButtonComponent {
  @Input() label = '';
  @Input() active = false;
  @Output() onClick = new EventEmitter<Event>();
}
