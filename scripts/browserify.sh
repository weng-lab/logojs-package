#!/bin/sh

npm install -g browserify uglify-js
yarn
browserify lib/index.js --standalone logosj | uglifyjs  > bundle.js
