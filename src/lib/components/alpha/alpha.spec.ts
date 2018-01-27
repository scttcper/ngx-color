import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { calculateAlphaChange } from 'ngx-color';
import { red } from '../../common/helpers/color';
import { AlphaPickerComponent, ColorAlphaModule } from './alpha-picker.component';

describe('AlphaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlphaTestApp],
      imports: [ColorAlphaModule],
    });

    TestBed.compileComponents();
  }));
  it(`should apply className to root element`, () => {
    const fixture = TestBed.createComponent(AlphaPickerComponent);
    const testComponent = fixture.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.alpha-picker'));
    expect(div.nativeElement.classList.contains('classy')).toBe(true);
  });
  it(`should draw vertical`, () => {
    const fixture = TestBed.createComponent(AlphaTestApp);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    testComponent.direction = 'vertical';
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.alpha-container'));
    expect(div.nativeElement.classList.contains('color-alpha-vertical')).toBe(true);
  });
  it(`should change alpha on mousedown`, () => {
    const fixture = TestBed.createComponent(AlphaPickerComponent);
    const component = fixture.componentInstance;
    component.width = 20;
    component.height = 200;
    component.color = red.hsl;
    fixture.detectChanges();
    const $event = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 0,
      clientY: 0,
    });
    const data = calculateAlphaChange(
      $event,
      component,
      fixture.
      nativeElement.querySelector('.alpha-picker'),
    );
    component.handlePickerChange({ data, $event });
    fixture.detectChanges();
    expect(component.hsl.a).toEqual(0);
  });
});


@Component({
  selector: 'test-app',
  template: `
  <color-alpha-picker
    [className]="className"
    [direction]="direction"
  >
  </color-alpha-picker>
  `,
})
class AlphaTestApp {
  className = '';
  direction = 'horizontal';
}
