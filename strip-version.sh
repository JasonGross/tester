#!/bin/bash
BASE="`git rev-parse --show-toplevel`"
sed s'/^# version .*$/# version $version/i' -i "$BASE/cache.manifest"
