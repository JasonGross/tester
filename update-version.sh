#!/bin/bash
BASE="`git rev-parse --show-toplevel`"
VERSION_FILE="version.ur"
VERSION="$BASE/$VERSION_FILE"
chmod +w "$VERSION" "$BASE/cache.manifest" 2>/dev/null

QUIET=""
if [ "$1" == "-q" ] || [ "$1" == "--quiet" ]; then
	QUIET="-q"
fi

echo "val version = \"$("$BASE/version.sh")\"" > $VERSION

sed s"/^# version.*$/# version $("$BASE/version.sh")/i" "$BASE/cache.manifest.in" > "$BASE/cache.manifest"
echo >> "$BASE/cache.manifest"
echo "# Time Stamp: `date +%s`" >> "$BASE/cache.manifest"
chmod -w "$VERSION" "$BASE/cache.manifest"

if [ -z "$QUIET" ]; then
	echo $VERSION_FILE:
	cat "$VERSION"
	echo
	echo
	echo cache.manifest:
	cat "$BASE/cache.manifest"
fi
# create google analytics file if it doesn't exist
touch GOOGLE-SITE-VERIFICATION
