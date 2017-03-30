#!/bin/sh

set -eux

git describe --abbrev=8 --always --dirty >git_version.txt

. ./secret.sh

export TWITTER_KEY
export TWITTER_SECRET
export TWITTER_TOKEN
export TWITTER_TOKEN_SECRET
export POST_BEARER_TOKEN=token

npm start
