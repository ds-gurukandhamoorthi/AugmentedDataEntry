// ==UserScript==
// @name        ICDS_YesNoChoose
// @namespace   Guru
// @description Choose the radio buttons yes or no
// @include     *wcd.nic.in/icds/icdsmis/icdsmis_mprdata_awvhnd*
// @include     *wcd.nic.in/icds/icdsmis/icdsmis_mprdata_awmonitorsuper*
// @icon        /home/guru/guru_bin/yes_no.png
// @require     /home/guru/guru_bin/icds_specific.js
// @version     1
// @grant       none
// ==/UserScript==


var radButnsYes=document.querySelectorAll("input[type='radio'][value='1']")
var radButnsNo=document.querySelectorAll("input[type='radio'][value='0']")


var chooseYesForAll=function(){
    for(let i = 0; i<radButnsYes.length;i++){
                radButnsYes[i].checked=true;
    }
}
var chooseNoForAll=function(){
    for(let i = 0; i<radButnsYes.length;i++){
                radButnsNo[i].checked=true;
    }
}

String.prototype.coupleChars=function(x,y){//x and y should be both present or both absent // we would suppose uniqueness
    return(this.replace(y,'').replace(x,x+""+y)); //FIXME: so much preconceptios about how it should be..
}

String.prototype.putConstrnts=function(){
    return (this.coupleChars("i","m")
                .coupleChars("j","v")
                .coupleChars("k","u"));

}
/* older "soft&safe" version when I did manually...
var chooseYesForAll=function(){
    for(let i = 0; i<radButnsNo.length;i++){
        console.log(radButnsNo[i].checked)
        if(!radButnsNo[i].checked){
                radButnsYes[i].checked=true;
        }
    }
}
*/

var chooseChar = function (chr){
    let c= chr.charAt(0).toUpperCase()
    let ord = c => c.charCodeAt(0)
    let num = c => ord(c)-ord('A')
    if( c>='A' && c<='M'){
        chooseRadio(num(c));
    }else if( c=='Y'){
        chooseYesForAll();
    }else if( c=='N'){
        chooseNoForAll();
    }else if( c=='V'){
        chooseRadio(13);
    }else if( c=='U'){
        chooseRadio(14);
    }
}
var choose = function (str){
    str.putConstrnts().split('').forEach(chooseChar);
}
var chooseRadio = function(n){
    if(radButnsYes[n].checked){
        radButnsNo[n].click();
    }else{
        radButnsYes[n].click();
    }
}
document.addEventListener("keydown",
	function(e){
                let c= String.fromCharCode(e.keyCode)
                if( c>='A' && c<='Z'){
                    e.preventDefault();
                    chooseChar(c);
                }
	},true);
if(/VILLAGE HEALTH AND NUTRITION/.test(document.body.textContent)){
    let vhnd= sessionStorage["vhn"+whoWhen()]; 
    if(typeof vhnd !== "undefined"){
        choose(vhnd);
    }
        return;
}
if(/MONITORING AND SUPERVISION/.test(document.body.textContent)){
    let mas= sessionStorage["mas"+whoWhen()]; //mas M.A.S monitoring and supervision.
    if(typeof mas !== "undefined"){
        choose(mas);
    }
        return;
}

