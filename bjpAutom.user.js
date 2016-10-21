// ==UserScript==
// @name        bjpAutom
// @namespace   Guru
// @description bjp 
// @include     *bjptn.com/NewMembership2015*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @icon     /home/guru/guru_bin/bjp.jpeg
// @version     1
// @grant       none
// ==/UserScript==

wysiwyc(resolveToElt("ctl00_Contentpage_DdlParty"),/agapat/);
resolveToElt("ctl00_Contentpage_DdlParty").onchange();



var bombMandal=setInterval(chooseMandal,500);
function chooseMandal(){
    var obj=resolveToElt("ctl00_Contentpage_DdlMandal");
    if(obj.selectedIndex<=0){
        //wysiwyc(obj,/Mayila/);
        wysiwyc(obj,/Semba/);
        obj.onchange();
    }else{
        clearInterval(bombMandal);//defuse the bomb; :-)
    }
}
//var bombSthan=setInterval(chooseSthan,800);
function chooseSthan(){
    var obj=resolveToElt("ctl00_Contentpage_DdlSthan");
    if(obj.selectedIndex<=0){
        wysiwyc(obj,/annam/);
        //obj.onchange();
    }else{
        clearInterval(bombSthan);//defuse the bomb; :-)
    }
}
/*
var bombName=setInterval(focusOnName,500);
function focusOnName(){
    if(document.activeElement.id!=="ctl00_Contentpage_TxtName" && resolveToElt("ctl00_Contentpage_TxtName").value===""){
        resolveToElt("ctl00_Contentpage_TxtName").focus();
    }else{
        clearInterval(bombName);

    }
}
*/

//resolveToElt('ctl00_Contentpage_TxtPincode').value="609001";
//resolveToElt('ctl00_Contentpage_TxtPincode').value="609118";
//resolveToElt('ctl00_Contentpage_TxtAddress3').value="Mayiladuthurai";

//resolveToElt('ctl00_Contentpage_TxtAddress2').value="Achutharaypuram, Mannampandhal";
//resolveToElt('ctl00_Contentpage_TxtAddress2').value="Moongilthottam, Mannampandhal";
//resolveToElt('ctl00_Contentpage_TxtAddress1').value="Kannithoppu";
resolveToElt('ctl00_Contentpage_TxtName').focus();
document.getElementById("ctl00_Contentpage_RbANo").checked=true
document.getElementById("ctl00_Contentpage_RbCNo").checked=true

window.addEventListener("keyup",function(e){
    let cntct = document.getElementById("ctl00_Contentpage_TxtContact").value;
    if(cntct.length==10){
    sessionStorage["contact"]=cntct;
    }
		if( e.keyCode==113){
            e.preventDefault();
            btnSubmit=resolveToElt('ctl00_Contentpage_BtnSubmit');
            btnSubmit.focus();
            btnSubmit.click();
		}else if( e.keyCode==192){
            e.preventDefault();
            resolveToElt("ctl00_Contentpage_TxtName").focus();
		}else if (e.keyCode == 32 && document.activeElement.type!="text"){
            e.preventDefault();
            onEmptyFocus( resolveToElt("ctl00_Contentpage_TxtName")
                    
                    );

                } 


        
},true)
/*
document.getElementById("ctl00_Contentpage_TxtContact").addEventListener("keydown",
        function(e){
            if(e.keyCode===65){
                e.preventDefault();
                document.getElementById("ctl00_Contentpage_TxtContact").value=sessionStorage["contact"];
                return;
            }

        },true);

        */

var pincodeMap={
    "Aalaveli":609118,
    "Kattuchery":609303,
    "Porayar":609307,
    "Thillayadi":609310,


}

window.addEventListener("change",function(){
    if(resolveToElt("ctl00_Contentpage_TxtPincode").value===""){
        let key= resolveToElt("ctl00_Contentpage_TxtAddress2").value;
        if(key in pincodeMap){
            resolveToElt("ctl00_Contentpage_TxtPincode").value=pincodeMap[key];
        }
        if(/Adaikalapuram|Elayangudi|Semmankulam|Thirunanriyur/.test(resolveToElt("ctl00_Contentpage_TxtAddress1").value)){

            resolveToElt("ctl00_Contentpage_TxtAddress2").value="Aalaveli(P.O)";
            resolveToElt("ctl00_Contentpage_TxtAddress3").value="Sirkali (Tk)";
            resolveToElt("ctl00_Contentpage_TxtPincode").value="609118";
            var obj=resolveToElt("ctl00_Contentpage_DdlSthan");
            wysiwyc(obj,/Alaveli/);
        }
    }




        
},true)


