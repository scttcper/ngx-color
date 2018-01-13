#!/bin/bash
set -e

workingdir=$PWD
echo $workingdir

rm -rf ./dist

# helpers
./node_modules/.bin/ng-packagr -p src/lib/helpers/package.json
cp -r dist/helpers dist/package-dist

# # common
rm -rf src/lib/common/node_modules/
mkdir -p src/lib/common/node_modules/ngx-color
cp -r dist/helpers src/lib/common/node_modules/ngx-color/helpers
./node_modules/.bin/ng-packagr -p src/lib/common/package.json
cp -r dist/common dist/package-dist

# components
nm=node_modules
common=node_modules/ngx-color
pkg=package.json
for d in src/lib/components/*/ ; do
  rm -rf $d$nm
  mkdir -p $d$common
  cp -r dist/common/ $d$common
  cp -r dist/helpers $d$common
  ./node_modules/.bin/ng-packagr -p $d$pkg
done
