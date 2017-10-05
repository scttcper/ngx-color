import { Component, Input, OnInit } from '@angular/core';

import { ColorWrap } from '../common/color-wrap.component';

@Component({
  selector: 'color-photoshop',
  template: `
  <div class="photoshop-picker">
    <div class="photoshop-head">{{ header }}</div>
    <div class="photoshop-body">
      <div class="photoshop-saturation">
        <color-saturation
          [hsl]="hsl"
          [hsv]="hsv"
          (onChange)="handleValueChange($event)"
        ></color-saturation>
      </div>
      <div class="photoshop-hue">
        <color-hue
          direction="vertical"
          [hsl]="hsl"
          [hidePointer]="true"
          (onChange)="handleValueChange($event)"
        ></color-hue>
      </div>
      <div class="photoshop-controls">
        <div class="photoshop-top">
          <div class="photoshop-previews">
            <color-photoshop-previews
              [rgb]="rgb"
              [currentColor]="currentColor"
            ></color-photoshop-previews>
          </div>
          <div class="photoshop-actions">
            <color-photoshop-button
              label="OK"
              [active]="true"
            ></color-photoshop-button>
            <color-photoshop-button
              label="Cancel"
            ></color-photoshop-button>
            <color-photoshop-fields
              [rgb]="rgb"
              [hex]="hex"
              [hsv]="hsv"
              (onChange)="handleValueChange($event)"
            ></color-photoshop-fields>
          </div>
        </div>
      </div>
    </div>
  </div>

  `,
  styles: [`
    .photoshop-picker {
      background: rgb(220, 220, 220);
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px;
      box-sizing: initial; width: 513px;
    }
    .photoshop-head {
      background-image: linear-gradient(
        -180deg,
        rgb(240, 240, 240) 0%,
        rgb(212, 212, 212) 100%
      );
      border-bottom: 1px solid rgb(177, 177, 177);
      box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset,
        rgba(0, 0, 0, 0.02) 0px -1px 0px 0px inset;
      height: 23px;
      line-height: 24px;
      border-radius: 4px 4px 0px 0px;
      font-size: 13px;
      color: rgb(77, 77, 77);
      text-align: center;
    }
    .photoshop-body {
      padding: 15px 15px 0px;
      display: flex;
    }
    .photoshop-saturation {
      width: 256px;
      height: 256px;
      position: relative;
      border-width: 2px;
      border-style: solid;
      border-color: rgb(179, 179, 179) rgb(179, 179, 179) rgb(240, 240, 240);
      border-image: initial;
      overflow: hidden;
    }
    .photoshop-hue {
      position: relative;
      height: 256px;
      width: 23px;
      margin-left: 10px;
      border-width: 2px;
      border-style: solid;
      border-color: rgb(179, 179, 179) rgb(179, 179, 179) rgb(240, 240, 240);
      border-image: initial;
    }
    .photoshop-controls {
      width: 180px;
      margin-left: 10px;
    }
    .photoshop-top {
      display: flex;
    }
    .photoshop-previews {
      width: 60px;
    }
    .photoshop-actions {
      -webkit-box-flex: 1;
      flex: 1 1 0%;
      margin-left: 20px;
    }
  `],
})
export class PhotoshopComponent extends ColorWrap implements OnInit {
  @Input() header = 'Color Picker';
  currentColor: string;
  constructor() {
    super();
  }

  handleValueChange({data, $event}) {
    this.handleChange(data, $event);
  }
}
