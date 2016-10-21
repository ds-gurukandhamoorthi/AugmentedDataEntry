// ==UserScript==
// @name        ANCDetails
// @namespace   guru
// @description Automates some data entry in the ANC details page
// @include		*picme*
// @exclude		*picme*mainmenu*
// @exclude		*picme*default*asp
// @exclude		*picme*Rselpage*asp
// @exclude		*picme*Rselreppage*asp
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/func_utils.js
// @require     /home/guru/guru_bin/date_manip_utils.js
// @require     /home/guru/guru_bin/libANCDetails.js
// @icon        /home/guru/guru_bin/bp.jpeg
// @grant 	none
// @version     1
// ==/UserScript==

if(!/AN Visits/.test(document.body.innerHTML)){//execute only on the ANC details page
	return
}
var objects=[];
objectsLookUp.map(objMap);
var isMunicip = () => /3481010/.test(document.body.innerHTML) ;

Array.prototype.asObjects=function(){//THIS FUNCTION MUST BE AFTER THE OBJECTS DEFINITON
    return(this.map(name=>objects[name]));
}
//console.log(["tt_date"].asObjects());
String.prototype.asObjects=function(){//THIS FUNCTION MUST BE AFTER THE OBJECTS DEFINITON
    return(this.split(",").asObjects());
}

var containsSlash = str => /\//.test(str);

function objMap(x){
    objects[x[0]]=resolveToElt(x[1]);
}

var getObj = name => objects[name]
Array.prototype.is=function(val){
    this.forEach(s=>s.is(val));
}
String.prototype.is=function(val){ //"tt_date".is("01/01/2015");
    if(val instanceof RegExp){
        wysiwyc(getObj(this),val)
    }else if(Array.isArray(val)){
        getObj(this).value=val.oneOf();
    }else if(val instanceof HTMLElement){
        getObj(this).value=val.value;
    }else{ 
        getObj(this).value=val;
    }
}

var albmnSugarDefault = () => "urine_albumine,urine_sugar".split(",").is(/^Nil$/);

//To make the box show enough of the year which is very important
var dateFieldExtend = fld => fld.size=8;
"visit_date,tt_date,ifa_date,albendazole_date".asObjects().map(obj=>dateFieldExtend(obj));

// Nil Nil for albumine sugar
objects.albendazole_date.addEventListener("blur",
		function(){
                                        albmnSugarDefault();
					objects.hb.focus();

			},true);

//Place of Visit = HSC
objects.visit_date.addEventListener("blur",
		function(){
				if(this.value!==""){
					"place_of_visit".is(/^HSC$/);
                                        onEmptyFocus(objects.bp);
				}else{
                                        onEmptyFocus("scan1,scan2,scan3".asObjects());//focus on the first empty scan field
				}
			},true);


//SCAN  result = normal and focus on the next scan
objects.scan1.addEventListener("blur",genScanNormal(objects.scanresult1,objects.visitsave),true);
objects.scan2.addEventListener("blur",genScanNormal(objects.scanresult2,objects.visitsave),true);
objects.scan3.addEventListener("blur",genScanNormal(objects.scanresult3,objects.visitsave),true);

objects.fh.addEventListener("blur",
		function(){
                    onEmptyFocus(objects.scan1)
                    objects.visitsave.focus();// Save ANVisit Submit button
			},true);

//on pression star generate a no-brainer value. this is different from a for appropriate
objects.scan1.addEventListener("keydown",genNoBrainer(objects.visit_date),true);
objects.visit_date.addEventListener("keydown",genNoBrainer(objects.reg) ,true);
objects.tt_date.addEventListener("keydown",genNoBrainer(objects.visit_date),true);
objects.ifa_date.addEventListener("keydown",genNoBrainer(objects.visit_date),true);
objects.albendazole_date.addEventListener("keydown",genNoBrainer(objects.visit_date),true);

var visitno=resolveToElt("ANvisitno").value*1;

var tableVisits=document.getElementsByTagName("table")[3];

var dateOfTTs=[];
for(let i=0; i < visitno-1;i++){
	let tmpDate=tableVisits.rows[i+1].cells[6].textContent.trim();
	//contains slash so a valid date
        
        if(containsSlash(tmpDate)){
                            dateOfTTs.push(tmpDate);
        } //only the valid ones are taken
}
var dateOfIFAs=[];
var BPs=[];
var Weights=[];
for(let i=0; i < visitno-1;i++){
    let getVal = cellNo => tableVisits.rows[i+1].cells[cellNo].textContent.trim();
	let  tmpDate=getVal(7), tmpBP=getVal(3);
	doWhen(containsSlash(tmpDate), //contains slash so a valid date
              ()=>dateOfIFAs.push(tmpDate));
	doWhen(containsSlash(tmpBP),   //contains slash so a valid BP
              ()=>BPs.push(tmpBP));
    Weights[i]=getVal(4);
}

