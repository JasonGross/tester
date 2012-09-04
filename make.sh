#!/bin/bash
# from http://stackoverflow.com/questions/59895/can-a-bash-script-tell-what-directory-its-stored-in
DIR="$( cd "$( dirname "$0" )" && pwd )"

URWEB="athrun jgross urweb"

PROJECT="tester"

get_sysnames() {
	echo "$(fs sysname | tr ' ' '\n' | grep "^'.\\+'\$" | sed s"/'//g" | tr '\n' ' ')"
}

#HOME="/mit/jgross"
#./configure --prefix=/mit/jgross/arch/i386_deb50 LDFLAGS="-L/usr/lib64/mysql" CCARGS="-L/usr/lib64/mysql"

SYSNAME_LIBS="$HOME/arch/$ATHENA_SYS/lib"
for i in $(get_sysnames)
do
	SYSNAME_LIBS="$SYSNAME_LIBS:$HOME/arch/$i/lib"
done

export LD_LIBRARY_PATH="/usr/lib64/mysql:$SYSNAME_LIBS:$LD_LIBRARY_PATH"
export LD_RUN_PATH="/usr/lib64/mysql:$SYSNAME_LIBS:$LD_RUN_PATH"
export LDFLAGS="-L/usr/lib64/mysql"
#echo "LD_LIBRARY_PATH=\"$LD_LIBRARY_PATH\""
#CMD="$URWEB -noEmacs -protocol fastcgi -dbms sqlite -sql $PROJECT.sql -db \"dbname=$DIR/$PROJECT.db\" $PROJECT"
CMD="$URWEB -noEmacs -protocol fastcgi tester"
echo "$CMD"
eval "$CMD"
echo "athrun scripts for-each-server pkill $PROJECT.exe"
#athrun scripts for-each-server pkill tester.exe
/mit/scripts/bin/for-each-server pkill tester.exe
