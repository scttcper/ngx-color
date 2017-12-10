import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorBlockModule } from './block.component';

describe('BlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockTestApp],
      imports: [ColorBlockModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, async(() => {
    const fixture = TestBed.createComponent(BlockTestApp);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.block-card'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-block [className]="className">
  </color-block>
  `,
})
class BlockTestApp {
  className = '';
}
