// ==UserScript==
// @name        PicmeEntry
// @namespace   Guru
// @description Enterning UserName and Password effortlessly
// @exclude     *picme*Rselpage*
// @exclude	*picme*Rselreppage*asp
// @include     *picme*default*
// @include     *picme*tn*nic*in*
// @exclude     *picme*mainmenu*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @icon     /home/guru/guru_bin/entry.png
// @version     1
// ==/UserScript==

if(!/Username/.test(document.body.textContent)){//execute only on the Picme page...
	return
}

var picmeKnowledge={// "username,password, HSC"   ***PASSWORD ERASED***
    "41":"PHC0308401,PASSWORD,Manalmed : Kadalangudi",
    "42":"PHC0308402,PASSWORD,Manalmed : Kavalmedu",
    "43":"PHC0308403,PASSWORD,Manalmed : Kiloy",
    "44":"PHC0308404,PASSWORD,Manalmed : Manalmedu",
    "45":"PHC0308405,PASSWORD,Manalmed : Mudikandanallur",

    "51":"PHC0308501,PASSWORD,Villiyanallur : Anathandapuram",
    "52":"PHC0308502,PASSWORD,Villiyanallur : Manakkudi",
    "53":"PHC0308503,PASSWORD,Villiyanallur : Needur",
    "54":"PHC0308504,PASSWORD,Villiyanallur : Villiyanallur",
    "55":"PHC0308505,PASSWORD,Villiyanallur : Vuluthukuppai",

    "61":"PHC0308601,PASSWORD,Kali : Kodangudi",
    "62":"PHC0308602,PASSWORD,Kali : Korukkai",
    "63":"PHC0308603,PASSWORD,Kali : Pattamangalam",
    "64":"PHC0308604,PASSWORD,Kali : Kulichar",
    "65":"PHC0308605,PASSWORD,Kali : Mappadugai",
    "66":"PHC0308606,PASSWORD,Kali : Vadakali",
   
    "71":"PHC0308701,PASSWORD,Elanthoppu : Dharmadhanapuram",
    "72":"PHC0308702,PASSWORD,Elanthoppu : Pattavarthi",
    "73":"PHC0308703,PASSWORD,Elanthoppu : Sithamalli",
    "74":"PHC0308704,PASSWORD,Elanthoppu : Thalanayar",
    "75":"PHC0308705,PASSWORD,Elanthoppu : Varathampattu",

    "81":"PHC0308801,PASSWORD,Murugamangalam : Arulmozhidevan",
    "82":"PHC0308802,PASSWORD,Murugamangalam : Kattalaichery",
    "83":"PHC0308803,PASSWORD,Murugamangalam : Maraiyur",
    "84":"PHC0308804,PASSWORD,Murugamangalam : Moovalur",
    "85":"PHC0308805,PASSWORD,Murugamangalam : Solampettai",

    "m1":"UHP34810101,PASSWORD,Municipality : Sector 1",
    "m2":"UHP34810102,PASSWORD,Municipality : Sector 2",
    "m3":"UHP34810103,PASSWORD,Municipality : Sector 3",
    "m4":"UHP34810104,PASSWORD,Municipality : Sector 4",
    "m5":"UHP34810105,PASSWORD,Municipality : Sector 5",

    "kt":"PHC0309810,PASSWORD,Thirukadaiyur : Kuttiyandiyur",

    "mk":"PHC0309811,PASSWORD,Akkur : Mukkarumbur",
    "km":"PHC0309809,PASSWORD,Akkur : Kumarakudi",

    "ar":"PHC0310001,PASSWORD,Sembanarkovil : Arupathi",
    "sk":"PHC0310006,PASSWORD,Sembanarkovil : Sembanarkovil"

}

resolveToElt("UserName").focus();
resolveToElt("UserName").addEventListener("keydown",
		function(e){
			if(e.keyCode!=106){
				return;
			}
			e.preventDefault();
			var key=this.value;
			sessionStorage["whoami"]= key; //we want to know who it is to personalize certain things

			if(key in picmeKnowledge){
                var knwl=picmeKnowledge[key].split(",");
				this.value=knwl[0];
				resolveToElt("PassWd").value=knwl[1];
				resolveToElt("imagecheck").focus();
				resolveToElt("Submit").title=knwl[2];
			}
		},true);

resolveToElt("imagecheck").addEventListener("change",
	function(){
		this.value=this.value.toUpperCase();
	},true);
