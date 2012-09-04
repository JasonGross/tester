#!/bin/bash
BASE="`git rev-parse --show-toplevel`"
chmod +w "$BASE/VERSION" "$BASE/cache.manifest" 2>/dev/null
echo VERSION:
echo -n $("$BASE/version.sh") | tee "$BASE/VERSION"
echo
echo
echo cache.manifest:
sed s"/^# version.*$/# version $("$BASE/version.sh")/i" "$BASE/cache.manifest.in" > "$BASE/cache.manifest"
echo >> "$BASE/cache.manifest"
echo "# Time Stamp: `date +%s`" >> "$BASE/cache.manifest"
cat "$BASE/cache.manifest"
chmod -w "$BASE/VERSION" "$BASE/cache.manifest"
# create google analytics file if it doesn't exist
touch GOOGLE-SITE-VERIFICATION
