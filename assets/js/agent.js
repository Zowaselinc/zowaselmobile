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