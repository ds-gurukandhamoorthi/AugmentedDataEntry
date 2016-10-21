// ==UserScript==
// @name        TNPSC_Automation_ Group 4
// @namespace   Guru
// @description Automates some of the data entry in TNPSC Application Group 4
// @include     *tnpscexams.net/*
// @version     1
// ==/UserScript==

if(!/Group-IV Services/.test(document.body.innerHTML)){//execute only on the ANC details page
	//alert(123);
	return;
}

//Group 4
document.getElementsByName("application_1")[0].click();

//some selections avoided;

//post preference
document.getElementById("post_perf1").selectedIndex=1;
document.getElementById("post_perf2").selectedIndex=2;
document.getElementById("post_perf3").selectedIndex=3;
document.getElementById("post_perf4").selectedIndex=6;
document.getElementById("post_perf5").selectedIndex=7;


//destitute widow no
document.getElementsByName("widow")[1].click();


//Preferential Qualification Yes
document.getElementsByName("pref_not")[0].click();

//Physical Standards as per notification Yes
document.getElementsByName("physi_not")[0].click();

//Criminal No
document.getElementsByName("crim_reg")[1].click();

//Political activity No
document.getElementsByName("polit_agit")[1].click();

//Surveyor Training No
document.getElementsByName("surv_not")[1].click();


//Government Employee No
document.getElementsByName("gov_emp")[1].click();

///*******************************************
//ASSUMPTIONS

//Age Concession No
document.getElementsByName("age_concess")[1].click();
//Exam in Tamil
document.getElementById("txt_optionalsub").selectedIndex=1;
//Exam Center = Nagapattinam District, Mayiladuthurai
document.getElementById("txt_districtname").value="15";//Nagapattinam
document.getElementById("txt_centername").value="1104";//Mayiladuthurai

//*********************************************


document.getElementById("sslc_medium").addEventListener("blur",function(){
	if(document.getElementById("sslc_univ").value==""){//STATE BOARD
		document.getElementById("sslc_univ").value="State Board";
	}
	if(document.getElementById("sslc_medium").selectedIndex==1){//if tamil medium in SSLC
		document.getElementsByName("pstm_not")[0].checked=true;// then accept reservations for TAMIL MEDIUM
		//we don't use the click event because it would show us an useless alert box;
	}
	//Details regarding prescribed qualification
	document.getElementById("quli_det").selectedIndex=1;//SSLC too
	document.getElementById("quli_det").onchange();
	document.getElementById("qaldegree_yrs").selectedIndex=document.getElementById("sslc_yrs").selectedIndex;
	if(document.getElementById("quli_authoruniv").value==""){//STATE BOARD
		document.getElementById("quli_authoruniv").value="State Board";
	}

	document.getElementById("hsc_yrs").focus();
		},true
		);

document.getElementById("hsc_medium").addEventListener("blur",function(){
	if(document.getElementById("hsc_univ").value==""){//STATE BOARD
		document.getElementById("hsc_univ").value="State Board";
	}
	document.getElementById("degree_yrs").focus();

		},true
		);

document.getElementById("hsc_yrs").addEventListener("blur",function(){
	if(this.selectedIndex==0){
		document.getElementById("quli_cert").focus();
	}
		},true
		);
document.getElementById("degree_yrs").addEventListener("blur",function(){
	if(this.selectedIndex==0){
		document.getElementById("quli_cert").focus();
	}
		},true
		);

var univs=new Array();
univs["bu"]="Bharathidasan University";
univs["au"]="Annamalai University";
document.getElementById("degree_univ").addEventListener("blur",function(){
	var key=this.value;
	if(!(univs[key]==null)){
		this.value=univs[key];
	}

		},true
		);

document.getElementById("pgdegree_univ").addEventListener("blur",function(){
	var key=this.value;
	if(!(univs[key]==null)){
		this.value=univs[key];
	}

		},true
		);

//if SC/SCA issuing authority=Thasildar
document.getElementById("txtccategory").addEventListener("blur",function(){
	if(this.selectedIndex==2 || this.selectedIndex==3){
		document.getElementById("issuauthority").selectedIndex=1;//Thasildar
		document.getElementsByName("claim_fee")[0].click();//Claim_fees exemption
		document.getElementById("txt_exe_cate").selectedIndex=1;//Claim_fees exemption

	}
		},true
		);

