import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorMaterialModule } from './material.component';

describe('MaterialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTestApp],
      imports: [ColorMaterialModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, async(() => {
    const fixture = TestBed.createComponent(MaterialTestApp);
    fixture.detectChanges();
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.material-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-material [className]="className">
  </color-material>
  `,
})
class MaterialTestApp {
  className = '';
}
