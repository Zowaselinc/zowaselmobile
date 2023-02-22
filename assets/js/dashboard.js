// import { localBaseUrl, liveMobileUrl } from './env.js';
console.log(localBaseUrl);
console.log(liveMobileUrl);
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

    if(!(user.user.primary_address)){ $('.primary_address').text("Null"); }else{ 
        $('.primary_address').text(user.user.primary_address); 
        $('.primary_address').val(user.user.primary_address); 
    }

    if(!(user.user.secondary_address)){ $('.secondary_address').text("Null"); }else{ 
        $('.secondary_address').text(user.user.secondary_address); 
        $('.secondary_address').val(user.user.secondary_address); 
    }
    
    if(!(user.user.country)){ $('.country').text("Null"); }else{ 
        $('.country').text(user.user.country); 
        $('.country').input(user.user.country); 
    }
    
    if(!(user.user.state)){ $('.state').text("Null"); }else{ 
        $('.state').text(user.user.state); 
        $('.state').val(user.user.state); 
    }
    
    if(!(user.user.city)){ $('.city').text("Null"); }else{ 
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


const buttommenu =()=>{
    $.get( "components/buttommenu.html", function( data ) {
          $( "#buttommenu" ).html( data );
        //   console.log(data,"grgr");
    })

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
            FlutterwaveCheckout({
                public_key: "FLWPUBK_TEST-a1b8a6d0b897f10b7332e3af9f902c70-X",
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
            console.log(response, "The wallet response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                let row = response.data;

                function toCommas(value) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }

                $('.wallet_balance').text(toCommas(row[0].balance));
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
/* --------------------------- GRAB WALLET DETAILS -------------------------- */







/* ------------------------------ FETCH CROPS WANTED ----------------------------- */
function fetchWantedCrops(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let theURL, gotoProductdetails, currentPage;
    if(usertype == "corporate"){
        theURL = `crop/wanted/${userid}`;
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
                console.log(thedata, "erfrefre");
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
                            if(specification.color){ thecolor = row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }

                        rowContent += `
                        <li class="lazy" onclick="localStorage.setItem('singleproductID',${row.id}); ${currentPage}
                        location.assign('${gotoProductdetails}')">
                            <div class="item-content" style="background:whitesmoke;padding-left:8px;">
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <h6 class="item-title"><a href="${gotoProductdetails}">${row.subcategory.name} ${thecolor}</a></h6>
                                        <div class="item-subtitle">${row.category.name}</div>
                                    </div>
                                    <div class="item-footer">
                                        <div class="">
                                            
                                            <h6>${row.user.first_name}</h6>
                                        </div>    
                                    </div>
                                </div>
                                <div class="item-media media media-90" style="flex:1;">
                                    <h6 class="me-3 text-success">NGN ${theprice} / ${thetest_weight}</h6>
                                </div>
                            </div>
                        </li>
                        `;   
                    }
                    $('#wantedcrops').html(rowContent);
        
        
          
                }else{
                    $('#wantedcrops').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No crop wanted yet</h5></td></tr>");
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
/* ------------------------------ FETCH CROPS WANTED ------------------------------ */







/* ------------------------------ FETCH ALL CROPS FOR SALE ----------------------------- */
function fetchAllCropsForSale(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let theURL, gotoProductdetails, currentPage;
    if(usertype == "corporate"){
        theURL = `crop/getbycropoffer`;
        gotoProductdetails = `productdetails.html`;
        currentPage = `localStorage.setItem('last_input_crop_page', 'cropsforsale.html')`;
    }else{
        theURL = `crop/getbycropwanted`;
        // gotoProductdetails = `mypersonalproductdetails.html`;
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
                let index;
                console.log(thedata, "erfrefre");
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
                            if(specification.color){ thecolor = row.specification.color; }else{ thecolor = ""; }
                            if(specification.price){ theprice = row.specification.price; }else{ theprice = ""; }
                            if(specification.test_weight){ thetest_weight = row.specification.test_weight; }else{ thetest_weight = ""; }
                        }else{
                            thecolor = "";
                            theprice = "";
                        }

                        rowContent += `
                        <li class="lazy" onclick="localStorage.setItem('singleproductID',${row.id}); ${currentPage}
                        location.assign('${gotoProductdetails}')">
                            <div class="item-content" style="background:whitesmoke;padding-left:8px;">
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <h6 class="item-title"><a href="${gotoProductdetails}">${row.subcategory.name} ${thecolor}</a></h6>
                                        <div class="item-subtitle">${row.category.name}</div>
                                    </div>
                                    <div class="item-footer">
                                        <div class="">
                                            
                                            <h6>${row.user.first_name}</h6>
                                        </div>    
                                    </div>
                                </div>
                                <div class="item-media media media-90" style="flex:1;">
                                    <h6 class="me-3 text-success">NGN ${theprice} / ${thetest_weight}</h6>
                                </div>
                            </div>
                        </li>
                        `;   
                    }
                    $('#p_allcropsforsale').html(rowContent);
        
        
          
                }else{
                    $('#p_allcropsforsale').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No crop for sale yet</h5></td></tr>");
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
                $('.productOwnerFarmName').html(thedata.user.first_name);

                let isverified;
                if(thedata.user.is_verified === 0){
                    isverified = `<img src="../logos/unavailable.png" alt="">&nbsp; Unverified merchant`;
                }else{
                    isverified = `<img src="../logos/verified.svg" alt="">&nbsp; Verified merchant`;
                }

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
                        let watchExtension = thedata.video.split('watch?v=')[1];
                        videoLink = "https://www.youtube.com/embed/"+watchExtension;
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
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
            }
        }
    })
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
                $('.productName').html(thedata.category.name+" "+thedata.specification.color);
                $('.productDescription').html(thedata.description);
                $('.productOwnerFarmName').html(thedata.user.first_name);

                let isverified;
                if(thedata.user.is_verified === 0){
                    isverified = `<img src="../logos/unavailable.png" alt="">&nbsp; Unverified merchant`;
                }else{
                    isverified = `<img src="../logos/verified.svg" alt="">&nbsp; Verified merchant`;
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
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
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
        location.assign('negotiate.html');
    }
}
/* ----------------------- GET SINGLE PRODUCT DETAILS ----------------------- */







