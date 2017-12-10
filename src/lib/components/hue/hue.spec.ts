import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorHueModule } from './hue-picker.component';

describe('HuePickerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HueTestApp],
      imports: [ColorHueModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, async(() => {
    const fixture = TestBed.createComponent(HueTestApp);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.hue-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-hue-picker [className]="className">
  </color-hue-picker>
  `,
})
class HueTestApp {
  className = '';
}
