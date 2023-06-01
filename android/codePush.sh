#!/bin/bash

env=''
acenv=''
app=''

while getopts 'e:' flag; do
  case "${flag}" in
    e) env=${OPTARG};;
  esac
done

case $env in
  "qa")
    acenv='QA'
    app="Unipe-org/Unipe-QA"
    ;;

  "prod")
    acenv='Prod'
    app="Unipe-org/Unipe-Prod"
    ;;

  *)
    echo -n "unable to find config for $env"
    exit 1
    ;;
esac


echo "Setting up .env for CodePush to $env environment of $app"
npx gulp set --env=$env
echo "Starting CodePush for $env to $acenv environment of $app"
npx appcenter codepush release-react -a $app -d $acenv
