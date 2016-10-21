// ==UserScript==
// @name        BirthEntry
// @namespace   Guru
// @description Enter effortless username and password
// @include     http://nmp-icds.tn.gov.in*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @icon     /home/guru/guru_bin/entry.png
// @version     1
// ==/UserScript==


var usernames=[]
var passwords=[]
var phcs=[]


var phc="Manalmedu";
usernames["ma"]=""; //erased
passwords["ma"]=""; //erased
phcs["ma"]=phc;

var phc="Murugamangalam";
usernames["mu"]=""; //erased
passwords["mu"]=""; //erased
phcs["mu"]=phc;



resolveToElt("username").focus();
resolveToElt("username").addEventListener("keydown",
		function(e){
			if(e.keyCode!=106){
				return;
			}
			e.preventDefault();
			var key=this.value;
			if(key in usernames){
				this.value=usernames[key];
				resolveToElt("password").value=passwords[key];
				//resolveToElt("imagecheck").focus();
				var inputs=document.getElementsByTagName("input");
				for(let i=0; i<inputs.length;i++){
					if(inputs[i].value=="Submit"){
						inputs[i].title=phcs[key];
						inputs[i].focus();
					}
				}
				//resolveToElt("PassWd").title=hscs[key];
			}
		},true);
