// ==UserScript==
// @name        AutomateClickingNext
// @namespace   Guru
// @description Automates the clicking of the button next ...
// @include     *picme.tn.nic.in/PCMGenlUpdate.asp
// @include     *picme.tn.nic.in/ICMUrbanUpdate.asp
// @exclude     *picme*mainmenu*
// @exclude     *picme*Rselpage*
// @icon     file:///home/guru/guru_bin/green-next-button.jpg
// @version     1
// ==/UserScript==
//

var docBody=document.body.textContent; //instead of  innerHTML;
if(/SCAN Data saved/.test(docBody)){//execute only if SCAN DATA Saved
	if(/AN Visit Data Not Saved/.test(docBody)){//but not the AN VISIT Data
		//document.getElementsByName("back")[0].focus();//back to Entry
        document.querySelector('input[type="button"][value="Back to Entry"]').focus();

	}
}

if(/Immunisation Data saved/.test(docBody)){//execute only if immunisation DATA Saved
    var toImmunize=sessionStorage["toImmunize"];
    var lastViewedInfant=sessionStorage["lastViewedInfant"];
    sessionStorage["lastSavedImmunisation"]=lastViewedInfant;
    if(toImmunize!=null){ //FIXME : DO NOT USE !== here
        toImmunize=toImmunize.split(",");
            if(toImmunize[0]*1==lastViewedInfant*1){
                sessionStorage["toImmunize"]=toImmunize.splice(1).join(",");
            }
    }

    history.go(-2);
	//document.getElementsByName("back")[2].click();//Next entry
}

if(/Infant General Data saved/i.test(docBody)){//execute only if ...
	//document.getElementsByName("back")[2].click();//Next entry
    history.go(-2);
}

if(/AN Visit Data Saved/i.test(docBody)){
        document.querySelector('input[type="submit"][value="Next AN Visit Entry"]').focus();
		//document.getElementsByName("back")[0].focus();//FIXME
        //history.go(-1);
}

if(/Delivery Data saved/.test(docBody)){//execute only on the page containing ....

    sessionStorage["lastSavedDelivery"]= sessionStorage["lastViewedMother"] ;
    sessionStorage["lastPage"]= "delivery";

    history.go(-3);
}

if(/Update Error no=0-/.test(docBody)){//execute only on the page containing AN Mother Entry
    sessionStorage["lastSavedMother"]= sessionStorage["lastViewedMother"]
    var key=sessionStorage["whoami"]+"lastSavedMother";
    if(localStorage[key] < sessionStorage["lastSavedMother"]){
        
        localStorage[ key]= sessionStorage["lastSavedMother"];
    }
    history.go(-2);
}
