import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


import { AlphaPickerComponent, ColorAlphaModule } from './alpha-picker.component';

export const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
};


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
  // it(`should change alpha on mousedown`, () => {
  //   const fixture = TestBed.createComponent(AlphaPickerComponent);
  //   const component = fixture.componentInstance;
  //   component.width = 20;
  //   component.height = 200;
  //   component.color = red.hsl;
  //   fixture.detectChanges();
  //   const $event = new MouseEvent('mousedown', {
  //     bubbles: true,
  //     cancelable: true,
  //     view: window,
  //     clientX: 0,
  //     clientY: 0,
  //   });
  //   fixture.detectChanges();
  //   expect(component.hsl.a).toEqual(0);
  // });
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
