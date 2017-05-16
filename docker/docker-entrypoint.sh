#!/bin/sh

if [ -z $DATAHOST ]; then
    echo "DATAHOST IS NULL"
else
    sed -i "s%${ORI_DATAHOST}%${DATAHOST}%g" `grep "${ORI_DATAHOST}" -rl ./`
fi

exec "$@"
