#!/bin/bash
echo VERSION:
./version.sh | tee VERSION
echo
echo cache.manifest:
sed s"/^# version .*$/# version $(./version.sh)/i" -i cache.manifest
cat cache.manifest
