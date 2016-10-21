// ==UserScript==
// @name        TNPSC_Automation_Common
// @namespace   Guru
// @description Automates some of the data entry in TNPSC that are common to Group 4, Onetime
// @include     *tnpscexams.net/*
// @version     1
// ==/UserScript==



//mother tongue
document.getElementById("txtmtongue").selectedIndex=1;

//indian
//document.getElementsByName("nati")[0].checked=true;
document.getElementsByName("nati")[0].click();

//disabled person no
document.getElementsByName("abled")[1].click();

//Ex service men No
document.getElementsByName("exserv")[1].click();

//State = Tamilnadu 34
document.getElementById("add_state").value=34;


//mother's initial = first letter of father's name
document.getElementById("txtfname").addEventListener("blur",function(){
	document.getElementById("m_initial").value=this.value.charAt(0);
	document.getElementById("txtmname").focus();
		},true
		);


//if date already entered(intelligenty from the cerifno field) skip it
document.getElementById("certifno").addEventListener("blur",function(){
			if(document.getElementById("caste_issue_day").selectedIndex!=0){
	document.getElementById("issuauthority").focus();
			}
		},true
		);

//intelligent typing of date from the certif-no field
document.getElementById("certifno").addEventListener("keydown",
		function(e){
			if(this.value.split("/").length!=3){
				return;
			}
			if(e.keyCode!=9){
				return;
			}
			e.preventDefault();
			var date_dmy_array=this.value.split("/");//day month year
			this.value="";
			var year=date_dmy_array[2]*1;
			if(year<9){
				year="200"+year;
			}else if(year<50){
				year="20"+year;
			}else {
				year="19"+year;
			}
			document.getElementById("caste_issue_day").selectedIndex=date_dmy_array[0]*1;
			document.getElementById("caste_issue_mon").selectedIndex=date_dmy_array[1]*1;
			document.getElementById("caste_issue_year").value=year;
			//alert(date_dmy_array[0]);
		},true);
var districts=new Array();
districts["t"]=23;//Thiruvarur
districts["n"]=11;//Nagapattinam
districts["th"]=19;//Thanjavur
/*
document.getElementById("txtpbirth").addEventListener("change",
		function(e){
			var key=this.value;
			var fieldToFill="txtdistrict";
			if(key.charAt(0).toLowerCase()=="f"){
				fieldToFill="txtfpbirth";
				key=key.substr(1);
			}

			if(!(districts[key]==null)){
				this.value="";
				//alert(districts[key]);
				//resolveToElt("T11").value=districts[key];
				document.getElementById(fieldToFill).value=districts[key];
			}
	document.getElementById("txtpbirth").focus();
		},true);
*/

//skip district etc
document.getElementById("txtpbirth").addEventListener("blur",function(){
	document.getElementById("txtregl").focus();
		},true
		);






document.getElementById("txtpbirth").addEventListener("keydown",
		function(e){
			if(e.keyCode!=32){
				return;
			}
			e.preventDefault();
			var key=this.value;
			var fieldToFill="txtdistrict";
			if(key.charAt(0).toLowerCase()=="f"){
				fieldToFill="txtfpbirth";
				key=key.substr(1);
			}

			if(!(districts[key]==null)){
				this.value="";
				//alert(districts[key]);
				//resolveToElt("T11").value=districts[key];
				document.getElementById(fieldToFill).value=districts[key];
			}
		},true);

document.getElementById("address_3").addEventListener("keydown",
		function(e){
			if(e.keyCode!=32){
				return;
			}
			e.preventDefault();
			var key=this.value;
			var fieldToFill="add_distr";
			/*
			if(key.charAt(0).toLowerCase()=="f"){
				fieldToFill="txtfpbirth";
				key=key.substr(1);
			}
			*/

			if(!(districts[key]==null)){
				this.value="";
				//alert(districts[key]);
				//resolveToElt("T11").value=districts[key];
				document.getElementById(fieldToFill).value=districts[key];
			}
		},true);

full_forms=new Array();
full_forms["my"]="Mayiladuthurai Tk"
full_forms["kt"]="Kuttalam Tk"
full_forms["nn"]="Nannilam Tk"
full_forms["th"]="Thrangambadi Tk"
full_forms["sr"]="Sirkali Tk"
document.getElementById("address_3").addEventListener("blur",function(){
	var key=this.value;
	if(!(full_forms[key]==null)){
		this.value=full_forms[key];
	}

	document.getElementById("add_pin").focus();
		},true
		);