/* ------------------------------- NEGOTIATION ------------------------------ */
const populateUserandFarmOwnerNegotiationMessages =()=>{

    let singleproductID = localStorage.getItem('singleproductID');
    let productOwnerDetails = localStorage.getItem('productOwnerDetails');

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
                                }else{
                                    accept_decline_checkbox = `We will let you know when corporate accepts/declines offer.`;
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
                                                <button>View Full Specification</button>
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
                    
                    $('[data-toggle="tooltip"]').tooltip('toggle');
                    setTimeout(()=>{
                        $('[data-toggle="tooltip"]').tooltip('hide');
                    },10000)  
                    
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
                // setTimeout(()=>{
                //     logout();
                // },3000)
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
                                }else{
                                    accept_decline_checkbox = `We will let you know when corporate accepts/declines offer.`;
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
                                                <button>View Full Specification</button>
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
                    
                    $('[data-toggle="tooltip"]').tooltip('toggle');
                    setTimeout(()=>{
                        $('[data-toggle="tooltip"]').tooltip('hide');
                    },10000)  
                    
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
                // basicmodal("", textstatus+"<br/>This session has ended, Login again");
                // setTimeout(()=>{
                //     logout();
                // },3000)
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
    if(negotiationtextmessage.value){
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
                "message": negotiationtextmessage.value
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
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
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
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
            }
        }
    });
}
/* ------------------------- FETCH PRODUCT CATEGORY ------------------------- */



