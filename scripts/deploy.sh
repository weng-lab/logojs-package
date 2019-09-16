#!/bin/bash
# Deploys to kubernetes. Takes 2 args.
# arg1: environment, ie staging. This should match up with filename prefixes for lib/${arg1}.env.sh and k8s/${arg1}.yml.
# arg2: docker image tag to deploy. This argument is optional. If omitted, you will be prompted with a list of tags in GCR to select from.
# Example usage: scripts/deploy.sh staging v1.0.0
set -e

# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

# import common stuff
source scripts/lib/common.sh

# Exit if two args not given
if [[ -z "$1" ]]; then
    echo "At least one argument required.";
    exit;
fi

# Run the environment shell script to set environment specific variables
source scripts/lib/${1}.env.sh

# If a tag was provided, use it. Otherwise let the user select one.
if [[ ! -z "${2}" ]]; then
    TAG=${2}
else
    TAGS=( $(gcloud container images list-tags gcr.io/${GCR_PROJECT_ID}/${DOCKER_IMAGE_NAME} --limit=10 --format="get(tags)") )
    echo "Please select a docker image tag to deploy:"
    select TAG in ${TAGS[@]}
    do
        if [[ ! -z "${TAG}" ]]; then
            echo "Deploying ${TAG}..."
            break
        else
            echo "Invalid selection..."
        fi
    done
fi

# When running in ci, we will set environment variables with base64 encoded versions of service key files.
# This will log you in with the given account.
# When running locally log in manually with your own account.
if [[ "${K8S_SERVICE_KEY}" ]]; then
    echo $K8S_SERVICE_KEY | base64 --decode > ${HOME}/k8s_service_key.json
    gcloud auth activate-service-account --key-file ${HOME}/k8s_service_key.json
fi

gcloud --quiet config set project $K8S_PROJECT_ID
gcloud --quiet config set container/cluster $K8S_CLUSTER_NAME
gcloud --quiet config set compute/zone $COMPUTE_ZONE
gcloud --quiet container clusters get-credentials $K8S_CLUSTER_NAME

# Deploy the configured service / Apply any changes to the configuration.
kubectl apply -f k8s/${1}.yml

# Update the image in the k8s service.
kubectl set image deployment/${KUBE_DEPLOYMENT_NAME} ${KUBE_DEPLOYMENT_CONTAINER_NAME}=gcr.io/${GCR_PROJECT_ID}/${DOCKER_IMAGE_NAME}:${TAG}
