// ==UserScript==
// @name        BJP_FinalEntry
// @namespace   Guru
// @include     *bjptn.com/NewMembershipForm2*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/bjp_specific.js
// @icon        /home/guru/guru_bin/bjp.jpeg
// @version     1
// @grant       none
// ==/UserScript==

Array.prototype.oneOf=function(){
	return this[Math.floor(Math.random()*this.length)];
}
var gt =  x => resolveToElt(pfx(x));
/*
if(gt("TxtKaryakartha").value==""){
gt("TxtKaryakartha").value="201202001"
}
*/

String.prototype.getInitial=function(){
    if(this.indexOf(".")>2){
        return this.substr(this.length-1,1);
    }else{
        return this.substr(0,1);
    }

}
//gt("TxtFHName").value=gt("TxtName").value.substr(0,1);
gt("TxtFHName").value=gt("TxtName").value.getInitial();
gt("TxtAge").value=[30,31,32,33,34,35,36,37,38,39,40].oneOf();
gt("TxtAge").onblur();

let edu=gt("DdlEducation");
wysiwyc(edu,[/Diploma/,/HSC/,/UG/].oneOf());

var intrst= gt("DdlInterest");
wysiwyc(intrst,[/Counsellor/,/Education/,/Central/,/Agriculture/,/Energy/,/Environment/].oneOf());

gt("RbVNo").click();



window.addEventListener("keyup",function(e){
    //resolveToElt("ctl00_Contentpage_RbFemale").click();


		if( e.keyCode==113){
            e.preventDefault();
            btnSubmit=gt("BtnSubmit");
            btnSubmit.focus();
            btnSubmit.click();
		}else if( e.keyCode==192){
            e.preventDefault();
            gt("TxtName").focus();
		}else if (e.keyCode == 32 && document.activeElement.type!="text"){
            e.preventDefault();
wysiwyc( gt("DdlLocatity"), /Mayiladuthurai/);
gt("DdlLocatity").onchange();
wysiwyc( gt("DdlPanchayat"), /pandal/);
gt("DdlPanchayat").onchange();
            //onEmptyFocus( gt("TxtName")  );
		}else if (e.keyCode == 77 && document.activeElement.type!="text"){
            e.preventDefault();
            gt("RbMale").click();
            let occ=gt("DdlOccupation");
            wysiwyc(occ,[/Agriculture/,/Estate/,/Environment/,/Logistic/].oneOf());
		}else if (e.keyCode == 70 && document.activeElement.type!="text"){
            e.preventDefault();
            gt("RbFemale").click();
            let occ=gt("DdlOccupation");
            wysiwyc(occ,[/Housewife/,/Housewife/,/Environment/].oneOf());

                } 


        
},true);

gt("DdlOccupation").focus();
gt("DdlOccupation").blur();
//wysiwyc( gt("DdlMandal"), /Mayiladuthurai nagar/);

let krnd=[14].oneOf();//Koorainadu
//wysiwyc(gt("DdlSthan"),new RegExp(krnd));
wysiwyc( gt("DdlLCategory"), /Union/);
//wysiwyc( gt("DdlLCategory"), /Municip/);
gt("DdlLCategory").onchange();

//gt("TxtWard").value=36
//gt("TxtWard").value= krnd ; //koorainadu
//wysiwyc( gt("DdlBooth"), /151/);
wysiwyc( gt("DdlBooth"), [/187/,/189/].oneOf());
//wysiwyc( gt("DdlBooth"), [/117/,/119/,/120/,/121/].oneOf()); //Mayiladuthurai Nagar
wysiwyc( gt("DdlBooth"), [/117/,/119/].oneOf()); 

//wysiwyc( gt("DdlSthan"), /36/);





var bombLocality=setInterval(chooseLocality,800);
function chooseLocality(){
    var obj=gt("DdlLocatity")
    if(obj.selectedIndex<=0){
        //wysiwyc(obj,/Mayila/);
        wysiwyc(obj,/Mayiladu/);
        obj.onchange();
    }else{
        clearInterval(bombLocality);//defuse the bomb; :-)
    }
}

var bombPanchayat=setInterval(choosePanchayat,800);
function choosePanchayat(){
    var obj=gt("DdlPanchayat")
    if(obj.selectedIndex<=0){
        //wysiwyc(obj,/Mayila/);
        wysiwyc(obj,/Mannam/);
        obj.onchange();
    }else{
        clearInterval(bombPanchayat);//defuse the bomb; :-)
    }
}

