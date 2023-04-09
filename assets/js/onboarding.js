// import { liveMobileUrl, liveGlobalBaseUrl } from './env.js';
// console.log(liveMobileUrl);
// console.log(liveGlobalBaseUrl);
// alert(liveMobileUrl)
// WELCOME.HTML
const userType =(userType)=>{
    // alert(userType);
    localStorage.setItem('userType', userType);
}





/************************************************************************************
 * /* ------------------------------- 1. SIGNUP PAGE ------------------------------ 
 ************************************************************************************/
const RegisterScreen =()=>{

    let userType = localStorage.getItem('userType');
    if(!userType){
        location.assign('welcome.html');
    }

    const form = document.getElementById('form');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const phonenumber = document.getElementById('phonenumber');
    const account_type = form.elements["account_type"];
    const privacy_policy = document.getElementById('privacy_policy');
    // If user has company
    let company_name,company_address,company_state,rc_number,company_email,company_phone;
    if(account_type.value=="company"){
        company_name = document.getElementById('company_name');
        company_address = document.getElementById('company_address');
        company_state = document.getElementById('company_state');
        rc_number = document.getElementById('rc_number');
        company_email = document.getElementById('company_email');
        company_phone = document.getElementById('company_phone');
    }
    
    

 

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
    function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(input.value.trim())) {
            showSucces(input)
        }else {
            showError(input,'Email is not invalid');
        }
    }


    //checkRequired fields
    let registerRequiredField = [];
    let registerLengthField = []; 
    let totalRegisterLengthFieldError;
    function checkRequired(inputArr) {
        // console.log(inputArr);
        inputArr.forEach(function(input){
            let fieldname;
            let fieldnameInput = getFieldName(input);
            if(fieldnameInput.toLowerCase()=="firstname"){
                fieldname = "First name"
            }else if(fieldnameInput.toLowerCase()=="lastname"){
                fieldname = "Last name"
            }else if(fieldnameInput.toLowerCase()=="phonenumber"){
                fieldname = "Phone number"
            }else{
                fieldname = fieldnameInput;
            }

            if(input.value.trim() === ''){
                showError(input,`${fieldname} is required`);
                registerRequiredField.push("requiredfield");
            }else {
                showSucces(input);
                registerRequiredField.pop("requiredfield");
            }
            console.log(`${getFieldName} is required`);
        });
    }




    //check input Length
    function checkLength(input, min ,max) {
        let fieldname;
        let fieldnameInput = getFieldName(input);
        if(fieldnameInput.toLowerCase()=="firstname"){
            fieldname = "First name"
        }else if(fieldnameInput.toLowerCase()=="lastname"){
            fieldname = "Last name"
        }else if(fieldnameInput.toLowerCase()=="phonenumber"){
            fieldname = "Phone number"
        }else{
            fieldname = fieldnameInput;
        }

        if(input.value.length < min) {
            // showError(input, `${getFieldName(input)} must be at least ${min} characters`);
            showError(input, `${fieldname} should be at least ${min} characters`);
            registerLengthField.push("lengtherror");
            return true;
        }else if(input.value.length > max) {
            showError(input, `${fieldname} must be les than ${max} characters`);
            registerLengthField.push("lengtherror");
            return true;
        }else {
            showSucces(input);
            registerLengthField.pop("lengtherror");
            return false;
        }
        
    }

    //get FieldName
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // check passwords match
    function checkPasswordMatch(input1, input2) {
        if(input1.value !== input2.value) {
            showError(input2, 'Passwords do not match');
        }
    }


    //Event Listeners
    form.addEventListener('submit',function(e) {
        e.preventDefault();

        // Empty Field Array
        registerRequiredField = [];
        registerLengthField = [];

        checkRequired([firstname, lastname, email, phonenumber]);
        // console.log(registerRequiredField);

        // If there are no required fields
        if(!registerRequiredField.includes('requiredfield')){
            let a1 = checkLength(firstname,3,25);
            let a2 = checkLength(lastname,3,25);
            let a3 = checkLength(email,12,45);
            let a4 = checkLength(phonenumber,11,14);

            console.log(a1, "checkLength");
            
            if(a1===true||a2===true||a3===true||a4===true){
            }else{
                // checkEmail(email);
                // checkPasswordMatch(password, password2);
                
                // alert("Good to Go");

                let registerData = {} // make an empty object
                /* --- Add Things To The Object --- */
                registerData['first_name'] = firstname.value; // 'first_name' is the key, and 'key.value' is the value
                registerData['last_name'] = lastname.value;
                registerData['email'] = email.value;
                registerData['phone'] = phonenumber.value;
                registerData['account_type'] = account_type.value;
                // if(account_type.value=="company"){
                //     // 
                // }
                
                
                console.log(registerData) // Expected result -> {"first_name":"**","last_name":"**","email":"**","phone":"**"}
                localStorage.setItem('registerData', JSON.stringify(registerData));


                // var data = registerData.email;

                /* ------------------------------ DB CONNECTION ----------------------------- */
                startPageLoader();

                $.ajax({
                    "url": `${liveGlobalBaseUrl}/register/verify`,
                    "method": "POST",
                    "timeout": 25000,
                    "headers": {
                    "Content-Type": "application/json",
                    },
                    "data": JSON.stringify({
                        "email": email.value
                    }),
                    success: function(response) { 
                        EndPageLoader();
                        if(response.status == false){
                            // alert(response.message);
                            responsemodal("erroricon.png", "Error", response.message);
                        }else{
                            // alert(response.message);
                            responsemodal("successicon.png", "Success", response.message);
                            setTimeout(()=>{
                                location.href="verifyaccount.html";
                            },2000)      
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
                /* ------------------------------ DB CONNECTION ----------------------------- */

            }
        }
        
        
    //     // checkEmail(email);
    //     // checkPasswordMatch(password, password2);





    });


}
/************************************************************************************
 * /* ------------------------------- 1. SIGNUP PAGE ------------------------------ 
************************************************************************************/






/************************************************************************************
 * /* --------------------------- 2. VERIFY ACCOUNT PAGE -------------------------- 
************************************************************************************/
// Only Integer Numbers
function keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
      console.log('false');
    } else {
      return true;
      console.log('true');
    }
}


$('.digit-group').find('input').each(function() {
    console.log(this);
    let temp = this;
    $(this).attr('maxlength', 1);
    $(this).on('keyup', function(e) {
        // alert(this);
      var parent = $($(this).parent());
      
      if(e.keyCode === 8 || e.keyCode === 37) {
        // console.log($(this).data('next'));
        let next_digit_num = $(this).data('next');
        let next_inputnumber = next_digit_num.split('-')[1];
        let prev_inputnumber = next_inputnumber-2;
        let prev_digit_num = 'digit-'+prev_inputnumber;
        // console.log(prev_digit_num);
        var prev = parent.find('input#' + prev_digit_num);
        // $(this).prev('.inputs').focus();
        
        if(prev.length) {
          $(prev).select();
        // console.log(prev);
        //   console.log('1');
        }
      } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
        var next = parent.find('input#' + $(this).data('next'));
        
        if(next.length) {
          // IF THE INPUT IS A NUMBER, GO TO NEXT INPUT
          let num = (this.value);
          if(num === NaN  || num == NaN || num =="NaN" || num==="NaN" || num==""){
            // console.log(num+'⛔️  value is a not a number');
          }else{
            // console.log(num+'✅ value is a number');
            $(next).select();
          }
        } else {
          if(parent.data('autosubmit')) {
            parent.submit();
            // temp.verifyotp();
            console.log('3');
          }
        }
      }
    });
  });


  $('#digit-6').on('input', () => {
    let lastInput = $('#digit-6');
    if(lastInput.val().length > 0){
      lastInput.select();
    }
  })




