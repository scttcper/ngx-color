<div align="center">
  <img src="https://raw.githubusercontent.com/scttcper/ngx-color/master/misc/sketch-example.png" width="225" alt="Angular color sketch preview">
  <br>
  <h1>Angular Color</h1>
  <br>
  <a href="https://www.npmjs.org/package/ngx-color">
    <img src="https://badge.fury.io/js/ngx-color.svg" alt="npm">
  </a> 
  <a href="https://circleci.com/gh/scttcper/ngx-color">
    <img src="https://circleci.com/gh/scttcper/ngx-color.svg?style=svg" alt="circleci"></a> 
  <a href="https://codecov.io/github/scttcper/ngx-color">
    <img src="https://img.shields.io/codecov/c/github/scttcper/ngx-color.svg" alt="codecov">
  </a>
</div>

<br>
<br>

DEMO: https://ngx-color.netlify.com/  

- [Component API](#component-api)
  - [Color](#color)
  - [onChange](#onchange)
  - [onChangeComplete](#onchangecomplete)
  - [Individual APIs](#individual-apis)
    - [Alpha](#alpha)
    - [Block](#block)
    - [Chrome](#chrome)
    - [Circle](#circle)
    - [Compact](#compact)
    - [Github](#github)
    - [Hue](#hue)
    - [Material](#material)
    - [Photoshop](#photoshop)
    - [Sketch](#sketch)
    - [Slider](#slider)
    - [Swatches](#swatches)
    - [Twitter](#twitter)
    - [Shade](#shade)

## About

* **13 Different Pickers** - Sketch, Photoshop, Chrome, Twitter and many more

* **Make Your Own** - Use the building block components to make your own

* This is a port of [react-color](https://github.com/casesandberg/react-color)
  by casesandberg

## Getting Started

### Install

```sh
npm install ngx-color --save
```

### Include Component

##### import

```ts
import { ColorSketchModule } from 'ngx-color/sketch';

@NgModule({
  imports: [
    ColorSketchModule, // added to imports
  ],
})
class YourModule {}
```

##### use

```html
<color-sketch [color]="state" (onChangeComplete)="changeComplete($event)"></color-sketch>
```

### Others available

```ts
import { ColorAlphaModule } from 'ngx-color/alpha'; // <color-alpha-picker></color-alpha-picker>
import { ColorBlockModule } from 'ngx-color/block'; // <color-block></color-block>
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { ColorCircleModule } from 'ngx-color/circle'; // <color-circle></color-circle>
import { ColorCompactModule } from 'ngx-color/compact'; // <color-compact></color-compact>
import { ColorGithubModule } from 'ngx-color/github'; // <color-github></color-github>
import { ColorHueModule } from 'ngx-color/hue'; // <color-hue-picker></color-hue-picker>
import { ColorMaterialModule } from 'ngx-color/material'; // <color-material></color-material>
import { ColorPhotoshopModule } from 'ngx-color/photoshop'; // <color-photoshop></color-photoshop>
import { ColorSketchModule } from 'ngx-color/sketch'; // <color-sketch></color-sketch>
import { ColorSliderModule } from 'ngx-color/slider'; // <color-slider></color-slider>
import { ColorSwatchesModule } from 'ngx-color/swatches'; // <color-swatches></color-swatches>
import { ColorTwitterModule } from 'ngx-color/twitter'; // <color-twitter></color-twitter>
import { ColorShadeModule } from 'ngx-color/shade'; // <color-shade-picker></color-shade-picker>
```

# Component API

## Color

Color controls what color is active on the color picker. You can use this to
initialize the color picker with a particular color, or to keep it in sync with
the state of a parent component.

Color accepts either a string of a hex color `'#333'` or a object of rgb or hsl
values `{ r: 51, g: 51, b: 51 }` or `{ h: 0, s: 0, l: .10 }`. Both rgb and hsl
will also take a `a: 1` value for alpha. You can also use `transparent`.

```html
<color-sketch
  color="#fff"
  (onChangeComplete)="handleChangeComplete($event)"
></color-sketch>
```

In this case, the color picker will initialize with the color `#fff`. When the
color is changed, `handleChangeComplete` will fire and set the new color to
state.

## onChange

Pass a function to call every time the color is changed. Use this to store the
color in the state of a parent component or to make other transformations.

Keep in mind this is called on drag events that can happen quite frequently. If
you just need to get the color once use `onChangeComplete`.

```ts
import { Component } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'selector-name',
  template: `
  <color-sketch (onChange)="handleChange($event)"></color-sketch>
  `,
})
export class NameComponent {
  constructor() {}

  handleChange($event: ColorEvent) {
    console.log($event.color);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  }
}
```

## onChangeComplete

Pass a function to call once a color change is complete.

## Individual APIs

Some pickers have specific APIs that are unique to themselves:

### Alpha

* **width** - String | Number, Pixel value for picker width. Default `316px`
* **height** - String | Number, Pixel value for picker height. Default `16px`
* **direction** - String, `horizontal` or `vertical`. Default `horizontal`

### Block

* **width** - string | number, Pixel value for picker width. Default `170px`
* **colors** - Array of Strings, Color squares to display. Default `['#D9E3F0',
  '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65',
  '#ba68c8']`
* **triangle** - String, Either `hide` or `top`. Default `top`
* **onSwatchHover** - (Output) An event handler for `onMouseOver` on the
  `<Swatch>`s within this component. Gives the args `(color, event)`

### Chrome

* **disableAlpha** - Bool, Remove alpha slider and options from picker. Default
  `false`

### Circle

* **width** - String | number, Pixel value for picker width. Default `252px`
* **colors** - Array of Strings, Color squares to display. Default `["#f44336",
  "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
  "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
  "#ff5722", "#795548", "#607d8b"]`
* **circleSize** - Number, Value for circle size. Default `28`
* **circleSpacing** - Number, Value for spacing between circles. Default `14`
* **onSwatchHover** - (Output) An event handler for `onMouseOver` on the
  `<Swatch>`s within this component. Gives the args `(color, event)`

### Compact

* **colors** - Array of Strings, Color squares to display. Default `['#4D4D4D',
  '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00',
  '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc',
  '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0',
  '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100',
  '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']`
* **onSwatchHover** - (Output) An event handler for `onMouseOver` on the
  `<Swatch>`s within this component. Gives the args `(color, event)`

### Github

* **width** - string | number, Pixel value for picker width. Default `212px`
* **colors** - Array of Strings, Color squares to display. Default `['#B80000',
  '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
  '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3',
  '#D4C4FB']`
* **triangle** - String, Either `hide`, `top-left` or `top-right`. Default
  `top-left`
* **onSwatchHover** - (Output) An event handler for `onMouseOver` on the
  `<Swatch>`s within this component. Gives the args `(color, event)`

### Hue

* **width** - string | number, Pixel value for picker width. Default `316px`
* **height** - string | number, Pixel value for picker height. Default `16px`
* **direction** - String Enum, `horizontal` or `vertical`. Default `horizontal`

### Material

None

### Photoshop

* **header** - String, Title text. Default `Color Picker`
* **onAccept** - (Output), Callback for when accept is clicked.
* **onCancel** - (Output), Callback for when cancel is clicked.

### Sketch

* **disableAlpha** - Bool, Remove alpha slider and options from picker. Default
  `false`
* **presetColors** - Array of Strings or Objects, Hex strings for default colors
  at bottom of picker. Default `['#D0021B', '#F5A623', '#F8E71C', '#8B572A',
  '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986',
  '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']`
  > **presetColors** may also be described as an array of objects with `color`
  > and `title` properties: `[{ color: '#f00', title: 'red' }]` or a combination
  > of both
* **width** - Number, Width of picker. Default `200`
* **onSwatchHover** - An event handler for `onMouseOver` on the `<Swatch>`s
  within this component. Gives the args `(color, event)`

### Slider

* **pointer** - React Component, Custom pointer component

### Swatches

* **width** - string | number, Pixel value for picker width. Default `320`
* **height** - string | number, Pixel value for picker height. Default `240`
* **colors** - Array of Arrays of Strings, An array of color groups, each with
  an array of colors
* **onSwatchHover** - (Output) An event handler for `onMouseOver` on the
  `<Swatch>`s within this component. Gives the args `(color, event)`

### Twitter

* **width** - string | number, Pixel value for picker width. Default `276px`
* **colors** - Array of Strings, Color squares to display. Default `['#FF6900',
  '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C',
  '#F78DA7', '#9900EF']`
* **triangle** - String, Either `hide`, `top-left` or `top-right`. Default
  `top-left`
* **onSwatchHover** - (Output) An event handler for `onMouseOver` on the
  `<Swatch>`s within this component. Gives the args `(color, event)`

### Shade

* **width** - String | Number, Pixel value for picker width. Default `316px`
* **height** - String | Number, Pixel value for picker height. Default `16px`

---

> GitHub [@scttcper](https://github.com/scttcper) &nbsp;&middot;&nbsp;
> Twitter [@scttcper](https://twitter.com/scttcper)
