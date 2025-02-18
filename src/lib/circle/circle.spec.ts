import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorCircleModule } from './circle.component';

describe('BlockComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CircleTestApp],
      imports: [ColorCircleModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(CircleTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.circle-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  });
});

@Component({
    selector: 'test-app',
    template: `<color-circle [className]="className"></color-circle>`,
    standalone: false
})
class CircleTestApp {
  className = 'classy';
}
