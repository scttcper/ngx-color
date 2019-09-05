import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorShadeModule, ShadeSliderComponent } from './shade-picker.component';

export const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
};


describe('AlphaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorShadeSliderApp],
      imports: [ColorShadeModule],
    });

    TestBed.compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(ShadeSliderComponent);
    const testComponent = fixture.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.shade-slider'));
    expect(div.nativeElement.classList.contains('classy')).toBe(true);
  });
});


@Component({
  selector: 'test-app',
  template: `
  <color-shade-picker
    [className]="className"
  >
  </color-shade-picker>
  `,
})
class ColorShadeSliderApp {
  className = '';
}
