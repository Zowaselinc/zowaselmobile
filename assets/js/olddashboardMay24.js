// import { localBaseUrl, liveMobileUrl } from './env.js';
// console.log(localBaseUrl);
// console.log(liveMobileUrl);
// alert(localBaseUrl)



/* ---------------------------- PULL TO REFERESH ---------------------------- */
/* global PullToRefresh */
PullToRefresh.init({
    mainElement: '#main',
    onRefresh: function() { 
        // alert('refresh');
        location.reload();
    }
});
/* ---------------------------- PULL TO REFERESH ---------------------------- */




/* ------------------------------ LAZY LOADING ------------------------------ */
function lazyLoading(){
    $('.lazy').hide();
    $('.lazy').each(function(index,value) {
        // console.log(index, "frelkferk");
        if(index < 11 ) {
        $(this).show();
        }
    });

    // console.log($('.lazy:hidden').length, "$Lazy:hidden.length");

    if($('.lazy:hidden').length) {
        $('#more').show();
    }
    if(!$('.lazy:hidden').length) {
        $('#more').hide();
    }
}
/* ------------------------------ LAZY LOADING ------------------------------ */


function truncate(str, length) {
    if (str.length > length) {
        return str.slice(0, length) + '...';
    } else return str;
}

function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const sidemenu =(page)=>{
    if(page){
        $.get( "../components/sidemenu.html", function( data ) {
            $( "#sidebar" ).html( data );
        })
    }else{
        $.get( "components/sidemenu.html", function( data ) {
            $( "#sidebar" ).html( data );
        })
    }
    // console.log(data,"grgr");
}



// const headermenu =()=>{
//     $.get( "components/headermenu.html", function( data ) {
//           $( "#headermenu" ).html( data );
//         //   console.log(data,"grgr");
//     })

// }


const buttommenu =(page)=>{
    if(page){
        $.get( "../components/buttommenu.html", function( data ) {
            $( "#buttommenu" ).html( data );
        })
    }else{
        $.get( "components/buttommenu.html", function( data ) {
            $( "#buttommenu" ).html( data );
        })
    }
}

const buttomaddnewcrop =(page)=>{
    if(page){
        
    }else{
        $.get( "components/buttomaddnewcrop.html", function( data ) {
            $( "#buttommenu" ).html( data );
        })
    }
}

const buttomaddnewinput =(page)=>{
    if(page){
        
    }else{
        $.get( "components/buttomaddnewinput.html", function( data ) {
            $( "#buttommenu" ).html( data );
        })
    }
}




/* -------------------------------- // LOGOUT ------------------------------- */
const logout =()=>{
    // alert("ef");
    localStorage.clear();
    sessionStorage.clear();
    // alert(window.location.origin);
    let routeroot = window.location.origin;
    location.assign(routeroot+'/login.html');
}
/* -------------------------------- // LOGOUT ------------------------------- */






/* --------------------------------- LOADER --------------------------------- */
function startPageLoader(){
    setTimeout(()=>{
        const loader = document.querySelector('.loader');
        loader.classList.add("loader");
        loader.classList.remove("loader-hidden");
    },1000)
}

function EndPageLoader(){
    setTimeout(()=>{
        const loader = document.querySelector('.loader');
        loader.classList.add("loader-hidden");
    },1000)
}

window.addEventListener('load', ()=>{
    const loader = document.querySelector('.loader');

    loader.classList.add("loader-hidden");

    // loader.addEventListener("transitionend", ()=>{
    //     document.body.removeChild("loader");
    // })
})
/* --------------------------------- LOADER --------------------------------- */




/* ---------------- CALCULATE TIME DIFFERENCE BETWEEN 2 DATES --------------- */
function daysDifferenceday(d1, d2){
    // To set two dates to two variables
    var date1 = new Date(`${d1}`);
    var date2 = new Date(`${d2}`);
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
        
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    //To display the final no. of days (result)
    console.log("Total number of days between dates  <br>"
            + date1 + "<br> and <br>" 
            + date2 + " is: <br> " 
            + Difference_In_Days);
    return Difference_In_Days;
}
/* ---------------- CALCULATE TIME DIFFERENCE BETWEEN 2 DATES --------------- */


/* ---------------------- CAPITALIZE EVERY FIRST LETTER --------------------- */
function capitalizeFirstLetter(text){
    let alltoLowerCase = text.toLowerCase();
    const words = alltoLowerCase.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    let result = words.join(" ");
    return result;

    // words.map((word) => { 
    //     return word[0].toUpperCase() + word.substring(1); 
    // }).join(" ");
}
/* ---------------------- CAPITALIZE EVERY FIRST LETTER --------------------- */


function pageRestriction(){
    // alert("page restriction");
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let user_id = user.user.id;
    // alert(`${socketURL}`);
    const socket = io(`${socketURL}`);

    socket.emit('isconnected',"We are connected");
    const usersocketchannel="ZWSL"+user_id;
    socket.emit("kycperson",{"userid":user_id})
    socket.on(usersocketchannel,function(data){

        // console.log(data, "KYC/KYB Socket data");
        // alert("SOcket entered")

        // COOKIES
        // document.cookie = `userkycstatus=${data.userskycstatus};path=/`;
        // setCookie(key,value,time);
        let key2 = "userdidkyc";
        let value2 = data.userdidkyc;
        setCookie(key2,value2,0.5);

        let key = "userkycstatus";
        let value = data.userskycstatus;
        setCookie(key,value,0.5);

        let key2kyb = "userdidkyb";
        let value2kyb = data.userdidkyb;
        setCookie(key2kyb,value2kyb,0.5);

        let keykyb = "userkybstatus";
        let valuekyb = data.userskybstatus;
        setCookie(keykyb,valuekyb,0.5);
        // COOKIES
    })

    // API TO CHECK INCASE SOCKET FAILS
    $.ajax({
        url: `${liveMobileUrl}/users/account/checkkycstatus`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            $('.loader').addClass('loader-hidden');
            // console.log(response, "The get all category response");
            if(response.error == true){
                // alert(response.message);
                console.log(response.message);
            }else{
                // alert(response.message);
                let thedata = response.data;
                
                console.log("the kyc/kyb status data", thedata);    
                // KYC
                let key2 = "userdidkyc";
                let value2 = 1;
                if(thedata.kyc){
                    setCookie(key2,value2,0.5);
                }else{
                    setCookie(key2,0,0.5);
                }

                let key = "userkycstatus";
                let value = 1;
                if(thedata.kyc.verified==1){
                    setCookie(key,value,0.5);
                }else{
                    setCookie(key,0,0.5);
                }

                // KYB
                let key2kyb = "userdidkyb";
                let value2kyb = 1;
                let keykyb = "userkybstatus";
                if(thedata.kyb){
                    setCookie(key2kyb,value2kyb,0.5);
                    // STATUS
                    let valuekyb = thedata.kyb.status;
                    if(thedata.kyb.status=="complete"){
                        setCookie(keykyb,valuekyb,0.5);
                    }else{
                        setCookie(keykyb,valuekyb,0.5);
                    }
                }else{
                    setCookie(key2kyb,0,0.5);
                    setCookie(keykyb,0,0.5);
                }

                
                

            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                console.log("", "Session has ended, Login again");
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
    // API TO CHECK INCASE SOCKET FAILS

    socket.on("flw",function(data){
        // console.log(data, "KYC Socket data");
        // alert("SOcket entered")
    })

    // socket.on("db",function(data){
    //     console.log(data, "DB Socket data");
    //     // alert("SOcket entered")
    // })
}

function setCookie(key,value,time){
    // Get the current time
    let d = new Date();

    d.setTime(d.getTime() + (time*24*60*60*1000));

    let expires = "expires=" + d.toUTCString();

    document.cookie = `${key}=${value};${expires};path='/'`;

    // window.location.reload();
}

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
// console.log(getCookie("userdidkyc"), "userdidkyc");
// console.log(getCookie("userkycstatus"), "userkycstatus");

function checkifKYCis_verified(){

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);

    let userkycstatus = getCookie("userkycstatus");
    // alert(userkycstatus);
    let pathname = window.location.pathname;
    if(pathname.includes('dashboard/index')||pathname.includes('dashboard/profile')
    ||pathname.includes('dashboard/editprofile')||pathname.includes('dashboard/checkuserverification')
    ||pathname.includes('dashboard/checkuserkybverification')
    ||pathname.includes('dashboard/kyb')||pathname.includes('dashboard/kyc')
    ||pathname.includes('dashboard/settings')||pathname.includes('dashboard/verification')){

    }else{
        if(userkycstatus == 0){
            // console.log(window.location)
            location.assign(window.location.origin+'/dashboard/checkuserverification.html');
        }else{
            console.log("KYC is verified");
            if(user.user.account_type=="company"){
                checkifKYBis_done();
            }
        } 
    }
    
}
// checkifKYCis_verified();


function checkifKYCis_done(){
    let userkycDoneStatus = getCookie("userdidkyc");
    // alert(userkycDoneStatus);
    let pathname = window.location.pathname;
    if(pathname.includes('dashboard/kyc.html')){
        if(userkycDoneStatus == 1){
            // console.log(window.location)
            location.assign(window.location.origin+'/dashboard/kycverification.html');
        }else{
            
        }
    }else{
        
    }

    if(pathname.includes('dashboard/index')||pathname.includes('dashboard/profile')
    ||pathname.includes('dashboard/editprofile')||pathname.includes('dashboard/checkuserverification')
    ||pathname.includes('dashboard/checkuserkybverification')
    ||pathname.includes('dashboard/kyb')||pathname.includes('dashboard/kyc')
    ||pathname.includes('dashboard/settings')||pathname.includes('dashboard/verification')||pathname.includes('dashboard/accountdetails')
    ||pathname.includes('dashboard/editaccountdetails')||pathname.includes('dashboard/changepassword')){

    }else{
        if(userkycDoneStatus == 0){
            // console.log(window.location)
            location.assign(window.location.origin+'/dashboard/checkuserverification.html');
        }
        if(userkycDoneStatus == 1){
            checkifKYCis_verified();
        }
    }
}
checkifKYCis_done();


// Check if KYB is done
function checkifKYBis_done(){
    let userkybDoneStatus = getCookie("userdidkyb");
    // alert(userkybDoneStatus);
    let pathname = window.location.pathname;
    if(pathname.includes('dashboard/kyb.html')){
        if(userkybDoneStatus == 1){
            // console.log(window.location)
            location.assign(window.location.origin+'/dashboard/kybverification.html');
        }else{
            
        }
    }else{
        
    }

    if(pathname.includes('dashboard/index')||pathname.includes('dashboard/profile')
    ||pathname.includes('dashboard/editprofile')||pathname.includes('dashboard/checkuserverification')
    ||pathname.includes('dashboard/checkuserkybverification')
    ||pathname.includes('dashboard/kyb')||pathname.includes('dashboard/kyc')
    ||pathname.includes('dashboard/settings')||pathname.includes('dashboard/verification')||pathname.includes('dashboard/accountdetails')
    ||pathname.includes('dashboard/editaccountdetails')||pathname.includes('dashboard/changepassword')){

    }else{
        if(userkybDoneStatus == 0){
            // console.log(window.location)
            location.assign(window.location.origin+'/dashboard/checkuserkybverification.html');
        }
        if(userkybDoneStatus == 1){
            // alert("Check if KYB is verified");
            console.log("Check if KYB is verified");
            checkifKYBis_verified();
        }
    }
}


function checkifKYBis_verified(){
    let userkybstatus = getCookie("userkybstatus");
    console.log("Kyb "+userkybstatus);
    // alert(userkybstatus);
    let pathname = window.location.pathname;
    if(pathname.includes('dashboard/index')||pathname.includes('dashboard/profile')
    ||pathname.includes('dashboard/editprofile')||pathname.includes('dashboard/checkuserverification')
    ||pathname.includes('dashboard/checkuserkybverification')
    ||pathname.includes('dashboard/kyb')||pathname.includes('dashboard/kyc')
    ||pathname.includes('dashboard/settings')||pathname.includes('dashboard/verification')){

    }else{
        if(userkybstatus.toLowerCase() == "pending" || userkybstatus.toLowerCase() == "failed"){
            // console.log(window.location)
            location.assign(window.location.origin+'/dashboard/checkuserkybverification.html');
        }else{
            console.log("KYB is verified");
            // THE END OF USER VERIFICATION IF THE USER HAS A COMPANY
        }
    }
    
}




function deleteCookie(name){
    setCookie(name, null, null);
}


/* ---------------- CHECK IF ACCOUNT DETAILS HAS BEEN UPDATED --------------- */
function proceedtoKYC(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    user = user.user;

    let country = user.country;
    // let gender = user.gender;
    let state = user.state;
    let city = user.city;
    let primary_address = user.primary_address;

    // COMPANY
    let company = user.company;
    let company_country, contact_person;
    if(company){
        company_country = company.country;
        contact_person = company.contact_person;
    }

    let userdetailsHasANullField;
    if(country==null || country=="" || state==null || state=="" || city==null || city=="" || primary_address==null || primary_address==""){
        userdetailsHasANullField = true;
    }else{
        userdetailsHasANullField = false;
    }

    let companydetailsHasANullField;
    if(!company_country || !contact_person){
        companydetailsHasANullField = true;
    }else{
        companydetailsHasANullField = false;
    }

    function gotoEditAccountDetails(){
        setTimeout(()=>{
            location.assign('/dashboard/editaccountdetails.html');
        },3500)
    }
    
    if(company){
        console.log(country, "||", state, "||", city, "||", primary_address);
        console.log(userdetailsHasANullField, companydetailsHasANullField);
        if(userdetailsHasANullField === true){
            if(companydetailsHasANullField === true){
                basicmodal("", "Please update your account and company details");
                gotoEditAccountDetails();
            }else if(companydetailsHasANullField === false){
                basicmodal("", "Please update your account details");
                gotoEditAccountDetails();
            }
        }else if(userdetailsHasANullField === false){
            if(companydetailsHasANullField === true){
                basicmodal("", "Please update your company details");
                gotoEditAccountDetails();
            }else{
                location.assign('/dashboard/kycverification.html');
            }
        }
    }else{
        if(userdetailsHasANullField === true){
            basicmodal("", "Please update your account details");
            gotoEditAccountDetails();
        }else{
            location.assign('/dashboard/kycverification.html');
        }
    }
}


function proceedtoKYB(){
    location.assign('/dashboard/kybverification.html');
}
/* ---------------- CHECK IF ACCOUNT DETAILS HAS BEEN UPDATED --------------- */



const populateUserDetails =()=>{
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    // console.log(user.user, "rgrgrg");
    // alert(user.first_name);
    
    $('.first_name').text(user.user.first_name);
    $('.first_name').val(user.user.first_name);

    $('.last_name').text(user.user.last_name);
    $('.last_name').val(user.user.last_name);

    $('.phonenumber').text(user.user.phone);
    $('.phonenumber').val(user.user.phone);

    $('.email').text(user.user.email);

    // $('.wallet_balance').text()

    // Profile Pic
    if(user.user.image){ 
        let image = user.user.image;
        // console.log(image);
        $('#confirm-profileimg').attr('src',`${image}`);
    }else{ 
        $('#confirm-profileimg').attr('src','../logos/dogavatar.png'); 
    }

    if(!(user.user.primary_address)){ $('.primary_address').text("---"); }else{ 
        $('.primary_address').text(user.user.primary_address); 
        $('.primary_address').val(user.user.primary_address); 
    }

    if(!(user.user.secondary_address)){ $('.secondary_address').text("---"); }else{ 
        $('.secondary_address').text(user.user.secondary_address); 
        $('.secondary_address').val(user.user.secondary_address); 
    }
    
    if(!(user.user.country)){ $('.country').text("---"); }else{ 
        $('.country').text(user.user.country); 
        $('.country').val(user.user.country); 
    }
    
    if(!(user.user.state)){ $('.state').text("---"); }else{ 
        $('.state').text(user.user.state); 
        setTimeout(()=>{
            $('.state').val(user.user.state); 
        },2000)
    }
    
    if(!(user.user.city)){ $('.city').text("---"); }else{ 
        $('.city').text(user.user.city); 
        $('.city').val(user.user.city); 
    }
    
    if(!(user.user.is_verified)){ 
        $('#is_verified_icon').attr('src', '../logos/unavailable.png');
        $('.is_verified').text("Unverified"); 
    }else{ 
        $('#is_verified_icon').attr('src', '../logos/Vector.png');
        $('.is_verified').text("Verified"); 
    }

    // Account
    if(!(user.user.account_type)){ $('.account_type').text("Null"); }else{ 
        $('.account_type').text(user.user.account_type.charAt(0).toUpperCase() + user.user.account_type.slice(1)); 
        $('.account_type').val(user.user.account_type); 
    }

    if(!(user.user.type)){ $('.user_type').text("Null"); }else{ 
        $('.user_type').text(user.user.type.charAt(0).toUpperCase() + user.user.type.slice(1)); 
        $('.user_type').val(user.user.type); 
    }

    // COMPANY
    let company = user.user.company;
    if(company){
        $('.company-account-details').show();
        // alert(company.company_name);
        $('.company_name').val(company.company_name);
        $('.company_website').val(company.company_website);
        $('.company_state').val(company.state);
        $('.rc_number').val(company.rc_number);
        $('.company_email').val(company.company_email);
        $('.contact_person').val(company.contact_person);
        $('.company_phone').val(company.company_phone);
        $('.company_address').val(company.company_address);

        $('.company_name').html(company.company_name);
        if(company.company_website == null || company.company_website=="null"){
            $('.company_website').html("---");
        }else if(company.company_website){
            $('.company_website').html(company.company_website);
        }else{ $('.company_website').html("---"); }
        $('.company_country').html(company.country);
        $('.company_state').html(company.state);
        $('.rc_number').html(company.rc_number);
        $('.company_email').html(company.company_email);
        $('.contact_person').html(company.contact_person);
        $('.company_phone').html(company.company_phone);
        $('.company_address').html(company.company_address);
    }

}


/* --------------------------- UPDATE USER ACCOUNT -------------------------- */
function updateUserAccount(){
    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let phonenumber = document.getElementById('phonenumber');
    let primary_address = document.getElementById('primary_address');
    let countryList = document.getElementById('countryList');
    let stateList = document.getElementById('stateList');
    let city = document.getElementById('city');

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/users/account`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "first_name": firstname.value,
            "last_name": lastname.value,
            "phone": phonenumber.value,
            "country": countryList.value,
            "state": stateList.value,
            "city": city.value,
            "address": primary_address.value
        }),
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                responsemodal("successicon.png", "Success", response.message);
                setTimeout(()=>{
                    $('.loader').addClass('loader-hidden');
                },3000)

                // UPDATE STORED USER DETAILS
                let sessionuser = localStorage.getItem('zowaselUser');
                sessionuser = JSON.parse(sessionuser);
                sessionuser.user = response.data;
                let modifiedUserString = JSON.stringify(sessionuser);
                localStorage.setItem('zowaselUser', modifiedUserString);

                setTimeout(()=>{
                    // console.log("sessionuser", modifiedUserString);
                },1500)
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
    
}
/* --------------------------- UPDATE USER ACCOUNT -------------------------- */

/* --------------------------- UPDATE USER PASSWORD -------------------------- */
function updateUserPassword(){
    let currentpassword = document.getElementById('currentpassword');
    let password = document.getElementById('password');
    let confirmpassword = document.getElementById('confirmpassword');

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/users/account/password`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "current_password": currentpassword.value,
            "new_password": password.value,
            "confirm_password": confirmpassword.value,
        }),
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                responsemodal("successicon.png", "Success", response.message);
                setTimeout(()=>{
                    $('.loader').addClass('loader-hidden');
                },3000)
                setTimeout(()=>{
                    basicmodal("Redirecting to login", "Please login again");
                    setTimeout(()=>{
                        // logout();
                    },3000)
                },3500)
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
    
}
/* --------------------------- UPDATE USER PASSWORD -------------------------- */

