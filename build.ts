/* tslint:disable:import-blacklist */
// based on https://github.com/angular/angularfire2/blob/master/tools/build.js
import { rollup } from 'rollup';
import { spawn } from 'child_process';
import { Observable } from 'rxjs';
import * as copyfiles from 'copy';
import * as sourcemaps from 'rollup-plugin-sourcemaps';

const copyAll: ((s: string, s1: string) => any) = Observable.bindCallback(copyfiles);

// Rollup globals
const MODULE_NAMES = {
  helpers: 'ngx-color.helpers',
  common: 'ngx-color',
  alpha: 'ngx-color.alpha',
  // appinsights: 'angulartics2.appinsights',
  // baidu: 'angulartics2.baidu',
  // facebook: 'angulartics2.facebook',
  // ga: 'angulartics2.ga',
  // gtm: 'angulartics2.gtm',
  // hubspot: 'angulartics2.hubspot',
  // kissmetrics: 'angulartics2.kissmetrics',
  // mixpanel: 'angulartics2.mixpanel',
  // piwik: 'angulartics2.piwik',
  // segment: 'angulartics2.segment',
};

const GLOBALS = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  'rxjs': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/ReplaySubject': 'Rx',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/operator/share': 'Rx.Observable.prototype',
  'rxjs/operator/filter': 'Rx.Observable.prototype',
  'rxjs/operator/observeOn': 'Rx.Observable.prototype',
  'rxjs/observable/of': 'Rx.Observable.prototype',
  'rxjs/observable/fromEvent': 'Rx.Observable.prototype',
  'rxjs/operator/combineLatest': 'Rx.Observable.prototype',
  'rxjs/operator/merge': 'Rx.Observable.prototype',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/operator/do': 'Rx.Observable.prototype',
  'rxjs/operator/skip': 'Rx.Observable.prototype',
  'rxjs/operator/take': 'Rx.Observable.prototype',
  'rxjs/operator/toArray': 'Rx.Observable.prototype',
  'rxjs/operator/toPromise': 'Rx.Observable.prototype',
  // todo fix operator paths
  'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/from': 'Rx.Observable.prototype',
  'rxjs/operator': 'Rx.Observable.prototype',
  'ngx-color': MODULE_NAMES['common'],
  'ngx-color/helpers': MODULE_NAMES['helpers'],
};

function createEntry(name, target, type = 'common') {
  const ENTRIES = {
    helpers: `${process.cwd()}/dist/packages-dist/helpers/index.js`,
    common: `${process.cwd()}/dist/packages-dist/index.js`,
    alpha: `${process.cwd()}/dist/packages-dist/alpha/index.js`,
    // appinsights: `${process.cwd()}/dist/packages-dist/appinsights/index.js`,
    // baidu: `${process.cwd()}/dist/packages-dist/baidu/index.js`,
    // facebook: `${process.cwd()}/dist/packages-dist/facebook/index.js`,
    // ga: `${process.cwd()}/dist/packages-dist/ga/index.js`,
    // gtm: `${process.cwd()}/dist/packages-dist/gtm/index.js`,
    // hubspot: `${process.cwd()}/dist/packages-dist/hubspot/index.js`,
    // kissmetrics: `${process.cwd()}/dist/packages-dist/kissmetrics/index.js`,
    // mixpanel: `${process.cwd()}/dist/packages-dist/mixpanel/index.js`,
    // piwik: `${process.cwd()}/dist/packages-dist/piwik/index.js`,
    // segment: `${process.cwd()}/dist/packages-dist/segment/index.js`,
  };
  return ENTRIES[name];
}


// Constants for running typescript commands
const NGC = './node_modules/.bin/ngc';
const TSC_ARGS = (type: string, name: string, config = 'build') => {
  if (!type) {
    return ['-p', `${process.cwd()}/src/lib/${name}/tsconfig-${config}.json`];
  }
  return ['-p', `${process.cwd()}/src/lib/${type}/${name}/tsconfig-${config}.json`];
};

