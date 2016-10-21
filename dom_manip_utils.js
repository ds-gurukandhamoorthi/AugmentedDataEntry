//FOR SELECT  BOX
//we suppose the values are unique 
var removeOptionWithValue = function(selObj, val){
    if(Array.isArray(val)){
        val.forEach(val=>removeOptionWithValue(selObj,val))
    }else if(val instanceof RegExp){
         let opts = optValuesAsArray(selObj);
         removeOptionWithValue( selObj, opts.filter(x=>val.test(x)))
    }else{
        for(var i =0; i< selObj.length;  i++){
                if(selObj.options[i].value==val){
                        selObj.remove(i);
                        return;
                }
        }
   }
}

function optValuesAsArray(selObj){
    let res=[];
    for(let i=0; i<selObj.length; i++){
        res.push(selObj.options[i].value)
    }
    return res;
}


function resolveToElt(elt){//should help not to see if the element is defined by Id or name
	var doc=document;//accessing a local variable is fast...
	var obj=doc.getElementById(elt);
	if( obj!==null){
		return(obj);
	}
	var elmnts=doc.getElementsByName(elt);
	if(elmnts.length>0){
		return(elmnts[0]);
	}
}



//selecting a SelectOptions Menu by a regex pattern
function makeSelectionByPattern(selectObject, pattern){
    var optns=selectObject.options;
	for(let i=0,len=optns.length; i<len; i++){
		if(pattern.test(optns[i].value)){
		selectObject.selectedIndex=i;
		return true;
		}
	}
	return false;

}

function makeSelectionByPatternOfTextSeen(selectObject, pattern){
	for(let i=0,len=selectObject.length; i<len; i++){
		if(pattern.test(selectObject[i].text)){
		selectObject.selectedIndex=i;
		return true;
		}
	}
	return false;

}
//alias wysiwyc what you see is what you choose
var wysiwyc = makeSelectionByPatternOfTextSeen;

function nextToMe(obj,nxtObj){
    obj.addEventListener("blur",
		function(){
			nxtObj.focus();
			},true);
}

var hide = obj => obj.style.display="none";
var hideNot = obj => obj.style.display="";


var empValuep = obj => obj.value==="";
var setEq = (objl, objr) => objl.value = objr.value;

//var onEmptyFocus = obj => {if(empValuep(obj)){obj.focus()}}
function onEmptyFocus (obj){ 
    if (Array.isArray(obj)){
        for(let i = 0; i< obj.length; i++){
            if(empValuep(obj[i])){
                obj[i].focus();
                return;
            }
        }
    } else if (empValuep(obj)){
        obj.focus();
    }
}

var putValFocBlur = (obj,val) => {obj.value=val;obj.focus();obj.blur()}

function getLinks(s){ //FIXME: regex only for now
    let func = obj => s.test(obj.text);
    let linksTbl= [].slice.call(document.querySelectorAll("a"));
    return (linksTbl.filter(func));

}
//getLinks(/next/i)[0].click();

var prevLink =    ()=>getLinks(/previous/i)[0];
var nextLink =    ()=>getLinks(/next/i)[0];
var contentLink =  ()=>getLinks(/content/i)[0];
var backLink =    ()=>getLinks(/back/i)[0]; 
var nodataLink =  ()=>getLinks(/No Data/i)[0]; 

var linksThisOrThat = (r1,r2)=>getLinks(r1).concat(getLinks(r2));
var prevOrBackLink = () => linksThisOrThat(/previous/i,/back/i)[0];
var nextOrNodataLink = () => linksThisOrThat(/next/i,/No Data/i)[0];
var contentOrBackLink = () => linksThisOrThat(/content/i,/back/i)[0];
