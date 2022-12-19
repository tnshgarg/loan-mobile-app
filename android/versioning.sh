#!/bin/bash
timestamp="$(echo $(date '+%Y.%m.%d') | sed 's%\.0%\.%g')"
echo "Version set to $timestamp for android"
setVersion $timestamp
