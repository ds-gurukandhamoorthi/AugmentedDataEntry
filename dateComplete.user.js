// ==UserScript==
// @name        dateComplete
// @namespace   guru
// @description auto completes the date
// @include     file:///*
// @include     *picme* 
// @exclude     *picme*mainmenu*
// @exclude     *picme*default*asp
// @exclude	*picme*Rselpage*asp
// @exclude	*picme*Rselreppage*asp
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @require     /home/guru/guru_bin/func_utils.js
// @require     /home/guru/guru_bin/date_manip_utils.js
// @icon        /home/guru/guru_bin/date.jpeg
// @include     *mrmbs* 
// @include     *nmp-icds.tn.gov.in*
// @version     1
// ==/UserScript==


//FIXME modify the following two lines, so that it calculates the two years automatically
var prevYear=2014+"";
var currYear=2015+"";
//var currYear=2011+"";




String.prototype.yfill=function(){//year fill 12 -> 2012 , fill 9 -> 2009
	if(this.length==1){
		return "200"+this;
	}
	if(this.length==2){
		return "20"+this;
	}
	return this;
}
String.prototype.completeDate=function(){
	var temp=this.split("/");
	return temp[0].zfill2()+"/"+temp[1].zfill2()+"/"+(temp.length<=2?currYear:temp[2].yfill());
}
String.prototype.completeDateHyphen=function(){
	var temp=this.split("-");
	return temp[0].zfill2()+"-"+temp[1].zfill2()+"-"+(temp.length<=2?currYear:temp[2].yfill());
}

function autoCompleteDate(dateElmntToComplete){
	var dateObj=resolveToElt(dateElmntToComplete);
	if((typeof dateObj)!=="undefined"){ 
	dateObj.addEventListener("blur",
		function(){
			this.value=this.value.completeDate();
		},true);
	}
}
function autoCompleteDateHyphen(dateElmntToComplete){
	var dateObj=resolveToElt(dateElmntToComplete);
	if((typeof dateObj)!="undefined"){
	dateObj.addEventListener("blur",
		function(){
			this.value=this.value.completeDateHyphen();
		},true);
	}
}




autoCompleteDate("DtFrom");//date from
autoCompleteDate("DtTo");//date to

autoCompleteDateHyphen("textdat");//BIRTH CERTIF date of reg
autoCompleteDateHyphen("textbdat");// " date of birth

if(/AN Mother General Information/.test(document.body.innerHTML)){//for mothers
	//alert("moth");

//autoCompleteDate("T15");//FIXME

var both= "VT1,VT6,VT7,VT9,T24,T27,T30,PT1,T17";
(both+",T45").splitExecute(autoCompleteDate);
(both+",T15").splitExecute(enhanceDateManipulation);
}



//infant
if(/Infant General Information/.test(document.body.innerHTML)){//for infants
	//alert("inf");
var both= "T23,T27,T31,T35,T39";
(both+",T60").splitExecute(autoCompleteDate);
both.splitExecute(enhanceDateManipulation);
//autoCompleteDate("T60");//Date of Infant Death
}

if(/Muthulakshmi Reddy Maternity/.test(document.body.innerHTML)){//for mrmbs
	//alert("inf");
autoCompleteDate("T4");//Date of Application
}




if(/SHN Verification History/.test(document.body.innerHTML)){//execute only on the SHN Verification History Page
autoCompleteDate("datum0");//From Date
autoCompleteDate("datum1");//To Date

}





//some problem with date verification triggered by blur event solved here...
//lmp date of  AN Gen Inf page
if((typeof resolveToElt("T15"))!="undefined"){
resolveToElt("T15").addEventListener("keydown",
		function(e){
			if(e.keyCode!=9){
				return;
			}
			//e.preventDefault();
			this.value=this.value.completeDate();
		},true);
}

function enhanceDateManipulation(dateElmntToComplete){
	var dateObj=resolveToElt(dateElmntToComplete);
	if(typeof dateObj!="undefined"){
	dateObj.addEventListener("keydown",
		function(e){
			switch(e.keyCode){
				case 77: //m for Monday
                    if(!e.shiftKey && this.value.length>3){
                        e.preventDefault();
                        this.value=this.value.nextMonday();
                    }
					return;
				case 84: //t for today
                    if(!e.shiftKey){
                        e.preventDefault();
                        this.value=(new Date()).toStr();
                    }
					return;
				case 87: //w for Wednesday
					e.preventDefault();
					this.value=this.value.nextWednesday();
					return;
				case 107: //Numkey +
					e.preventDefault();
					this.value=this.value.add(7).toStr();
					return;
				case 109: //Numkey -
					e.preventDefault();
					this.value=this.value.add(-7).toStr();
					return;
			}

			return;
		},true);
	}
}

