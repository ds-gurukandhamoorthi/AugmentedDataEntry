USR_SCR=$1
echo $1

cp $USR_SCR ${USR_SCR}.bkp
cat $USR_SCR  |sed '/LIBRARY START/,/LIBRARY END/{/LIBRARY START/b;/LIBRARY END/b;d}' |sed '/LIBRARY START/r guru_library.js' >tmp.file
cat tmp.file >$USR_SCR
rm tmp.file
