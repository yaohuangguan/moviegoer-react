#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn run eslint && yarn run format