/* ------------------------- UPDATE COMPANY ACCOUNT ------------------------- */
function updateCompanyAccount(){
    let company_name = document.getElementById('company_name');
    let company_country = document.getElementById('company_country');
    let state = document.getElementById('company_state');
    let company_address = document.getElementById('company_address');
    let email = document.getElementById('company_email');
    let contact_person = document.getElementById('contact_person');
    let phone = document.getElementById('company_phone');
    let company_website = document.getElementById('company_website');
    let website;
    if(company_website.value==""||company_website.value===null){
        website = null;
    }else{
        website  = company_website.value;
    }
    // let rc_number = document.getElementById('rc_number');

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/users/account/company`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "company_name": company_name.value,
            "state": state.value,
            "company_country": company_country.value,
            "company_address": company_address.value,
            "email": email.value,
            "contact_person": contact_person.value,
            "phone": phone.value,
            "company_website": website
        }),
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                responsemodal("successicon.png", "Success", response.message);
                setTimeout(()=>{
                    $('.loader').addClass('loader-hidden');
                },3000)
                 // UPDATE STORED USER DETAILS
                 let sessionuser = localStorage.getItem('zowaselUser');
                 sessionuser = JSON.parse(sessionuser);
                 sessionuser.user = response.data;
                 let modifiedUserString = JSON.stringify(sessionuser);
                 localStorage.setItem('zowaselUser', modifiedUserString);
 
                 setTimeout(()=>{
                     console.log("sessionuser", response.data);
                 },1500)
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}
/* ------------------------- UPDATE COMPANY ACCOUNT ------------------------- */






/* ----------------------------- // FUND WALLET ---------------------------- */
const fundWalletPage=()=>{
    const fundWalletForm = document.getElementById('payForm');
    fundWalletForm.addEventListener('submit', makePayment);

    function makePayment(e) {
        e.preventDefault();

        let amount  = document.getElementById('amount_to_fund');
        let user = localStorage.getItem('zowaselUser');
        user = JSON.parse(user);

        let first_name = user.user.first_name;
        let last_name = user.user.last_name;
        let name = first_name+" "+last_name;
        let email = user.user.email;
        let phonenumber = user.user.phone;

        if(amount.value==""||amount.value===null){
            basicmodal("", "Enter an amount");
        }else{

            // Set Configuration 
            // https://www.youtube.com/watch?v=fwpu3NfkmwM
            // The api_key "FLWPUBK_TEST-SANDBOXDEMOKEY-X" is for test mode. It was gotten from dashboard|settings|apis
            // Note: For Javascript copy Public Key, PHP/Python server side copy Secret Key
            // tx_ref: transaction reference (unique) check developer.flutterwave.com/docs/flutterwave-standard 
            // After their modal for payment has appeared, we can make use of their test cards in developer.flutterwave.com/docs/test-cards
            // Type	Card number	CVV	PIN	Expiry	OTP
            // MasterCard PIN authentication	5531886652142950	564	3310	09/32	12345

            // {
            //     "label": "TRX-FEZ39ZVILDZCS8CPGJNT",
            //     "modalauditid": "TRX-FEZ39ZVILDZCS8CPGJNT",
            //     "actor": "jackwilliams@yopmail.com",
            //     "action": "request",
            //     "context": "mobile",
            //     "comment": "IP Resolved 105.112.126.117",
            //     "object": "IP",
            //     "date": 1677672432039,
            //     "token": "flw_event_wt_e5fe4da063edacb29ec19f"
            // }
            FlutterwaveCheckout({
                public_key: `${FLW_PUBLIC_KEY}`,
                tx_ref: "ZOWASELFUND-"+Math.floor((Math.random()*1000000000)+1),
                amount: amount.value,
                currency: "NGN",
                // payment_options: "card, banktransfer, ussd",
                // redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
                // meta: {
                //     consumer_id: 23,
                //     con  sumer_mac: "92a3-912ba-1192a",
                // },
                customer: {
                    email: email,
                    phone_number: phonenumber,
                    name: name,
                },
                customizations: {
                    title: "Zowasel",
                    description: "Fund your wallet",
                    logo: "https://zowaselassets-com.stackstaging.com/zowaselICO.png",
                },
                callback:function(data){
                    // console.log(data);
                    let reference = data.tx_ref;
                    // alert("Payment was successfully completed! \nTransaction Reference:" + reference);
                    responsemodal("successicon.png", "Success", "Payment was successfully completed! \nTransaction Reference:" + reference);
                }
            });

        }
    }
}
/* ----------------------------- // FUND WALLET ----------------------------- */

/* --------------------------- GRAB WALLET DETAILS -------------------------- */
let globalWalletBalance;
const populateWalletDetails=()=>{
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/wallet/user_id`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            // console.log(response, "The wallet response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let row = response.data;
                // $('.wallet_balance').text(toCommas(row[0].balance));
                globalWalletBalance = toCommas(row[0].balance);
                
                // Save balance
                setCookie("walletbalance",globalWalletBalance,31);

                let showbalance =  getCookie("showbalance");
                if(showbalance==null||showbalance=="null"){ // not saved in cookies or false
                    $('.show-balance').html(`₦<span class='wallet_balance mx-2 mt-2'>${globalWalletBalance}</span>`);
                }
                if(showbalance==true||showbalance=="true"){
                    $('.show-balance').html(`₦<span class='wallet_balance mx-2 mt-2'>${globalWalletBalance}</span>`);
                }
                if(showbalance==false||showbalance=="false"){
                    $('.show-balance').html(`<span class="mt-3 me-2">**********</span>`);
                }

                
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                // console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}
/* --------------------------- GRAB WALLET DETAILS -------------------------- */

/* -------------------------- TOGGLE WALLET BALANCE ------------------------- */
const togglebalance=()=>{
    let showbalance =  getCookie("showbalance");
    let key = "showbalance";
    let value = true;
    // alert(showbalance);
    if(showbalance==null||showbalance=="null"){ // not saved in cookies or false
        $('.show-balance').html(`<span class="mt-3 me-2">**********</span>`);
        setCookie(key,value,0.5);
    }
    if(showbalance==true||showbalance=="true"){
        $('.show-balance').html(`<span class="mt-3 me-2">**********</span>`);
        setCookie(key,false,0.5);
    }
    if(showbalance==false||showbalance=="false"){
        $('.show-balance').html(`₦<span class='wallet_balance mx-2 mt-2'>${globalWalletBalance}</span>`);
        setCookie(key,true,365);
    }
    
}
/* -------------------------- TOGGLE WALLET BALANCE ------------------------- */

/* ------------------------ FETCH RECENT TRANSACTIONS ----------------------- */
const fetchRecentTransactions=()=>{

    let pathname = window.location.pathname;
    // console.log(pathname);
    let theURL;
    if(pathname.includes("wallet")){
        theURL = `${liveMobileUrl}/wallet/transactions/recent`;
    }else if(pathname.includes("alltransactions")){
        theURL = `${liveMobileUrl}/wallet/transactions/allrecent`;
    }

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);

    startPageLoader();
    $.ajax({
        url: `${theURL}`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            // console.log(response, "The recent transactions response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                // console.log(thedata, "All Recent transactions");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let date = row.created_at;
                        let dateFormat = moment(date, "YYYY-MM-DD h:mm:ss").fromNow();

                        let priceClass, priceFlow;
                        if(parseInt(row.recipient_id)===user.user.id){
                            priceClass = "text-success";
                            priceFlow = "+";
                        }else{
                            priceClass = "text-danger";
                            priceFlow = "-";
                        }

                        rowContent += `
                        <div class="row col-12 my-3 f-14">
                            <div class="col-7">
                                <span>${row.type[0].toUpperCase()+row.type.substring(1)}</span>
                                <span>${row.transaction_id}</span>
                                <span class="d-block f-10">${date}</span>
                            </div>
                            <div class="col-5 px-0" style="text-align:right;">
                                <span class="zowasel-darkblue-color fw-bold price ${priceClass}"> ${priceFlow} ₦${toCommas(row.amount_paid)}</span>
                            </div>
                        </div>
                        `;   
                    }
                    $('#recentTransactions').html(rowContent);
          
                }else{
                    $('#recentTransactions').html("<h5 class='text-center'>No transacton found.</h5>");
                }

                lazyLoading();
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                // console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}
/* ------------------------ FETCH RECENT TRANSACTIONS ----------------------- */


/* ------------------------- GRAB SINGLE TRANSACTION ------------------------ */
function grabSingleTransaction(){
    let pathname = window.location.search;
    let queryString = new URLSearchParams(pathname);
    let transaction_id = queryString.get("transaction_id");
    // console.log(transaction_id, "transaction_id");

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/wallet/transactions/${transaction_id}`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            console.log(response, "The single transaction response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let row = response.data;

                let priceClass, priceFlow, paymentType, paymentArrow, paymentFrom_To, paymentFrom_To_Name;
                if(parseInt(row[0].recipient_id)===user.user.id){
                    priceClass = "text-success";
                    priceFlow = "+";
                    paymentType = "Payment Received";
                    paymentArrow = "left";
                    paymentFrom_To = "From";
                    paymentFrom_To_Name = row[0].seller.first_name+" "+row[0].seller.last_name;
                }else{
                    priceClass = "text-danger";
                    priceFlow = "-";
                    paymentType = "Payment Sent";
                    paymentArrow = "right";
                    paymentFrom_To = "To";
                    paymentFrom_To_Name = row[0].recipient.first_name+" "+row[0].recipient.last_name;
                }

                $('.paymentArrow').html(`<i class="fas fa-arrow-${paymentArrow}"></i>`);
                $('.paymentType').html(paymentType);
                $('.paymentStatus').html(row[0].status[0].toUpperCase()+row[0].status.substring(1));
                $('.paymentTransID').html(row[0].transaction_id);
                $('.paymentFrom_To').html(paymentFrom_To);
                $('.paymentFrom_To_Name').html(paymentFrom_To_Name);
                $('.transType').html(row[0].type[0].toUpperCase()+row[0].type.substring(1));
                $('.transDate').html(row[0].created_at);
                $('.transAmount').html("₦"+toCommas(row[0].amount_paid));
                $('.trans_status').html(row[0].status);
                // $('.trans_status').text(toCommas(row[0].balance));
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
                basicmodal("", "An error occured when retriving this transaction details.");
            }
        }    
    });
}
/* ------------------------- GRAB SINGLE TRANSACTION ------------------------ */







/* ------------------------------ FETCH CROPS WANTED ----------------------------- */
function fetchWantedCrops(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let theURL, gotoProductdetails, currentPage;
    if(usertype == "corporate"){
        $('.activeColorHolder').show();
        theURL = `crop/wanted/userid`;
        gotoProductdetails = `mypersonalproductdetails.html`;
        currentPage = `localStorage.setItem('last_input_crop_page', 'cropswanted.html')`;
    }else{
        theURL = `crop/getbycropwanted`;
        gotoProductdetails = `productdetails.html`;
        currentPage = ``;
    }

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/${theURL}`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            console.log(response, "The logged response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data.rows;
                let rowContent = "";
                let index;
                console.log(thedata, "All crops wanted");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let image;
                        if((row.category.name).toLowerCase()=="grains"){
                            image = `<img src="../logos/grain2.png" height="100%" alt="logo">`
                        }else if((row.category.name).toLowerCase()=="spices"){
                            image = `<img src="../logos/spicy2.png" height="100%" alt="logo">`
                        }else if((row.category.name).toLowerCase()=="cash crops"){
                            image = `<img src="../logos/cash.png" height="100%" alt="logo">`
                        }else{
                            image = `<img src="../logos/vegees.svg" height="100%" alt="logo">`;
                        }


                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = "- "+ row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }

                        let activeProductClass, negotiationProductClass;
                        if(usertype == "corporate"){
                            if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        }else{
                            activeProductClass = "d-none";
                        }
                        if(parseInt(row.is_negotiable)==1){ negotiationProductClass = "bg-primary"; }else if(parseInt(row.is_negotiable)==0){ negotiationProductClass = "bg-warning" }

                        rowContent += `
                        <li class="lazy cardholder p-3 fontFamily1">
      
                            <div class="d-flex justify-content-between">
                                <div class="item-inner">
                                    <div class="item-title-row mb-0">
                                        <h6 class="item-title zowasel-darkblue-color f-18"><a href="javascript:void(0)">${row.subcategory.name} ${thecolor}</a></h6>
                                        <div class="text-truncate zowasel-color fw-bold f-18">${row.category.name}</div>
                                    </div>
                                    <div class="item-footer">
                                        <div class="">  
                                            <h6 class="me-3 mb-0"><i class="fa fa-user f-13 me-1"></i> ${row.user.first_name}</h6>
                                            <h6 class="me-3 mb-0">${truncate(row.description,20)}</h6>
                                        </div>    
                                    </div>
                                </div>
                                <div class="item-inner">
                                    <a href="javascript:void(0);" class="item-bookmark icon-2">
                                        <h6 class="mb-0 zowasel-color f-18">₦${toCommas(theprice)} / ${thetest_weight}</h6>
                                    </a>

                                    <div class="d-flex mt-2">
                                        <span class="cropstatus cropActive CropActive2hide_show ${activeProductClass}"></span>
                                        <span class="cropstatus cropNegotiable ${negotiationProductClass}"></span>
                                    </div>

                                    <button class="btn zowasel-darkblue-bg text-white w-100 py-2 mt-2" onclick="checkifActiveB4GoingtoSinglePage(${parseInt(row.id)}, ${parseInt(row.active)}, '${gotoProductdetails}')">
                                        View
                                    </button>
                                </div>
                            </div>
                        </li>
                        `;   
                    }
                    $('#wantedcrops').html(rowContent);
                    
                }else{
                    $('#wantedcrops').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No crop wanted yet</h5></td></tr>");
                }

                lazyLoading();
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}



function checkifActiveB4GoingtoSinglePage(rowID, isActive, gotoProductdetails){
    if(isActive==0){
        basicmodal("", "Product is currently not active");
    }else{
        localStorage.setItem('singleproductID', rowID); 
        location.assign(gotoProductdetails);

        if(usertype == "corporate"){
            localStorage.setItem('last_input_crop_page', 'cropswanted.html');
        }else{
        }
    }
}
/* ------------------------------ FETCH CROPS WANTED ------------------------------ */







