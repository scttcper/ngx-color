import { async, TestBed } from '@angular/core/testing';

import { calculateAlphaChange } from 'ngx-color/helpers';
import { red } from '../../helpers/color';
import { AlphaPickerComponent } from './alpha-picker.component';
import { ColorAlphaModule } from './alpha.module';

describe('AlphaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ColorAlphaModule],
    }).compileComponents();
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
    const data = calculateAlphaChange($event, component, fixture.nativeElement.querySelector('.color-alpha-picker'));
    component.handleChange(data, $event);
    fixture.detectChanges();
    expect(component.hsl.a).toEqual(0);
  }));
});
