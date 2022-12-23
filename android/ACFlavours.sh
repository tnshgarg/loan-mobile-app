#!/bin/bash
env=''

while getopts 'e:' flag; do
  case "${flag}" in
    e) env=${OPTARG};;
  esac
done

echo "Setting up flavours for App Center"
echo "App Center is setup for $env"
cp "android/app/src/$env/assets/appcenter-config.json" "android/app/src/main/assets/appcenter-config.json"
