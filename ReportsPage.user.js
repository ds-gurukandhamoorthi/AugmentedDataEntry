// ==UserScript==
// @name        ReportsPage
// @namespace   Guru
// @description Automates entering the district name ...
// @include     *picme*
// @exclude     *picme*mainmenu*
// @exclude     *picme*default*asp
// @exclude	*picme*Rselpage*asp
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/date_manip_utils.js
// @icon        /home/guru/guru_bin/reports_icon.jpg
// @version     1
// ==/UserScript==


//LIBRARY START
//LIBRARY END
//

var docBody=document.body.innerHTML;

var mother_page = () => /MOTHER REPORTS/.test(docBody);

var infant_page = () => /INFANT REPORTS/.test(docBody);

var work_plan_page = () => /WORK PLAN REPORTS/.test(docBody);

if((typeof resolveToElt("Rdt"))!=="undefined"){
	resolveToElt("Rdt").value=34;
    document.querySelector('input[value^="Get "]').click();
}
if((typeof resolveToElt("RBk"))!=="undefined"){
	var who=sessionStorage["whoami"]; //yaar yaar yaar avar yaaro, oor per than theriyadho
	if(/m[1-9]/.test(who)){ //municipality
	resolveToElt("RBk").selectedIndex=12;
	}else if(/mk|ar|sk|kt|km/.test(who)){ //mukkarumbur -> Sembanarkovil, Arupathi -> Sembanarkovil
	resolveToElt("RBk").selectedIndex=9;
	}else{
	resolveToElt("RBk").selectedIndex=6;
	}
    document.querySelector('input[value^="Get "]').click();
}
if((typeof resolveToElt("Rphc"))!=="undefined"){
	var who=sessionStorage["whoami"]; //yaar yaar yaar avar yaaro, oor per than theriyadho
	if(/m[1-9]/.test(who)){
	resolveToElt("Rphc").selectedIndex=1;
	}else if(/mk|km/.test(who)){
	resolveToElt("Rphc").selectedIndex=1;
	}else if(/ar|sk/.test(who)){
	resolveToElt("Rphc").selectedIndex=3;
	}else if(/kt/.test(who)){
	resolveToElt("Rphc").selectedIndex=5;
	}else if(/^[4-8]/.test(who)){
	resolveToElt("Rphc").selectedIndex=(who.charAt(0)*1)-3;
	}
}
if((typeof resolveToElt("Rphc"))!=="undefined"){
	resolveToElt("Rphc").focus();
	resolveToElt("Rphc").addEventListener("blur",
		function(){
			if(mother_page()){
				document.getElementsByTagName("a")[23].focus()
			}
			if(infant_page()){
				document.getElementsByTagName("a")[14].focus()
			}
			if(work_plan_page()){
				document.getElementsByTagName("a")[5].focus()
			}

			},true);

}
//FIXME:temp
resolveToElt("DtFrom").value="01/04/2015";
//resolveToElt("DtTo").value=(new Date).toStr();
resolveToElt("DtTo").value=getNearestLastDayOfMonth();
