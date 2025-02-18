import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorChromeModule } from './chrome.component';

describe('BlockComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChromeTestApp],
      imports: [ColorChromeModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(ChromeTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.chrome-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  });
});

@Component({
  selector: 'test-app',
  template: `<color-chrome [className]="className"></color-chrome>`,
  standalone: false,
})
class ChromeTestApp {
  className = 'classy';
}
