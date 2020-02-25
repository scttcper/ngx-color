import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorSliderModule } from './slider.component';

describe('SliderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderTestApp],
      imports: [ColorSliderModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, async(() => {
    const fixture = TestBed.createComponent(SliderTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.slider-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-slider [className]="className">
  </color-slider>
  `,
})
class SliderTestApp {
  className = 'classy';
}
