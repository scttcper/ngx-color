import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorPhotoshopModule } from './photoshop.component';

describe('PhotoshopComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoshopTestApp],
      imports: [ColorPhotoshopModule],
    }).compileComponents();
  }));
  it('should apply className to root element', async(() => {
    const fixture = TestBed.createComponent(PhotoshopTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.photoshop-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-photoshop [className]="className"></color-photoshop>
  `,
})
class PhotoshopTestApp {
  className = 'classy';
}
