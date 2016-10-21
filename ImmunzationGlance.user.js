// ==UserScript==
// @name        ImmunzationGlance
// @namespace   Guru
// @description At a glance get all immunisation
// @include     *picme.tn.nic.in/Rselreppage.asp
// @icon        /home/guru/guru_bin/eye-icon.png
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/picme_utils.js
// @require     /home/guru/guru_bin/func_utils.js
// @require     /home/guru/guru_bin/date_manip_utils.js
// @version     1
// @grant       none
// ==/UserScript==



/*
if(!/(Work Plan For Child Immunisation)/.test(document.body.innerHTML)){//execute only on the page containing reports
	//alert("quitted");
	return;
}
if(/(HUD LEVEL)/i.test(document.body.innerHTML)){//Avoid getting executed on the entry page
	return;
}
*/


var hscNo=getHscNo();

var who=sessionStorage["whoami"];

var thornyCasesKnowledge={
    "65" : [1165,1096],  //Maapadugai
    "73" : [720,],  //Sithamalli
    "42" : [542,539,],  //Kavalmedu
    "41" : [682,],  //Kadalangudi
    "45" : [611,],  //Mudikandanallur
    "81" : [716,],  //Arulmozhi
    "83" : [752,],  //Maraiyur



}




var collTables=document.getElementsByTagName("table");
var arrTables=[].slice.call(collTables)

var containsANCID = table => table.innerHTML.indexOf("Sl")>=0;

/*
function startsSequence(table){
	return (table.innerHTML.indexOf("<td>1</td>")>=0);
}
*/

var tablesWithANCID=arrTables.filter(containsANCID);

var spanningThings=document.querySelectorAll("td[colspan='14']");

var calcHscIndex = nodeTd => tablesWithANCID.indexOf(nodeTd.parentNode.parentNode.parentNode);


var hscIWant=hscNo;
var nodeTd=spanningThings[hscIWant-1];
var nodeTr=nodeTd.parentNode;
var nodeTabledata=nodeTr.parentNode;
var n=Array.prototype.indexOf.call(nodeTabledata.childNodes,nodeTr);

var hscIndex=calcHscIndex(nodeTd);
//console.log(hscIndex);
//console.log(calcHscIndex(nodeTd));
console.log(n);



var hscNextIndex=200;
console.log(spanningThings.length);
if(spanningThings.length>hscNo){
   
var nodeTdNext=spanningThings[hscIWant-1+1];//next HSC
hscNextIndex=calcHscIndex(nodeTdNext);

//console.log(hscNextIndex);
console.log(calcHscIndex(nodeTdNext));
}

console.log(spanningThings.length);
console.log(tablesWithANCID.length);
//console.log(typeof tablesWithANCID[485])


var toImmunize=[];
hscloop:
for(let h=hscIndex;h<=hscNextIndex;h++){
    if(typeof tablesWithANCID[h] === "undefined"){

        break;
    }
    for(let i=(h==hscIndex?n:1); i<tablesWithANCID[h].rows.length;i++){
    var row=tablesWithANCID[h].rows[i]
        
        if(isNaN(row.cells[0].textContent*1)){
            break hscloop;
        }
        var duedate=row.cells[11].textContent;
        if(duedate.beforeLastPossibleImmDate()){
        toImmunize.push(row.cells[1].textContent);
         //row.style.display="none"
        }
    }
}


//console.log(toImmunize.join(","))
if(who in thornyCasesKnowledge){
    let avoidImm = infnt =>thornyCasesKnowledge[who].map(String).indexOf(infnt)<0;
    console.log(toImmunize);
    toImmunize=toImmunize.filter(avoidImm);
    console.log(toImmunize);
}
sessionStorage["toImmunize"]=toImmunize.reverse().join(",")

var uptoHide=hscIndex;
var thenHide=hscNextIndex;

    console.log(uptoHide)
    console.log(thenHide)

for(let i=0; i<tablesWithANCID.length;i++){
    if(uptoHide==thenHide){
        thenHide++;

    }
    if(i<uptoHide || i>thenHide){
        hide(tablesWithANCID[i]);
    }

}

