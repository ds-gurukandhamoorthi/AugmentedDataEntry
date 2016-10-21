// ==UserScript==
// @name        mrmbs
// @namespace   guru
// @description automates certain fillings
// @include     *mrmbs*
// @require     /home/guru/guru_bin/date_manip_utils.js
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/iob_knowledge.js
// @icon        /home/guru/guru_bin/mr.jpeg
// @version     1
// ==/UserScript==


if(!/Reddy Maternity Benefit Scheme/.test(document.body.innerHTML)){//execute only on the MRMBS page
	return;
}
if(!/Application Entry/.test(document.body.innerHTML)){//execute only on the MRMBS page
	return;
}

console.log("fixme")

document.getElementsByName("T5")[2].checked=true;// No FSSS so Others


if(resolveToElt("lmp").length===0){//execute only on the page of MRMBS
	return;
}

var lmpDate=resolveToElt("lmp").value;
//alert(lmpDate);
var minAppDate=(lmpDate.add(28*7)).toStr();
var strAppDate=(lmpDate.add(28*7+Math.floor(Math.random()*10)+1)).toStr();
var todaysDate=(new Date()).toStr();



if(/34070305/.test(resolveToElt("picmeno").value)){//execute only for Muncipality ...
	resolveToElt("T5").checked=true;// No FSSS so Others
	if(resolveToElt("T8").value===""){
	resolveToElt("T4").value=strAppDate;
	resolveToElt("T8").focus();
	resolveToElt("T8").value="20/G/0";
	}
}

if(/34070503/.test(resolveToElt("picmeno").value)|| /3481010/.test(resolveToElt("picmeno").value)){//execute only for 
	if(resolveToElt("T8").value===""){
	resolveToElt("T4").value=strAppDate;
	resolveToElt("T8").focus();
	resolveToElt("T8").value="20/G/0";
	}
}

//pressing "r" would fill with a random date that is correct; FIXME: make sure that the date is after the picme reg date.
resolveToElt("T4").addEventListener("keydown",
		function(e){
			if(e.keyCode===82){
				e.preventDefault();
				resolveToElt("T4").value=strAppDate;
				}
			if(e.keyCode===84){
				e.preventDefault();
				resolveToElt("T4").value=todaysDate;
				}
			if(e.keyCode===83){
				e.preventDefault();
				resolveToElt("T4").value=minAppDate;
				}

				},true);


//Automation: once availed, not availed.
var gravida=document.getElementsByTagName("table")[1].rows[4].cells[3].textContent.trim();
//alert(gravida);
if(gravida>1){
	resolveToElt("T13").value=2;//once availed
}else{
	resolveToElt("T13").value=1;//not availed
}

//Fills the type of Residence Id based on the format "20/..." -> Rationcard , "NGP..." -> UID
resolveToElt("T8").addEventListener("blur",
	function(){
		var idno=this.value;
			this.value=this.value.toUpperCase();
		if(/^[0-9]{2}\//.test(idno)){
			resolveToElt("T7").value=1;//Ration Card
		}else if(/^NGP/i.test(idno)){
			resolveToElt("T7").value=4;//UID
		}else if(/^[A-Z]{3}/i.test(idno)){
			resolveToElt("T7").value=2;//Voter's ID
		}else{
			resolveToElt("T7").value=5;// Others
		}
	},true);

var bankEntered=false;
resolveToElt("T9").addEventListener("blur",  // by quitting the account number field we automatically choose bank
	function(){
		//alert(1);

		sessionStorage["accountno"]= this.value;
		if(bankEntered){return;}
		if(resolveToElt("T10").value===""){return;}
		if(resolveToElt("T11").value===""){return;}
		if(resolveToElt("T12").value!==""){return;}
	

		//GetBank();
		unsafeWindow.GetBank();
		bankEntered=true;

		
	},true);


//CAUTION: if any changes are made in the mrmbs code MAKE SURE THAT YOUR CODE is CHANGED accordingly. otherwise it would suck
//Example: if they add a new bank then iob may not be the 20th value ... OKAY, Now I use regexp and the function wysiwyc (what you see is what you choose);more robust;
var IOBsuffix="010000";

var bankKnowledge={ //bank code filling; ju -> 0963010000 ; ni -> 0557010000
    "ju":"0963"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "my":"0057"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "ni":"0557"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "mn":"0229"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "el":"1260"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "kt":"0045"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "kl":"0795"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "ak":"0228"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "en":"0610"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "kn":"1049"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "kv":"0279"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "sm":"2334"+IOBsuffix+",^INDIAN OVERSEAS BANK$,NAGAPATTINAM",
    "i":",^INDIAN BANK$,NAGAPATTINAM",
    "s":",^STATE BANK OF INDIA$,NAGAPATTINAM",
    "c":"121010,^CANARA BANK$,NAGAPATTINAM",
    "ct":",^CANARA BANK$,THIRUVARUR",
    "b":",^BANK OF BARODA$,NAGAPATTINAM",
    "u":"5005020100,^UNION BANK OF INDIA$,NAGAPATTINAM",
    "bi":"81311011000,^BANK OF INDIA$,NAGAPATTINAM",
    "v3":"306501230000,^VIJAYA BANK$,NAGAPATTINAM",
    "v1":"30650101100,^VIJAYA BANK$,NAGAPATTINAM",
}
resolveToElt("T9").addEventListener("keydown",
		function(e){
			if(e.keyCode==79 && this.value.length==4){ // O for IOB
				e.preventDefault();
				var iob_code = this.value; //0963 -> junction
				var distr=iob_district[iob_code];
				if(distr){	
					wysiwyc(resolveToElt("T10"),/^INDIAN OVERSEAS BANK$/);
					resolveToElt("T11").value=iob_district[iob_code];
                    this.value=this.value+"010000"; //Iob suffix
				}
				return;
			}
			if(e.keyCode!=106){
				return;
			}
			e.preventDefault();
			var key=this.value;

			if(key in bankKnowledge){
                var knwl=bankKnowledge[key].split(",");
				this.value=knwl[0];
                wysiwyc(resolveToElt("T10"),new RegExp(knwl[1]));
                wysiwyc(resolveToElt("T11"),new RegExp(knwl[2]));
			}
		},true);


//FIXME : do some sanity checks ; like iob whether the number is correct etc...

window.addEventListener("keyup",function(e){
		if( e.keyCode==113){ //bind F2 as save button
        document.querySelector('input[value="Save"]').click();
		}},true)

