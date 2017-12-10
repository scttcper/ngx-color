import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { calculateAlphaChange } from 'ngx-color/helpers';
import { red } from '../../helpers/color';
import { AlphaPickerComponent, ColorAlphaModule } from './alpha-picker.component';

describe('AlphaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlphaTestApp],
      imports: [ColorAlphaModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, async(() => {
    const fixture = TestBed.createComponent(AlphaTestApp);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.className = 'classy';
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.alpha-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
  it(`should change alpha on mousedown`, async(() => {
    const fixture = TestBed.createComponent(AlphaPickerComponent);
    const component: AlphaPickerComponent = fixture.debugElement.componentInstance;
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
    component.handleChange(data, $event);
    fixture.detectChanges();
    expect(component.hsl.a).toEqual(0);
  }));
});


@Component({
  selector: 'test-app',
  template: `
  <color-alpha-picker [className]="className">
  </color-alpha-picker>
  `,
})
class AlphaTestApp {
  className = '';
}
