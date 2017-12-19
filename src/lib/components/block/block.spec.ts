import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BlockComponent, ColorBlockModule } from './block.component';

describe('BlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockTestApp],
      imports: [ColorBlockModule],
    });

    TestBed.compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(BlockTestApp);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.block-card'));
    expect(div.nativeElement.classList.contains('classy')).toBe(true);
  });
  it(`should change color on swatch click`, () => {
    const fixture = TestBed.createComponent(BlockComponent);
    const component = fixture.componentInstance;
    component.colors = ['#000000'];
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.swatch'));
    div.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.hex).toEqual('#000000');
  });
  it(`should change color on input`, () => {
    const fixture = TestBed.createComponent(BlockComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = '#FFFFFF';
    inputElement.nativeElement.dispatchEvent(new Event('keydown'));
    inputElement.nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.hex).toEqual('#ffffff');
  });
});

@Component({
  selector: 'test-app',
  template: `
  <color-block
    [className]="className"
  >
  </color-block>
  `,
})
class BlockTestApp {
  className = '';
}
