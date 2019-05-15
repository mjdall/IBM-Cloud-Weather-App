#!/bin/sh
set -e

npm install
cd client && npm install --unsafe-perm
