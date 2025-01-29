import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorMaterialModule } from './material.component';

describe('MaterialComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTestApp],
      imports: [ColorMaterialModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(MaterialTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.material-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  });
});

@Component({
    selector: 'test-app',
    template: `
  <color-material [className]="className">
  </color-material>
  `,
    standalone: false
})
class MaterialTestApp {
  className = 'classy';
}
