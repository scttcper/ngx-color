import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ColorSwatchesModule } from './swatches.component';

describe('SwatchesComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwatchTestApp],
      imports: [ColorSwatchesModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, waitForAsync(() => {
    const fixture = TestBed.createComponent(SwatchTestApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.swatches-picker').className).toContain('classy');
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-swatches [className]="className">
  </color-swatches>
  `,
})
class SwatchTestApp {
  className = 'classy';
}
