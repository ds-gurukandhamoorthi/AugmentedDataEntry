// ==UserScript==
// @name        TNPSC_Group2
// @namespace   Guru
// @description group 2
// @include     *tnpscexams.net*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @icon        /home/guru/guru_bin/Tamil-Nadu.jpg
// @version     1
// @grant       none
// ==/UserScript==
//if(!/Combined Civil/.test(document.body.innerHTML)){//execute only on the ANC details page
	//alert(123);
	//return;
//}

var doc=document;

doc.querySelector('input[type="checkbox"][name="application_1"]').click();
doc.querySelector('input[type="checkbox"][name="declar_accept"]').click();

var objects=[];

"txt_centername,txt_optionalsub,sslc_medium,sslc_univ,hsc_medium,hsc_univ,hsc_discipline,hsc_certi,degree_univ,pgdegree_univ,apply_edu_equ,prqualification2,iddetails,certifno,caste_issue_day,caste_issue_mon,caste_issue_year,issuauthority,taluk_s,talukdis,txtccategory".split(",").map(name=>objects[name]=resolveToElt(name));

var selectSome={//ALL radio buttons
    "widow":"N",
    "abled":"N",
    "pref_not":"N",
    "physi_not":"Y",
    "crim_reg":"N",
    "polit_agit":"N",
    "gov_emp":"N",

    "debarred":"N",
    "is_tansi":"N",

    "exserv":"N",

    "socialwelwork":"N",
    "emergencycommof":"N",
    "shortservcregu":"N",

    "age_concess":"N",

    "paymentin":"CBS",


}

for(let key in selectSome){// ALL radio buttons
//doc.querySelector('input[type="radio"][name="'+key+'"][value="'+selectSome[key]+'"]').checked=true;
doc.querySelector('input[type="radio"][name="'+key+'"][value="'+selectSome[key]+'"]').click();
//REMEMBER: Only click events trigger things in this page...
}



wysiwyc(objects.txt_centername,/Mayiladu/);
wysiwyc(objects.txt_optionalsub,/Tamil/);
wysiwyc(objects.apply_edu_equ,/Prescribed/);
objects.apply_edu_equ.onchange();
objects.prqualification2.checked=true;//click doesn't seem to function in this case.



objects.sslc_medium.addEventListener("blur",function(){
	if(objects.sslc_univ.value===""){//STATE BOARD
		objects.sslc_univ.value="State Board";
	}

		},true
		);

objects.hsc_medium.addEventListener("blur",function(){
	if(objects.hsc_univ.value===""){//STATE BOARD
		objects.hsc_univ.value="State Board";
	}
    wysiwyc(objects.hsc_discipline,/H\.S\.C/)
    objects.hsc_certi.focus();

		},true
		);


var univs={
    "bu":"Bharathidasan University",
    "au":"Annamalai University",
}
"degree_univ,pgdegree_univ".split(",").map(name=>objects[name].addEventListener("blur",function(){
	var key=this.value;
	if(key in univs){
		this.value=univs[key];
	}
		},true))

var onetimeid=objects.iddetails.value;
"certifno,caste_issue_day,caste_issue_mon,caste_issue_year,issuauthority,taluk_s,talukdis,txtccategory".split(",").map(name=> objects[name].value=localStorage.getItem(onetimeid+"_"+name))
objects.txtccategory.onchange();
objects.issuauthority.value=localStorage.getItem(onetimeid+"_issuauthority");