/* ------------------------- FETCH CROP SUBCATEGORY ------------------------- */
const addCropPage =()=>{

    // ponetohundredpercent
    $(document).ready(function(){
        let rowContent = "";
        for(let i=1; i<=100; i++){
            rowContent += `
                <option value="${i}">${i}%</option>
            `;   
        }
        $('.ponetohundredpercent').html(rowContent);
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
        let rowContent = "";
        for(let i=1; i<=100; i++){
            rowContent += `
                <option value="${i}">${i}%</option>
            `;   
        }
        $('.ponetohundredpercent').html(rowContent);
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
            EndPageLoader
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
    
    let application, manufacture_name, packaging;
    if(activePage=="/dashboard/addcropauction.html"||activePage=="/dashboard/addcrop.html"){
        application = document.getElementById('application');
        manufacture_name = document.getElementById('manufacture_name');
        packaging = document.getElementById('packaging');
    }
    
    let moisturecontent = document.getElementById('moisturecontent');
    let foreignmatter = document.getElementById('foreignmatter');
    let testweight = document.getElementById('testweight');
    let negotiable = document.getElementById('negotiable');
    let editor = document.getElementById('editor');
    let currency = document.getElementById('currency');
    let quantity = document.getElementById('quantity');
    let amount = document.getElementById('amount');
    let windowFrom = document.getElementById('windowFrom');
    let countryList = document.getElementById('countryList');
    let stateList = document.getElementById('stateList');
    let videourl = document.getElementById('videourl');
    let zipcode = document.getElementById('zipcode');
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

    formData.append("user_id", user.user.id);
    // formData.append("title", croptitle.value);
    formData.append("category_id", category.value);
    formData.append("subcategory_id", subcategory.value);
    formData.append("active", "1");
    formData.append("description", editor.value);
    formData.append("currency", currency.value);
    formData.append("is_negotiable", negotiable.value);
    formData.append("video", videourl.value);
    
    if(activePage=="/dashboard/addcropauction.html"||activePage=="/dashboard/addcrop.html"){
        formData.append("application", application.value);
        formData.append("manufacture_name", manufacture_name.value);
        formData.append("packaging", packaging.value);
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
    formData.append("infested_by_weight", "2");
    formData.append("curcumin_content", curcumincontent.value);
    formData.append("extraneous", extaneous.value);
    formData.append("unit", "kg");
    formData.append("state", stateList.value);
    formData.append("zip", zipcode.value);
    formData.append("country", countryList.value);
    formData.append("address", "Zuba");
    formData.append("delivery_method", "Delivery");
    formData.append("delivery_date", "2023/02/12");
    formData.append("delivery_window", "2023/02/01-2023/03/15");
    formData.append("warehouse_address", "2 Wasrehouse street, Lagos");
    formData.append("moisture_content", moisturecontent.value);

    // formData.append("file", fileInput.files[0], "cornproduct_resize.jpg");
    // formData.append("file2", fileInput.files[0], "maizethumbnail_resized.jpg");



    //Loop through array of file and append formData Data
    for (var i = 0; i < cropfilesToUpload.length; i++) {
        var file = cropfilesToUpload[i];
        var filename = cropfilesToUpload[i].name;
        formData.append("image"+i, file, filename);
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
    var settings = {
        "url": `${liveMobileUrl}/crop/${croptype}/add`,
        "method": "POST",
        "timeout": 0,
        "headers": {
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
                // $("#addInputForm")[0].reset();
                $('.dialogbox').addClass('d-none');
                $('.dialogbox').removeClass('d-block');
                const activePage = window.location.pathname;
                // alert(activePage);
                let croptype;
                if(activePage=="/dashboard/addcropauction.html"){
                    croptype = "auction";
                    location.assign('auctionedcrops.html');
                }else if(activePage=="/dashboard/addcrop.html"){
                    croptype = "sale";
                    location.assign('viewusercropsforsale.html');
                }else if(activePage=="/dashboard/addcropwanted.html"){
                    croptype = "wanted";
                    location.assign('cropswanted.html');
                }
                // location.assign('viewusercropsforsale.html');
            },2000)
            
        }
    });




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

                        rowContent += `
                        <li onclick="goToInputDetails1(${row.id})" style="background:whitesmoke;padding: 13px 15px 0px;">
                        <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                        <div class="item-content">
                            <div class="item-inner w-100">
                                <div class="item-title-row mb-0">
                                    <h6 class="item-title"><a>${row.product_type}</a></h6>
                                    <div class="item-subtitle text-truncate">${row.description}</div>
                                </div>
                                <div class="item-footer">
                                    <div class="d-flex align-items-center">
                                        <h6 class="me-3 mb-0">NGN ${row.price}</h6>
                                    </div>    
                                    
                                </div>
                            </div>
                            <div class="item-media media media-90">
                                <a href="javascript:void(0);" class="item-bookmark icon-2">
                                    
                                </a>    
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
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
            }
        }
    });
}



// MERCHANT SIDE
function fetchMerchantAddedInputs(){

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

                        rowContent += `
                        <li onclick="goToInputDetails2(${row.id})" style="background:whitesmoke;padding: 13px 15px 0px;">
                        <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row mb-0" style="width:80%;">
                                    <h6 class="item-title"><a>${row.category.name}</a></h6>
                                    <div class="item-subtitle text-truncate">${row.description}</div>
                                </div>
                                <div class="item-footer">
                                    <div class="d-flex align-items-center">
                                        <h6 class="me-3 mb-0">NGN ${row.price}</h6>
                                    </div>    
                                    
                                </div>
                            </div>
                            <div class="item-media media media-90">
                                <a href="javascript:void(0);" class="item-bookmark icon-2">
                                    
                                </a>    
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
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
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
    let singleInputDetails = $('#rowdetails'+n).text();
    // alert(singleInputDetails);
    localStorage.setItem('singleInputDetails', singleInputDetails);
    localStorage.setItem('last_input_crop_page',"viewuseraddedinput.html");
}


function populateSingleInputDetails(){
    let singleInputDetails = localStorage.getItem('singleInputDetails');
    let input = JSON.parse(singleInputDetails);
    console.log(input);

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
        $('.productName').html(input.product_type);
        $('.productAmount').html(input.price);
        $('.productDescription').html(input.description);
        $('.usageinstruction').html(input.usage_instruction);
        $('.cropfocus').html(input.crop_focus);
        $('.stock').html(input.stock);
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

                        rowContent += `
                        <li>
                            <div class="item-content single-cart-item">

                            <button type="button" class="btn text-white updatecartBtn" onclick="updateCart(${row.id},${row.input_id},${row.price},'${100}')"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn text-white deletecartBtn" onclick="deleteCart(${row.id})">x</button>

                                <div class="item-media media media-60">

                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row mb-0">
                                        <h6 class="item-title"><a href="order-list.html">Input</a></h6>
                                        <div class="item-subtitle">Naziri's Farm</div>
                                    </div>
                                    <div class="item-footer mb-0">
                                        <div class="d-flex align-items-center">
                                            <h6 class="me-3">${row.input.currency} ${row.price}</h6>
                                            <input type="hidden" value="${row.input.stock}" id="stock${row.id}" />
                                        </div>    
                                        <div class="d-flex align-items-center">
                                            <div class="dz-stepper border-1">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                    <span class="input-group-btn input-group-prepend">
                                                        <button class="btn btn-primary bootstrap-touchspin-down" onclick="decrement(${row.id},${row.price})" type="button">-</button>
                                                    </span>
                                                    <input class="stepper form-control" type="text" id="quantity${row.id}" value="${row.quantity}" name="demo3" />
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
            $('.total_price_count').html(total_price_count);
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
/* -------------------------------- CART PAGE ------------------------------- */










/* --------------------- FETCH CROPS FOR SALE BY USERID --------------------- */
function fetchUserCropsforSaleByUserID(){
    startPageLoader();

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    $.ajax({
        url: `${liveMobileUrl}/crop/offer/`+userid,
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

                        rowContent += `
                        <li onclick="goToMyPersonalCropDetails1(${row.id})" style="background:whitesmoke;padding: 13px 15px 0px;">
                        <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                        <div class="item-content">
                            <div class="item-inner w-100">
                                <div class="item-title-row mb-0">
                                    <h6 class="item-title"><a>${row.category.name} - ${thecolor}</a></h6>
                                    <div class="item-subtitle text-truncate">${row.description}</div>
                                </div>
                                <div class="item-footer">
                                    <div class="d-flex align-items-center">
                                        <h6 class="me-3 mb-0">NGN ${theprice}</h6>
                                    </div>    
                                    
                                </div>
                            </div>
                            <div class="item-media media media-90">
                                <a href="javascript:void(0);" class="item-bookmark icon-2">
                                    
                                </a>    
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
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
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
function fetchUserCropsforAuctionByUserID(){
    startPageLoader();

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    $.ajax({
        url: `${liveMobileUrl}/crop/auction/`+userid,
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
                let index;
                console.log(thedata, "erfrefre");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                      // console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let therow = JSON.stringify(row);

                        rowContent += `
                        <li onclick="goToMyPersonalCropDetails2(${row.id})" style="background:whitesmoke;padding: 13px 15px 0px;">
                        <div class="d-none" id="rowdetails${row.id}">${therow}</div>
                        <div class="item-content">
                            <div class="item-inner w-100">
                                <div class="item-title-row mb-0">
                                    <h6 class="item-title"><a>${row.category.name} - ${row.specification.color}</a></h6>
                                    <div class="item-subtitle text-truncate">${row.description}</div>
                                </div>
                                <div class="item-footer">
                                    <div class="d-flex align-items-center">
                                        <h6 class="me-3 mb-0">NGN ${row.specification.price}</h6>
                                    </div>    
                                    
                                </div>
                            </div>
                            <div class="item-media media media-90">
                                <a href="javascript:void(0);" class="item-bookmark icon-2">
                                    
                                </a>    
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
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
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
    startPageLoader();

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let singleproductID = localStorage.getItem('singleproductID');

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
            if(textstatus==="timeout") {
                basicmodal("", "Service timed out");
            } else {
                // alert(textstatus);
                basicmodal("", textstatus);
            }
        }
    });
}
/* -------------------------- ACCEPT OFFER DIRECTLY ------------------------- */