/* ------------------------------ FETCH ALL CROPS FOR SALE ----------------------------- */
// CORPORATE
function fetchAllCropsForSale(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let theURL, gotoProductdetails, viewmoreProduts, currentPage;
    if(usertype == "corporate"){
        theURL = `crop/getbycropoffer`;
        viewmoreProduts = `/dashboard/allcropsforsale.html`;
        gotoProductdetails = `productdetails.html`;
        currentPage = `localStorage.setItem('last_input_crop_page', 'cropsforsale.html')`;
    }else{
        theURL = `crop/getbycropwanted`;
        viewmoreProduts = `/dashboard/cropsforsale.html`;
        gotoProductdetails = `mypersonalproductdetails.html`;
        // currentPage = ``;
    }

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/${theURL}`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            console.log(response, "The logged response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data.rows;
                let rowContent = "";
                let carouselrowContent = "";
                let index;
                console.log(theURL, thedata, "the Product URL type");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let image;
                        if((row.category.name).toLowerCase()=="grains"){
                            image = `<img src="../logos/grain2.png" height="100%" alt="logo">`
                        }else if((row.category.name).toLowerCase()=="spices"){
                            image = `<img src="../logos/spicy2.png" height="100%" alt="logo">`
                        }else if((row.category.name).toLowerCase()=="cash crops"){
                            image = `<img src="../logos/cash.png" height="100%" alt="logo">`
                        }else{
                            image = `<img src="../logos/vegees.svg" height="100%" alt="logo">`;
                        }


                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = "- "+row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }

                        let activeProductClass, negotiationProductClass;
                        if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        if(parseInt(row.is_negotiable)==1){ negotiationProductClass = "bg-primary"; }else if(parseInt(row.is_negotiable)==0){ negotiationProductClass = "bg-warning" }

                        rowContent += `
                        <li class="lazy cardholder p-3 fontFamily1">
                            <div class="d-flex justify-content-between">
                                <div class="item-inner"> 
                                    <div class="item-title-row  mb-0">
                                        <h6 class="item-title zowasel-darkblue-color f-18"><a href="javascript:void(0)">${row.subcategory.name} ${thecolor}</a></h6>
                                        <div class="text-truncate zowasel-color fw-bold f-18">${row.category.name}</div>
                                    </div>
                                    <div class="item-footer">
                                        <div class="">
                                            <h6 class="me-3 mb-0 f-12"><i class="fa fa-user f-12 me-1"></i> ${row.user.first_name}</h6>
                                            <h6 class="me-3 mb-0 f-12">${truncate(row.description,20)}</h6>
                                        </div>    
                                    </div>
                                </div>

                                <div class="item-inner">
                                    <a href="javascript:void(0);" class="item-bookmark icon-2">
                                        <h6 class="mb-0 zowasel-color f-18">₦${toCommas(theprice)} / ${thetest_weight}</h6>
                                    </a>

                                    <div class="d-flex mt-3">
                                        <span class="cropstatus cropActive CropActive2hide_show ${activeProductClass}"></span>
                                        <span class="cropstatus cropNegotiable ${negotiationProductClass}"></span>
                                    </div>

                                    <button class="btn zowasel-darkblue-bg text-white w-100 py-2 mt-2" onclick="localStorage.setItem('singleproductID',${row.id}); ${currentPage}
                                    location.assign('${gotoProductdetails}')">
                                        View
                                    </button>
                                </div>
                            </div>
                        </li>
                        `;   
                    }

                    if(thedata.length>3){looptill=3}else{looptill=thedata.length}
                    for (let i = 0; i < looptill; i++) {
                        // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;
                        console.log("row",row);

                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = "- "+row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }
  
                        let activeProductClass, negotiationProductClass;
                        if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        if(parseInt(row.is_negotiable)==1){ negotiationProductClass = "bg-primary"; }else if(parseInt(row.is_negotiable)==0){ negotiationProductClass = "bg-warning" }

                        carouselrowContent += `
                        <div class="singleproduct-crousel-holder text-center p-2 py-3" onclick="localStorage.setItem('singleproductID',${row.id}); ${currentPage}
                        location.assign('${gotoProductdetails}')">
                            <a href="#">
                                <div class="fontFamily2 f-15 fw-600 lh-18 zowasel-darkblue-color">${row.subcategory.name} ${thecolor}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-color mt-2">${row.category.name}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-gray-color mt-2">${truncate(row.description,7)}</div>
                                <div class="fontFamily1 f-16 fw-700 lh-24 zowasel-color mt-2">₦${toCommas(theprice)} / ${thetest_weight}</div>
                            </a>
                        </div>
                        `; 
                    }

                    let emptycell = `
                        <div class="text-center p-2 py-3"">
                            <!--<a href="#">Click "More" to see others</a>-->
                        </div>
                    `;
                    $('#p_allcropsforsale').html(rowContent);
                    $('#p_carouselcropsforsale').html(carouselrowContent + emptycell);
                    // console.log("carouselrowContent + emptycell", carouselrowContent + emptycell);

                }else{
                    $('#p_allcropsforsale').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No crop for sale yet</h5></td></tr>");
                    $('#p_carouselcropsforsale').html("<tr><td colspan='9' class='text-center'><span class='pt-2'>No crop yet</span></td></tr>");
                }
                
                lazyLoading();
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                // console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}
/* ------------------------------ FETCH ALL CROPS FOR SALE ------------------------------ */




/* ----------------------- GET SINGLE PRODUCT DETAILS ----------------------- */
function populateSingleMyPersonalProductDetails(){
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/crop/getbyid/`+localStorage.getItem('singleproductID'),
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            setTimeout(()=>{
                EndPageLoader();
            },1500)
            console.log(response, "The logged response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                console.log(response.message, "populateSingleProductDetails");
                let thedata = response.data;
                
                $('.productName').html(thedata.subcategory.name+" - "+thedata.specification.color);
                $('.productDescription').html(thedata.description);
                $('.productOwnerFarmName').html(thedata.user.first_name+" "+thedata.user.last_name);
                $('#productSaleType').html(thedata.type);
                $('.p_quantity').html(thedata.specification.qty);

                let isverified;
                // if(thedata.user.is_verified === 0){
                //     isverified = `Unverified &nbsp;<img src="../logos/unavailable.png" width="22px" alt="">`;
                // }else{
                    isverified = `Verified &nbsp;<img src="../assets/icons/check.png" width="12px" alt="">`;
                // }
                $('.isVerified').html(isverified);

                let activecrop;
                let active = thedata.active;
                // alert(active);
                // Active and nonActive crop
                if(parseInt(active)===0){
                    activecrop = `
                    <div>
                        <span>Crop Deactivated  &nbsp;</span>
                        <span class="cropstatus2 cropActive d-block bg-danger"></span>
                    </div>
                    <button class="btn btn-success" onclick="activateCrop(${thedata.id})">Activate crop</button>
                    `;
                }else if(parseInt(active)===1){
                    activecrop = `
                    <div>
                        <span>Active crop &nbsp;</span>
                        <span class="cropstatus2 cropActive d-block bg-success"></span>
                    </div>
                    <button class="btn btn-danger" onclick="deactivateCrop(${thedata.id})">Deactivate crop</button>
                    `;
                }
                $('.cropActiveStatus-v').html(activecrop);
                // Active and nonActive crop

                /* ------------------------ CHECK IF AUCTION HAS BID ------------------------ */
                let auction_viewbid_button;
                if(thedata.bid.length){
                    auction_viewbid_button = `
                        <button class="btn zowasel-bg text-white mt-4" onclick="openallAuctionBids(${thedata.id})">View Bids</button>
                    `;
                }else{ auction_viewbid_button=``; }
                $('.auction-viewbid-button').html(auction_viewbid_button);
                /* ------------------------ CHECK IF AUCTION HAS BID ------------------------ */

                // AUCTION CROP
                let auction_details;
                if(thedata.auction){
                    let auction = thedata.auction;
                    auction_details = `
                        <h5>Auction Details</h5>
                        <div class="row col-12">
                            <div class="col-6">
                                <h6>Start Date:</h6>
                                <span>${auction.start_date}</span>
                            </div>
                            <div class="col-6">
                                <h6>End Date:</h6>
                                <span>${auction.end_date}</span>
                            </div>
                        </div>

                        <div class="row col-12 mt-4 mb-5">
                            <div class="col-6">
                                <h6>Minimum Bid:</h6>
                                <span>${auction.minimum_bid}</span>
                            </div>
                            <div class="col-6">
                                <h6>Created Date:</h6>
                                <span>${auction.created_at.split(" ")[0]}</span>
                            </div>
                        </div>
                    `;

                    $('.auction_details').html(auction_details);
                }
                // AUCTION CROP

                /* -------------------------------- CAROUSEL -------------------------------- */
                let imagesLink = thedata.images;
                console.log("ImagesLink", imagesLink);
                if(imagesLink){
                    if(imagesLink.includes('/data/products')){

                    }else{
                        var parsedImagesLink = JSON.parse(imagesLink);
                        console.log("parsedImagesLink",parsedImagesLink.length);

                        let carousel="";
                        let carouselcontents;
                        if(parsedImagesLink.length < 1){
                            $(".swiper-btn-center-lr").hide();
                        }else{
                            for(let i=0; i<parsedImagesLink.length; i++){
                                carousel +=`
                                <div class="accordion_li">
                                    <a href="#">
                                        <div class="bg-image">
                                        <img src="${parsedImagesLink[i]}" class="accordion_img" alt="img">
                                        </div>
                                    </a>
                                </div>
                                `;
                            }
                            let swiperBtn = `
                                <div class="swiper-btn">
                                    <div class="swiper-pagination style-2 flex-1"></div>
                                </div>
                            `;

                        carouselcontents = `
                                ${carousel}
                            `;
                            
                            

                            // setTimeout(()=>{
                                $('.owl-carousel-singleproduct-page').html(carouselcontents);
                                // $('.swiper-container').append(swiperBtn);
                            // },500)
                        }
                    }
                }
                /* -------------------------------- CAROUSEL -------------------------------- */

                let videoLink;
                if(!thedata.video){
                    $('.videoLinkContainer').hide();
                }else{
                    $('.videoLinkContainer').show();
                    let thevideoLink = thedata.video;
                    let embedLink = thevideoLink.includes("embed/");
                    let watchLink = thevideoLink.includes("watch?");
                    let mp4Link = thevideoLink.includes(".mp4");
                    if(embedLink){
                        $('#videoLink').attr('src', thevideoLink);
                    }else if(watchLink){
                        let watchExtension_formated;
                        let watchExtension = thedata.video.split('watch?v=')[1];
                        let thelink = watchExtension.includes("&");
                        if(thelink){
                            watchExtension_formated = watchExtension.split('&')[0];
                        }else{
                            watchExtension_formated = watchExtension;
                        }
                        videoLink = "https://www.youtube.com/embed/"+watchExtension_formated;
                        $('#videoLink').attr('src', videoLink);
                    }else if(mp4Link){
                        $('#videoLinkTagArea').html(`<video src="${thevideoLink}" width="100%" height="315" controls></video>`);
                    }else{
                        $('#videoLinkTagArea').html(``);
                    }
                }

                $('.productAmount').html(thedata.specification.price);
                $('.productPackaging').html(thedata.packaging);
                $('.productCategory').html(thedata.category.name);
                $('.testWeight').html(thedata.specification.test_weight);
                $('.productColor').html(thedata.specification.color);
                $('.productHardness').html(thedata.specification.hardness);
                $('.productMoisture').html(thedata.specification.moisture);
                $('.productSplit').html(thedata.specification.splits);
                $('.productForeignMatter').html(thedata.specification.foreign_matter);
                $('.productOilContent').html(thedata.specification.oil_content);
                $('.productBrokenGrains').html(thedata.specification.broken_grains);
                $('.productInfestation').html(thedata.specification.infestation);
                $('.productWeevil').html(thedata.specification.weevil);
                $('.productGrainSize').html(thedata.specification.grain_size);
                $('.productDamagedKernel').html('');
                $('.productRottenShriveled').html(thedata.specification.rotten_shriveled);

                let farmOwnerUserDetails = JSON.stringify(thedata.user);
                $('.farmOwnerUserDetails').html(farmOwnerUserDetails);

                // INPUT VALUES
                $('#productAmount').val(thedata.specification.price);
                $('#productPackaging').val(thedata.packaging);
                $('#productCategory').html(thedata.category.name);
                $('#testWeight').val(thedata.specification.test_weight);
                $('#productColor').html(thedata.specification.color);
                $('#productMoisture').val(thedata.specification.moisture);
                $('#productForeignMatter').val(thedata.specification.foreign_matter);
                $('#productOilContent').val(thedata.specification.oil_content);
                $('#productBrokenGrains').val(thedata.specification.broken_grains);
                $('#productInfestation').val(thedata.specification.infestation);
                $('#productWeevil').val(thedata.specification.weevil);
                $('#productGrainSize').html(thedata.specification.grain_size);
                // $('#productDamagedKernel').html('');
                $('#productRottenShriveled').val(thedata.specification.rotten_shriveled);
                if(thedata.specification.hardness == "" || thedata.specification.hardness===null){
                    $('#productHardness').val(0);
                }else{
                    $('#productHardness').val(thedata.specification.hardness);
                }
                if(thedata.specification.splits == "" || thedata.specification.splits===null){
                    $('#productSplit').val(0);
                }else{
                    $('#productSplit').val(thedata.specification.splits);
                }
                if(thedata.specification.productDamagedKernel == "" || thedata.specification.productDamagedKernel===null){
                    $('#productDamagedKernel').val('');
                }else{
                    $('#productDamagedKernel').val(thedata.specification.splits);
                }
                // INPUT VALUES
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                // console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    })
}


function openallAuctionBids(crop_id){
    startPageLoader();

    $.ajax({
        url: `${liveMobileUrl}/crop/${crop_id}/bid`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
        }),
        success: function(response) { 
            EndPageLoader();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // responsemodal("successicon.png", "Success", response.message);
                $('.p_bid_table').show();
                // console.log(response);
                let thedata = response.data;
                thedata.reverse();
                let bid_data;
                // console.log(thedata.length)
                for(let i=0; i<thedata.length; i++){
                    let user = thedata[i].user;
                    bid_data +=`
                    <tr>
                        <td id="" style="display:none;">${thedata[i]}</td>
                        <th scope="row">${thedata[i].created_at}</th>
                        <td>${user.first_name+" "+user.last_name}</td>
                        <td>${thedata[i].amount}</td>
                    </tr>
                    `;
                }
                $('#p_bids').html(bid_data);
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                // console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}


function activateCrop(crop_id){
    // alert(crop_id);
    mcxDialog.confirm("I accept to activate this crop", {
        sureBtnClick: function(){
          // callback
          //   alert("Ewo");
          startPageLoader();

            $.ajax({
                url: `${liveMobileUrl}/crop/${crop_id}/activate`,
                type: "POST",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('authToken')
                },
                "data": JSON.stringify({
                    "id": crop_id
                }),
                success: function(response) { 
                    EndPageLoader();
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        responsemodal("successicon.png", "Success", response.message);
                        populateSingleMyPersonalProductDetails();
                        owlcarouselSettings();
                        setTimeout(()=>{
                            $('.mymodal').hide();
                        },3000)
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    // console.log(xmlhttprequest, "Error code");
                    if(textstatus==="timeout") {
                        basicmodal("", "Service timed out <br/>Check your internet connection");
                    }
                },
                statusCode: {
                    200: function(response) {
                        console.log('ajax.statusCode: 200');
                    },
                    403: function(response) {
                        console.log('ajax.statusCode: 403');
                        basicmodal("", "Session has ended, Login again");
                        setTimeout(()=>{
                            logout();
                        },3000)
                    },
                    404: function(response) {
                        console.log('ajax.statusCode: 404');
                    },
                    500: function(response) {
                        console.log('ajax.statusCode: 500');
                    }
                }
            });
        }

    });
}

function deactivateCrop(crop_id){
    // alert(crop_id);
    mcxDialog.confirm("I accept to deactivate this crop", {
        sureBtnClick: function(){
          // callback
          //   alert("Ewo");
          startPageLoader();

            $.ajax({
                url: `${liveMobileUrl}/crop/${crop_id}/deactivate`,
                type: "POST",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('authToken')
                },
                "data": JSON.stringify({
                    "id": crop_id
                }),
                success: function(response) { 
                    EndPageLoader();
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        responsemodal("successicon.png", "Success", response.message);
                        populateSingleMyPersonalProductDetails();   
                        owlcarouselSettings();
                        setTimeout(()=>{
                            $('.mymodal').hide();
                        },3000)  
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    // console.log(xmlhttprequest, "Error code");
                    if(textstatus==="timeout" || textstatus=="error") {
                        basicmodal("", "Service timed out <br/>Check your internet connection");
                    }
                },
                statusCode: {
                    200: function(response) {
                        console.log('ajax.statusCode: 200');
                    },
                    403: function(response) {
                        console.log('ajax.statusCode: 403');
                        basicmodal("", "Session has ended, Login again");
                        setTimeout(()=>{
                            logout();
                        },3000)
                    },
                    404: function(response) {
                        console.log('ajax.statusCode: 404');
                    },
                    500: function(response) {
                        console.log('ajax.statusCode: 500');
                    }
                }
            });
        }

    });
}

function populateSingleProductDetails(){
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/crop/getbyid/`+localStorage.getItem('singleproductID'),
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            setTimeout(()=>{
                EndPageLoader();
            },1500)
            console.log(response, "The logged response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                console.log(response.message, "populateSingleProductDetails");
                let thedata = response.data;
                if(thedata.type.toLowerCase()=="auction"){
                    $('.auctionOnly').show();
                    // $('.productName').html(thedata.subcategory.name+" - <span style='color:"+thedata.specification.color.toLowerCase()+";'>"+thedata.specification.color+"</span>");
                    $('.productName').html(thedata.subcategory.name+" - "+thedata.specification.color);
                    $('.bidStartDate').html(thedata.auction.start_date);
                    $('.bidEndDate').html(thedata.auction.end_date);
                    if(thedata.active===1){
                        $('.cropActiveStatus-v').html('<span class="text-success">Active</span>');
                    }else{ $('.cropActiveStatus-v').html('<span class="text-danger">Inactive</span>'); }
                    $('.minimumBid').html(thedata.currency+" "+thedata.auction.minimum_bid);
                    let daysRemaining = daysDifferenceday(new Date(), thedata.auction.end_date);
                    let daysLeft;
                    if(daysRemaining === 0){
                        $('.daysRemaining').html("<span class='text-primary'>1 day left, Bid ends today</span>");
                    }else if(daysRemaining < 0){
                        $('.daysRemaining').html("<span class='text-danger'>Bid duration has ended</span>");
                    }else{
                        $('.daysRemaining').html(Math.round(daysRemaining)+" days");
                    }

                    $('#crop_id').val(thedata.id);
                    $('#inputDaysRemaining').val(daysRemaining);
                    $('#inputCropActive').val(thedata.active);
                    $('#inputMinimumBid').val(thedata.auction.minimum_bid);

                }else{
                    $('.productName').html(thedata.subcategory.name+" - "+thedata.specification.color);
                }
                $('.productQuantity').html(thedata.specification.qty);
                $('#accepted_quantity').attr("max",thedata.specification.qty);
                $('.productDescription').html(thedata.description);
                $('.productOwnerFarmName').html(thedata.user.first_name+" "+thedata.user.last_name);
                $('#productSaleType').html(thedata.type);

                /* -------------------------------- CAROUSEL -------------------------------- */
                let imagesLink = thedata.images;
                console.log("ImagesLink", imagesLink);
                if(imagesLink){
                    if(imagesLink.includes('/data/products')){

                    }else{
                        var parsedImagesLink = JSON.parse(imagesLink);
                        console.log("parsedImagesLink",parsedImagesLink.length);

                        let carousel="";
                        let carouselcontents;
                        if(parsedImagesLink.length < 1){
                            $(".swiper-btn-center-lr").hide();
                        }else{
                            for(let i=0; i<parsedImagesLink.length; i++){
                                carousel +=`
                                <div class="accordion_li">
                                    <a href="#">
                                        <div class="bg-image">
                                        <img src="${parsedImagesLink[i]}" class="accordion_img" alt="img">
                                        </div>
                                    </a>
                                </div>
                                `;
                            }
                            let swiperBtn = `
                                <div class="swiper-btn">
                                    <div class="swiper-pagination style-2 flex-1"></div>
                                </div>
                            `;

                        carouselcontents = `
                                ${carousel}
                            `;
                            
                            

                            // setTimeout(()=>{
                                $('.owl-carousel-singleproduct-page').html(carouselcontents);
                                // $('.swiper-container').append(swiperBtn);
                            // },500)
                        }
                    }
                }
                /* -------------------------------- CAROUSEL -------------------------------- */

                let videoLink;
                if(!thedata.video){
                    $('.videoLinkContainer').hide();
                }else{
                    $('.videoLinkContainer').show();
                    let thevideoLink = thedata.video;
                    let embedLink = thevideoLink.includes("embed/");
                    let watchLink = thevideoLink.includes("watch?");
                    let mp4Link = thevideoLink.includes(".mp4");
                    if(embedLink){
                        $('#videoLink').attr('src', thevideoLink);
                    }else if(watchLink){
                        let watchExtension_formated;
                        let watchExtension = thedata.video.split('watch?v=')[1];
                        let thelink = watchExtension.includes("&");
                        if(thelink){
                            watchExtension_formated = watchExtension.split('&')[0];
                        }else{
                            watchExtension_formated = watchExtension;
                        }
                        videoLink = "https://www.youtube.com/embed/"+watchExtension_formated;
                        $('#videoLink').attr('src', videoLink);
                    }else if(mp4Link){
                        $('#videoLinkTagArea').html(`<video src="${thevideoLink}" width="100%" height="315" controls></video>`);
                    }else{
                        $('#videoLinkTagArea').html(``);
                    }
                }

                let isverified;
                // if(thedata.user.is_verified === 0){
                //     isverified = `<img src="../logos/unavailable.png" width="22px" alt="">&nbsp; Unverified`;
                // }else{
                    isverified = `Verified &nbsp;<img src="../assets/icons/check.png" width="12px" alt="">`;
                // }
                $('.isVerified').html(isverified);

                if(thedata.type == "auction"){
                    $('.clicktoBid, .clicktoViewBids').show();
                }else{
                    if(parseInt(thedata.is_negotiable)==1){
                        $('.clicktoAcceptDirectly').show();
                        $('.clicktoNegotiate').show();
                    }else if(parseInt(thedata.is_negotiable)==0){
                        $('.clicktoAcceptDirectly').show();
                        $('.clicktoNegotiate').hide();
                    }
                }
                
                $('.productAmount').html(thedata.specification.price);
                $('.productPackaging').html(thedata.packaging);
                $('.productCategory').html(thedata.category.name);
                $('.testWeight').html(thedata.specification.test_weight);
                $('.productColor').html(thedata.specification.color);
                $('.productHardness').html(thedata.specification.hardness);
                $('.productMoisture').html(thedata.specification.moisture);
                $('.productSplit').html(thedata.specification.splits);
                $('.productForeignMatter').html(thedata.specification.foreign_matter);
                $('.productOilContent').html(thedata.specification.oil_content);
                $('.productBrokenGrains').html(thedata.specification.broken_grains);
                $('.productInfestation').html(thedata.specification.infestation);
                $('.productWeevil').html(thedata.specification.weevil);
                $('.productGrainSize').html(thedata.specification.grain_size);
                $('.productDamagedKernel').html('');
                $('.productRottenShriveled').html(thedata.specification.rotten_shriveled);

                let farmOwnerUserDetails = JSON.stringify(thedata.user);
                $('.farmOwnerUserDetails').html(farmOwnerUserDetails);

                // INPUT VALUES
                $('#productAmount').val(thedata.specification.price);
                $('#productAmount').attr("max",thedata.specification.price);
                $('#productPackaging').val(thedata.packaging);
                $('#productCategory').html(thedata.category.name);
                $('#testWeight').val(thedata.specification.test_weight);
                $('#productQuantity').attr("max",thedata.specification.qty);
                $('#productColor').html(thedata.specification.color);
                $('#productHardness').val(thedata.specification.hardness);
                $('#productMoisture').val(thedata.specification.moisture);
                $('#productSplit').val(thedata.specification.splits);
                $('#productForeignMatter').val(thedata.specification.foreign_matter);
                $('#productOilContent').val(thedata.specification.oil_content);
                $('#productBrokenGrains').val(thedata.specification.broken_grains);
                $('#productInfestation').val(thedata.specification.infestation);
                $('#productWeevil').val(thedata.specification.weevil);
                $('#productGrainSize').html(thedata.specification.grain_size);
                $('#productDamagedKernel').html('');
                $('#productRottenShriveled').val(thedata.specification.rotten_shriveled);
                // INPUT VALUES
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout" || textstatus=="error") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    })
}


function gotoNegotiation(){
    let productOwnerFarmName = $('.productOwnerFarmName').text();
    // alert(productOwnerFarmName);

    let farmOwnerUserDetails = JSON.parse($('.farmOwnerUserDetails').html());
    // console.log(farmOwnerUserDetails);

    if(!productOwnerFarmName){
        responsemodal("erroricon.png", "Error", "Product owner details cannot be retrieved");
    }else if(!farmOwnerUserDetails){
        responsemodal("erroricon.png", "Error", "Second party details cannot be retrieved");
    }else{
        localStorage.setItem('productOwnerDetails', JSON.stringify(farmOwnerUserDetails));
        localStorage.setItem('negotiationpage_type', $('#productSaleType').text());
        location.assign('negotiate.html');
    }
}
/* ----------------------- GET SINGLE PRODUCT DETAILS ----------------------- */







/* ------------------------------- NEGOTIATION ------------------------------ */
const populateUserandFarmOwnerNegotiationMessages =()=>{

    let singleproductID = localStorage.getItem('singleproductID');
    let productOwnerDetails = localStorage.getItem('productOwnerDetails');
    let negotiationpage_type = localStorage.getItem('negotiationpage_type');

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    console.log(singleproductID, "singleproductID");
    console.log(productOwnerDetails, "productOwnerDetails");
    console.log(userid, "userid");
    console.log(liveMobileUrl, "liveMobileUrl");

    let productownerid = JSON.parse(productOwnerDetails).id;
    console.log(productownerid);
    
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/crop/`+singleproductID+`/negotiation/getbyuserid/`+userid+`/productownerid/`+productownerid,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            setTimeout(()=>{
                EndPageLoader();
            },1500)

            $('.open_offer_form').show();
            $('[data-toggle="tooltip"]').tooltip('hide');
            setTimeout(()=>{
                $('[data-toggle="tooltip"]').tooltip('show');
            },1000)
            setTimeout(()=>{
                $('[data-toggle="tooltip"]').tooltip('hide');
            },10000)
            setInterval(()=>{
                $('[data-toggle="tooltip"]').tooltip('show');
                setTimeout(()=>{
                    $('[data-toggle="tooltip"]').tooltip('hide');
                },5000)
            },10000)  
            
            // $('.loader').hide();
            console.log(response, "The negotiation response");
            if(response.error == true){
                console.log(response.message);
                // responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedatafetched = response.data;
                // console.log(thedatafetched, "The negotiation message data");

                // Now the data coming from response is not arranged.
                // The Object.values method returns an array of object's values (which are your messages) 
                // and then you sort them by message id in ascending order using sort function.
                let thedata = Object.entries(thedatafetched)
                .map(([key, val]) => ({id: key, ...val}))
                .sort((a, b) => a.id - b.id);

                // console.log(thedata, "the data");

                let finalObj = {}
                thedata.forEach((theresult) => {

                    const date = theresult.created_at.split(" ")[0];
                    if (finalObj[date]) {
                        finalObj[date].push(theresult);
                    } else {
                        finalObj[date] = [theresult];
                    }
                })
                console.log(finalObj, "final Obj")

                let finalObjcount = Object.keys(finalObj).length;
                // console.log(finalObjcount);


                let rowContent = "";
                let index;

                if(finalObjcount > 0){
                    $('.chat-image').hide();
                    $('.thechatside').show();


                    for (let i = 0; i < finalObjcount; i++) {
                      console.log('Hello World', + i);
                        let grouped_date = Object.keys(finalObj)[i];
                        let therow = finalObj[Object.keys(finalObj)[i]];
                        console.log(therow.length);
                        
                        // The row is coming out as an array with many objects. Loop through the array
                    
                        let row = therow;
                        console.log(row, "The row rf");

                        let themessageandType;
                        let chatGroupContent;
                        for (let x = 0; x < row.length; x++) {
                            // index= x+1;
                            let chatboxClass, accept_decline_checkbox;
                            
                            if(usertype == "merchant"){
                                // alert(row[x].status);
                                if(row[x].status == "declined"){
                                    $('.open_offer_form').show();
                                }
                                if(row[x].type == "merchant"){
                                    chatboxClass = `user`;
                                }else if(row[x].type == "admin"){
                                    chatboxClass = `admin`;
                                }else{
                                    chatboxClass = ``;
                                }

                                if(row[x].status == "accepted"){
                                    accept_decline_checkbox = `<span class="fw-bolder">Offer accepted <span style="color:#30BD6E;" onclick="gotoOrderSummary('${row[x].order.order_hash.toString()}')">See Order Summary</span></span>`;
                                }else if(row[x].status == "declined"){
                                    accept_decline_checkbox = `<span class="text-danger fw-bolder">Offer declined.</span>`;
                                    $('.open_offer_form').show();
                                }else if(negotiationpage_type=="cropwanted"){
                                    accept_decline_checkbox = `We will let you know when corporate accepts/declines offer.`;
                                }else if(negotiationpage_type=="offer"){
                                    accept_decline_checkbox = `
                                        <form>
                                            <div class="d-flex justify-content-between">
                                                <span class="text-success">Accept <input type="checkbox" onclick="acceptoffer(${row[x].id})" /> </span>
                                                <span class="text-danger">Decline <input type="checkbox" onclick="declineoffer(${row[x].id})" /> </span>
                                            </div>
                                        </form>
                                    `;
                                }

                            }else if(usertype == "corporate"){
                                if(row[x].status == "declined"){
                                    $('.open_offer_form').show();
                                }
                                if(row[x].type == "corporate"){
                                    chatboxClass = `user`;
                                }else if(row[x].type == "admin"){
                                    chatboxClass = `admin`;
                                }else{
                                    chatboxClass = ``;
                                }

                                if(row[x].status == "accepted"){
                                    accept_decline_checkbox = `Offer accepted. <span style="color:#30BD6E;" class="fw-bolder" onclick="gotoOrderSummary('${row[x].order.order_hash.toString()}')">Proceed to payment.</span>`;
                                }else if(row[x].status == "declined"){
                                    accept_decline_checkbox = `<span class="text-danger">Offer declined.</span>`;
                                }else if(negotiationpage_type=="cropwanted"){
                                    accept_decline_checkbox = `
                                        <form>
                                            <div class="d-flex justify-content-between">
                                                <span class="text-success">Accept <input type="checkbox" onclick="acceptoffer(${row[x].id})" /> </span>
                                                <span class="text-danger">Decline <input type="checkbox" onclick="declineoffer(${row[x].id})" /> </span>
                                            </div>
                                        </form>
                                    `;
                                }else if(negotiationpage_type=="offer"){
                                    accept_decline_checkbox = `We will let you know when merchant accepts/declines offer.`;
                                }
                            }

                            let time = row[x].created_at;
                            // console.log(time);
                            
                            let myTime = time.split(" ")[1];
                            let myDate = time.split(" ")[0];
                            var hour = parseInt(myTime.split(":")[0]) % 12;
                            // console.log(hour, "The hour");
                            var timeInAmPm = (hour == 0 ? "12": hour ) + ":" + myTime.split(":")[1] + " " + (parseInt(parseInt(myTime.split(":")[0]) / 12) < 1 ? "AM" : "PM");
                            // console.log(timeInAmPm, "timeInAmPm");

                            let themessagetype = row[x].messagetype;
                            if(usertype=="merchant"&&negotiationpage_type=="offer"){
                                $('.open_offer_form').hide();
                            }
                            if(themessagetype == "offer"){
                                // Hide Send offer button if an offer has been sent already
                                $('.open_offer_form').hide();
                                // Hide Send offer button if an offer has been sent already
                            }
                            // let themessageandType;
                            if(themessagetype == "text"){
                                themessageandType = `
                                    <div class="chat-content ${chatboxClass}">
                                        <div class="message-item">
                                            <div class="bubble">${row[x].message}</div>    
                                            <div class="message-time">${timeInAmPm}</div>   
                                        </div>
                                    </div>
                                `;
                            }else if(themessagetype == "offer"){
                                let offerbox = JSON.parse(row[x].message);
                                themessageandType = `
                                    <div class="offer-right mb-2 mt-1">
                                        <div class="offered">
                                            <!---->
                                            <div class="colored">
                                                <h3>Offer</h3>
                                                <hr />
                                                <div class="white-line"></div>
                                                <div class="each-item">
                                                    <p>Required Item</p>
                                                    <h4>${offerbox.qty}${offerbox.test_weight}</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Offer Price</p>
                                                    <h4>₦${offerbox.price}</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Oil content</p>
                                                    <h4>${offerbox.oil_content}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Foreign matter</p>
                                                    <h4>${offerbox.foreign_matter}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Infestation</p>
                                                    <h4>${offerbox.infestation}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Moisture</p>
                                                    <h4>${offerbox.moisture}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Weevil</p>
                                                    <h4>${offerbox.weevil}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Splits</p>
                                                    <h4>${offerbox.splits}%</h4>
                                                </div>
                                                <button class="d-none">View Full Specification</button>
                                            </div>
                                            <!---->
                                            <div class="message-item">
                                                <div class="accept_decline_checkbox">${accept_decline_checkbox}</div> 
                                                <div class="message-time">${timeInAmPm}</div>  
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }else{
                                themessageandType = `
                                    <div class="chat-content ${chatboxClass}">
                                        <div class="message-item">
                                            <div class="bubble">${row[x].message}</div>    
                                            <div class="message-time">${timeInAmPm}</div>   
                                            <div class="message-date d-none">${myDate}</div>  
                                        </div>
                                    </div>
                                `;
                            }

                            
                            chatGroupContent += `
                                ${themessageandType}
                            `;


                        }
                        
                        let refactoredChatGroupContent = JSON.stringify(chatGroupContent);
                        refactoredChatGroupContent = refactoredChatGroupContent.replace(undefined,'<hr/>');
                        refactoredChatGroupContent = JSON.parse(refactoredChatGroupContent);


                        // console.log(refactoredChatGroupContent, " chatGroupContent bbbbbbbbbbbbbbbbbbbb");
                        var date = new Date();
                        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
                        let themomentcode = moment(grouped_date, "YYYY-MM-DD").isSame(dateString, "YYYY-MM-DD");
                        let themoment;
                        if(themomentcode === true){
                            themoment = "Today";
                        }else if(moment(grouped_date, "YYYY-MM-DD").calendar().split(" ")[0].toLowerCase() == "yesterday"){
                            themoment = "Yesterday";
                        }else{
                            themoment = moment(grouped_date, "YYYY-MM-DD").fromNow();
                        }



                        let thegroupeddate = `
                            <div class="thegroupeddate text-center mt-4" style="text-transform:uppercase;"><span>${themoment} - ${grouped_date}</span></div>
                        `;

                        let groupDateANDthemesssageType = thegroupeddate+refactoredChatGroupContent;


                        rowContent += `
                            ${groupDateANDthemesssageType}
                        `;

                        
                        
                    }
                    $('#thechatside').html(rowContent);
                    // console.log(rowContent, " rowContent");
                    // console.log(thedata, "the data");
                  
                    setTimeout(()=>{
                        var ChatDiv = $('#thechatside');
                        var height = ChatDiv[0].scrollHeight;
                        ChatDiv.scrollTop(height);
                        console.log(height, "Chartbox Height");
                    },500)

                    // The Negotiation notification popup has been transferred up. It should show even if no conversations has been made
                    
                }else{
                    $('#thechatside').html("No conversation yet");
                }
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out \nCheck your internet connection");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus+"<br/>This session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            }
        }
    });
}



const populateUserandFarmOwnerNegotiationMessages2 =()=>{

    let singleproductID = localStorage.getItem('singleproductID');

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    $.ajax({
        url: `${liveMobileUrl}/crop/`+singleproductID+`/negotiation/getbyuserid/`+userid,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            setTimeout(()=>{
                EndPageLoader();
            },1500)
            
            // $('.loader').hide();
            // console.log(response, "The negotiation response");
            if(response.error == true){
                console.log(response.message);
                // responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedatafetched = response.data;
                // console.log(thedatafetched, "The negotiation message data");

                // Now the data coming from response is not arranged.
                // The Object.values method returns an array of object's values (which are your messages) 
                // and then you sort them by message id in ascending order using sort function.
                let thedata = Object.entries(thedatafetched)
                .map(([key, val]) => ({id: key, ...val}))
                .sort((a, b) => a.id - b.id);

                // console.log(thedata, "the data");

                let finalObj = {}
                thedata.forEach((theresult) => {

                    const date = theresult.created_at.split(" ")[0];
                    if (finalObj[date]) {
                        finalObj[date].push(theresult);
                    } else {
                        finalObj[date] = [theresult];
                    }
                })
                console.log(finalObj, "final Obj")

                let finalObjcount = Object.keys(finalObj).length;
                // console.log(finalObjcount);


                let rowContent = "";
                let index;

                if(finalObjcount > 0){
                    $('.chat-image').hide();
                    $('.thechatside').show();


                    for (let i = 0; i < finalObjcount; i++) {
                      console.log('Hello World', + i);
                        let grouped_date = Object.keys(finalObj)[i];
                        let therow = finalObj[Object.keys(finalObj)[i]];
                        console.log(therow.length);
                        
                        // The row is coming out as an array with many objects. Loop through the array
                    
                        let row = therow;
                        console.log(row, "The row rf");

                        let themessageandType;
                        let chatGroupContent;
                        for (let x = 0; x < row.length; x++) {
                            // index= x+1;

                            let negotiationpage_type = localStorage.getItem('negotiationpage_type');
                            let chatboxClass, accept_decline_checkbox;
                            if(usertype == "merchant"){
                                if(row[x].type == "merchant"){
                                    chatboxClass = `user`;
                                }else if(row[x].type == "admin"){
                                    chatboxClass = `admin`;
                                }else{
                                    chatboxClass = ``;
                                }

                                if(row[x].status == "accepted"){
                                    accept_decline_checkbox = `<span class="fw-bolder">Offer accepted <span style="color:#30BD6E;" onclick="gotoOrderSummary('${row[x].order.order_hash.toString()}')">See Order Summary</span></span>`;
                                }else if(row[x].status == "declined"){
                                    accept_decline_checkbox = `<span class="text-danger fw-bolder">Offer declined.</span>`;
                                }else if(negotiationpage_type=="cropwanted"){
                                    accept_decline_checkbox = `We will let you know when corporate accepts/declines offer.`;
                                }else if(negotiationpage_type=="offer"){
                                    accept_decline_checkbox = `
                                        <form>
                                            <div class="d-flex justify-content-between">
                                                <span class="text-success">Accept <input type="checkbox" onclick="acceptoffer(${row[x].id})" /> </span>
                                                <span class="text-danger">Decline <input type="checkbox" onclick="declineoffer(${row[x].id})" /> </span>
                                            </div>
                                        </form>
                                    `;
                                }

                            }else if(usertype == "corporate"){
                                if(row[x].type == "corporate"){
                                    chatboxClass = `user`;
                                }else if(row[x].type == "admin"){
                                    chatboxClass = `admin`;
                                }else{
                                    chatboxClass = ``;
                                }

                                if(row[x].status == "accepted"){
                                    accept_decline_checkbox = `Offer accepted. <span style="color:#30BD6E;" class="fw-bolder" onclick="gotoOrderSummary('${row[x].order.order_hash.toString()}')">Proceed to payment.</span>`;
                                }else if(row[x].status == "declined"){
                                    accept_decline_checkbox = `<span class="text-danger">Offer declined.</span>`;
                                }else if(negotiationpage_type=="cropwanted"){
                                    accept_decline_checkbox = `
                                        <form>
                                            <div class="d-flex justify-content-between">
                                                <span class="text-success">Accept <input type="checkbox" onclick="acceptoffer(${row[x].id})" /> </span>
                                                <span class="text-danger">Decline <input type="checkbox" onclick="declineoffer(${row[x].id})" /> </span>
                                            </div>
                                        </form>
                                    `;
                                }else if(negotiationpage_type=="offer"){
                                    accept_decline_checkbox = `We will let you know when merchant accepts/declines offer.`;
                                }
                            }

                            let time = row[x].created_at;
                            // console.log(time);
                            
                            let myTime = time.split(" ")[1];
                            let myDate = time.split(" ")[0];
                            var hour = parseInt(myTime.split(":")[0]) % 12;
                            // console.log(hour, "The hour");
                            var timeInAmPm = (hour == 0 ? "12": hour ) + ":" + myTime.split(":")[1] + " " + (parseInt(parseInt(myTime.split(":")[0]) / 12) < 1 ? "AM" : "PM");
                            // console.log(timeInAmPm, "timeInAmPm");

                            let themessagetype = row[x].messagetype;
                            if(usertype=="merchant"&&negotiationpage_type=="offer"){
                                $('.open_offer_form').hide();
                            }
                            if(themessagetype == "offer"){
                                // Hide Send offer button if an offer has been sent already
                                $('.open_offer_form').hide();
                                // Hide Send offer button if an offer has been sent already
                            }
                            // let themessageandType;
                            if(themessagetype == "text"){
                                themessageandType = `
                                    <div class="chat-content ${chatboxClass}">
                                        <div class="message-item">
                                            <div class="bubble">${row[x].message}</div>    
                                            <div class="message-time">${timeInAmPm}</div>   
                                        </div>
                                    </div>
                                `;
                            }else if(themessagetype == "offer"){
                                let offerbox = JSON.parse(row[x].message);
                                themessageandType = `
                                    <div class="offer-right mb-2 mt-1">
                                        <div class="offered">
                                            <!---->
                                            <div class="colored">
                                                <h3>Offer</h3>
                                                <hr />
                                                <div class="white-line"></div>
                                                <div class="each-item">
                                                    <p>Required Item</p>
                                                    <h4>${offerbox.qty}${offerbox.test_weight}</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Offer Price</p>
                                                    <h4>₦${offerbox.price}</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Oil content</p>
                                                    <h4>${offerbox.oil_content}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Foreign matter</p>
                                                    <h4>${offerbox.foreign_matter}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Infestation</p>
                                                    <h4>${offerbox.infestation}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Moisture</p>
                                                    <h4>${offerbox.moisture}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Weevil</p>
                                                    <h4>${offerbox.weevil}%</h4>
                                                </div>
                                                <div class="each-item">
                                                    <p>Splits</p>
                                                    <h4>${offerbox.splits}%</h4>
                                                </div>
                                                <button class="d-none">View Full Specification</button>
                                            </div>
                                            <!---->
                                            <div class="message-item">
                                                <div class="accept_decline_checkbox">${accept_decline_checkbox}</div> 
                                                <div class="message-time">${timeInAmPm}</div>  
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }else{
                                themessageandType = `
                                    <div class="chat-content ${chatboxClass}">
                                        <div class="message-item">
                                            <div class="bubble">${row[x].message}</div>    
                                            <div class="message-time">${timeInAmPm}</div>   
                                            <div class="message-date d-none">${myDate}</div>  
                                        </div>
                                    </div>
                                `;
                            }

                            
                            chatGroupContent += `
                                ${themessageandType}
                            `;


                        }
                        
                        let refactoredChatGroupContent = JSON.stringify(chatGroupContent);
                        refactoredChatGroupContent = refactoredChatGroupContent.replace(undefined,'<hr/>');
                        refactoredChatGroupContent = JSON.parse(refactoredChatGroupContent);


                        // console.log(refactoredChatGroupContent, " chatGroupContent bbbbbbbbbbbbbbbbbbbb");
                        var date = new Date();
                        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
                        let themomentcode = moment(grouped_date, "YYYY-MM-DD").isSame(dateString, "YYYY-MM-DD");
                        let themoment;
                        if(themomentcode === true){
                            themoment = "Today";
                        }else if(moment(grouped_date, "YYYY-MM-DD").calendar().split(" ")[0].toLowerCase() == "yesterday"){
                            themoment = "Yesterday";
                        }else{
                            themoment = moment(grouped_date, "YYYY-MM-DD").fromNow();
                        }



                        let thegroupeddate = `
                            <div class="thegroupeddate text-center mt-4" style="text-transform:uppercase;"><span>${themoment} - ${grouped_date}</span></div>
                        `;

                        let groupDateANDthemesssageType = thegroupeddate+refactoredChatGroupContent;


                        rowContent += `
                            ${groupDateANDthemesssageType}
                        `;

                        
                        
                    }
                    $('#thechatside').html(rowContent);
                    // console.log(rowContent, " rowContent");
                    // console.log(thedata, "the data");
                  
                    // setTimeout(()=>{
                    //     var ChatDiv = $('#thechatside');
                    //     var height = ChatDiv[0].scrollHeight;
                    //     ChatDiv.scrollTop(height);
                    //     console.log(height, "Chartbox Height");
                    // },500)

                    // The Negotiation notification popup has been transferred up. It should show even if no conversations has been made
                    
                }else{
                    $('#thechatside').html("No conversation yet");
                }
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out \nCheck your internet connection");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus+"<br/>This session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            }
        }
    });
}




