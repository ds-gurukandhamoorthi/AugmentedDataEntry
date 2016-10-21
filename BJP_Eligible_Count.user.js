// ==UserScript==
// @name        BJP_Eligible_Count
// @namespace   Guru
// @include     *bjptn.com/EP_Sthan*
// @version     1
// @grant       none
// ==/UserScript==
//


let chks=document.querySelectorAll("input[type='checkbox']");
//console.log(chks.length/4);

var cntElect=0;
for(let i = 0; i<chks.length;i++){
    if(chks[i].checked){
        cntElect++;
    }
}
//console.log(cnt);
let nbBooth = chks.length/4;
console.table([nbBooth,cntElect,nbBooth<=cntElect*4 ]);
