import { each } from 'lodash-es';
import * as _tinycolor from 'tinycolor2';

import { Color } from './color.interfaces';

const tinycolor = _tinycolor;

export function simpleCheckForValidColor(data) {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
  let checked = 0;
  let passed = 0;
  each(keysToCheck, letter => {
    if (data[letter]) {
      checked += 1;
      if (!isNaN(data[letter])) {
        passed += 1;
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/;
        if (percentPatt.test(data[letter])) {
          passed += 1;
        }
      }
    }
  });
  return checked === passed ? data : false;
}

export function toState(data, oldHue: number): Color {
  const color = data.hex ? tinycolor(data.hex) : tinycolor(data);
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const rgb = color.toRgb();
  const hex = color.toHex();
  if (hsl.s === 0) {
    hsl.h = oldHue || 0;
    hsv.h = oldHue || 0;
  }
  const transparent = hex === '000000' && rgb.a === 0;

  return {
    hsl,
    hex: transparent ? 'transparent' : `#${hex}`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  };
}

export function isValidHex(hex: string) {
  return tinycolor(hex).isValid();
}


export const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
};
