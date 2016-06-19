#!/bin/sh

set -eux

. ./secret.sh

export TWITTER_KEY
export TWITTER_SECRET
export TWITTER_TOKEN
export TWITTER_TOKEN_SECRET

npm start