/* ------------------------------ ACCEPT OFFER ------------------------------ */
function acceptoffer(negotiation_id){
    // alert("Accept offer "+negotiation_id);
    mcxDialog.confirm("I accept this offer with the price and specification", {
        sureBtnClick: function(){
          // callback
          //   alert("Ewo");
          startPageLoader();

            $.ajax({
                url: `${liveMobileUrl}/crop/negotiation/accept`,
                type: "POST",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('authToken')
                },
                "data": JSON.stringify({
                    "id": negotiation_id
                }),
                success: function(response) { 
                    EndPageLoader();
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        responsemodal("successicon.png", "Success", response.message);
                        // populateUserandFarmOwnerNegotiationMessages();
                        // setTimeout(()=>{
                        //     $('#offer-form').hide();
                        // },2000)      
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    if(textstatus==="timeout") {
                        basicmodal("", "Service timed out");
                    } else {
                        // alert(textstatus);
                        basicmodal("", textstatus);
                    }
                }
            });
        }

    });
}
/* ------------------------------ ACCEPT OFFER ------------------------------ */


/* ------------------------------ DECLINE OFFER ------------------------------ */
function declineoffer(negotiation_id){
    // alert("Decline offer "+negotiation_id);
    mcxDialog.confirm("I accept this offer with the price and specification", {
        sureBtnClick: function(){
          // callback
          //   alert("Ewo");
          startPageLoader();

            $.ajax({
                url: `${liveMobileUrl}/crop/negotiation/decline`,
                type: "POST",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('authToken')
                },
                "data": JSON.stringify({
                    "id": negotiation_id
                }),
                success: function(response) { 
                    EndPageLoader();
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        responsemodal("successicon.png", "Success", response.message);
                        // populateUserandFarmOwnerNegotiationMessages();
                        // setTimeout(()=>{
                        //     $('#offer-form').hide();
                        // },2000)      
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    if(textstatus==="timeout") {
                        basicmodal("", "Service timed out");
                    } else {
                        // alert(textstatus);
                        basicmodal("", textstatus);
                    }
                }
            });
        }

    });
}
/* ------------------------------ DECLINE OFFER ------------------------------ */





