import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer mb-4 mt-5">
      Angular {{ version }}
      <br />
      Released under the
      <a href="https://github.com/typectrl/ngx-codemirror/blob/master/LICENSE">MIT</a>
      license
    </footer>
  `,
  styles: [
    `
      .footer {
        line-height: 2;
        text-align: center;
        font-size: 70%;
        color: #999;
        font-family: var(--font-family-monospace);
      }
    `,
  ],
  standalone: false,
})
export class FooterComponent {
  version = VERSION.full;
}
