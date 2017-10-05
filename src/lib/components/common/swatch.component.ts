import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  NgZone,
} from '@angular/core';


@Component({
  selector: 'color-swatch',
  template: `
    <div
      class="swatch"
      [ngStyle]="(focus || inFocus) ? focusStyles : divStyles"
      [attr.title]="color"
      (click)="handleClick(color, $event)"
      (keydown.enter)="handleClick(color, $event)"
      (focus)="handleFocus()"
      (focusout)="handleFocusOut()"
      (mouseover)="handleHover(color, $event)"
      tabindex="0"
    >
      <ng-content></ng-content>
      <color-checkboard
        *ngIf="this.color === 'transparent'"
        boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
      ></color-checkboard>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwatchComponent implements OnInit {
  @Input() color;
  @Input() style = {};
  @Input() focusStyle = {};
  @Input() focus: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Output() onHover = new EventEmitter<any>();
  divStyles: any = {};
  focusStyles: any = {};
  inFocus = false;

  constructor(private ngZone: NgZone) { }

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
  handleFocusOut() {
    this.inFocus = false;
  }
  handleFocus() {
    this.inFocus = true;
  }
  handleHover(hex, $event) {
    this.ngZone.runOutsideAngular(() => {
      this.onHover.emit({hex, $event});
    });
  }
  handleClick(hex, $event) {
    this.ngZone.runOutsideAngular(() => {
      this.onClick.emit({hex, $event});
    });
  }
}