const sendmessage =()=>{
    $('.chat-image').hide();
    $('.thechatside').show();


    let singleproductID = localStorage.getItem('singleproductID');

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;


    let productOwnerDetails = localStorage.getItem('productOwnerDetails');
    productOwnerDetails = JSON.parse(productOwnerDetails);
    let productOwnerFirstName = productOwnerDetails.id;

    let negotiationtextmessage = document.getElementById('negotiationtextmessage');
    let messageValue = negotiationtextmessage.value;
    if(messageValue.trim()){
        console.log(productOwnerDetails);

        $.ajax({
            url: `${liveMobileUrl}/negotiation/add`,
            type: "POST",
            "timeout": 10000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            "data": JSON.stringify({
                "sender_id": parseInt(userid), 
                "receiver_id": parseInt(productOwnerFirstName), 
                "crop_id": parseInt(singleproductID), 
                "type": usertype, 
                "message": messageValue
            }),
            success: function(response) { 
                // EndPageLoader();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    console.log(response.message);
                    negotiationtextmessage.value = "";
                    // window.scrollTo(0, document.getElementById('message_content').scrollHeight);
                    // document.getElementById('thechatside').scrollTop =  document.getElementById('thechatside').scrollHeight
                    // responsemodal("successicon.png", "Success", response.message);
                    populateUserandFarmOwnerNegotiationMessages();
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                if(textstatus==="timeout") {
                    basicmodal("", "Service timed out, \nCheck your internet connection");
                } else {
                    // alert(textstatus);
                    basicmodal("", textstatus);
                }
            }
        });

    }
}

/* ------------------------------- NEGOTIATION ------------------------------ */








/* ---------------------------- SEND NEGOTIATION OFFER --------------------------- */
const negotiationPage =()=>{
    const sendNegotiationOffer = document.getElementById('offer-form');

    //Event Listeners
    sendNegotiationOffer.addEventListener('submit',function(e) {
        e.preventDefault();

        // alert("ef");

        let singleproductID = localStorage.getItem('singleproductID');

        let user = localStorage.getItem('zowaselUser');
        user = JSON.parse(user);
        let userid = user.user.id;
        let usertype = user.user.type;

        let productOwnerDetails = localStorage.getItem('productOwnerDetails');
        productOwnerDetails = JSON.parse(productOwnerDetails);
        let productOwnerID = productOwnerDetails.id;

        // Get the inputs values of the offer form
        let test_weight = document.getElementById('testWeight');
        let qty = document.getElementById('productQuantity');
        let price = document.getElementById('productAmount');
        let oil_content = document.getElementById('productOilContent');
        let foreign_matter = document.getElementById('productForeignMatter');
        let infestation = document.getElementById('productInfestation');
        let moisture = document.getElementById('productMoisture');
        let weevil = document.getElementById('productWeevil');
        let hardness = document.getElementById('productHardness');
        let splits = document.getElementById('productSplit');
        let broken_grains = document.getElementById('productBrokenGrains');
        let rotten_shriveled = document.getElementById('productRottenShriveled');
        let damagedkernel = document.getElementById('productDamagedKernel');
        // Get the inputs values of the offer form


        mcxDialog.confirm("I accept to place an offer with the price and specification", {
            sureBtnClick: function(){
              // callback
              //   alert("Ewo");
              startPageLoader();

                $.ajax({
                    url: `${liveMobileUrl}/crop/negotiation/sendoffer`,
                    type: "POST",
                    "timeout": 25000,
                    "headers": {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem('authToken')
                    },
                    "data": JSON.stringify({
                        "sender_id": userid, 
                        "receiver_id": productOwnerID, 
                        "crop_id": singleproductID, 
                        "type": usertype, 

                            "qty": qty.value,
                            "price": price.value,
                            "color": "",
                            "moisture": moisture.value,
                            "foreign_matter": foreign_matter.value,
                            "broken_grains": broken_grains.value,
                            "weevil": weevil.value,
                            "dk": "",
                            "rotten_shriveled": rotten_shriveled.value,
                            "test_weight": test_weight.value,
                            "hectoliter": "",
                            "hardness": hardness.value,
                            "splits": splits.value,
                            "oil_content": oil_content.value,
                            "infestation":  infestation.value,
                            "grain_size": "",
                            "total_defects": "",
                            "dockage": "", 
                            "ash_content": "", 
                            "acid_ash": "",
                            "volatile": "",
                            "mold": "", 
                            "drying_process": "",
                            "dead_insect": "", 
                            "mammalian": "",
                            "infested_by_weight": "",
                            "curcumin_content": "",
                            "extraneous": "",
                            "unit": ""

                    }),
                    success: function(response) { 
                        EndPageLoader();
                        if(response.error == true){
                            // alert(response.message);
                            responsemodal("erroricon.png", "Error", response.message);
                        }else{
                            // alert(response.message);
                            responsemodal("successicon.png", "Success", response.message);
                            populateUserandFarmOwnerNegotiationMessages();
                            setTimeout(()=>{
                                $('#offer-form').hide();
                            },2000)      
                        }
                    },
                    error: function(xmlhttprequest, textstatus, message) {
                        EndPageLoader();
                        if(textstatus==="timeout") {
                            basicmodal("", "Service timed out");
                        } else {
                            // alert(textstatus);
                            basicmodal("", textstatus);
                        }
                    }
                });
            }

        });
 

    });
}
/* ---------------------------- SEND NEGOTIATION OFFER --------------------------- */








/* ------------ GO TO ORDER SUMMARY FROM CLICK PROCEED TO PAYMENT ----------- */
function gotoOrderSummary(order_id){
    // alert(order_id);
    localStorage.setItem('orderHash', order_id);
    location.assign('order/ordersummary.html');
}
/* ------------ GO TO ORDER SUMMARY FROM CLICK PROCEED TO PAYMENT ----------- */










/************************************************************************************
 * /* -------------------------------- ADD CROPS ------------------------------- 
 ************************************************************************************/


