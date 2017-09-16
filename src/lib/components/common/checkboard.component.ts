import { Component, OnInit, Input } from '@angular/core';

import * as checkboard from '../../helpers/checkboard';

@Component({
  selector: 'color-checkboard',
  template: `
    <div class="grid" [ngStyle]="gridStyles"></div>
  `,
  styles: [`
    .grid {
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      position: absolute;
    }
  `],
})
export class CheckboardComponent implements OnInit {
  @Input() white = 'transparent';
  @Input() size = 8;
  @Input() grey = 'rgba(0,0,0,.08)';
  @Input() boxShadow: any;
  @Input() borderRadius: any;
  gridStyles: {[key: string]: string};

  constructor() { }

  ngOnInit() {
    const background = checkboard.get(this.white, this.grey, this.size);
    this.gridStyles = {
      'border-radius': this.borderRadius,
      'box-shadow': this.boxShadow,
      background: `url(${ background }) center left`
    };
  }

}
