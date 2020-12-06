import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorCompactModule } from './compact.component';

describe('CompactComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompactTestApp],
      imports: [ColorCompactModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, waitForAsync(() => {
    const fixture = TestBed.createComponent(CompactTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.compact-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-compact [className]="className">
  </color-compact>
  `,
})
class CompactTestApp {
  className = 'classy';
}
