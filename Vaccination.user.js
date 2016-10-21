// ==UserScript==
// @name        Vaccination
// @namespace   guru
// @description Autocompletes certain vaccination details in picme
// @include     file:///*
// @include     *picme.tn.nic.in/*
// @exclude     *picme*mainmenu*
// @exclude     *picme*default*asp
// @exclude	*picme*Rselpage*asp
// @exclude	*picme*Rselreppage*asp
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/date_manip_utils.js
// @require     /home/guru/guru_bin/func_utils.js
// @icon        /home/guru/guru_bin/syringe.png
// @version     1
// ==/UserScript==


if(!/Immunisation details/.test(document.body.innerHTML)){//execute only on the page containing DELIVERY DETAILS
	//alert("quitted");
	return;
}
function objMap(x){
    objects[x[0]]=resolveToElt(x[1]);
}

var objectsLookUp = [
    ["bcg" , "T23"],
    ["dose1" , "T27"],
    ["dose2" , "T31"],
    ["dose3" , "T35"],
    ["measles" , "T39"],
    ["dob" , "T3"],
    ["sex" , "T4"],
    ["weight" , "T5"],
    ["opv0" , "T25"],
    ["hepb1" , "T29"],
    ["hepb2" , "T33"],
    ["hepb3" , "T37"],
    ["hepb0" , "T68"],

    ["src_bcg" , "T24"],
    ["src_dose1" , "T28"],
    ["src_dose2" , "T32"],
    ["src_dose3" , "T36"],
    ["src_measles" , "T40"],
    ["src_opv0" , "T26"],
    ["src_hepb1" , "T30"],
    ["src_hepb2" , "T34"],
    ["src_hepb3" , "T38"],
    ["src_hepb0" , "T69"]
]
var objects=[];
objectsLookUp.map(objMap);

var btnImmunisation=document.querySelector('input[value="Save Immunisation"]');

objects.immubutton=btnImmunisation;


var dob=objects.dob.value;

function infGenEntered(){//says whether General information about infant is entered //FIXME : Infant name, Birth reg no
	return (objects.weight.value!=="" && objects.sex.selectedIndex!==0);
}

if(infGenEntered()){// We have to enter immunisation
	//resolveToElt("T23").scrollIntoView();
	var lstFields="bcg,dose1,dose2,dose3,measles".split(",");
	for(let i in lstFields){
        var obj=objects[lstFields[i]];
		if(obj.value===""){
			obj.focus();
			break;
		}
	}
}

var showDayCountFromDOB = field => objects[field].addEventListener("mouseover",
		function(){
			this.title=this.value.minus(dob);//dob = date of birth
		},true);
	
	
var lstFields="opv0,hepb1,hepb2,hepb3".split(",");
lstFields.map(showDayCountFromDOB);

function cloneDatesImmun(src,toclone,sourcesClone,where,next){
	objects[src].addEventListener("blur",
		function(){
            var val=this.value;
            toclone.split(",").map(name=>objects[name].value=val);
            sourcesClone.split(",").map(name=>wysiwyc(objects[name],new RegExp(where)));
			if(this.value===""){
				btnImmunisation.focus();
			}else{
                objects[next].focus();
            }
		},true)
}

var clonesLookUp={
    "bcg":"opv0,hepb0",
    "dose1":"hepb1",
    "dose2":"hepb2",
    "dose3":"hepb3",
    "measles":"measles", //a trick
}



var sourcesCloneLookUp={//where each dose is put...
    "bcg":"src_bcg,src_hepb0,src_opv0",
    "dose1":"src_dose1,src_hepb1",
    "dose2":"src_dose2,src_hepb2",
    "dose3":"src_dose3,src_hepb3",
    "measles":"src_measles",
}


var bcgsource="^GH$";
if(sessionStorage["deliveryhosptype"]!=null){
bcgsource=sessionStorage["deliveryhosptype"].replace(/^PNH$/,"Pvt.").replace(/^T-Hosp$/,"^GH$");
}

var otherSource="^HSC$";
if(/^m[1-5]$/.test(sessionStorage["whoami"])){ //if municipality
    otherSource="^PHC$";
}

var whereLookUp={
    "bcg":bcgsource,
    "dose1":otherSource,
    "dose2":otherSource,
    "dose3":otherSource,
    "measles":otherSource,
}
//console.log(whereLookUp);
var whereToGoLookUp={
    "bcg":"dose1",
    "dose1":"dose2",
    "dose2":"dose3",
    "dose3":"measles",
    "measles":"immubutton",
}


for(let key in clonesLookUp){
            cloneDatesImmun(key,clonesLookUp[key],sourcesCloneLookUp[key],whereLookUp[key],whereToGoLookUp[key]);
}
objects.src_measles.addEventListener("blur",
		function(){
			if(this.selectedIndex!==0){
				btnImmunisation.focus();
			}
		},true);



function aForAppropriateVaccDate(src){
objects[src].addEventListener("keydown",
	function(e){
		if(e.keyCode==65){//a for automatic
			e.preventDefault();
            var n="bcg,dose1,dose2,dose3,measles".split(",").indexOf(src);
			this.value=dob.appropriateVaccinationDate(n);
			return;
		}
		return;
	},true);
}
"bcg,dose1,dose2,dose3,measles".split(",").map(aForAppropriateVaccDate);



if(/Referral details/.test(document.body.innerHTML)){//if the page contains the referral details table hide it
    var tabl=document.getElementsByTagName("table");
    [3,5,6,8].map(nth=>hide(tabl[nth]));
	
	return;
}
