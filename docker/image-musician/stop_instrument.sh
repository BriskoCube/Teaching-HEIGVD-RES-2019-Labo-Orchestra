#!/usr/bin/env bash

CONTAINER_NAMES=$(sudo docker ps -a  --filter 'name=instrument' --format='{{.Names}}')

echo "Stopping containers..."
sudo docker container stop $CONTAINER_NAMES

echo "Removing containers..."
sudo docker container rm $CONTAINER_NAMES