import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorSwatchesModule } from './swatches.component';

describe('SwatchesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwatchTestApp],
      imports: [ColorSwatchesModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, async(() => {
    const fixture = TestBed.createComponent(SwatchTestApp);
    fixture.detectChanges();
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.swatches-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
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
  className = '';
}