/* ------------------------- FETCH PRODUCT COLORS ------------------------- */
function fetchCropColors(){
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/color/getall`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            // "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            $('.loader').addClass('loader-hidden');
            // console.log(response, "The get all category response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
                $('.loader').addClass('loader-hidden');
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                // console.log(thedata, "category data");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                    //   console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        rowContent += `
                            <option value="${row.name}">${row.name}</option>
                        `;   
                    }
                    $('#color').append(rowContent);        
          
                }else{
                    // $('#wantedcrops').html("<tr><td colspan='9' class='text-center'><h3 class='pt-2'>No Ticket registered yet</h3></td></tr>");
                }
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }   
    });
}
/* ------------------------- FETCH PRODUCT COLORS ------------------------- */




/* ------------------------- FETCH PRODUCT CATEGORY ------------------------- */
function fetchCropCategories(){
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/category/crop/getall`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            // "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            $('.loader').addClass('loader-hidden');
            // console.log(response, "The get all category response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
                $('.loader').addClass('loader-hidden');
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                // console.log(thedata, "category data");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                    //   console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        rowContent += `
                            <option value="${row.id}">${row.name}</option>
                        `;   
                    }
                    $('#category').append(rowContent);        
          
                }else{
                    // $('#wantedcrops').html("<tr><td colspan='9' class='text-center'><h3 class='pt-2'>No Ticket registered yet</h3></td></tr>");
                }
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }   
    });
}
/* ------------------------- FETCH PRODUCT CATEGORY ------------------------- */



/* ------------------------- FETCH CROP SUBCATEGORY ------------------------- */
const addCropPage =()=>{

    // ponetohundredpercent
    $(document).ready(function(){
        let emptyoption = `<option value=""></option>`;
        let rowContent = "";
        for(let i=1; i<=100; i++){
            rowContent += `
                <option value="${i}">${i}%</option>
            `;   
        }
        $('.ponetohundredpercent').html(emptyoption + rowContent);
    })



    $('#category').on('change', ()=>{
        var categoryid = $('#category').val();
        // alert(categoryid);

        startPageLoader();
        if(categoryid){
            $.ajax({
                url: `${liveMobileUrl}/subcategory/getbycategory/`+categoryid,
                type: "GET",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    // "authorization": localStorage.getItem('authToken')
                },
                success: function(response) { 
                    // alert("efe");
                    EndPageLoader();
                    // console.log(response, "The get all category response");
                    let rowContent = "";
                    if(response.error == true){
                        // alert(response.message);
                        basicmodal("", response.message);
                    }else{
                        // alert(response.message);
                        let thedata = response.data;
                        let index;
                        // console.log(thedata, "category data");
                        if(thedata.length > 0){
                            for (let i = 0; i < thedata.length; i++) {
                            //   console.log('Hello World', + i);
                                let row = thedata[i];
                                index= i+1;
        
                                rowContent += `
                                    <option value="${row.id}">${row.name}</option>
                                `;   
                            }
                            $('#subcategory').html(rowContent);        
                
                        }else{
                            $('#subcategory').html('<option value="">--Select Subcategory</option>');
                        }
                            
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    $('.loader').addClass('loader-hidden');
                    if(textstatus==="timeout") {
                        basicmodal("", "Service timed out");
                    } else {
                        // alert(textstatus);
                        basicmodal("", textstatus);
                    }
                }
            });
        }else{
            EndPageLoader
        }

    })

}

const addCropAuctionPage =()=>{

    // ponetohundredpercent
    $(document).ready(function(){
        let emptyoption = `<option value=""></option>`;
        let rowContent = "";
        for(let i=1; i<=100; i++){
            rowContent += `
                <option value="${i}">${i}%</option>
            `;   
        }
        $('.ponetohundredpercent').html(emptyoption + rowContent);
    })



    $('#category').on('change', ()=>{
        var categoryid = $('#category').val();
        // alert(categoryid);

        startPageLoader();
        if(categoryid){
            $.ajax({
                url: `${liveMobileUrl}/subcategory/getbycategory/`+categoryid,
                type: "GET",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    // "authorization": localStorage.getItem('authToken')
                },
                success: function(response) { 
                    // alert("efe");
                    EndPageLoader();
                    // console.log(response, "The get all category response");
                    let rowContent = "";
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        let thedata = response.data;
                        let index;
                        // console.log(thedata, "category data");
                        if(thedata.length > 0){
                            for (let i = 0; i < thedata.length; i++) {
                            //   console.log('Hello World', + i);
                                let row = thedata[i];
                                index= i+1;
        
                                rowContent += `
                                    <option value="${row.id}">${row.name}</option>
                                `;   
                            }
                            $('#subcategory').html(rowContent);        
                
                        }else{
                            $('#subcategory').html('<option value="">--Select Subcategory</option>');
                        }
                            
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    $('.loader').addClass('loader-hidden');
                    if(textstatus==="timeout") {
                        basicmodal("", "Service timed out");
                    } else {
                        // alert(textstatus);
                        basicmodal("", textstatus);
                    }
                }
            });
        }else{
            EndPageLoader();
        }

    })

}
/* ------------------------- FETCH CROP SUBCATEGORY ------------------------- */




// Add input files to array
var cropfilesToUpload = []

//On Change loop through all file and push to array[]
$('#cropimages').on('change', function(e) {
    // alert(this.files.length);
    for (var i = 0; i < this.files.length; i++) {
        cropfilesToUpload.push(this.files[i]);
    }
    // console.log(cropfilesToUpload);
});


$('#formpage3').submit(function(e){
    e.preventDefault();

    console.log(cropfilesToUpload," console.log(cropfilesToUpload);");

    const activePage = window.location.pathname;
    // alert(activePage);

    // Grab all the ids
    // let croptitle = document.getElementById('croptitle');
    let category = document.getElementById('category');
    let subcategory = document.getElementById('subcategory');
    let color = document.getElementById('color');
    let warehouse_address_value = document.getElementById('warehouse_address').value;
    
    let application, manufacture_name, packaging;
    if(activePage=="/dashboard/addcropauction.html"||activePage=="/dashboard/addcrop.html"){
        // application = document.getElementById('application');
        packaging = document.getElementById('packaging');
        manufacture_name = document.getElementById('manufacture_name');
    }else{
        
    }

    let deliveryWindowValue;
    if(activePage=="/dashboard/addcropwanted.html"){
        let windowFrom = document.getElementById('windowFrom').value;
        let windowTo = document.getElementById('windowTo').value;

        // format from M/D/YYYY to YYYYMMDD
        // let windowFromValue = windowFrom.replaceAll("-", "/");
        // let windowToValue = windowTo.replaceAll("-", "/");
        let windowFromValue = windowFrom.replaceAll("/", "-");
        let windowToValue = windowTo.replaceAll("/", "-");

        // let thedeliveryWindowValue = windowFromValue+"-"+windowToValue;
        // deliveryWindowValue = JSON.stringify(thedeliveryWindowValue);
        deliveryWindowValue = {
            "from": windowFromValue,"to":windowToValue
        }
    }else{
        deliveryWindowValue = null;
    }

    // console.log("deliveryWindowValue ",JSON.stringify(deliveryWindowValue));
    deliveryWindowValue = JSON.stringify(deliveryWindowValue);

    let start_date, end_date, minimum_bid;
    if(activePage=="/dashboard/addcropauction.html"){
        start_date = document.getElementById('start_date');
        end_date = document.getElementById('end_date');
        minimum_bid = document.getElementById('minimum_bid');
    }
    
    let moisturecontent = document.getElementById('moisturecontent');
    let foreignmatter = document.getElementById('foreignmatter');
    let testweight = document.getElementById('testweight');
    let negotiable = document.getElementById('negotiable');
    let editor = document.getElementById('editor');
    let currency = document.getElementById('currency');
    let quantity = document.getElementById('quantity');
    let amount = document.getElementById('amount');
    let countryList = document.getElementById('countryList');
    let stateList = document.getElementById('stateList');
    let zipcode = document.getElementById('zipcode');
    let videourl = document.getElementById('videourl');
    let deliveryaddress = document.getElementById('deliveryaddress');
    let brokengrains = document.getElementById('brokengrains');
    let weevil = document.getElementById('weevil');
    let hardness = document.getElementById('hardness');
    let oilcontent = document.getElementById('oilcontent');
    let grainsize = document.getElementById('grainsize');
    let ashcontent = document.getElementById('ashcontent');
    let volatile = document.getElementById('volatile');
    let dryingprocess = document.getElementById('dryingprocess');
    let curcumincontent = document.getElementById('curcumincontent');
    let total_defects = document.getElementById('total_defects');
    let dockage = document.getElementById('dockage');
    let moisture = document.getElementById('moisture');
    let rotten_shriveled = document.getElementById('rotten_shriveled');
    let damagedkernel = document.getElementById('damagedkernel');
    let splits = document.getElementById('splits');
    let infestation = document.getElementById('infestation');
    let hectolter_teat_weight = document.getElementById('hectolter_teat_weight');
    let acid_insoluable_ash = document.getElementById('acid_insoluable_ash');
    let moldbyweight = document.getElementById('moldbyweight');
    let wholedeadinsects = document.getElementById('wholedeadinsects');
    let insect_defiled_infested = document.getElementById('insect_defiled_infested');
    let extaneous = document.getElementById('extaneous');
    let mammalian = document.getElementById('mammalian');

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);

    // alert(editor.value);
    console.log(editor.value);

    //Store form Data
    var formData = new FormData();
    

    // formData.append("user_id", user.user.id);
    // formData.append("title", croptitle.value);
    formData.append("category_id", category.value);
    formData.append("subcategory_id", subcategory.value);
    formData.append("active", "1");
    formData.append("description", editor.value);
    formData.append("currency", currency.value);
    formData.append("is_negotiable", negotiable.value);
    formData.append("video", videourl.value);
    
    if(activePage=="/dashboard/addcropauction.html"||activePage=="/dashboard/addcrop.html"){
        // formData.append("application", application.value);
        formData.append("manufacture_name", manufacture_name.value);
        formData.append("packaging", packaging.value);
        formData.append("delivery_window", null);
    }
    if(activePage=="/dashboard/addcropauction.html"){
        formData.append("start_date", start_date.value);
        formData.append("end_date", end_date.value);
        formData.append("minimum_bid", minimum_bid.value);
    }
    if(activePage=="/dashboard/addcropwanted.html"){
        formData.append("address", deliveryaddress.value);
    }
    if(activePage=="/dashboard/addcropwanted.html"){
        formData.append("delivery_window", deliveryWindowValue);
    }
    if(activePage=="/dashboard/addcropauction.html"){
        formData.append("delivery_window", "NULL");
    }
    
    // formData.append("manufacture_date", "2022/12/02");
    // formData.append("expiration_date", "2023/04/12");
    formData.append("model_type", "crop");
    formData.append("qty", quantity.value);
    formData.append("price", amount.value);
    formData.append("color", color.value);
    formData.append("moisture", moisture.value);
    formData.append("foreign_matter", foreignmatter.value);
    formData.append("broken_grains", brokengrains.value);
    formData.append("weevil", weevil.value);
    formData.append("dk", damagedkernel.value);
    formData.append("rotten_shriveled", rotten_shriveled.value);
    formData.append("test_weight", testweight.value);
    formData.append("hectoliter", hectolter_teat_weight.value);
    formData.append("hardness", hardness.value);
    formData.append("splits", splits.value);
    formData.append("oil_content", oilcontent.value);
    formData.append("infestation", infestation.value);
    formData.append("grain_size", grainsize.value);
    formData.append("total_defects", total_defects.value);
    formData.append("dockage", dockage.value);
    formData.append("ash_content", ashcontent.value);
    formData.append("acid_ash", acid_insoluable_ash.value);
    formData.append("volatile", volatile.value);
    formData.append("mold", moldbyweight.value);
    formData.append("drying_process", dryingprocess.value);
    formData.append("dead_insect", wholedeadinsects.value);
    formData.append("mammalian", mammalian.value);
    formData.append("infested_by_weight", insect_defiled_infested.value);
    formData.append("curcumin_content", curcumincontent.value);
    formData.append("extraneous", extaneous.value);
    formData.append("unit", testweight.value);
    formData.append("country", countryList.value);
    formData.append("state", stateList.value);
    formData.append("zip", zipcode.value);
    // formData.append("address", "Zuba");
    formData.append("delivery_method", "Delivery");
    // formData.append("delivery_date", "2023/02/12");
    // formData.append("delivery_window", windowFrom+" - "+windowTo);
    formData.append("warehouse_address", warehouse_address_value);
    formData.append("moisture_content", moisturecontent.value);

    // formData.append("file", fileInput.files[0], "cornproduct_resize.jpg");
    // formData.append("file2", fileInput.files[0], "maizethumbnail_resized.jpg");


    let imgArr = [];
    //Loop through array of file and append formData Data
    for (var i = 0; i < cropfilesToUpload.length; i++) {
        var file = cropfilesToUpload[i];
        var filename = cropfilesToUpload[i].name;
        // formData.append("image"+i, file, filename);
        imgArr.push(file);
    }

    
    let croptype;
    if(activePage=="/dashboard/addcropauction.html"){
        croptype = "auction";
    }else if(activePage=="/dashboard/addcrop.html"){
        croptype = "sale";
    }else if(activePage=="/dashboard/addcropwanted.html"){
        croptype = "wanted";
    }


    startPageLoader();
    // <!-- ------------------------ PING IMAGE UPLOAD URL ------------------------ -->
    let img1,img2,img3,img4,img5;

    console.log(imgArr, "The Image Img Array");
    var fd = new FormData();  
    // fd.append( 'file', input.files[0] );
    fd.append("image", imgArr[0]);
    fetch('https://filesapi.growsel.com/upload.php', {method: 'POST',body: fd}).then(response => response.json())
    .then(data => {
        // console.log("Chima", data);
        if(data.error == false){
            img1 = data.data.imageLink;

            fd = new FormData();
            fd.append("image", imgArr[1]);
            fetch('https://filesapi.growsel.com/upload.php', {method: 'POST',body: fd}).then(response => response.json())
            .then(data => {
                // console.log("Chima", data);
                if(data.error == false){
                    img2 = data.data.imageLink;

                    fd = new FormData();
                    fd.append("image", imgArr[2]);
                    fetch('https://filesapi.growsel.com/upload.php', {method: 'POST',body: fd}).then(response => response.json())
                    .then(data => {
                        // console.log("Chima", data);
                        if(data.error == false){
                            img3= data.data.imageLink;

                            fd = new FormData();
                            fd.append("image", imgArr[3]);
                            fetch('https://filesapi.growsel.com/upload.php', {method: 'POST',body: fd}).then(response => response.json())
                            .then(data => {
                                // console.log("Chima", data);
                                if(data.error == false){
                                    img4 = data.data.imageLink;

                                    fd = new FormData();
                                    fd.append("image", imgArr[4]);
                                    fetch('https://filesapi.growsel.com/upload.php', {method: 'POST',body: fd}).then(response => response.json())
                                    .then(data => {
                                        // console.log("Chima", data);
                                        if(data.error == false){
                                            img5 = data.data.imageLink;
                                            
                                            //Store form Data
                                            
                                            /* ------------------------------ // FORM DATA ------------------------------ */
                                            //Store form Data
                                            formData.append("image1", img1);
                                            formData.append("image2", img2);
                                            formData.append("image3", img3);
                                            formData.append("image4", img4);
                                            formData.append("image5", img5);

                                            console.log(formData, "The final formData");

                                            var settings = {
                                                "url": `${liveMobileUrl}/crop/${croptype}/add`,
                                                "method": "POST",
                                                "timeout": 0,
                                                "headers": {
                                                    // "Content-Type": "application/json",
                                                    "authorization": localStorage.getItem('authToken')
                                                },
                                                "processData": false,
                                                "mimeType": "multipart/form-data",
                                                "contentType": false,
                                                "data": formData
                                            };
                                        
                                            $.ajax(settings).done(function (data) {
                                                // console.log(data);
                                                let response = JSON.parse(data);
                                                EndPageLoader();
                                                if(response.error == true){
                                                    // alert(response.message);
                                                    // responsemodal("erroricon.png", "Error", response.message);
                                                    // responsefullmodal(icon, title, body, page)
                                                    responsefullmodal("erroricon.png", response.message, "", "");
                                                }else{
                                                    // responsemodal("successicon.png", "Success", response.message);
                                                    // setTimeout(()=>{
                                                        // $("#addInputForm")[0].reset();
                                                        $('.dialogbox').addClass('d-none');
                                                        $('.dialogbox').removeClass('d-block');
                                                        const activePage = window.location.pathname;
                                                        // alert(activePage);
                                                        let croptype, goto;
                                                        if(activePage=="/dashboard/addcropauction.html"){
                                                            croptype = "auction";
                                                            goto = '/dashboard/viewusercropsforauction.html';
                                                        }else if(activePage=="/dashboard/addcrop.html"){
                                                            croptype = "sale";
                                                            goto = 'viewusercropsforsale.html';
                                                        }else if(activePage=="/dashboard/addcropwanted.html"){
                                                            croptype = "wanted";
                                                            goto = '/dashboard/cropswanted.html';
                                                        }
                                                        responsefullmodal("successicon2.png", "Crop Added", "", goto);
                                                        // location.assign('viewusercropsforsale.html');
                                                    // },2000)
                                                    
                                                }
                                            });
                                            /* ------------------------------ // FORM DATA ------------------------------ */
                                        
                                        }
                                    })
                                    // End of 5th image
                                }
                            })
                            // End of 4th image
                        }
                    })
                    // End of 3rd image
                }
            })
            // End of 2nd image
        }
    })
    // End of 1st image
                


                    
                    
                    



   




})


/************************************************************************************
 * /* -------------------------------- ADD CROPS ------------------------------- 
 ************************************************************************************/













/************************************************************************************
 * /* -------------------------------- ADD INPUTS ------------------------------- 
 ************************************************************************************/


/* ------------------------- FETCH INPUT CATEGORY ------------------------- */
function fetchInputCategories(){
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/category/input/getall`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            // "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            $('.loader').addClass('loader-hidden');
            // console.log(response, "The get all category response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
                $('.loader').addClass('loader-hidden');
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                // console.log(thedata, "category data");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                    //   console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        rowContent += `
                            <option value="${row.id}">${row.name}</option>
                        `;   
                    }
                    $('#category').append(rowContent);        
          
                }else{
                    // $('#wantedcrops').html("<tr><td colspan='9' class='text-center'><h3 class='pt-2'>No Ticket registered yet</h3></td></tr>");
                }
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
            }
        }
    });
}
/* ------------------------- FETCH PRODUCT CATEGORY ------------------------- */



/* ------------------------- FETCH INPUT SUBCATEGORY ------------------------- */
const addInputPage =()=>{

    $('#category').on('change', ()=>{
        var categoryid = $('#category').val();
        // alert(categoryid);

        startPageLoader();
        if(categoryid){
            $.ajax({
                url: `${liveMobileUrl}/subcategory/getbycategory/`+categoryid,
                type: "GET",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                    // "authorization": localStorage.getItem('authToken')
                },
                success: function(response) { 
                    // alert("efe");
                    EndPageLoader();
                    // console.log(response, "The get all category response");
                    let rowContent = "";
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        let thedata = response.data;
                        let index;
                        // console.log(thedata, "category data");
                        if(thedata.length > 0){
                            for (let i = 0; i < thedata.length; i++) {
                            //   console.log('Hello World', + i);
                                let row = thedata[i];
                                index= i+1;
        
                                rowContent += `
                                    <option value="${row.id}">${row.name}</option>
                                `;   
                            }
                            $('#subcategory').html(rowContent);        
                
                        }else{
                            $('#subcategory').html('<option value="">--Select Subcategory</option>');
                        }
                            
                    }
                },
                error: function(xmlhttprequest, textstatus, message) {
                    EndPageLoader();
                    $('.loader').addClass('loader-hidden');
                    if(textstatus==="timeout") {
                        basicmodal("", "Service timed out");
                    } else {
                        // alert(textstatus);
                        basicmodal("", textstatus);
                    }
                }
            });
        }else{
            EndPageLoader
        }

    })

}
/* ------------------------- FETCH INPUT SUBCATEGORY ------------------------- */

/**********************************
 * OTHER CODE IS IN ADDINPUT.HTML *
 **********************************/

/************************************************************************************
 * /* -------------------------------- ADD CROPS ------------------------------- 
 ************************************************************************************/









/* ------------------------------- INPUT PAGE ------------------------------- */
function fetchInputs(){
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/input`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data.reverse();
                let rowContent = "";
                let carouselrowContent = "";
                let index;
                console.log(thedata, "erfrefre");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        let theprice;
                        if(row.price){ theprice = row.price; }else{ theprice = ""; }

                        let activeProductClass;
                        if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }

                        rowContent += `
                        <li class="cardholder p-3 fontFamily1 lazy">
                            <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                            <div class="d-flex justify-content-between">
                                <div class="item-inner">
                                    <div class="item-title-row mb-0">
                                        <h6 class="item-title zowasel-darkblue-color f-18"><a>${truncate(row.subcategory.name,20)}</a></h6>
                                        <div class="item-subtitle zowasel-color fw-bold f-18">${truncate(row.category.name,20) }</div>
                                    </div>
                                    <div class="item-footer">
                                        <h6 class="me-3 mb-0"><i class="fa fa-user f-13 me-1"></i> ${row.user.first_name}</h6>
                                        <h6 class="me-3 mb-0 text-truncate">${truncate(row.description,20)}</h6>
                                    </div>
                                </div>
                                <div class="item-inner">
                                    <a href="javascript:void(0);" class="item-bookmark icon-2">
                                        <h6 class="mb-0 zowasel-color f-18">₦${truncate(toCommas(theprice), 10)} / ${truncate(row.packaging,10)}</h6>
                                    </a>
                                    <div class="d-flex mt-3">
                                        <div class="cropstatus cropActive ${activeProductClass}"></div>
                                    </div>
                                    <button class="btn zowasel-darkblue-bg text-white w-100 py-2 mt-2" onclick="goToInputDetails1(${row.id})">
                                        View
                                    </button>
                                </div>
                            </div>
                        </li>
                        `;   
                    }

                    // for (let i = 0; i < 5; i++) {
                    let looptill;
                    if(thedata.length>3){looptill=3}else{looptill=thedata.length}
                    for (let i = 0; i < looptill; i++) {
                        // console.log('Hello World', + i);
                        let row = thedata[i];
                        console.log("ggg",row);
                        index= i+1;

                        let therow = JSON.stringify(row);

                        let theprice;
                        if(row.price){ theprice = row.price; }else{ theprice = ""; }

                        carouselrowContent += `
                        <div class="singleproduct-crousel-holder text-center p-2 py-3" onclick="goToInputDetails1(${row.id})">
                            <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                            <a href="#">
                                <div class="fontFamily2 f-15 fw-600 lh-18 zowasel-darkblue-color">${truncate(row.subcategory.name,10)}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-color mt-2">${truncate(row.category.name,20) }</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-gray-color mt-2">${truncate(row.description,6)}</div>
                                <div class="fontFamily1 f-16 fw-700 lh-24 zowasel-color mt-2">₦${truncate(toCommas(theprice), 10)} / ${truncate(row.packaging,10)}</div>
                            </a>
                        </div>
                        `; 
                    }

                    let emptycell = `
                    <div class="text-center p-2 py-3"">
                        <!--<a href="#">Click "More" to see others</a>-->
                    </div>
                    `;

                    $('#inputs').html(rowContent);
                    $('#p_carouselinputsforsale').html(carouselrowContent + emptycell);

                }else{
                    $('#inputs').html("No Input yet");
                    $('#p_carouselinputsforsale').html("No Input yet");
                }

                lazyLoading();
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }    
    });
}



