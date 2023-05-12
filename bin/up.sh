#!/usr/bin/env bash

# Usage:
# sh bin/up pro
# sh bin/up loc

env=$1

case "$env" in
  local)
    docker-compose -f docker-compose.yml -f docker-compose.local.yml up
    ;;
  
  prod)
    docker-compose -f docker-compose.yml up -d
    ;;

  *)
    echo "environment not found! please choose [prod, local]"
esac