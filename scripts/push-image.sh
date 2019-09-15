#!/bin/bash
# Pushes the docker image created in build.sh to GCR. Takes 1 arg:
# arg1: docker image tag to push.
# Example usage: scripts/push-image.sh v1.0.0

set -e

# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

# Exit if one arg not given
if [[ $# -ne 1 ]]; then
    echo "One argument required.";
    exit;
fi

# import common stuff
source scripts/lib/common.sh

# When running in ci, we will set environment variables with base64 encoded versions of service key files.
# This will log you in with the given account.
# When running locally log in manually with your own account.
if [[ "${GCR_SERVICE_KEY}" ]]; then
    echo $GCR_SERVICE_KEY | base64 --decode > ${HOME}/gcr_service_key.json
    gcloud auth activate-service-account --key-file ${HOME}/gcr_service_key.json
    docker login -u _json_key --password-stdin https://gcr.io < ${HOME}/gcr_service_key.json
fi

# push the image to GCR
docker push gcr.io/${GCR_PROJECT_ID}/${DOCKER_IMAGE_NAME}:${1}
