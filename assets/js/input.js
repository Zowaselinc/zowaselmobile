/* --------------- // PROCEED TO CHECKOUT - CREATE CART ORDER --------------- */
const createCartOrder =()=>{
    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/order/cart/create`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "delivery_details": {
                "address": null,
                "country": null,
                "state": null,
                "city": null,
                "zip": null
            }
        }),
        success: function(response) { 
            EndPageLoader();
            console.log(response);
            if(response.error === true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                responsemodal("successicon.png", "Success", response.message);  
                let data = response.data;
                setTimeout(()=>{
                    location.assign(`inputcartcheckout.html?ORD=${data.order_hash}`);
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
}
/* --------------- // PROCEED TO CHECKOUT - CREATE CART ORDER --------------- */



/* ------------------------- GRAB ODER DETAILS BY ORDER ID ------------------------ */
function grabSingleOrderDetails(){
    let pathname = window.location.search;
    let queryString = new URLSearchParams(pathname);
    let order_hash = queryString.get("ORD");
    $('#order_hash').val(order_hash);
    // console.log(order_hash, "order_hash");

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/order/${order_hash}`,
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
            console.log(response, "The single Order details response");
            
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let data = response.data;
                let waybill_details = data.waybill_details;
                let waybill_JSON = JSON.parse(waybill_details);
                console.log(waybill_JSON, "waybill_JSON");
                $('#waybill_address').val(waybill_JSON.address);
                $('#countryList').val(waybill_JSON.country);
                setTimeout(()=>{

                    var countryvalue = $('#countryList').val();
                    // alert(countryvalue);

                    var listItems = '';
                    var emptylistItems = '<option value="">- Select state -</option>';

                    /* --------------------- CHECK INDEX OF OBJECT IN ARRAY --------------------- */
                    if(countryvalue){
                        let indexofCountry = countrylist.findIndex(item => { return item.country == countryvalue});
                        // console.log(indexofCountry);
                        let stateList = countrylist[indexofCountry].states;
                        // console.log(stateList);
                        console.log(stateList.length);
                        for (var i=0;i<stateList.length;i++){
                            // console.log(stateList[i]);;      
                            listItems+=`<option value='${stateList[i]}'>${stateList[i]}</option>`;     
                        }
                        // console.log(listItems);
                    
                        // add to DOM
                        $('#stateList').html(emptylistItems+listItems);
                    }
                    
                    $('#stateList').val(waybill_JSON.state);
                },2000)
                
                $('#waybill_city').val(waybill_JSON.city);
                $('#waybill_zipcode').val(waybill_JSON.zip);

                if(waybill_JSON.address){ $('#waybill_address_v').html(waybill_JSON.address); }else{
                    $('#waybill_address_v').html("-");
                }
                if(waybill_JSON.country){ $('#waybill_country_v').html(waybill_JSON.country); }else{
                    $('#waybill_country_v').html("-");
                }
                if(waybill_JSON.state){ $('#waybill_state_v').html(waybill_JSON.state); }else{
                    $('#waybill_state_v').html("-");
                }
                if(waybill_JSON.city){ $('#waybill_city_v').html(waybill_JSON.city); }else{
                    $('#waybill_city_v').html("-");
                }
                if(waybill_JSON.zip ){ $('#waybill_zipcode_v').html(waybill_JSON.zip); }else{
                    $('#waybill_zipcode_v').html("-");
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
                basicmodal("", "An error occured when retriving this order details.");
            }
        }    
    });
}
/* ------------------------- GRAB ODER DETAILS BY ORDER ID ------------------------ */



