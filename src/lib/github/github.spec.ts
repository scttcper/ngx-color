import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorGithubModule } from './github.component';

describe('BlockComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GithubTestApp],
      imports: [ColorGithubModule],
    }).compileComponents();
  }));
  it(`should apply className to root element`, waitForAsync(() => {
    const fixture = TestBed.createComponent(GithubTestApp);
    fixture.detectChanges();
    const divDebugElement = fixture.debugElement.query(By.css('.github-picker'));
    expect(divDebugElement.nativeElement.classList.contains('classy')).toBe(true);
  }));
});

@Component({
  selector: 'test-app',
  template: `
  <color-github [className]="className">
  </color-github>
  `,
})
class GithubTestApp {
  className = 'classy';
}
