import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorSliderModule } from './slider.component';

describe('SliderComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SliderTestApp],
      imports: [ColorSliderModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, waitForAsync(() => {
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
