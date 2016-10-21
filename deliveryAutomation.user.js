// ==UserScript==
// @name        deliveryAutomation
// @namespace   guru
// @description automatically fills some details etc
// @include     file:///*
// @include     *picme*
// @exclude     *picme*mainmenu*
// @exclude     *picme*default*asp
// @exclude	*picme*Rselpage*asp
// @exclude	*picme*Rselreppage*asp
// @require     /home/guru/guru_bin/date_manip_utils.js
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @icon        /home/guru/guru_bin/delivery.png
// @version     1
// ==/UserScript==
if(!/Delivery/.test(document.body.innerHTML)){//execute only on the page containing DELIVERY DETAILS
	return;
}

var objectsLookUp=[

    ["preg_outcome", "T44"],
    ["nb_born", "T47"],
    ["partograph", "T51"],
    ["mother_alive", "T52"],
    ["delivery_time", "DeliTime"],
    ["delivery_date", "T45"],
    ["delivery_place", "T48"],
    ["deliverysave", "save4"],

    ["delivery_district", "T49"],
]

var objects=[];
function objMap(x){
    objects[x[0]]=resolveToElt(x[1]);
}
objectsLookUp.map(objMap);

if(objects.preg_outcome.value==="1" || 
	objects.preg_outcome.value==="2" ||
	objects.preg_outcome.value==="4"){
		return;
}


objects.preg_outcome.value="3";
objects.nb_born.value="1";
objects.partograph.value="1";
objects.mother_alive.value="1";

window.chktime1=(window.chktime1+"").replace(/alert\(document.main.DeliTime.value\);/,"");// we don't want their script to show us the time with an alert box.


objects.delivery_time.addEventListener("keydown",

		function(e){
			if(e.keyCode==65){
				e.preventDefault();
				//resolveToElt("Deliam").checked=true;     CAUTION : DO NOT USE RESOLVE TO ELEMENT  ABSTRACTION HERE in these radio buttons.
				document.getElementsByName("Deliam")[0].checked=true;
			}else if(e.keyCode==80){
				e.preventDefault();
				document.getElementsByName("Deliam")[1].checked=true;
			}
		
		}
		);

resolveToElt("ButHosp").addEventListener("blur",
		function(){
		objects.deliverysave.focus();},true)

if(/AN Referral/.test(document.body.innerHTML)){//if the page contains the referral details table hide it
	document.getElementsByTagName("table")[8].style.display="none";
}

var tabl=document.getElementsByTagName("table");
var temp_table_tr=tabl[7].rows;
function showInfoDelivery(){
		var edd=resolveToElt("T16").value;
		var dob=objects.delivery_date.value;
		var days="sun,mon,tue,wed,thu,fri,sat".split(",");
		var day=days[dob.toDate().getDay()];
		var info="   <i>"+dob.minus(edd)+"    "+day+"</i>";
		var tmp=temp_table_tr[0].cells[0].innerHTML.replace(/\(.*\)/,"");
		temp_table_tr[1].cells[0].innerHTML= tmp+ "("+info+")";
}
function showMotherInfoAtDelivery(){
	var mother=resolveToElt("T4").value;
	var father=resolveToElt("T5").value;
	var extPicme=tabl[2].rows[0].cells[1].innerHTML.match(/[0-9]+/);
	var info=" <i>"+mother+" "+father+" "+extPicme+"</i>";
	//alert(info);
	temp_table_tr[0].cells[0].innerHTML+="("+info+")";
}
showMotherInfoAtDelivery();
//alert(resolveToElt("T4").value);

if(objects.delivery_date.value!==""){
	showInfoDelivery();
}

objects.delivery_date.addEventListener("blur", showInfoDelivery ,true)

var privateHospKnowledge={
    'O':[/PNH/,/Nagapattinam/,"Our Lady of"],
    'H':[/PNH/,/Nagapattinam/,"Guhan"],
    'A':[/PNH/,/Nagapattinam/,"Arun Priya"]
};
var governmentHospKnowledge={
    'M': [/GH/,/Nagapattinam/,"Mayiladuthurai"],
    'S': [/GH/,/Nagapattinam/,"Sirkazhi"],
    'K': [/GH/,/Thanjavur/,"Kumbakonam"],
    'C': [/GH/,/Cuddalore/,"Chidambaram"],
    'T': [/T-Hosp/,/Thanjavur/,"Thanjavur Medical College"],
    'R': [/T-Hosp/,/Thanjavur/,"Raja Mirasdar"],
    'V': [/T-Hosp/,/Thiruvarur/,"Thiruvarur Medical College"],
    'U': [/UHP/,/Nagapattinam/,"MAYILADUTHURAI"]
};

objects.delivery_place.addEventListener("keydown",

        function(e){
            var keyc=String.fromCharCode(e.keyCode);
            var knowledgebase=(e.shiftKey ? governmentHospKnowledge : privateHospKnowledge);
            if(keyc in knowledgebase){
                e.preventDefault();
                chooseHosp(knowledgebase[keyc]);
            }    
        });

objects.delivery_place.addEventListener("blur",
		function(){
			if( objects.delivery_district.selectedIndex>0 && (resolveToElt("T50").value !== "")){
			objects.deliverysave.focus();
			}
			sessionStorage["deliveryhosptype"]= this.options[this.selectedIndex].text;
	
		},true)
var chooseHosp=function(details){ // chooseHosp([/PNH/, /Nagapattinam/, "Arun Priya"])
				wysiwyc(objects.delivery_place,details[0])
				wysiwyc(objects.delivery_district,details[1])
				sessionStorage["deliveryhosp"]=details[2]
				unsafeWindow.GetHosp();

}
