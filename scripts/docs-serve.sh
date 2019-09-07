  
#!/bin/bash
# Serve live-reloading docs
set -e

# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material serve --dev-addr=0.0.0.0:8000