/**
 * Create an Observable of a spawned child process.
 */
function spawnObservable(command: string, args: string[]) {
  return Observable.create(observer => {
    const cmd = spawn(command, args);
    observer.next(''); // hack to kick things off, not every command will have a stdout
    cmd.stdout.on('data', (data) => { observer.next(data.toString()); });
    cmd.stderr.on('data', (data) => { observer.error(data.toString()); });
    cmd.on('close', (data) => { observer.complete(); });
  });
}

function generateBundle(input, file, globals, name, format) {
  const plugins = [
    sourcemaps(),
  ];
  return rollup({
    input,
    external: Object.keys(globals),
    file,
    plugins,
  }).then(bundle => {
    return bundle.write({
      file,
      name,
      globals,
      format,
      sourcemap: true,
    });
  });
}

function createUmd(name: string) {
  const moduleName = MODULE_NAMES[name];
  const entry = createEntry(name, 'es5');
  return generateBundle(
    entry,
    `${process.cwd()}/dist/packages-dist/bundles/${name}.umd.js`,
    GLOBALS,
    moduleName,
    'umd',
  );
}

function createEs(name: string, target: string, type: string) {
  const moduleName = MODULE_NAMES[name];
  const entry = createEntry(name, target);
  return generateBundle(
    entry,
    `${process.cwd()}/dist/packages-dist/ngx-color.${target}.js`,
    GLOBALS,
    moduleName,
    'es',
  );
}

function buildHelpers() {
  const es5$ = spawnObservable(NGC, TSC_ARGS('', 'helpers'));
  return Observable.forkJoin(es5$);
}

function buildModule(name: string, type: string) {
  const es2015$ = spawnObservable(NGC, TSC_ARGS(type, name));
  const esm$ = spawnObservable(NGC, TSC_ARGS(type, name, 'esm'));
  return Observable.forkJoin(es2015$, esm$);
}

function createBundles(name: string, type: string) {
  return Observable
    .forkJoin(
      Observable.from(createEs(name, 'es2015', type)),
      Observable.from(createEs(name, 'es5', type)),
    );
}

function buildModulesProviders() {
  const observables = Object.keys(MODULE_NAMES).map((name) => {
    if (name === 'common' || name === 'helpers') {
      return Observable.fromPromise(Promise.resolve());
    }
    return buildModule(name, 'components');
  });
  return Observable.forkJoin(observables);
}

function buildUmds() {
  const observables = Object.keys(MODULE_NAMES).map((name) => Observable.from(createUmd(name)));
  return Observable.forkJoin(observables);
}

function copyFilesHelpers() {
  return Observable
    .forkJoin(
      copyAll(`${process.cwd()}/*.md`, `${process.cwd()}/dist/packages-dist`),
      copyAll(`${process.cwd()}/src/lib/helpers/package.json*`, `${process.cwd()}/dist/packages-dist/helpers`),
    );
}

function copyFilesCommon() {
  return Observable
    .forkJoin(
      copyAll(`${process.cwd()}/*.md`, `${process.cwd()}/dist/packages-dist`),
      copyAll(`${process.cwd()}/src/lib/common/package.json*`, `${process.cwd()}/dist/packages-dist`),
    );
}

function copyFilesProviders() {
  return Observable
    .forkJoin(
      copyAll(`${process.cwd()}/src/lib/components/**/package.json`, `${process.cwd()}/dist/packages-dist`),
    );
}

function buildLibrary() {
  return Observable
    .forkJoin(buildHelpers())
    .switchMap(() => copyFilesHelpers())
    .switchMap(() => buildModule('common', ''))
    .switchMap(() => createBundles('common', 'common'))
    .switchMap(() => copyFilesCommon())
    .switchMap(() => buildModulesProviders())
    .switchMap(() => buildUmds())
    .switchMap(() => copyFilesProviders());
}

buildLibrary().subscribe(
  data => console.log('success'),
  err => console.log('err', err),
  () => console.log('complete'),
);
