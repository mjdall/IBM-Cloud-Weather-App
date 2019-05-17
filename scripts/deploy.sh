#!/bin/sh

RUNTIME="$1"
PRODUCTION="production"
# i know, these shouldn't be here. Going to delete after assignment sign off.
export CLOUDANT_USER="20704c34-2348-45f6-aa6c-83c567ff8974-bluemix"
export CLOUDANT_PASS="342c893836fc2b979d46e09ddbd4d7fc69ceda9db8f29983fda01e595bc9d433"
export CLOUDANT_DB="cloudantnosqldb.appdomain.cloud/"

if [ -z "$CLOUDANT_USER" -o -z "$CLOUDANT_PASS" -o -z "$CLOUDANT_DB" ]; then
  echo "CLOUDANT_USER CLOUDANT_PASS and CLOUDANT_DB all need to be set."
  exit 1
fi

if [ "$RUNTIME" = "$PRODUCTION" ]; then
  CLOUDANT_USER="$CLOUDANT_USER" \
  CLOUDANT_PASS="$CLOUDANT_PASS" \
  CLOUDANT_DB="$CLOUDANT_DB" \
  NODE_ENV="$PRODUCTION" \
  yarn prod
  exit 0
fi

CLOUDANT_USER="$CLOUDANT_USER" \
CLOUDANT_PASS="$CLOUDANT_PASS" \
CLOUDANT_DB="$CLOUDANT_DB" \
yarn dev
