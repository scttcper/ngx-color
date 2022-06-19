import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorTwitterModule } from './twitter.component';

describe('TwitterComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterTestApp],
      imports: [ColorTwitterModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(TwitterTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.twitter-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  });
});

@Component({
  selector: 'test-app',
  template: `<color-twitter [className]="className"></color-twitter>`,
})
class TwitterTestApp {
  className = 'classy';
}
