import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorSketchModule } from './sketch.component';

describe('SketchComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SketchTestApp],
      imports: [ColorSketchModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, waitForAsync(() => {
    const fixture = TestBed.createComponent(SketchTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.sketch-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-sketch [className]="className">
  </color-sketch>
  `,
})
class SketchTestApp {
  className = 'classy';
}
