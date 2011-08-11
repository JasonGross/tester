#!/bin/bash
BASE="`git rev-parse --show-toplevel`"
echo VERSION:
"$BASE/version.sh" | tee "$BASE/VERSION"
echo
echo cache.manifest:
sed s"/^# version .*$/# version $("$BASE/version.sh")/i" "$BASE/cache.manifest.in" > "$BASE/cache.manifest"
cat "$BASE/cache.manifest"
