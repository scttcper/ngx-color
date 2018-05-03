import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';

import { getCheckerboard } from './helpers/checkboard';

@Component({
  selector: 'color-checkboard',
  template: `<div class="grid" [ngStyle]="gridStyles"></div>`,
  styles: [
    `
  .grid {
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    position: absolute;
  }
  `,
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboardComponent implements OnInit {
  @Input() white = 'transparent';
  @Input() size = 8;
  @Input() grey = 'rgba(0,0,0,.08)';
  @Input() boxShadow: string;
  @Input() borderRadius: string;
  gridStyles: { [key: string]: string };

  ngOnInit() {
    const background = getCheckerboard(this.white, this.grey, this.size);
    this.gridStyles = {
      borderRadius: this.borderRadius,
      boxShadow: this.boxShadow,
      background: `url(${background}) center left`,
    };
  }
}

@NgModule({
  declarations: [CheckboardComponent],
  exports: [CheckboardComponent],
  imports: [CommonModule],
})
export class CheckboardModule {}
