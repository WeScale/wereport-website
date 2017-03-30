#!/bin/bash

npm run build 

cd build/

mv config.json config.dev.json
mv config.prd.json config.json

gsutil -h Cache-Control:private rsync -R . gs://wereport-dev.gcp.wescale.fr/
gsutil acl ch -r -u AllUsers:R gs://wereport-dev.gcp.wescale.fr/

mv config.json config.prd.json
mv config.dev.json config.json

cd ..

curl http://wereport-dev.gcp.wescale.fr/config.json -v -H 'Cache-Control: no-cache'
