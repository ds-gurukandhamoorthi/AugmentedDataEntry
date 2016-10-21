// ==UserScript==
// @name        ICDS_GoFirstRelevantLink
// @namespace   Guru
// @include     *wcd.nic.in/icds/icdsmis/icdsmis_mprdata_menu*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/icds_specific.js
// @icon        /home/guru/guru_bin/relevant.jpeg
// @version     1
// @grant       none
// ==/UserScript==

let whoIsIt = who();
localStorage["lastAWC"]=whoIsIt;
const easyValues ={
"33618050401":"",//Alagapachette St
"33618050402":"1,ydijl,nabcd",//Alanthuraiyappa Sannadi
"33618050403":"1,ydijl,nabcde",//Anjalagasalai
"33618050404":"",//Mahadhanapuram
"33618050405":"1,ydgjl,nabd",//Arokkayanathapuram
"33618050406":"",//Arupathumoovar Pattai
"33618050407":"",//Balusamimadam
"33618050408":"1,ydij,nabd",//Maraiyur
"33618050409":"",//Dabeertheru
"33618050410":"",//Marriyamman Kovil
"33618050411":"",//Kavigar Vethenayagam
"33618050412":"",//Magaperuillam
"33618050413":"",//Elanthoppu
"33618050414":"",//Sitharkadu
"33618050415":"",//Vandeekara Theru
"33618050416":"1,nabch,na",//Aayavalam
"33618050417":"",//Anaimelagaram
"33618050418":"2,yd,nabde",//Cholampettai
"33618050419":"",//Ganganaputhur
"33618050420":"",//Nayivasal
"33618050421":"",//Kozhekuthe
"33618050422":"0,yijl,nabc",//M.G.R.Nagar
}

if(whoIsIt in easyValues){
    let val=easyValues[whoIsIt];
    if(typeof val === 'string'){//FIXME: perhaps add more verifs..
        let arr=val.split(",");
        if(arr.length==3){
            sessionStorage["ic"+whoIsIt+":07/2015"]=arr[0];
            sessionStorage["vhn"+whoIsIt+":07/2015"]=arr[1];
            sessionStorage["mas"+whoIsIt+":07/2015"]=arr[2];
        }
    }
}

//let arr= "4,yabcig,nabc".split(",");
///sessionStorage["ic"+whoWhen()] = arr[0]

if(sessionStorage["dodgeHome"]=="true"){
   sessionStorage["dodgeHome"]="false";
   backLink().click(); 
   return;
}
hide(resolveToElt('header'));

//status remarks = Data found / No Data

allRelLinks = getLinks(/Data/);
//console.log(allRelLinks)

var notYetEntered = obj => /No Data/.test(obj.text);
//var orderOfEntering= [0,1,3,5,6,12,2,4,7,8,9,10,11];
//var orderOfEntering= [11,9,2,0,1,2,3,4,5,6,7,8,9,10,11,12];
//orderOfEntering=[11,9,2]
var orderOfEntering=[7,8,9,10,11,2,0,1,12,3,4,5,6]
for(let i=0; i<orderOfEntering.length; i++){
    let lnkNo=orderOfEntering[i];
    if(notYetEntered(allRelLinks[lnkNo])){
        allRelLinks[lnkNo].click();
        break;
    }
}