/* ------------------------- UPDATE DELIVERY ADDRESS ------------------------ */
const updateDeliveryAddress=()=>{
    let waybill_address = $('#waybill_address').val();
    let waybill_country = $('#countryList').val();
    let waybill_state = $('#stateList').val();
    let waybill_city = $('#waybill_city').val();
    let waybill_zip = $('#waybill_zipcode').val();
    if(!waybill_address || !waybill_country || !waybill_state || !waybill_city || !waybill_zip){
        basicmodal("", "Please fill all details");
    }else{
        startPageLoader();
        let pathname = window.location.search;
        let queryString = new URLSearchParams(pathname);
        let order_hash = queryString.get("ORD");
        $.ajax({
            url: `${liveMobileUrl}/order/${order_hash}/delivery`,
            type: "POST",
            "timeout": 25000,
            "headers": {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('authToken')
            },
            "data": JSON.stringify({
                "address": waybill_address,
                "country": waybill_country,
                "state": waybill_state,
                "city": waybill_city,
                "zip": waybill_zip
            }),
            success: function(response) { 
                EndPageLoader();
                console.log(response);
                if(response.error === true){
                    // alert(response.message);
                    responsemodal("erroricon.png", "Error", response.message);
                }else{
                    // alert(response.message);
                    responsemodal("successicon.png", "Success", response.message);  
                    grabSingleOrderDetails();       
                    $('#delivery-address-details, #openDeliveryAddressField_Button').show();
                    $('#deliveryAddressForm').hide();     
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
/* ------------------------- UPDATE DELIVERY ADDRESS ------------------------ */



/* ----------------------------- // INPUT PAYMENT ---------------------------- */
function makePayment() {

    let amount  = document.querySelector('#total_price');
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);

    let first_name = user.user.first_name;
    let last_name = user.user.last_name;
    let name = first_name+" "+last_name;
    let email = user.user.email;
    let phonenumber = user.user.phone;

    if(amount.value==""||amount.value===null){
        basicmodal("", "Could not grab total price");
    }else{
        // console.log(amount.value);
    //     // Set Configuration 
    //     // https://www.youtube.com/watch?v=fwpu3NfkmwM
    //     // The api_key "FLWPUBK_TEST-SANDBOXDEMOKEY-X" is for test mode. It was gotten from dashboard|settings|apis
    //     // Note: For Javascript copy Public Key, PHP/Python server side copy Secret Key
    //     // tx_ref: transaction reference (unique) check developer.flutterwave.com/docs/flutterwave-standard 
    //     // After their modal for payment has appeared, we can make use of their test cards in developer.flutterwave.com/docs/test-cards
    //     // Type	Card number	CVV	PIN	Expiry	OTP
    //     // MasterCard PIN authentication	5531886652142950	564	3310	09/32	12345

        FlutterwaveCheckout({
            public_key: `${FLW_PUBLIC_KEY}`,
            tx_ref: "ZOWASELFUND-"+Math.floor((Math.random()*1000000000)+1),
            amount: amount.value,
            currency: "NGN",
            // payment_options: "card, banktransfer, ussd",
            // redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
            // meta: {
            //     consumer_id: 23,
            //     consumer_mac: "92a3-912ba-1192a",
            // },
            customer: {
                email: email,
                phone_number: phonenumber,
                name: name,
            },
            customizations: {
                title: "Zowasel",
                description: "Make Payment for items in Input Cart",
                logo: "https://zowaselassets-com.stackstaging.com/zowaselICO.png",
            },
            callback:function(data){
                console.log(data, "FLW Callback Function");
                // let transaction_reference = data.tx_ref;
                let transaction_id = data.transaction_id;
                let transaction_reference = data.tx_ref;
                if(data.status=="successful"){
                    alert("Payment was successfully completed! \nTransaction Reference:" + transaction_reference);
                    // responsemodal("successicon.png", "Success", "Payment was successfully completed! \nTransaction Reference:" + transaction_reference);
                    setTimeout(()=>{
                        verifyTransaction(`${transaction_id}`, transaction_reference);
                        alert("Crediting the enduser");
                    },2000)
                }
                
                
            }
        });
    }
}


function verifyTransaction(trans_id, trans_ref){
    alert("Verify Transaction "+trans_id+" - Reference "+trans_ref);
    startPageLoader();
    // setTimeout(()=>{
    //     console.log($('#order_details').val(), "ORDER DETAILS");
    // },2000)

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    
    let user_id = user.user.id;
    let userPaymentType = user.type;
    let partial;
    if(userPaymentType == "red-hot"){
        partial = false;
    }else{
        partial = true;
    }
    
    let amount  = document.getElementById('total_price');
    let order_type  = document.getElementById('order_type');
    let order_type_id  = document.getElementById('order_type_id');
    let order_hash = document.getElementById('order_hash');
    
    $.ajax({
        url: `${liveMobileUrl}/transaction/verify`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "transaction_id": trans_id,
            "transaction_ref": trans_ref,
            "order": order_hash.value,
            "partial": partial
        }),
        success: function(response) { 
            EndPageLoader();
            console.log(response);
            if(response.error === true){
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
}
/* ----------------------------- // INPUT PAYMENT ----------------------------- */