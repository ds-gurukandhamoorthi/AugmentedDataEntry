// ==UserScript==
// @name        BJP_EnrollPage
// @namespace   Guru
// @include     *bjptn.com/Karyakartha_Enroll_Booth*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @version     1
// @grant       none
// ==/UserScript==



wysiwyc(resolveToElt("ctl00_Contentpage_DdlParliament"),/Mayiladu/);
resolveToElt("ctl00_Contentpage_DdlParliament").onchange();




window.addEventListener("keyup",function(e){
		if( e.keyCode==113){
            e.preventDefault();
            btnSubmit=resolveToElt('ctl00_Contentpage_Btnsave');
            btnSubmit.focus();
            btnSubmit.click();

                } 


        
},true)


var chks = document.querySelectorAll("input[type='checkbox']");
Array.prototype.oneOf=function(){
	return this[Math.floor(Math.random()*this.length)];
}
//var mx= [29,30,31,32].oneOf();
var mx= [26,27,28].oneOf();
for (let i = 0; i < mx; i++){
//chks[i].click();
}
