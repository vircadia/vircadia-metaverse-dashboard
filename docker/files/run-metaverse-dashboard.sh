#! /bin/bash

BASE=/home/cadia/metaverse-dashboard

# Default location for logs is in the Iamus sub-directory
LOGDIR=${BASE}/log
# If a log directory is provided in the mounted 'config' dir, use that one
if [[ -d "/home/cadia/metaverse-dashboard/log" ]] ; then
    LOGDIR=/home/cadia/metaverse-dashboard/log
fi
mkdir -p "${LOGDIR}"

LOGFILE=${LOGDIR}/$(date --utc "+%Y%m%d.%H%M").log

cd /usr/local/src/metaverse-dashboard
npm run serve >> ${LOGFILE} 2>&1
