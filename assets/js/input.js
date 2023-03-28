/* ----------------------------- // INPUT PAYMENT ---------------------------- */
const inputPaymentPage=()=>{
    const fundWalletForm = document.getElementById('payForOrderForm');
    fundWalletForm.addEventListener('submit', makePayment);

    function makePayment(e) {
        e.preventDefault();

        let amount  = document.getElementById('total_price');
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
                    description: "Fund your wallet",
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
/* ----------------------------- // INPUT PAYMENT ----------------------------- */