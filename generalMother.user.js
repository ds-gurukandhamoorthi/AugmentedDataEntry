// ==UserScript==
// @name        generalMother
// @namespace   guru
// @description automation of gen informations about mother
// @require	/home/guru/guru_bin/dom_manip_utils.js
// @require	/home/guru/guru_bin/func_utils.js
// @require	/home/guru/guru_bin/date_manip_utils.js
// @icon	    /home/guru/guru_bin/pregnant_icon.jpg
// @include     file:///*
// @include     *picme*
// @exclude     *picme*mainmenu*
// @exclude     *picme*default*asp
// @exclude	*picme*Rselpage*asp
// @exclude	*picme*Rselreppage*asp
// @version     1
// ==/UserScript==
if(!/AN Mother Entry/.test(document.body.textContent)){//execute only on the page containing AN Mother Entry
	//alert("quitted");
	return;
}

const extPicme=document.getElementsByTagName("table")[2].rows[0].cells[1].textContent.trim();

sessionStorage["lastViewedMother"]=extPicme


const objectsLookUp={
    "lmp":"T15", 
    "an_reg":"T17",
    "address":"T8",
    "mobile":"T6",
    "mother_name":"T4",
    "father_name":"T5",
    "community":"T10",
    "mother_age":"T9",
    "mother_edu":"T11",
    "father_edu":"T12",
    "gravida":"T13",
    "para":"T14",
    "bloodgroup":"T19",
    "vdrl":"T20",
    "mother_hiv":"T21",
    "father_hiv":"T22",
    "generalsave":"save1",

}
var objects=[];
for (var name in objectsLookUp){
    objects[name]=resolveToElt(objectsLookUp[name]);
}



nextToMe(objects.mobile,objects.address);

if(/3410051000/.test(document.body.innerHTML)){//execute only for Kuttiyandiyur ..
	if(objects.community.value==="0"){
		objects.community.value="3";// There are only "Others" in Kuttiyandiyur. No SC, ST
	}
    nextToMe(objects.mother_age,objects.mother_edu);

}
		
objects.gravida.addEventListener("blur",
		function(){
		var grvd=1*objects.gravida.value; //gravida
                objects.para.value = (grvd>=1 ? grvd-1 : "");
                objects.lmp.focus();
			} ,true);

objects.lmp.addEventListener("keydown",
		function(e){
			if(e.keyCode!=32){
				return;
			}
			e.preventDefault();
			this.value=this.value.toEnglishDate();
				
		},true);

objects.bloodgroup.addEventListener("blur",function(){
        var indx=(this.selectedIndex===0?0:2);

        objects.vdrl.selectedIndex=indx;
        objects.mother_hiv.selectedIndex=indx;
        objects.father_hiv.selectedIndex=indx;

		objects.generalsave.focus();
		},true
		);
objects.an_reg.addEventListener("mouseover",
		function(){
			var lmp=objects.lmp.value;
			var regdate=this.value;
			var diff=regdate.minus(lmp);
			var earlyReg = (diff<=7*12?"OK":"Not Early Registration!!!");
				this.title=Math.floor(diff/7)+"w, "+diff%7+"d"+"\n"+earlyReg+"\n"+diff;
			},true);

nextToMe(objects.father_edu,objects.gravida);

var tabl= document.getElementsByTagName("table");

objects.mobile.addEventListener("keydown",
		function(e){
			if(e.keyCode!=32){
				return;
			}
			e.preventDefault();
			//var VHNMobile=tabl[1].rows[1].cells[3].innerHTML.replace(/<.*;/,"").replace(/<.*>/,"");
			var VHNMobile=tabl[1].rows[1].cells[3].textContent.trim();
			if(/34070404000/.test(extPicme)){//execute only for Thalanayar ..
				VHNMobile="9095105746";
			}
			if(/34810101000/.test(extPicme)){//execute only for Sector1 ..
				VHNMobile="9942315558";
			}
			if(this.value===""){
				this.value=VHNMobile;
			}
		},true);


function showInfoRegistration(){
        let lmp=objects.lmp.value;
        let regdate=objects.an_reg.value;
        let diff=regdate.minus(lmp).toFixed(0);
        let earlyReg = (diff<=7*12?"OK":"Not Early Registration!!!");
		let info =		"<i><b>"+Math.floor(diff/7)+"w, "+diff%7+"d"+"<BR>"+earlyReg+"<BR>"+diff+"</b></i>";
        let temp_place=tabl[2].rows[3].cells[2]
		let tmp=temp_place.innerHTML.replace(/\(.*\)/,"");
            temp_place.innerHTML= tmp+ "("+info+")";
}

doWhen(objects.an_reg.value!=="", showInfoRegistration);

objects.an_reg.addEventListener("blur",  showInfoRegistration ,true);


objects.lmp.addEventListener("blur",
		function(){
                    doWhen(objects.an_reg.value!=="", showInfoRegistration);
		    objects.an_reg.focus();
		},true)

aForAppropriate(objects.lmp,objects.an_reg,appropriateLMPDate);
aForAppropriate(objects.an_reg,objects.lmp,appropriateRegDate);
