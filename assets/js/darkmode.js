function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    // console.log(cArray);
    let result = null;
    cArray.forEach(element => {
        if(element.indexOf(name)==0){
            result = element.substring(name.length+1);
        }
    })
    return result;
}


function populateOnAllDashboardScreens(){
    let showdarkmode =  getCookie("showdarkmode");
    // alert(showdarkmode);
    let toggle = document.getElementById("darkmodeCheckbox");
    if(showdarkmode==null||showdarkmode=="null"){ // not saved in cookies or false
        document.body.classList.remove("theme-dark");
    }
    if(showdarkmode==true||showdarkmode=="true"){
        document.body.classList.add("theme-dark");
    }
    if(showdarkmode==false||showdarkmode=="false"){
        document.body.classList.remove("theme-dark");
    }
}
populateOnAllDashboardScreens();
