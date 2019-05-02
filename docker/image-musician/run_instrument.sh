#!/usr/bin/env bash

sudo docker build -t res/instrument .

bash ./stop_instrument.sh

echo "Starting containers..."

for i in {1..10};
do
    id=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

    sudo docker run -d --name="instrument_$id" res/instrument > /dev/null
    echo "instrument_$id"
done


