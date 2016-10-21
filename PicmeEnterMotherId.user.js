// ==UserScript==
// @name        PicmeEnterMotherId
// @namespace   Guru
// @include     *picme.tn.nic.in/Rselpage*
// @icon        file:///home/guru/guru_bin/motherid.jpeg
// @version     1
// @grant       none
// ==/UserScript==

/*
if(!/Resident/.test(document.body.innerHTML)){//execute only on the page containing ...
	//alert("quitted");
	return;
}
*/

if(document.getElementsByName("ANCIDNO").length<1){
    return;
}

var ancidno=document.getElementsByName("ANCIDNO")[0];

if(document.getElementsByName("InfIdNo").length>=1){ //if Infant page
    //FIXME: See if are in Delivery Mode or Immunization mode
    if(sessionStorage["lastSavedDelivery"]!=null){
	ancidno.value=sessionStorage["lastSavedDelivery"].substr(-5)*1;
        if(sessionStorage["bypass"]==="true"){
            sessionStorage["bypass"]="false"
            //document.querySelector('input[type="submit"][name="Submit"]').click();
            document.getElementById("main").submit();
            return;
        }
    }
   ancidno.focus();
   var toImmunize=sessionStorage["toImmunize"]
       if(toImmunize!==null){
           toImmunize=toImmunize.split(",");//as array
           let submitButton = document.querySelector('input[type="submit"][value="Submit"]');
	submitButton.addEventListener("keydown",
			function(e){
				if (e.keyCode==110){//dot
					e.preventDefault();
                        var lastSavedImm=sessionStorage["lastSavedImmunisation"];
                            if(toImmunize[0]*1==lastSavedImm*1){
                                sessionStorage["toImmunize"]=toImmunize.splice(1).join(",");
                            }
					ancidno.value=sessionStorage["toImmunize"].split(",")[0]*1;
				}
				return;
			},true);
	ancidno.addEventListener("keydown",
			function(e){
				if (e.keyCode==110){//dot
					e.preventDefault();
                        var lastSavedImm=sessionStorage["lastSavedImmunisation"];
                            if(toImmunize[0]*1==lastSavedImm*1){
                                sessionStorage["toImmunize"]=toImmunize.splice(1).join(",");
                            }
					this.value=sessionStorage["toImmunize"].split(",")[0]*1;
				}
				return;
			},true);
       }
}else{

	var key = sessionStorage["whoami"]+"lastSavedMother";
	ancidno.value=localStorage[key].substr(-5)*1+1

        if(sessionStorage["bypass"]==="true"){
            sessionStorage["bypass"]="false"
            document.querySelector('input[type="submit"][name="Submit"]').click();
            return;
        }
   ancidno.focus();


	ancidno.addEventListener("keydown",
			function(e){
				if(e.keyCode==107){//plus
					e.preventDefault();
					this.value=this.value*1+1;
				}else if (e.keyCode==109){//minus
					e.preventDefault();
					this.value=this.value*1-1;
				}else if (e.keyCode==110){//dot
					e.preventDefault();
					this.value=localStorage[key].substr(-5)*1+1
				}
				return;
			},true);

}
