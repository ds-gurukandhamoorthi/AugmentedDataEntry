find . -mindepth 2 -iname func_utils.js -exec cp  ./func_utils.js '{}' \;
find . -mindepth 2 -iname icds_specific.js -exec cp  ./icds_specific.js '{}' \;
find . -mindepth 2 -iname dom_manip_utils.js -exec cp  ./dom_manip_utils.js '{}' \;
find . -mindepth 2 -iname date_manip_utils.js -exec cp  ./date_manip_utils.js '{}' \;
find . -mindepth 2 -iname picme_utils.js -exec cp  ./picme_utils.js '{}' \;

#find . -mindepth 2 -iname func_utils.js -exec cp -u ./func_utils.js '{}' \;
#find . -mindepth 2 -iname icds_specific.js -exec cp -u ./icds_specific.js '{}' \;
#find . -mindepth 2 -iname dom_manip_utils.js -exec cp -u ./dom_manip_utils.js '{}' \;
#find . -mindepth 2 -iname date_manip_utils.js -exec cp -u ./date_manip_utils.js '{}' \;
#find . -mindepth 2 -iname picme_utils.js -exec cp -u ./picme_utils.js '{}' \;
