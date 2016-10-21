// ==UserScript==
// @name        BIRTH_CERTIFICATE
// @namespace   Guru
// @description birthcertificate automation
// @include     *nmp-icds.tn.gov.in*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/func_utils.js
// @require     /home/guru/guru_bin/nameconversion.js
// @icon        /home/guru/guru_bin/birthcertificate.jpeg
// @version     1
// ==/UserScript==



if(document.getElementById("textdat")!=null){
	resolveToElt("textdat").focus();
}


//document.getElementById("cbState").selectedIndex=31;
//document.getElementById("cbState").onchange();

//document.getElementById("txtPincode").value=613;
//
//alert(document.getElementById("cbTybir").value="2");
//alert(14);


resolveToElt("txtTwVill").addEventListener("blur",
		function(){
			resolveToElt("txtHamletTamil").value=resolveToElt("txtTwVill").value;
			},true);

//Type of birth = Normal
resolveToElt("textnoch").addEventListener("blur",
		function(){
			resolveToElt("cbTybir").value="1";
			resolveToElt("textbkg").focus();
			},true);

//father is farmer mother is house-wife
resolveToElt("cbmedu").addEventListener("blur",
		function(){
			resolveToElt("cbFocc").value="5";
			resolveToElt("cbMooc").value="8";
			resolveToElt("textamm").focus();
			},true);
//state = Tamil nadu; perm addr, addr during birth are same (tam)
resolveToElt("txtpmaddT").addEventListener("blur",
		function(){
			var addrArray=this.value.split(/, */);
			for(i=0;i<addrArray.length;i++){
				var place=addrArray[i];
				addrArray[i]=place.placeNameConv();
			}
			var addrInEng=addrArray.join(", ");
			resolveToElt("txtpmadd").value=addrInEng;
			resolveToElt("txtPaddb").value=addrInEng;
			
			resolveToElt("cbState").value="33";
			resolveToElt("cbState").onchange();

			resolveToElt("cbDistrict").focus();
			resolveToElt("cbDistrict").value="19";//district=Nagapattinam FIXME depending on what is entered
			resolveToElt("cbDistrict").onchange();
			

			resolveToElt("txtpaddbT").value=resolveToElt("txtpmaddT").value;
			//resolveToElt("cbDistrict").onchange();
			},true);

//eng perm addr, addr during birth are same
resolveToElt("txtpmadd").addEventListener("blur",
		function(){
			resolveToElt("txtPaddb").value=resolveToElt("txtpmadd").value;
			},true);
//village perm, during birth same
resolveToElt("villgtxt").addEventListener("blur",
		function(){
			resolveToElt("txtHamlet2").value=resolveToElt("villgtxt").value;
			resolveToElt("txtinfname").focus();
			},true);

//place of birth is village
resolveToElt("cbDistrict").addEventListener("blur",
		function(){
			resolveToElt("cbTwnVilg").value="2";
			resolveToElt("cbTwnVilg").onchange();
			resolveToElt("txtTwVill").focus();
			},true);


//mother name in english autom
resolveToElt("txtmnaT").addEventListener("blur",
		function(){
			resolveToElt("textmnam").value=this.value.femaleNameConv();
			},true);

//father name in english autom
resolveToElt("txtfnaT").addEventListener("blur",
		function(){
			resolveToElt("txtfna").value=this.value.maleNameConv();
			},true);

//door no == door no
resolveToElt("txtpmaddT1").addEventListener("blur",
		function(){
			resolveToElt("txtpmadd1").value=this.value;
			resolveToElt("txtpaddbT1").value=this.value;
			resolveToElt("txtPaddb1").value=this.value;
			},true);
//weeks=40
resolveToElt("texttwee").value="40";
//resolveToElt("txtRegName").value="M.Shakeel Ahmed";
resolveToElt("txtRegName").value="M.Manavalan";
//resolveToElt("txtRegName").value="P.Sridhar";
//resolveToElt("txtRegName").value="D.Sekar";

//infant name in english autom
resolveToElt("txtbnaT").addEventListener("blur",
		function(){
			if(resolveToElt("cbGender").selectedIndex==1){//male
				resolveToElt("textbnam").value=this.value.maleNameConv();
			}else{//female
				resolveToElt("textbnam").value=this.value.femaleNameConv();
			}
			},true);

resolveToElt("textRgiDist").addEventListener("focus",
		function(){
			resolveToElt("textbdat").focus();
			},true);
informants=new Array();
informants["nbk"]=new Array("Dr. N.Balakrishnan", "டாக்டர் என். பாலகிருஷ்ணன்");
informants["san"]=new Array("Dr. S.Ananthi", "டாக்டர் எஸ். ஆனந்தி");
informants["msv"]=new Array("Dr. M.Senthilvelavan", "டாக்டர் எம். செந்தில்வேலவன்");
informants["psp"]=new Array("Dr. P.Senthamizhpaavai", "டாக்டர் பி.செந்தமிழ்பாவை");
informants["ksj"]=new Array("Dr. K.Sujatha", "டாக்டர் கே.சுஜாதா");
informants["vbk"]=new Array("Dr. V.Balakrishnan", "டாக்டர் வி. பாலகிருஷ்ணன்");
informants["rrv"]=new Array("Dr. R.Ravikumar", "டாக்டர் ஆர்.ரவிக்குமார்");
informants["akm"]=new Array("Dr. A.Kumaravel", "டாக்டர் ஏ.குமரவேல்");

resolveToElt("txtinfname").addEventListener("blur",
		function(){
			var key=this.value.replace(/ */g,"");//replace the unnecessary spaces put there by the creator of webpage...
			if(informants[key]){
				this.value=informants[key][0];
				resolveToElt("txtinfnameT").value=informants[key][1];
			}
			resolveToElt("cbReligion").value="1";
			resolveToElt("cbfedu").focus();
			},true);

String.prototype.getPincode=function(){
    var pincodes=new Array();
    pincodes["மணல்மேடு"]=609202;
    pincodes["திருமேணியார்கோயில்"]=609204;
   pincodes["காளி"]=609811;

    if(pincodes[this.toString()]){
	return(pincodes[this.toString()]);
    }
    return "";
}
resolveToElt("txtTwVill").addEventListener("blur",
		function(){
			resolveToElt("txtPincode").value=this.value.getPincode();
			var placeInEng=this.value.placeNameConv();
			resolveToElt("villgtxt").value=placeInEng;
			resolveToElt("txtHamlet2").value=placeInEng;
			resolveToElt("txtpmadd").focus();
			},true);


//kid no=1 if 1rst year after marriage
resolveToElt("textamb").addEventListener("blur",
		function(){
			if(this.value*1-resolveToElt("textamm").value*1==1){//one year after marriage so order of live birth=1
				resolveToElt("textnoch").value="1";//order of live birth = 1
				resolveToElt("cbTybir").value="1";//normal
				resolveToElt("textbkg").focus();
			}
			},true);