console.log(dateOfTTs,BPs,dateOfIFAs,Weights);

//if TTdate filled then put TT1 or TT2 in field VT5...
objects.tt_date.addEventListener("change",
		function(){
					var nbTT=dateOfTTs.length;
					if(nbTT>=2){
						return;
					}
					if(!empValuep(objects.tt_date)){
                        "tt_dose".is(nbTT+1);
					}
					if(/^51$/.test(sessionStorage["whoami"])){

						if(empValuep(objects.ifa_date)){ //give IFA on first visit
							"ifa_date".is(objects.visit_date);
							"ifa_num".is([60,60,80][visitno-1]);
                        }
					}
				},true);


	//Skip TTdose (because it would be filled later automatically), Skip TT field if already two TTs filled,
objects.weight.addEventListener("blur",
    function(){
                    var nbTT=dateOfTTs.length;
                    if(nbTT<2){
                            objects.tt_date.focus();
                    }else if(dateOfIFAs.length<3){
                            objects.ifa_date.focus();
                    }else{
                            objects.albendazole_date.focus();
            }
            doWhen(this.value==="" && Weights.length>=1,
                    ()=>this.value=Weights[Weights.length-1]*1+1);
                    // FIXME if months = 2  then weight must increase by 2
    },true);

objects.bp.addEventListener("blur",
		function(e){
                    doWhen(this.value==="",
                            ()=>this.value=(BPs.length>=1 ? BPs[BPs.length-1] : "110/70"));
		},true);

//if(isMunicip() && resolveToElt("T4").value!=="" ){//execute only for Muncipality ...
if(resolveToElt("T4").value!=="" ){//execute only for Muncipality ...
    console.log(2);
    "place_of_visit".is(/^HSC$/);
    "bp".is("110/70");
    doWhen(visitno>1,
		()=>"weight".is(1+1*Weights[Weights.length-1]));//ADD 1 to prev weight
    albmnSugarDefault();
    var tmp_weeks=new Array(12,16,20,24,28,32);
    objects.weeks.value=tmp_weeks[visitno-1];//height of uterus in weeks
	if(visitno===1){
		"hb".is([9,10]);
		"blood_sugar".is([96,98,102]);//Blood Sugar
		"visit_date".is(objects.reg);//First TT = AN Reg Date
                "tt_date".is(objects.reg.value.nextWednesday());
		"tt_dose".is(/^TT1$/);
		objects.weight.focus();// focus on weight field so as to enter it. all others are entered
                nextToMe(objects.weight,objects.visitsave);
                return;
	}

	if(visitno===2){//TT2 = date of 2nd vis on entering it.
            console.log(1);
                let appDate=appropriateVisit2Date(objects.lmp.value);
		"tt_dose".is(/^TT2$/);
                "visit_date".is(appDate);
                "tt_date".is(appDate.nextWednesday());
                objects.visitsave.focus();
                return;
	}
	if(visitno===3){//IFA = date of 3rd vis on entering it.; number = 30; Albend Azole = 3rd vis date; scan 1 = 3rd vis date
                let appDate=appropriateVisit3Date(objects.lmp.value);
                "visit_date,scan1".split(",").is(appDate);
                "ifa_date,albendazole_date".split(",").is(appDate.nextWednesday());
                "ifa_num".is("30");
                "scanresult1".is(/^Normal$/);
                objects.visitsave.focus();
                return;
	}
}
objects.weeks.addEventListener("mouseover",
		function(){
			let lmp=objects.lmp.value;
			let visdate=objects.visit_date.value;
			let diff=visdate.minus(lmp);
				this.title=Math.floor(diff/7)+"w, "+diff%7+"d";
			},true);
objects.weight.addEventListener("mouseover",
		function(){
			let height=objects.height.value/100;
				this.title=bmi_prime(this.value*1,height);
			},true);

doWhen(visitno===2,
    ()=>aForAppropriate(objects.visit_date, objects.lmp, appropriateVisit2Date));
doWhen(visitno===3,
    ()=>aForAppropriate(objects.visit_date, objects.lmp, appropriateVisit3Date));
var motherGenEntered = () => objects.lmp.value !== "";
doWhen(motherGenEntered(),
	()=>objects.visit_date.focus());
