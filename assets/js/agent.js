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
    const loader = document.querySelector('.loader');
    loader.classList.add("loader");
    loader.classList.remove("loader-hidden");
}

function EndPageLoader(){
    const loader = document.querySelector('.loader');
    if(loader){
        loader.classList.add("loader-hidden");
    }
}

window.addEventListener('load', ()=>{
    const loader = document.querySelector('.loader');
    if(loader){
        loader.classList.add("loader-hidden");
    }

    // loader.addEventListener("transitionend", ()=>{
    //     document.body.removeChild("loader");
    // })
})
/* --------------------------------- LOADER --------------------------------- */




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





/************************************************************************************
 * /* ------------------------------- 1. SIGNUP PAGE ------------------------------ 
 ************************************************************************************/
//Show input error messages
function showError(input, message) {
    // const formControl = input.parentElement;
    // formControl.className = 'form-control error';
    // const small = formControl.querySelector('small');
    // small.innerText = message;

    // https://codepen.io/AbdullahSajjad/pen/LYGVRgK

    const fromInput = input.parentElement;
    // console.log(fromInput, "FormInput Required");
    const small = fromInput.querySelector('small');
    small.className = 'input_response error';
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const fromInput = input.parentElement;
    // console.log(fromInput, "FormInput Success");
    const small = fromInput.querySelector('small');
    small.className = 'input_response success';
}


//check email is valid
function checkEmail() {
    var input = document.getElementById("email");
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showError(input,'');
    }else {
        showError(input,'Email is not invalid');
    }
}

function checkEmailOnSubmit(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if(re.test(input.value.trim())) {
    if(re.test(input.trim())) {
        return "valid";
    }else {
        return "invalid";
    }
}

const RegisterScreen =()=>{
    let form = document.getElementById('formpage1');
    let user_type = document.getElementById('user_type');
    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let phonenumber = document.getElementById('phonenumber');  
    let password = document.getElementById('password');  
    let password2 = document.getElementById('c_password');  
  
    // alert("Good to Go");
    
    
    //Event Listeners
    form.addEventListener('submit',function(e) {
        e.preventDefault();

        let checktheemail = checkEmailOnSubmit(email.value);
        if(checktheemail=="invalid"){
            basicmodal("","Enter a valid email");
            return;
        }
        
        console.log(password.value+" "+password2.value);
        if(password.value !== password2.value){
            basicmodal("","Passwords do not match");
            return;
        }
        
        let registerData = {} // make an empty object
        /* --- Add Things To The Object --- */
        registerData['first_name'] = firstname.value; // 'first_name' is the key, and 'key.value' is the value
        registerData['last_name'] = lastname.value;
        registerData['email'] = email.value;
        registerData['phone'] = phonenumber.value;
        registerData['password'] = password.value;
        registerData['user_type'] = user_type.value;
        
        
        let account_typeValue = localStorage.getItem('account_type');
        if(account_typeValue=="company"){
            console.log("company", "Account type");
            registerData['has_company'] = true;

            let company_name,company_address,company_state,rc_number,company_email,company_phone;
            // If user has company
            company_name = document.getElementById('company_name');
            company_address = document.getElementById('company_address');
            company_state = document.getElementById('company_state');
            rc_number = document.getElementById('rc_number');
            company_email = document.getElementById('company_email');
            company_phone = document.getElementById('company_phone');

            registerData['company_name'] = company_name.value;
            registerData['company_address'] = company_address.value;
            registerData['company_state'] = company_state.value;
            registerData['rc_number'] = rc_number.value;
            registerData['company_email'] = company_email.value;
            registerData['company_phone'] = company_phone.value;
        }else{
            console.log("individual", "Account type");
        }
        
        
        console.log(registerData) // Expected result -> {"first_name":"**","last_name":"**","email":"**","phone":"**"}
        localStorage.setItem('registerData', JSON.stringify(registerData));


        // var data = registerData.email;
        // alert(account_typeValue);
        // alert(document.getElementById('company_phone').value);

        /* ------------------------------ DB CONNECTION ----------------------------- */
        if(account_typeValue=="company" && document.getElementById('company_phone').value.length<11){
            $('.company_response').html("Company phone number should not be less than 11 digits");
            // alert("Less than");
        }else if(account_typeValue=="company" && document.getElementById('company_phone').value.length>11){
            $('.company_response').html("Company phone number should not be more than 11 digits");
            // alert("greater than");
        }else{
            $('.company_response').html('');
            startPageLoader();

            $.ajax({
                "url": `${liveGlobalBaseUrl}/register`,
                "method": "POST",
                "timeout": 25000,
                "headers": {
                    "Content-Type": "application/json",
                },
                "data": JSON.stringify({
                    "first_name": registerData.first_name,
                    "last_name": registerData.last_name,
                    "email": registerData.email,
                    "phone": registerData.phone,
                    "password": registerData.password,
                    "user_type": registerData.user_type,

                    "company_name": registerData.company_name,
                    "company_address": registerData.company_address,
                    "company_country": registerData.company_country,
                    "company_state": registerData.company_state,
                    "rc_number": registerData.rc_number,
                    "company_email": registerData.company_email,
                    "company_phone": registerData.company_phone
                }),
                success: function(response) { 
                    EndPageLoader();
                    if(response.status == false){
                        // alert(response.message);
                        responsemodal("erroricon.png", "Error", response.message);
                    }else{
                        // alert(response.message);
                        responsemodal("successicon.png", "Success", "User Registered");
                        // setTimeout(()=>{
                        //     location.href="verifyaccount.html";
                        // },2000)      
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
    //     /* ------------------------------ DB CONNECTION ----------------------------- */

    })

}
/************************************************************************************
 * /* ------------------------------- 1. SIGNUP PAGE ------------------------------ 
************************************************************************************/





/* ----------------------------- // BUTTOM MENU ----------------------------- */
const buttommenuForAgent =(page)=>{
    if(page){
        
    }else{
        $.get( "components/buttommenu_agent.html", function( data ) {
            $( "#buttommenu" ).html( data );
        })
    }
}
/* ----------------------------- // BUTTOM MENU ----------------------------- */




/* ------------------------- POPULATE AGENT DETAILS ------------------------- */
const populateAgentDetails =()=>{
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
/* ------------------------- POPULATE AGENT DETAILS ------------------------- */



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
                        logout();
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