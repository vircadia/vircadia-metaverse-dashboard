#! /bin/bash
# Start the metaverseserver with persistant data in local dir

BASE=$(pwd)
cd "${BASE}"

DVERSION=latest

docker run -it \
    --name=metaverse-dashboard \
    --restart=unless-stopped \
    -p 8080:8080 \
    --volume ${BASE}/log:/home/cadia/metaverse-dashboard/log \
    metaverse-dashboard:${DVERSION}
