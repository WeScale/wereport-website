#!/bin/bash

npm run build 
version=$(npm version patch)

cd build/

sed -i.bak s/VERSION_TAG/$version/g index.html

mv config.json config.dev.json
mv config.prd.json config.json

gsutil -h Cache-Control:private rsync -R . gs://wereport-dev.gcp.wescale.fr/
gsutil acl ch -r -u AllUsers:R gs://wereport-dev.gcp.wescale.fr/

mv config.json config.prd.json
mv config.dev.json config.json

cd ..

curl http://wereport-dev.gcp.wescale.fr/config.json -v -H 'Cache-Control: no-cache'

git tag -a $version -m "new version $version"
git push

