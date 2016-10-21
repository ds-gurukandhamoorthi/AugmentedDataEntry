// ==UserScript==
// @name        ICDS_Supplementary_Nutrition_Coverage
// @namespace   Guru
// @description total save in storage for later use
// @include     *wcd.nic.in/icds/icdsmis/icdsmis_mprdata_awpcsnb*
// @include     *wcd.nic.in/icds/icdsmis/icdsmis_mprdata_awpcua*
// @require     /home/guru/guru_bin/dom_manip_utils.js
// @version     1
// @grant       none
// ==/UserScript==

let safeSetValue=function(obj,val){
 if(obj.value==="") {obj.focus();obj.value =val;obj.blur()}   //IMPORTANT : WE BLUR SO AS TO MAKE IT TAKE IT INTO ACCOUNT IN FURTHER CALCULATIONS
}
    var saveIt = function(){
        sessionStorage["icds_snc"]= [
            document.getElementById("ctl00_ContentPlaceHolder1_l1").textContent,
            document.getElementById("ctl00_ContentPlaceHolder1_Label1").textContent,
            document.getElementById("ctl00_ContentPlaceHolder1_Label2").textContent,
            document.getElementById("ctl00_ContentPlaceHolder1_Label3").textContent,
            document.getElementById("ctl00_ContentPlaceHolder1_Label6").textContent,
            document.getElementById("ctl00_ContentPlaceHolder1_Label7").textContent ].join(",") 
    }

var alreadyFilled =document.querySelector("input[type='text']").value!==""
console.log(alreadyFilled);
    //saveIt();
            if(alreadyFilled){
                nextLink().click();
            }




if(typeof document.getElementById("ctl00_ContentPlaceHolder1_l1")!=="undefined"){

    document.addEventListener("keydown", e=>saveIt(),true)

}
if(typeof document.getElementById("ctl00_ContentPlaceHolder1_snb_np_6m35m_g")!=="undefined"){

    var savedVals = sessionStorage["icds_snc"].split(",");
    safeSetValue(document.getElementById("ctl00_ContentPlaceHolder1_snb_np_6m35m_g"), savedVals[0])
    safeSetValue(document.getElementById("ctl00_ContentPlaceHolder1_snb_np_6m35m_b"), savedVals[1])
    safeSetValue(document.getElementById("ctl00_ContentPlaceHolder1_snb_np_36m71m_g"), savedVals[2])
    safeSetValue(document.getElementById("ctl00_ContentPlaceHolder1_snb_np_36m71m_b"), savedVals[3])
    safeSetValue(document.getElementById("ctl00_ContentPlaceHolder1_snb_np_pw"), savedVals[4])
    safeSetValue(document.getElementById("ctl00_ContentPlaceHolder1_snb_np_lm"), savedVals[5])


}
