import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';


@Component({
  selector: 'color-photoshop-button',
  template: `
    <div class="photoshop-button" (click)="click.emit($event)" [class.active]="active">
      {{ label }}
    </div>
  `,
  styles: [`
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
  `],
})
export class PhotoshopButtonComponent implements OnInit, OnChanges {
  @Input() label = '';
  @Input() active = false;
  @Output() click = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
  }

}
