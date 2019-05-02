#!/usr/bin/env bash

CONTAINER_NAME="auditor"


sudo docker build -t res/auditor .
sudo docker container stop $CONTAINER_NAME
sudo docker container rm $CONTAINER_NAME

sudo docker run -d --name="$CONTAINER_NAME" -p 2205:2205 res/auditor