// MERCHANT SIDE
function fetchCorporateAddedInputs(){

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/input/getallbyuserid/`+userid,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                console.log(thedata, "erfrefre");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        let activeProductClass, negotiationProductClass;
                        if(usertype == "corporate"){
                            if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        }else{
                            activeProductClass = "d-none";
                        }

                        rowContent += `
                        <li class="cardholder p-3 fontFamily1 lazy">
                        <div class="d-none" id="rowdetails2_${row.id}">${therow}</div>
                        <div class="d-flex justify-content-between">
                            <div class="item-inner">
                                <div class="item-title-row mb-0">
                                    <h6 class="item-title zowasel-darkblue-color f-18"><a>${truncate(row.subcategory.name,20)}</a></h6>
                                    <div class="item-subtitle zowasel-color fw-bold f-18">${truncate(row.category.name,20) }</div>
                                </div>
                                <div class="item-footer">
                                    <div class="d-flex align-items-center">
                                        <h6 class="me-3 mb-0 text-truncate">${truncate(row.description,20)}</h6>
                                    </div>    
                                </div>
                            </div>
                            <div class="item-inner"> 
                                <a href="javascript:void(0);" class="item-bookmark icon-2">
                                    <h6 class="mb-0 zowasel-color f-18">₦${truncate(toCommas(row.price), 10)} / ${truncate(row.packaging,10)}</h6>
                                </a> 
                                <div class="d-flex mt-3">
                                    <span class="cropstatus cropActive CropActive2hide_show ${activeProductClass}"></span>
                                </div>
                                <button class="btn zowasel-darkblue-bg text-white w-100 py-2 mt-2" onclick="goToInputDetails2(${row.id})">
                                    View
                                </button>
                            </div>
                        </div>
                    </li>
                        `;   
                    }
                    $('#inputs').html(rowContent);
        
        
          
                }else{
                    $('#inputs').html("No Input yet");
                }
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout" || textstatus=="error") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}
// MERCHANT SIDE







function goToInputDetails1(n){
    // alert(n);
    location.assign('inputdetail.html');
    let singleInputDetails = $('#rowdetails'+n).text();
    // alert(singleInputDetails);
    localStorage.setItem('singleInputDetails', singleInputDetails);
    localStorage.setItem('last_input_crop_page',"inputs.html");
}

function goToInputDetails2(n){
    location.assign('inputdetail.html');
    let singleInputDetails = $('#rowdetails2_'+n).text();
    // alert(singleInputDetails);
    localStorage.setItem('singleInputDetails', singleInputDetails);
    localStorage.setItem('last_input_crop_page',"viewuseraddedinput.html");
}


function populateSingleInputDetails(){
    let singleInputDetails = localStorage.getItem('singleInputDetails');
    let input = JSON.parse(singleInputDetails);
    console.log(input);

    $('.testWeight').html(input.packaging);
    $('.productQuantity').html(input.stock);

    /* -------------------------------- CAROUSEL -------------------------------- */
    let imagesLink = input.images;
    console.log("ImagesLink", imagesLink);
    if(imagesLink){
        if(imagesLink.includes('/data/products')){
            
        }else{
            var parsedImagesLink = JSON.parse(imagesLink);
            console.log("parsedImagesLink",parsedImagesLink.length);

            let carousel="";
            let carouselcontents;
            if(parsedImagesLink.length < 1){
                $(".swiper-btn-center-lr").hide();
            }else{
                for(let i=0; i<parsedImagesLink.length; i++){
                    carousel +=`
                    <div class="accordion_li">
                        <a href="#">
                            <div class="bg-image">
                            <img src="${parsedImagesLink[i]}" class="accordion_img" alt="img">
                            </div>
                        </a>
                    </div>
                    `;
                }
                let swiperBtn = `
                    <div class="swiper-btn">
                        <div class="swiper-pagination style-2 flex-1"></div>
                    </div>
                `;

            carouselcontents = `
                    ${carousel}
                `;
                
                

                // setTimeout(()=>{
                    $('.owl-carousel-singleproduct-page').html(carouselcontents);
                    // $('.swiper-container').append(swiperBtn);
                // },500)
            }
        }
    }
    /* -------------------------------- CAROUSEL -------------------------------- */

    let previouspage = localStorage.getItem('last_input_crop_page');
    if(previouspage == "viewusercropsforsale.html"){
        $('.productName').html(input.category.name);
        $('.productAmount').html(input.specification.price);
        $('.productDescription').html(input.description);
        $('.usageinstruction').html(input.usage_instruction);
        $('.cropfocus').html(input.crop_focus);
        $('.stock').html(input.stock);
    }else if(!previouspage || previouspage == "viewuseraddedinput.html"){
        $('.productName').html(input.category.name);
        $('.productAmount').html(input.price);
        $('.productDescription').html(input.description);
        $('.usageinstruction').html(input.usage_instruction);
        $('.cropfocus').html(input.crop_focus);
        $('.stock').html(input.stock);
    }else if(previouspage == "inputs.html"){
        $('.productName').html(input.subcategory.name);
        $('.productAmount').html(input.price);
        $('.productDescription').html(input.description);
        $('.usageinstruction').html(input.usage_instruction);
        $('.cropfocus').html(input.crop_focus);
        $('.stock').html(input.stock);
        $('.productOwnerFarmName').html(input.user.first_name+" "+input.user.last_name);
        let isverified;
        // if(thedata.user.is_verified === 0){
        //     isverified = `Unverified &nbsp;<img src="../logos/unavailable.png" width="22px" alt="">`;
        // }else{
            isverified = `Verified &nbsp;<img src="../assets/icons/check.png" width="22px" alt="">`;
        // }
        $('.isVerified').html(isverified);
        $('.product_type').html(input.product_type);
        $('.manufacture_country').html(input.manufacture_country);
        $('.manufacture_name').html(capitalizeFirstLetter(input.manufacture_name));
        $('.manufacture_date').html(input.manufacture_date);
        $('.expiry_date').html(input.expiry_date);
        $('.kilograms').html(input.kilograms);
        $('.packaging').html(input.packaging);
    }

    
}


function addtoCart(){

    let singleInputDetails = localStorage.getItem('singleInputDetails');
    let input = JSON.parse(singleInputDetails);

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let inputquantity = document.getElementById('inputquantity');
    if(inputquantity.value < 1){
        basicmodal("", "Please enter a valid quantity");
    }else if(parseInt(inputquantity.value) > parseInt(input.stock)){
        // alert(inputquantity.value,"re",input.stock);
        responsemodal("erroricon.png", "Error", "Quantity requested is out of stock");
    }else{

        startPageLoader();
        $.ajax({
            url: `${liveMobileUrl}/input/cart/add`,
            type: "POST",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            "data": JSON.stringify({
                "user_id": userid,
                "input_id": input.id,
                "quantity": inputquantity.value,
                "price": input.price
            }),
            success: function(response) { 
                EndPageLoader();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    responsemodal("successicon.png", "Success", response.message);
                    setTimeout(()=>{
                        location.assign('cart.html');
                    },3000)
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                if(textstatus==="timeout") {
                    basicmodal("", "Service timed out, \nCheck your internet connection");
                } else {
                    // alert(textstatus);
                    basicmodal("", textstatus);
                }
            }
        });

    }


    // location.assign('cart.html');
}
/* ------------------------------- INPUT PAGE ------------------------------- */








/* -------------------------------- CART PAGE ------------------------------- */
function fetchUserInputCart(){

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/input/cart/`+userid,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            console.log(response);
            EndPageLoader();
            // $('.loader').hide();
            let total_items_inCart = 0;
            let total_price_count = 0;
            if(response.error == true){
                // alert(response.message);
                // responsemodal("erroricon.png", "Error", response.message);
                console.log("Error", response.message);
                $('#pUserInputCart').html('');
                // total_items_inCart = response.data.length;
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                console.log(thedata, "Fetch User Input Cart");
                if(thedata.length > 0){
                    $(".stepper").TouchSpin();
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        total_price_count = parseInt(total_price_count) + eval(parseInt(row.price)*row.quantity);
                        total_items_inCart = parseInt(total_items_inCart) + parseInt(row.quantity);

                        let images = row.input.images;
                        images = JSON.parse(images);
                        // console.log("images",images);
                        let theimage;
                        if(images.length<1 || images[0].includes('public/')){
                            theimage = ``;
                        }else{
                            theimage = `<img src="${images[0]}" alt="logo">`;
                        }

                        rowContent += `
                        <li>
                            <div class="item-content single-cart-item">

                            <button type="button" class="btn text-white updatecartBtn" onclick="updateCart(${row.id},${row.input_id},${row.price},'${100}')"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn text-white deletecartBtn" onclick="deleteCart(${row.id})">x</button>

                                <div class="item-media media media-60">
                                    ${theimage}
                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row mb-0 mt-3">
                                        <h6 class="item-title"><a">${row.input.subcategory.name}</a></h6>
                                        <div class="item-subtitle">${row.input.user.first_name+" "+row.input.user.last_name}</div>
                                    </div>
                                    <div class="item-footer mb-0">
                                        <div class="d-flex align-items-center">
                                            <h6 class="me-3">${row.input.currency} ${toCommas(row.price)}</h6>
                                            <input type="hidden" value="${row.input.stock}" id="stock${row.id}" />
                                        </div>    
                                        <div class="d-flex align-items-center">
                                            <div class="dz-stepper border-1">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                    <span class="input-group-btn input-group-prepend">
                                                        <button class="btn btn-primary bootstrap-touchspin-down" onclick="decrement(${row.id},${row.price})" type="button">-</button>
                                                    </span>
                                                    <input class="stepper form-control" type="text" id="quantity${row.id}" value="${row.quantity}" min="1" name="demo3" />
                                                    <span class="input-group-btn input-group-append">
                                                        <button class="btn btn-primary bootstrap-touchspin-up" onclick="increment(${row.id},${row.price})" type="button">+</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex">
                                        <div class="w-50">
                                            <h6 class="">Sub total</h6>
                                        </div>    
                                        <div class="w-50">
                                            <span>NGN <span id="subtotal${row.id}">${eval(row.price * row.quantity)}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        `;   
                    }
                    $('#pUserInputCart').html(rowContent);
                    
                }else{
                    $('#pUserInputCart').html("No item in cart");
                }
                
    
            }

            console.log(total_items_inCart);
            console.log(total_price_count);
            $('.total_items_inCart').html(total_items_inCart);
            $('.total_items_inCart').val(total_items_inCart);
            $('.total_price_count').html(total_price_count);
            $('#total_price').val(total_price_count);
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}


function decrement(n, price){
    let qty = document.getElementById('quantity'+n);
    // alert(qty.value);
    let subtotal = document.getElementById('subtotal'+n);
    if(qty.value > 1){
        qty.value = qty.value - 1;
        let total = price * qty.value;
        subtotal.innerText = total;
    }
}

function increment(n, price){
    let qty = document.getElementById('quantity'+n);
    // alert(qty.value);
    let stock = document.getElementById('stock'+n);
    // alert(stock.value);
    let subtotal = document.getElementById('subtotal'+n);
    if(parseInt(qty.value) >= parseInt(stock.value)){
        
    }else{
        let newvalue = parseInt(qty.value)+1;
        qty.value = newvalue;
        let total = price * newvalue;
        subtotal.innerText = total;
    }
}



// Update Cart
function updateCart(row_id, input_id, price, input_stock){
    let qty = document.getElementById('quantity'+row_id);

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    if(qty.value < 1){
        basicmodal("", "Please enter a valid quantity");
    }else if(parseInt(qty.value) > parseInt(input_stock)){
        // alert(qty.value,"re",input.stock);
        responsemodal("erroricon.png", "Error", "Quantity requested is out of stock");
    }else{

        startPageLoader();
        $.ajax({
            url: `${liveMobileUrl}/input/cart/add`,
            type: "POST",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            "data": JSON.stringify({
                "user_id": userid,
                "input_id": input_id,
                "quantity": qty.value,
                "price": price
            }),
            success: function(response) { 
                EndPageLoader();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    responsemodal("successicon.png", "Success", "Item updated");
                    setTimeout(()=>{
                        // location.assign('cart.html');
                        fetchUserInputCart();
                        $('.dialogbox').addClass('d-none');
                        $('.dialogbox').removeClass('d-block');
                    },1500)
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                // console.log(xmlhttprequest, "Error code");
                if(textstatus==="timeout" || textstatus=="error") {
                    basicmodal("", "Service timed out <br/>Check your internet connection");
                }
            },
            statusCode: {
                200: function(response) {
                    console.log('ajax.statusCode: 200');
                },
                403: function(response) {
                    console.log('ajax.statusCode: 403');
                    basicmodal("", "Session has ended, Login again");
                    setTimeout(()=>{
                        logout();
                    },3000)
                },
                404: function(response) {
                    console.log('ajax.statusCode: 404');
                },
                500: function(response) {
                    console.log('ajax.statusCode: 500');
                }
            }
        });

    }

}


// Delete Cart
function deleteCart(section_id){
    confirmmodal("Confirm", "Are you sure you want to delete this?\n Once deleted, it cannot be recovered", "Cart", section_id);   
}


function confirmaccepted(section, section_id){
    if(section == "Cart"){
        // alert("Cart"+section_id);
        
        startPageLoader();
        $.ajax({
            url: `${liveMobileUrl}/input/cart/delete/`+section_id,
            type: "DELETE",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            success: function(response) { 
                EndPageLoader();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    responsemodal("successicon.png", "Success", response.message);
                    setTimeout(()=>{
                        // location.assign('cart.html');
                        fetchUserInputCart();
                    },1500)
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                // console.log(xmlhttprequest, "Error code");
                if(textstatus==="timeout" || textstatus=="error") {
                    basicmodal("", "Service timed out <br/>Check your internet connection");
                }
            },
            statusCode: {
                200: function(response) {
                    console.log('ajax.statusCode: 200');
                },
                403: function(response) {
                    console.log('ajax.statusCode: 403');
                    basicmodal("", "Session has ended, Login again");
                    setTimeout(()=>{
                        logout();
                    },3000)
                },
                404: function(response) {
                    console.log('ajax.statusCode: 404');
                },
                500: function(response) {
                    console.log('ajax.statusCode: 500');
                }
            }
        }); 
    }
}
/* -------------------------------- CART PAGE ------------------------------- */










/* --------------------- FETCH CROPS FOR SALE BY USERID --------------------- */
function fetchUserCropsforSaleByUserID(){
    startPageLoader();

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    $.ajax({
        url: `${liveMobileUrl}/crop/offer/userid`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            console.log(response);
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data.rows;
                let rowContent = "";
                let carouselrowContent = "";
                let index;
                console.log(thedata, "My crop for sale");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }

                        let activeProductClass, negotiationProductClass;
                        if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        if(parseInt(row.is_negotiable)==1){ negotiationProductClass = "bg-primary"; }else if(parseInt(row.is_negotiable)==0){ negotiationProductClass = "bg-warning" }

                        rowContent += `
                        <li class="cardholder p-3 fontFamily1 lazy">
                            <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                            <div class="d-flex justify-content-between">
                                <div class="item-inner">
                                    <div class="item-title-row mb-0">
                                        <h6 class="item-title zowasel-darkblue-color f-18"><a>${row.subcategory.name} - ${thecolor}</a></h6>
                                        <div class="text-truncate zowasel-color fw-bold f-18">${row.category.name}</div>
                                    </div>
                                    <div class="item-footer">
                                        <div class="d-flex align-items-center">
                                            <h6 class="me-3 mb-0">${truncate(row.description,20)}</h6>
                                        </div>    
                                    </div>
                                </div>
                                <div class="item-inner">
                                    <a href="javascript:void(0);" class="item-bookmark icon-2">
                                        <h6 class="mb-0 zowasel-color f-18">₦${toCommas(theprice)}</h6>
                                    </a>    
                                    <div class="d-flex mt-2">
                                        <div class="cropstatus cropActive ${activeProductClass}"></div>
                                        <div class="cropstatus cropNegotiable ${negotiationProductClass}"></div>
                                    </div>
                                    <button class="btn zowasel-darkblue-bg text-white w-100 py-2 mt-2" onclick="goToMyPersonalCropDetails1(${row.id})">
                                        View
                                    </button>
                                </div>
                            </div>
                        </li>
                        `;   
                    }

                    let looptill;
                    if(thedata.length>3){looptill=3}else{looptill=thedata.length}
                    for (let i = 0; i < looptill; i++) {
                        // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;
                        // console.log("row",row);

                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = "- "+row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }
  
                        let activeProductClass, negotiationProductClass;
                        if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        if(parseInt(row.is_negotiable)==1){ negotiationProductClass = "bg-primary"; }else if(parseInt(row.is_negotiable)==0){ negotiationProductClass = "bg-warning" }

                        carouselrowContent += `
                        <div class="singleproduct-crousel-holder text-center p-2 py-3" onclick="goToMyPersonalCropDetails1(${row.id})">
                            <a href="#">
                                <div class="fontFamily2 f-15 fw-600 lh-18 zowasel-darkblue-color">${truncate(row.subcategory.name,9)} ${truncate(thecolor,7)}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-color mt-2">${truncate(row.category.name,14)}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-gray-color mt-2 text-truncate" style="max-width: 100%;">${truncate(row.description,14)}</div>
                                <div class="fontFamily1 f-16 fw-700 lh-24 zowasel-color mt-2">₦${toCommas(theprice)} / ${thetest_weight}</div>
                            </a>
                        </div>
                        `; 
                    }

                    let emptycell = `
                    <div class="text-center p-2 py-3"">
                        <a href="#"><!--Click "More" to see others--></a>
                    </div>
                    `;
                    $('#p_carouselcropsforsale').html(carouselrowContent + emptycell);

                    $('#p_cropsByUserID').html(rowContent);

                }else{
                    $('#p_cropsByUserID').html("No Crop for sale yet");
                    $('#p_carouselcropsforsale').html("No Crop for sale yet");
                }

                lazyLoading();
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                // basicmodal("", "Service timed out <br/>Check your internet connection");
                console.log("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}


function goToMyPersonalCropDetails1(n){
    // alert(n);
    localStorage.setItem('singleproductID', n);
    localStorage.setItem('last_input_crop_page', "viewusercropsforsale.html");
    location.assign('mypersonalproductdetails.html');
}
/* --------------------- FETCH CROPS FOR SALE BY USERID --------------------- */









/* --------------------- FETCH CROPS FOR AUCTION BY USERID --------------------- */
// function fetchUserCropsforAuctionByUserID(){
function fetchCropsforAuction(){
    startPageLoader();

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let theURL, gotoProductdetails, currentPage;
    if(usertype == "corporate"){
        theURL = `crop/getbycropauction`;
        gotoProductdetails = `productdetails.html`;
        // currentPage = `localStorage.setItem('last_input_crop_page', 'cropsforsale.html')`;
    }else if(usertype == "merchant"){
        theURL = `/crop/auction/userid`;
        gotoProductdetails = `mypersonalproductdetails.html`;
        // currentPage = ``;
    }

    $.ajax({
        url: `${liveMobileUrl}/${theURL}`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            EndPageLoader();
            // $('.loader').hide();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let thedata = response.data.rows;
                let rowContent = "";
                let carouselrowContent = "";
                let index;
                console.log(thedata, "erfrefre");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        let activeProductClass, negotiationProductClass;
                        if(parseInt(row.active)==1){ activeProductClass = "bg-success"; }else if(parseInt(row.active)==0){ activeProductClass = "bg-danger" }
                        if(parseInt(row.is_negotiable)==1){ negotiationProductClass = "bg-primary"; }else if(parseInt(row.is_negotiable)==0){ negotiationProductClass = "bg-warning" }

                         // CHECK IF AUCTIONED CROP HAS ANY BID
                         let crophasBid;
                         if(row.bid.length){
                            crophasBid = `<img src="../assets/icons/bid.png" style="width:22px;" />`;
                         }else{ crophasBid = ``; }

                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = "- "+ row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }


                        rowContent += `
                        <li class="lazy cardholder p-3 fontFamily1">
                        <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                        <div class="d-flex justify-content-between">
                            <div class="item-inner">
                                <div class="item-title-row mb-0">
                                    <h6 class="item-title zowasel-darkblue-color f-18"><a>${truncate(row.subcategory.name,15)} ${thecolor}</a></h6>
                                    <div class="text-truncate zowasel-color fw-bold f-18">${row.category.name}</div>
                                </div>
                                <div class="item-footer">
                                    <div class="d-flex align-items-center">
                                        <div class="me-3 mb-0 f-12">${truncate(row.description,19)}</div>
                                    </div>    
                                </div>
                            </div>
                            <div class="item-inner">
                                <a href="javascript:void(0);" class="item-bookmark icon-2">
                                    <h6 class="mb-0 zowasel-color f-18">₦${toCommas(theprice)}/${thetest_weight}</h6>
                                </a>
                                <div class="d-flex align-items-center my-2">
                                    <span class="cropstatus cropActive ${activeProductClass}"></span>
                                    ${crophasBid}
                                </div>
                                <button class="btn zowasel-darkblue-bg text-white w-100 py-2" onclick="localStorage.setItem('singleproductID',${row.id}); 
                                location.assign('${gotoProductdetails}')">
                                    View
                                </button> 
                            </div>
                        </div>
                    </li>
                        `;   
                    }

                    // for (let i = 0; i < 10; i++) {
                    if(thedata.length>3){looptill=3}else{looptill=thedata.length}
                    for (let i = 0; i < looptill; i++) {
                        // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        let thecolor, theprice, thetest_weight;
                        let specification = row.specification;
                        if(specification){
                            if(specification.color){ thecolor = "- "+ row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }


                        carouselrowContent += `
                        <div class="singleproduct-crousel-holder text-center p-2 py-3" onclick="localStorage.setItem('singleproductID',${row.id}); ${currentPage}
                        location.assign('${gotoProductdetails}')">
                            <a href="#">
                                <div class="fontFamily2 f-15 fw-600 lh-18 zowasel-darkblue-color">${truncate(row.subcategory.name,6)} ${truncate(thecolor,4)}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-color mt-2">${truncate(row.category.name,7)}</div>
                                <div class="fontFamily1 f-14 fw-500 lh-21 zowasel-gray-color mt-2">${truncate(row.description,7)}</div>
                                <div class="fontFamily1 f-16 fw-700 lh-24 zowasel-color mt-2">₦${toCommas(theprice)} / ${thetest_weight}</div>
                            </a>
                        </div>
                        `;   
                    }

                    let emptycell = `
                    <div class="text-center p-2 py-3"">
                        <!--<a href="#">Click "More" to see others</a>-->
                    </div>
                    `;
                    
                    if(usertype == "corporate"){
                        $('#p_allCropAuction').html(rowContent);
                    }else if(usertype == "merchant"){
                        $('#p_cropAuctionByUserID').html(rowContent);
                    }
                    $('#p_carouselcropsforauction').html(carouselrowContent + emptycell);

                }else{
                    if(usertype == "corporate"){
                        $('#p_allCropAuction').html("No Crop yet");
                    }else if(usertype == "merchant"){
                        $('#p_cropAuctionByUserID').html("No Crop yet");
                    }
                    $('#p_carouselcropsforauction').html("No Crop yet");
                }

                lazyLoading();
                    
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            EndPageLoader();
            // console.log(xmlhttprequest, "Error code");
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out <br/>Check your internet connection");
            }
        },
        statusCode: {
            200: function(response) {
                console.log('ajax.statusCode: 200');
            },
            400: function(response) {
                console.log('ajax.statusCode: 400');
                // console.log(response);
                responsemodal("erroricon.png", "Error", response.responseJSON.message);
            },
            403: function(response) {
                console.log('ajax.statusCode: 403');
                basicmodal("", "Session has ended, Login again");
                setTimeout(()=>{
                    logout();
                },3000)
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
}


function goToMyPersonalCropDetails2(n){
    // alert('ef');
    localStorage.setItem('singleproductID', n);
    localStorage.setItem('last_input_crop_page', "viewusercropsforauction.html");
    location.assign('mypersonalproductdetails.html');
}
/* --------------------- FETCH CROPS FOR AUCTION BY USERID --------------------- */









/* -------------------------- ACCEPT OFFER DIRECTLY ------------------------- */
function acceptOfferDirectly(){
    
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;
    let crop_DBQuantity = $('.productQuantity').text();
    let accepted_quantity = parseInt($('#accepted_quantity').val());
    
    let singleproductID = localStorage.getItem('singleproductID');
    
    if(accepted_quantity > crop_DBQuantity){
        responsemodal("erroricon.png", "", "Quantity exeeds offer quantity");
    }else{
        startPageLoader();
        $.ajax({
            url: `${liveMobileUrl}/crop/${singleproductID}/fulfil`,
            type: "POST",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            "data": JSON.stringify({
                "quantity": parseInt($('#accepted_quantity').val()),
                "user_id": userid,
                "user_type": usertype
            }),
            success: function(response) { 
                // alert("efe");
                EndPageLoader();
                // $('.loader').hide();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    // alert(response.message);
                    responsemodal("successicon.png", "Success", response.message);
                    localStorage.setItem('orderHash', response.data.order_hash);
                    setTimeout(()=>{
                        location.assign('order/ordersummarydirect.html');
                    },3000)
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                // console.log(xmlhttprequest, "Error code");
                if(textstatus==="timeout") {
                    basicmodal("", "Service timed out <br/>Check your internet connection");
                }
            },
            statusCode: {
                200: function(response) {
                    console.log('ajax.statusCode: 200');
                },
                400: function(response) {
                    console.log('ajax.statusCode: 400');
                    // console.log(response);
                    responsemodal("erroricon.png", "Error", response.responseJSON.message);
                },
                403: function(response) {
                    console.log('ajax.statusCode: 403');
                    basicmodal("", "Session has ended, Login again");
                    setTimeout(()=>{
                        logout();
                    },3000)
                },
                404: function(response) {
                    console.log('ajax.statusCode: 404');
                },
                500: function(response) {
                    console.log('ajax.statusCode: 500');
                }
            }
        });
    }
}
/* -------------------------- ACCEPT OFFER DIRECTLY ------------------------- */





/* ----------------------- START BID ON AUCTIONED CROP ---------------------- */
$('#startBid').submit((e)=>{
    e.preventDefault();
    // alert("efer");
    let crop_id = document.getElementById('crop_id');
    let inputDaysRemaining = document.getElementById('inputDaysRemaining');
    let inputCropActive = document.getElementById('inputCropActive');
    let inputMinimumBid = document.getElementById('inputMinimumBid');
    let accepted_bidAmount = document.getElementById('accepted_bidAmount');
    console.log(inputMinimumBid, inputMinimumBid);

    if(parseInt(inputCropActive.value) === 0){
        basicmodal("", "You can't bid on this product. It has been deactivated");
    }else if(parseInt(inputDaysRemaining.value) < 0){
        basicmodal("", "Bid period has ended");
    }else if(parseInt(accepted_bidAmount.value) < parseInt(inputMinimumBid.value)){
        basicmodal("", "Your bid is lower than the minimum bid");
    }else{
        // alert("Good to go");
        startPageLoader();
        $.ajax({
            url: `${liveMobileUrl}/crop/${crop_id.value}/bid`,
            type: "POST",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            "data": JSON.stringify({
                "amount": parseInt(accepted_bidAmount.value)
            }),
            success: function(response) { 
                // alert("efe");
                EndPageLoader();
                // $('.loader').hide();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    // alert(response.message);
                    responsemodal("successicon.png", "Success", response.message);
                    setTimeout(()=>{
                        location.assign('viewbids.html?crop='+crop_id.value);
                    },3000)
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                // console.log(xmlhttprequest, "Error code");
                if(textstatus==="timeout") {
                    basicmodal("", "Service timed out <br/>Check your internet connection");
                }
            },
            statusCode: {
                200: function(response) {
                    console.log('ajax.statusCode: 200');
                },
                400: function(response) {
                    console.log('ajax.statusCode: 400');
                    // console.log(response);
                    responsemodal("erroricon.png", "Error", response.responseJSON.message);
                },
                403: function(response) {
                    console.log('ajax.statusCode: 403');
                    basicmodal("", "Session has ended, Login again");
                    setTimeout(()=>{
                        logout();
                    },3000)
                },
                404: function(response) {
                    console.log('ajax.statusCode: 404');
                },
                500: function(response) {
                    console.log('ajax.statusCode: 500');
                }
            }
        });
    }

})
/* ----------------------- START BID ON AUCTIONED CROP ---------------------- */



/* ---------------------- FETCH AUCTION BIDS BY CROP ID --------------------- */
function fetchAuctionBidsByCropID(){
    let pathname = window.location.search;
    console.log(pathname);
    let queryString = new URLSearchParams(pathname);
    let crop_id = queryString.get("crop");
    // console.log(crop_id);

    if(!crop_id){
        $('#p_bids').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>Crop not identified</h5></td></tr>");
    }else{
        startPageLoader();
        $.ajax({
            url: `${liveMobileUrl}/crop/${crop_id}/bid`,
            type: "GET",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            success: function(response) { 
                // alert("efe");
                EndPageLoader();
                $('.loader').addClass('loader-hidden');
                console.log(response, "The get all bid response");
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                    $('.loader').addClass('loader-hidden');
                }else{
                    // alert(response.message);
                    let thedata = (response.data).reverse();
                    let rowContent = "";
                    let index;
                    // console.log(thedata, "category data");
                    // console.log(JSON.parse(thedata[7].tracking_details).transit.length);
                    if(thedata.length > 0){
                        for (let i = 0; i < thedata.length; i++) {
                        //   console.log('Hello World', + i);
                            let row = thedata[i];
                            index= i+1;

                            rowContent += `
                            <tr>
                            <td id='' style="display:none;">${JSON.stringify(row)}</td>
                                <th scope="row">${row.created_at}</th>
                                <td>${row.user.first_name+" "+row.user.last_name}</td>
                                <td>${row.amount}</td>
                            </tr>
                            `;   
                        }
                        $('#p_bids').html(rowContent);      
                    }else{
                        $('#p_bids').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No bids yet</h5></td></tr>");
                    }
                        
                }
            },
            error: function(xmlhttprequest, textstatus, message) {
                EndPageLoader();
                // console.log(xmlhttprequest, "Error code");
                if(textstatus==="timeout" || textstatus=="error") {
                    basicmodal("", "Service timed out <br/>Check your internet connection");
                }
            },
            statusCode: {
                200: function(response) {
                    console.log('ajax.statusCode: 200');
                },
                403: function(response) {
                    console.log('ajax.statusCode: 403');
                    basicmodal("", "Session has ended, Login again");
                    setTimeout(()=>{
                        logout();
                    },3000)
                },
                404: function(response) {
                    console.log('ajax.statusCode: 404');
                },
                500: function(response) {
                    console.log('ajax.statusCode: 500');
                }
            }
        });
    }
}
/* ---------------------- FETCH AUCTION BIDS BY CROP ID --------------------- */


