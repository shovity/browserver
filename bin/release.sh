#!/usr/bin/env bash

git pull
sudo docker compose build
sudo yarn up prod