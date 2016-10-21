	LISTOFUSRSCRIPTS=$(grep -lR "LIBRARY START" | grep "user.js$")
for i in $LISTOFUSRSCRIPTS
do
	./injectLibraryToUserScript.sh $i
done

