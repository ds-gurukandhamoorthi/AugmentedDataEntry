// ==UserScript==
// @name        MrmbsEntry
// @namespace   Guru
// @description Enterning UserName and Password effortlessly
// @include     file:///*
// @include     *mrmbs*
// @exclude     *mrmbs.tn.nic.in/UNmrmbsDe*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @icon     /home/guru/guru_bin/entry.png
// @version     1
// ==/UserScript==

if(!/Reddy Maternity Benefit Scheme/.test(document.body.innerHTML)){//execute only on the MRMBS page
	return
}



var mrmbsknowledge={ // "username,password,phc" ***PASSWORD ERASED***
    "4":"SHN03084,PASSWORD,Manalmedu",
    "5":"SHN03085,PASSWORD,Villiyanallur",
    "6":"SHN03086,PASSWORD,Kali",
    "7":"SHN03087,PASSWORD,Elanthoppu",
    "8":"SHN03088,PASSWORD,Murugamangalam",

    "40":"PMO03084,PASSWORD,Manalmedu",
    "50":"PMO03085,PASSWORD,Villiyanallur",
    "60":"PMO03086,PASSWORD,Kali",
    "70":"PMO03087,PASSWORD,Elanthoppu",
    "80":"PMO03088,PASSWORD,Murugamangalam",

    "ak":"PHC03098,PASSWORD,Akkur",
    "aks":"SHN03098,PASSWORD,Akkur",
    "sk":"SHN03100,PASSWORD,Sembanarkovil",

    "mu":"UHP348101,PASSWORD,Municipality",
    "ms":"UHV348101,PASSWORD,Municipality SHN",
    "mf":"UMO348101,PASSWORD,Municipality PMO",
    "mb":"UCM348100,PASSWORD,Municipality BMO",

    "b" :"BMO03086,PASSWORD,Branch Medical Officer",
    "B" :"BMO03086,PASSWORD,Branch Medical Officer"
}

resolveToElt("UserName").focus();
resolveToElt("UserName").addEventListener("keydown",
		function(e){
			if(e.keyCode!=106){
				return;
			}
			e.preventDefault();
			var key=this.value;

			if(key in mrmbsknowledge){
                var knwl= mrmbsknowledge[key].split(",");
				this.value=knwl[0];
				resolveToElt("PassWd").value=knwl[1];
				resolveToElt("imagecheck").focus();
                document.querySelector('input[value="Submit"]').title=knwl[2];
			}
		},true);
resolveToElt("imagecheck").addEventListener("change",
	function(){
		this.value=this.value.toUpperCase();
	},true);
