import { copySync } from 'fs-extra';
import { ngPackagr } from 'ng-packagr';
import { join } from 'path';
import * as del from 'del';

const MODULE_NAMES = [
  'alpha',
  'block',
  'chrome',
  'circle',
  'compact',
  'github',
  'hue',
  'material',
  'photoshop',
  'sketch',
  'slider',
  'swatches',
  'twitter',
  'shade',
];

async function main() {
  // cleanup dist
  del.sync(join(process.cwd(), '/dist'));
  del.sync(join(process.cwd(), '/node_modules/ngx-color'));

  await ngPackagr()
    .forProject(join(process.cwd(), 'src/lib/common/package.json'))
    .build();

  // put it in node modules so the path resolves
  // proper path support eventually
  copySync(
    join(process.cwd(), '/dist/common'),
    join(process.cwd(), '/node_modules/ngx-color'),
  );
  copySync(
    join(process.cwd(), '/dist/common'),
    join(process.cwd(), '/dist/packages-dist'),
  );

  // build each package
  for (const m of MODULE_NAMES) {
    await ngPackagr()
      .forProject(join(process.cwd(), `src/lib/components/${m}/package.json`))
      .build();
  }

  copySync('README.md', join(process.cwd(), 'dist/packages-dist/README.md'));
  copySync('LICENSE', join(process.cwd(), 'dist/packages-dist/LICENSE'));
}

main()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });


