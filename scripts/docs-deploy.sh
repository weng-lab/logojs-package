#!/bin/bash
# Build docs
set -e

# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

mkdocs gh-deploy -b gh-pages
