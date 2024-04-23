#!/bin/bash

# Usage:
# bash bin/up prod
# bash bin/up local

env=$1
scale=${2:-3}
folder=${PWD##*/}
service=${folder:0:${#folder}-8}

case "$env" in
  local)
    docker compose -f docker-compose.yml -f docker-compose.local.yml up
    ;;
  
  prod)
    docker compose -f docker-compose.yml up -d --scale $service=$scale
    ;;

  *)
    echo "Environment not found! please choose [local, prod]"
esac