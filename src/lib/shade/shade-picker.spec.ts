import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ColorShadeModule } from './shade-picker.component';

export const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
};

describe('AlphaComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ColorShadeSliderApp],
      imports: [ColorShadeModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(ColorShadeSliderApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.shade-slider').className).toContain('classy');
  });
});

@Component({
    selector: 'test-app',
    template: `<color-shade-picker [className]="className"></color-shade-picker>`,
    standalone: false
})
class ColorShadeSliderApp {
  className = 'classy';
}