/* ---------------------- GO TO SEE ALL BIDS BY USER ID --------------------- */
function gotoViewBids(){
    let crop_id = document.getElementById('crop_id').value;
    // alert(crop_id);
    if(!crop_id){
        basicmodal("", "Something went wrong. Crop details could not be accessed");
    }else{
        let productName = document.getElementsByClassName('productName')[0].innerText;
        // alert(productName);
        localStorage.setItem('bidProductName', productName);
        location.assign('viewbids.html?crop='+crop_id);
    }
}
/* ---------------------- GO TO SEE ALL BIDS BY USER ID --------------------- */





/* --------------------------- TOGGLE SLIDE BUTTON -------------------------- */
function toggleDarkMode(){
    let toggle = document.getElementById("darkmodeCheckbox");
    // alert(toggle.value);
    let showdarkmode =  getCookie("showdarkmode");
    // alert(showdarkmode);
    let key = "showdarkmode";
    let value = true;
    if(showdarkmode==null||showdarkmode=="null"){ // not saved in cookies or false
        toggle.value = true;
        setCookie(key,value,365);
        document.body.classList.add("theme-dark");
    }
    if(showdarkmode==true||showdarkmode=="true"){
        toggle.value = false;
        setCookie(key,false,365);
        document.body.classList.remove("theme-dark");
    }
    if(showdarkmode==false||showdarkmode=="false"){
        toggle.value = true;
        setCookie(key,true,365);
        document.body.classList.add("theme-dark");
    }
    setTimeout(()=>{
        populateDarkMode();
    },500)
}

function populateDarkMode(){
    let showdarkmode =  getCookie("showdarkmode");
    // alert(showdarkmode);
    let toggle = document.getElementById("darkmodeCheckbox");
    if(showdarkmode==null||showdarkmode=="null"){ // not saved in cookies or false
        toggle.checked = false;
        document.body.classList.remove("theme-dark");
    }
    if(showdarkmode==true||showdarkmode=="true"){
        toggle.checked = true;
        document.body.classList.add("theme-dark");
    }
    if(showdarkmode==false||showdarkmode=="false"){
        toggle.checked = false;
        document.body.classList.remove("theme-dark");
    }
}



function toggleNotificationMode(){
    let toggle = document.getElementById("notificationCheckbox");
    // alert(toggle.value);
    let showNotification =  getCookie("showNotification");
    // alert(showNotification);
    let key = "showNotification";
    let value = true;
    if(showNotification==null||showNotification=="null"){ // not saved in cookies or false
        toggle.value = true;
        setCookie(key,value,365);
    }
    if(showNotification==true||showNotification=="true"){
        toggle.value = false;
        setCookie(key,false,365);
    }
    if(showNotification==false||showNotification=="false"){
        toggle.value = true;
        setCookie(key,true,365);
    }
    setTimeout(()=>{
        populateNotificationMode();
    },500)
}

function populateNotificationMode(){
    let showNotification =  getCookie("showNotification");
    // alert(showNotification);
    let toggle = document.getElementById("notificationCheckbox");
    if(showNotification==null||showNotification=="null"){ // not saved in cookies or false
        toggle.checked = false;
    }
    if(showNotification==true||showNotification=="true"){
        toggle.checked = true;
    }
    if(showNotification==false||showNotification=="false"){
        toggle.checked = false;
    }
}
/* --------------------------- TOGGLE SLIDE BUTTON -------------------------- */





/* ------------------------------ OWL CAROUSEL ------------------------------ */
function owlcarouselSettings(){
    if ($(window).width() > 1200) {
        function itemSize() {
            var OwlSlideItem = $(".carousel-accordion .accordion_li"),
            OwlSlideItemmargin = 10,
            // itemsLength = 5,
            owlFullScrnWidth = $(".carousel-accordion").width(),
            normItemWidth = owlFullScrnWidth / itemsLength - 9;

            OwlSlideItem.stop().animate({ width: normItemWidth + "px" }, 500);
        }
        itemSize();
    }

    function itemExpanded() {
    var OwlSlidemactive = $(".carousel-accordion .owl-item.active"),
        // OwlSlideItemmargin = $('.carousel-accordion .owl-item').css('marginRight').replace(/[A-Za-z]/g, ""),
        itemsLength = 5,
        owlFullScrnWidth = $(".carousel-accordion").width() - itemsLength,
        normItemWidth = owlFullScrnWidth / itemsLength - 10,
        lgItemWidth = normItemWidth * 2 + 20,
        smItemWidth = (normItemWidth * 3) / 4 - 3;

    OwlSlidemactive.hover(
        function () {
        var $this = $(this);
        $this
            .addClass("expanded")
            .removeClass("active")
            .find(".accordion_li")
            .stop()
            .animate({ width: lgItemWidth + "px" }, 500);
        $(".carousel-accordion .active")
            .find(".accordion_li")
            .stop()
            .animate({ width: smItemWidth + "px" }, 500);
        },
        function () {
        var $this = $(this);
        $this.removeClass("expanded").addClass("active");
        $(".carousel-accordion .active")
            .find(".accordion_li")
            .stop()
            .animate({ width: normItemWidth + "px" }, 500);
        }
    );
    }
    setTimeout(()=>{
        initialize_owl($(".carousel-accordion"));
    },2000)

    function initialize_owl(el) {
        el.owlCarousel({
            loop: true,
            margin: 10,
            // navText: ["<i class='angle-left'></i>", "<i class='angle-right'></i>"],
            navText: "",
            dots: false,
            autoPlay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            nav: false,
            responsiveClass: true,
            responsive: {
            0: {
                items: 1.25
            },
            460: {
                items: 1.75
            },
            768: {
                items: 2.5
            },
            900: {
                items: 3.5
            },
            1200: {
                margin: 0,
                onInitialized: itemExpanded,
                onRefresh: itemExpanded,
                autoWidth: true,
                mouseDrag: false,
                items: 5
            }
            }
        });
    }
}



function owlcarouselSettingsForAllProducts(){
    if ($(window).width() > 1200) {
        function itemSize() {
            var OwlSlideItem = $(".carousel-accordion .accordion_li"),
            OwlSlideItemmargin = 10,
            itemsLength = 5,
            owlFullScrnWidth = $(".carousel-accordion").width(),
            normItemWidth = owlFullScrnWidth / itemsLength - 9;

            OwlSlideItem.stop().animate({ width: normItemWidth + "px" }, 500);
        }
        itemSize();
    }

    function itemExpanded() {
    var OwlSlidemactive = $(".carousel-accordion .owl-item.active"),
        // OwlSlideItemmargin = $('.carousel-accordion .owl-item').css('marginRight').replace(/[A-Za-z]/g, ""),
        itemsLength = 10,
        owlFullScrnWidth = $(".carousel-accordion").width() - itemsLength,
        normItemWidth = owlFullScrnWidth / itemsLength - 10,
        lgItemWidth = normItemWidth * 2 + 20,
        smItemWidth = (normItemWidth * 3) / 4 - 3;

    OwlSlidemactive.hover(
        function () {
        var $this = $(this);
        $this
            .addClass("expanded")
            .removeClass("active")
            .find(".accordion_li")
            .stop()
            .animate({ width: lgItemWidth + "px" }, 500);
        $(".carousel-accordion .active")
            .find(".accordion_li")
            .stop()
            .animate({ width: smItemWidth + "px" }, 500);
        },
        function () {
        var $this = $(this);
        $this.removeClass("expanded").addClass("active");
        $(".carousel-accordion .active")
            .find(".accordion_li")
            .stop()
            .animate({ width: normItemWidth + "px" }, 500);
        }
    );
    }
    setTimeout(()=>{
        initialize_owl($(".carousel-accordion"));
    },2000)

    function initialize_owl(el) {
        el.owlCarousel({
            rtl: false,
            center: false,
            loop: false,
            margin: 10,
            // navText: ["<i class='angle-left'></i>", "<i class='angle-right'></i>"],
            navText: "",
            dots: false,
            lazyLoading: false,
            startPosition: -1,
            // smartSpeed: 200,
            autoWidth: false,
            autoPlay: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            nav: false,
            responsiveClass: true,
            responsive: {
            0: {
                // items: 2.25,
                items: getItems(2.25),
                loop: false
            },
            460: {
                items: 1.75
            },
            768: {
                items: 2.5
            },
            900: {
                items: 3.5
            },
            1200: {
                margin: 0,
                onInitialized: itemExpanded,
                onRefresh: itemExpanded,
                autoWidth: true,
                mouseDrag: false,
                items: 5
            }
            }
        });
    }
}

let myItemCount = 10;
function getItems(items) {
    if (myItemCount < items) {
        return myItemCount;
    }
    else {
        return items;
    }
}


function getLoop(items) {
    if (myItemCount < items) {
        return false;
    }
    else {
        return true;
    }
}
/* ------------------------------ OWL CAROUSEL ------------------------------ */




/* ---------------------------- PROFILE PIC EDIT ---------------------------- */
function urlToFile(url){
    let arr = url.split(",");
    // console.log(arr);
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1]; //encoded in base64

    let dataStr = atob(data); //decode the base64
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);

    while(n--){
        dataArr[n] = dataStr.charCodeAt(n);
    }
    // console.log(dataArr); //This is what we need to create a file

    let file = new File([dataArr], 'File.jpg', {type: mime});
    // console.log(file);
    return file;

    // console.log("mime",mime);
    // console.log("data",data);
}

$(document).on('click', '#upload-aphoto', function () {
    document.getElementById('selectedFile').click();
});

$('#selectedFile').change(function () {
    if (this.files[0] == undefined)
      return;
    $('#imageModalContainer').modal('show');
    let reader = new FileReader();
    reader.addEventListener("load", function () {
      window.src = reader.result;
      $('#selectedFile').val('');
    }, false);
    if (this.files[0]) {
      reader.readAsDataURL(this.files[0]);
    }
});

let croppi;
$('#imageModalContainer').on('shown.bs.modal', function () {
  let width = document.getElementById('crop-image-container').offsetWidth - 20;
  $('#crop-image-container').height((width - 80 +20) + 'px');
    croppi = $('#crop-image-container').croppie({
      viewport: {
        width: width,
        height: width
      },
    });
  $('.modal-body1').height(document.getElementById('crop-image-container').offsetHeight + 50 + 'px');
  croppi.croppie('bind', {
    url: window.src,
  }).then(function () {
    croppi.croppie('setZoom', 0);
  });
});

$('#imageModalContainer').on('hidden.bs.modal', function () {
  croppi.croppie('destroy');
});

let newprofilePicture;
$(document).on('click', '.save-modal', function (ev) {
    croppi.croppie('result', {
      type: 'base64',
      format: 'jpeg',
      size: 'original'  
    }).then(function (resp) {
        $('#confirm-profileimg').attr('src', resp);
        // The base 64 image
        newprofilePicture = urlToFile(resp);
        console.log("newprofilePicture", newprofilePicture);

        startPageLoader();
        var fd = new FormData();  
        // fd.append( 'file', input.files[0] );
        fd.append("image", newprofilePicture);
        fetch('https://filesapi.growsel.com/upload.php', {method: 'POST',body: fd}).then(response => response.json())
        .then(data => {
            // console.log("Chima", data);
            if(data.error == false){
                img1 = data.data.imageLink;

                //Store form Data
                var formData = new FormData();

                formData.append("image", img1);

                var settings = {
                    "url": `${liveMobileUrl}/users/account/profilepicture`,
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        // "Content-Type": "application/json",
                        "authorization": localStorage.getItem('authToken')
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": formData
                };

                $.ajax(settings).done(function (data) {
                    // console.log(data);
                    let response = JSON.parse(data);
                    EndPageLoader();
                    if(response.error == true){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        responsemodal("successicon.png", "Success", response.message);
                        setTimeout(()=>{    
                            $('.modal').modal('hide');
                        },1500)

                        // UPDATE STORED USER DETAILS
                        let sessionuser = localStorage.getItem('zowaselUser');
                        sessionuser = JSON.parse(sessionuser);
                        sessionuser.user = response.data;
                        let modifiedUserString = JSON.stringify(sessionuser);
                        localStorage.setItem('zowaselUser', modifiedUserString);
                        
                    }
                });

            }
        })
    });
  });
/* ---------------------------- PROFILE PIC EDIT ---------------------------- */