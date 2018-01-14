import { copySync } from 'fs-extra';
import { build } from 'ng-packagr';
import { join } from 'path';
import * as rimraf from 'rimraf';


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
];

async function main() {
  // cleanup dist
  rimraf.sync(join(process.cwd(), '/dist'));


  // make helpers
  await build({
    project: join(process.cwd(), '/src/lib/helpers/package.json')
  });
  copySync(
    join(process.cwd(), '/dist/helpers'),
    join(process.cwd(), '/dist/packages-dist/helpers'),
  );

  // make common
  rimraf.sync(join(process.cwd(), '/src/lib/common/node_modules'));
  await copySync(
    join(process.cwd(), '/dist/helpers'),
    join(process.cwd(), '/src/lib/common/node_modules/ngx-color/helpers'),
  );
  await build({
    project: join(process.cwd(), 'src/lib/common/package.json'),
  });
  copySync(
    join(process.cwd(), '/dist/common'),
    join(process.cwd(), '/dist/packages-dist'),
  );


  for (const m of MODULE_NAMES) {
    rimraf.sync(join(process.cwd(), `/src/lib/components/${m}/node_modules`));
    copySync(
      join(process.cwd(), '/dist/packages-dist'),
      join(process.cwd(), `/src/lib/components/${m}/node_modules/ngx-color`),
    );
    await build({
      project: join(process.cwd(), `src/lib/components/${m}/package.json`),
    });

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


