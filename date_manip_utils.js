String.prototype.toDate = function(){// "24/02/2012" to native Date format
	if(this.length===0){return "";}
	var ddmmyyyy=this.split("/");
	return( new Date(ddmmyyyy[2]-0,ddmmyyyy[1]-1,ddmmyyyy[0]-0) );
}

String.prototype.minus = function(strtdate){// "02/04/2013".minus("01/01/2013") returns the days between these two dates
					//     "today".minus("01/01/2013") returns how many days has been passed between that date and today...
	if(this=="today"){
		let today = new Date();
		today.setMilliseconds(0);today.setSeconds(0); today.setMinutes(0); today.setHours(0); // we want just the date not the time
		return((today.getTime()-
			    strtdate.toDate().getTime())/(24*60*60*1000)
		);
	} // otherwise...
	return((this.toDate().getTime()-
	    strtdate.toDate().getTime())/(24*60*60*1000)
		);
}

String.prototype.add = function(days){//"01/01/2013".add(14)-> returns 14 days after 01/01/2013; can be used with negative values
	var reslt=this.toDate()
	reslt.setDate(reslt.getDate()+days);
	return reslt;
}

String.prototype.zfill2=function(){
	if(this.length==1){
		return "0"+this;
	}
	return this;
}

Date.prototype.toStr = function(){// return in format dd/mm/yyyy
	var d = this.getDate()+"";
	var m = (this.getMonth()+1)+"";
	var y = this.getFullYear()+"";
	return (d.zfill2()+"/"+m.zfill2()+"/"+y);
}

String.prototype.next = function(dayofweek){ // "01/01/2013".next(0) returns the sunday after .. 0 -> sun 1 -> mon ... 4-> thu ..6-> sat
	var diff=dayofweek-this.toDate().getDay();
	if(diff<0){diff+=7;}
	return(this.add(diff).toStr());
}

String.prototype.nextWednesday = function(){
	return this.next(3);
}

String.prototype.nextMonday = function(){
	return this.next(1);
}

String.prototype.before = function(adate){// a date
	return(this.minus(adate)<0);
}

String.prototype.appropriateDateBCG=function(){
	var wed=this.add(1).toStr().next(3);
	var mon=this.add(1).toStr().next(1);
	var fri=this.add(1).toStr().next(5);
	var dateBCG=(mon.before(wed)?mon:wed);
	dateBCG=(dateBCG.before(fri)?dateBCG:fri);
	return(dateBCG);
}

String.prototype.appropriateVaccinationDate = function(n){ //n = 1 -> fist dose  n=4 measles; IMPROVE ME 0->BCG
	if(n===0){
		return(this.appropriateDateBCG());
	}
	var daysToWait= new Array(42,72,102,270);	
	return(this.add(daysToWait[n-1]).toStr().nextWednesday());
}

var map_month_startdates={
"st":"14/04/2014",
"vk":"15/05/2014",
"an":"15/06/2014",
"ad":"17/07/2014",
"av":"17/08/2014",
"pr":"17/09/2014",
"ai":"18/10/2014",
"kr":"17/11/2014",
"mr":"16/12/2014",
"th":"15/01/2014",
"ms":"13/02/2014",
"pn":"15/03/2014" };


//we write a function that takes inputs as mr3 and returns 18/12/2014 ...
String.prototype.toEnglishDate = function(){
	var tmlmnth=this.toLowerCase().substring(0,2);
	var tmldate=this.substring(2,this.length); 
	return(map_month_startdates[tmlmnth].add(tmldate*1-1).toStr());
}

var appropriateRegDate = strDate =>(""+strDate).add(12*7).toStr(); //12weeks
var appropriateLMPDate = strDate =>(""+strDate).add(-12*7).toStr(); //12weeks

var appropriateVisit2Date = strDate =>(""+strDate).add(16*7+2).toStr().nextMonday(); //Monday following 16 Weeks
var appropriateVisit3Date = strDate =>(""+strDate).add(20*7+2).toStr().nextMonday(); //Monday following 20 Weeks


String.prototype.beforeToday=function(){
    return(this.toDate()<=new Date());
}

String.prototype.beforeLastPossibleImmDate=function(){
    var tdy=new Date();
    var subtrct=tdy.getDay()==3?0:-7; 
    return(this.toDate()<=tdy.toStr().nextWednesday().add(subtrct));
}

function getNearestLastDayOfMonth(){
    let today = new Date();
	let m = (today.getMonth()+1);
	let y = today.getFullYear();
    let prev = new Date(y,m-1,0);
    let curr = new Date(y,m,0);

    let prev_dist = Math.abs(today-prev)
    let curr_dist = Math.abs(today-curr)
    if(prev_dist<=curr_dist){
        return(prev.toStr());
    }else{
        return(curr.toStr());
    }
}