/* ----------------------------- //   Resend OTP ---------------------------- */
const resendotpcode =()=>{
    let registerData = localStorage.getItem('registerData');
    let otpemail = JSON.parse(registerData).email;
    // console.log(registerData);
    if(otpemail=="" || otpemail==null || otpemail=="null"){
      location.assign('signup.html');
    }else{
    //   alert('Otp code resent to '+otpemail);

      /********* DB CONNECTION **********/
      startPageLoader();

      $.ajax({
        "url": `${liveGlobalBaseUrl}/register/verify`,
        "method": "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": otpemail
        }),
        success: function(response) { 
            EndPageLoader();
            if(response.status == false){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                responsemodal("successicon.png", "Success", response.message);    
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
      /********* DB CONNECTION **********/      
    }
  }
  /* ----------------------------- //   Resend OTP ---------------------------- */





  /* ---------------------------- VERIFY EMAIL OTP ---------------------------- */
  const verifyotp =()=>{
    let one = $('#digit-1').val();
    let two = $('#digit-2').val();
    let three = $('#digit-3').val();
    let four = $('#digit-4').val();
    let five = $('#digit-5').val();
    let six = $('#digit-6').val();

    let otpcode = one+''+two+''+three+''+four+''+five+''+six;
    // alert(otpcode);

    let registerData = localStorage.getItem('registerData');
    let otpemail = JSON.parse(registerData).email;

    /********* DB CONNECTION **********/
    startPageLoader();

    $.ajax({
        "url": `${liveGlobalBaseUrl}/register/confirm`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "code": otpcode,
            "email": otpemail
        }),
        success: function(response) { 
            EndPageLoader();
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                // responsemodal("successicon.png", "Success", response.message);   
                localStorage.setItem('isEmailVerified',true)
                setTimeout(() => {
                    location.href="createpassword.html";
                }, 2000); 
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
            },
            404: function(response) {
                console.log('ajax.statusCode: 404');
            },
            500: function(response) {
                console.log('ajax.statusCode: 500');
            }
        }
    });
    /********* DB CONNECTION **********/

  }
  /* ---------------------------- VERIFY EMAIL OTP ---------------------------- */


  /************************************************************************************
  * /* --------------------------- 2. VERIFY ACCOUNT PAGE -------------------------- 
  ************************************************************************************/






  function createpasswordPage(){

    let password = document.getElementById('password');
    let password2 = document.getElementById('confirmPassword');

    password.addEventListener('keyup',function(){
        ruleValidator();
    })

    var ruleValidator = function() {
        //gets what is being input in the field and sets as variable
        var pswd = password.value;
        // console.log(pswd);
        
        if(pswd.length < 8) {
            $('#length').removeClass('valid').addClass('invalid');
        } else {
            $('#length').removeClass('invalid').addClass('valid');
            console.log('length '+ pswd.length);
        }

        // letter
        if(pswd.match(/[a-z]/) ) {
            $('#letter').removeClass('invalid').addClass('valid');
        } else {
            $('#letter').removeClass('valid').addClass('invalid');
        }

        // Capital
        if(pswd.match(/[A-Z]/)) {
            $('#capital').removeClass('invalid').addClass('valid');
        } else {
            $('#capital').removeClass('valid').addClass('invalid');

        }

        // number
        if ( pswd.match(/\d/) ) {
            $('#number').removeClass('invalid').addClass('valid');
        } else {
            $('#number').removeClass('valid').addClass('invalid');
        }

        // character
        if ( pswd.match(/[$&+,:;=?@#|'<>.^*()%!-]/) ) {
            $('#special').removeClass('invalid').addClass('valid');
            console.log('log: '+ pswd);
        } else {
            $('#special').removeClass('valid').addClass('invalid');
        }
    }

    password.addEventListener('focus',function() {
        // (triggers whenever the password field is selected by the user)
        $('.pswd_info').fadeIn('low');
        $('.incorrectMsg').hide();
    });
    password.addEventListener('blur',function() {
        // (triggers whenever the password field is unselected)
        $('.pswd_info').fadeOut('low');
        $('.incorrectMsg').hide();
    });


  }
  // End of create Password Page Function













// LOGIN
function LoginScreen(){

    const loginform = document.getElementById('loginform');
    const loginemail = document.getElementById('loginemail');
    const loginpassword = document.getElementById('loginpassword');

    //Event Listeners
    loginform.addEventListener('submit',function(e) {
        e.preventDefault();
        startPageLoader();

        // alert("ef");
        $.ajax({
            url: `${liveGlobalBaseUrl}/login`,
            type: "POST",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": loginemail.value,
                "password": loginpassword.value
            }),
            success: function(response) { 
                EndPageLoader();
                if(response.error == true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    // alert(response.message);
                    console.log(response, "response");
                    responsemodal("successicon.png", "Success", response.message);
                    localStorage.setItem('authToken', "Bearer "+response.token);
                    localStorage.setItem('zowaselUser', JSON.stringify(response.user));
                    setTimeout(()=>{
                        location.href="dashboard/index.html";
                    },2000)      
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






        // var settings = {
        //     "url": `${liveGlobalBaseUrl}/login`,
        //     "method": "POST",
        //     "timeout": 1000,
        //     "headers": {
        //     "Content-Type": "application/json"
        // },
        //     "data": JSON.stringify({
        //         "email": loginemail.value,
        //         "password": loginpassword.value
        //     }),
        //     error:function(){ alert("some error occurred") },
        // };
        
        // $.ajax(settings).done(function (response) {
        //     // console.log(response);
        //     EndPageLoader();

        //     var totalTime = (new Date().getTime())-ajaxTime;
        //     alert(totalTime);
        //     if(response.error == true){
        //         alert(response.message);
        //     }else{

        //         alert(response.message);
        //         // localStorage.setItem('authToken', response.token);
        //         // localStorage.setItem('zowaselUser', JSON.stringify(response.user));
        //         // setTimeout(()=>{
        //         //     location.href="dashboard/index.html";
        //         // },2000)      
        //     }
        // });


    });


}
// LOGIN




/* --------------------------------- LOADER --------------------------------- */
function startPageLoader(){
    const loader = document.querySelector('.loader');
    loader.classList.add("loader");
    loader.classList.remove("loader-hidden");
}

function EndPageLoader(){
    const loader = document.querySelector('.loader');
    loader.classList.add("loader-hidden");

}

window.addEventListener('load', ()=>{
    const loader = document.querySelector('.loader');

    loader.classList.add("loader-hidden");

    // loader.addEventListener("transitionend", ()=>{
    //     document.body.removeChild("loader");
    // })
})
/* --------------------------------- LOADER --------------------------------- */