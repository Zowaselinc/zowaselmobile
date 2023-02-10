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









const today = new Date().toISOString().split("T")[0];
var date = $('.today_date_picker');
date.attr('min', today);



/************************************************************************************
 * /* -------------------- // POPULATE ORDER DETAILS ------------------- *
 ************************************************************************************/
 const populateOrderSummaryDetails =()=>{

    // alert('fe');
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    let order_hash = localStorage.getItem('orderHash');

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
            $('.loader').addClass('loader-hidden');
            // console.log(response, "The get all category response");
            if(response.error == true){
                // alert(response.message);
                basicmodal("", response.message);
                $('.loader').addClass('loader-hidden');
            }else{
                // alert(response.message);
                let thedata = response.data;
                let croprequest = response.crop_request;
                let rowContent = "";
                let index;
                console.log(thedata, "Order data");
                console.log(JSON.parse(thedata.negotiation.message));
                console.log(JSON.parse(thedata.products), "Products");


                // PRICING DETAILS
                $('.accepted_price').html("NGN "+JSON.parse(thedata.negotiation.message).price);
                $('.confirmed_quantity').html(JSON.parse(thedata.negotiation.message).qty);
                $('.total_price').html("NGN "+thedata.total);


                // PURCHASE ORDER
                $('.F_color').html(JSON.parse(thedata.products)[0].specification.color);
                $('.F_moisture').html(JSON.parse(thedata.products)[0].specification.moisture);
                $('.F_foreign_matters').html(JSON.parse(thedata.products)[0].specification.foreign_matter);
                $('.F_brokenGrain').html(JSON.parse(thedata.products)[0].specification.broken_grains);
                $('.F_weevil').html(JSON.parse(thedata.products)[0].specification.weevil);
                if(JSON.parse(thedata.products)[0].specification.damaged_kernel){
                    $('.F_damaged_kernel').html(JSON.parse(thedata.products)[0].specification.damaged_kernel+"%");
                }else{ $('.F_damaged_kernel').html("-"); }
                $('.F_rotten').html(JSON.parse(thedata.products)[0].specification.rotten_shriveled);
                $('.F_test_weight').html(JSON.parse(thedata.products)[0].specification.test_weight);
                $('.F_hardness').html(JSON.parse(thedata.products)[0].specification.hardness);
                $('.F_splits').html(JSON.parse(thedata.products)[0].specification.splits);
                $('.F_oil_content').html(JSON.parse(thedata.products)[0].specification.oil_content);
                $('.F_infestation').html(JSON.parse(thedata.products)[0].specification.infestation);
                if(JSON.parse(thedata.products)[0].specification.grain_size){
                    $('.F_grain_size').html(JSON.parse(thedata.products)[0].specification.grain_size);
                }else{ $('.F_grain_size').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.hectoliter_weight){
                    $('.F_hectoliter_weight').html(JSON.parse(thedata.products)[0].specification.hectoliter_weight+"%");
                }else{ $('.F_hectoliter_weight').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.total_defects){
                    $('.F_total_defects').html(JSON.parse(thedata.products)[0].specification.total_defects);
                }else{ $('.F_total_defects').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.dockage){
                    $('.F_dockage').html(JSON.parse(thedata.products)[0].specification.dockage);
                }else{ $('.F_dockage').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.ash_content){
                    $('.F_ash_content').html(JSON.parse(thedata.products)[0].specification.ash_content);
                }else{ $('.F_ash_content').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.volatile){
                    $('.F_volatile').html(JSON.parse(thedata.products)[0].specification.volatile);
                }else{ $('.F_volatile').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.mold){
                    $('.F_mold').html(JSON.parse(thedata.products)[0].specification.mold);
                }else{ $('.F_mold').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.drying_process){
                    $('.F_drying_process').html(JSON.parse(thedata.products)[0].specification.drying_process);
                }else{ $('.F_drying_process').html("-"); }
                
                
                
                // PURCHASE ORDER
                $('.color').html(JSON.parse(thedata.negotiation.message).color);
                $('.moisture').html(JSON.parse(thedata.negotiation.message).moisture);
                $('.foreign_matters').html(JSON.parse(thedata.negotiation.message).foreign_matter);
                $('.brokenGrain').html(JSON.parse(thedata.negotiation.message).broken_grains);
                $('.weevil').html(JSON.parse(thedata.negotiation.message).weevil);
                if(JSON.parse(thedata.negotiation.message).damaged_kernel){
                    $('.damaged_kernel').html(JSON.parse(thedata.negotiation.message).damaged_kernel+"%");
                }else{ $('.damaged_kernel').html("-"); }
                $('.rotten').html(JSON.parse(thedata.negotiation.message).rotten_shriveled);
                $('.test_weight').html(JSON.parse(thedata.negotiation.message).test_weight);
                $('.hardness').html(JSON.parse(thedata.negotiation.message).hardness);
                $('.splits').html(JSON.parse(thedata.negotiation.message).splits);
                $('.oil_content').html(JSON.parse(thedata.negotiation.message).oil_content);
                $('.infestation').html(JSON.parse(thedata.negotiation.message).infestation);
                if(JSON.parse(thedata.negotiation.message).grain_size){
                    $('.grain_size').html(JSON.parse(thedata.negotiation.message).grain_size);
                }else{ $('.grain_size').html("-"); }
                if(JSON.parse(thedata.negotiation.message).hectoliter_weight){
                    $('.hectoliter_weight').html(JSON.parse(thedata.negotiation.message).hectoliter_weight+"%");
                }else{ $('.hectoliter_weight').html("-"); }
                if(JSON.parse(thedata.negotiation.message).total_defects){
                    $('.total_defects').html(JSON.parse(thedata.negotiation.message).total_defects);
                }else{ $('.total_defects').html("-"); }
                if(JSON.parse(thedata.negotiation.message).dockage){
                    $('.dockage').html(JSON.parse(thedata.negotiation.message).dockage);
                }else{ $('.dockage').html("-"); }
                if(JSON.parse(thedata.negotiation.message).ash_content){
                    $('.ash_content').html(JSON.parse(thedata.negotiation.message).ash_content);
                }else{ $('.ash_content').html("-"); }
                if(JSON.parse(thedata.negotiation.message).volatile){
                    $('.volatile').html(JSON.parse(thedata.negotiation.message).volatile);
                }else{ $('.volatile').html("-"); }
                if(JSON.parse(thedata.negotiation.message).mold){
                    $('.mold').html(JSON.parse(thedata.negotiation.message).mold);
                }else{ $('.mold').html("-"); }
                if(JSON.parse(thedata.negotiation.message).drying_process){
                    $('.drying_process').html(JSON.parse(thedata.negotiation.message).drying_process);
                }else{ $('.drying_process').html("-"); }


                // Others
                if(JSON.parse(thedata.products)[0].subcategory.name){
                    $('.crop_type').html(JSON.parse(thedata.products)[0].subcategory.name+" "+JSON.parse(thedata.products)[0].specification.color);
                }else{ $('.crop_type').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.model_type){
                    $('.offer_type').html(JSON.parse(thedata.products)[0].specification.model_type);
                }else{ $('.offer_type').html("-"); }
                if(JSON.parse(thedata.negotiation.message).qty){
                    $('.crop_quantity').html(JSON.parse(thedata.negotiation.message).qty);
                }else{ $('.crop_quantity').html("-"); }
                if(JSON.parse(thedata.negotiation.message).qty){
                    $('.crop_quantity').html(JSON.parse(thedata.negotiation.message).qty);
                }else{ $('.crop_quantity').html("-"); }
                if(croprequest.delivery_window){
                    $('.delivery_window').html(croprequest.delivery_window);
                }else{ $('.delivery_window').html("-"); }
                if(thedata.buyer.first_name){
                    $('.buyer_details').html(thedata.buyer.first_name+" "+thedata.buyer.last_name);
                }else{ $('.buyer_details').html("-"); }
                if(thedata.negotiation.updated_at){
                    $('.accepted_date').html(thedata.negotiation.updated_at);
                }else{ $('.accepted_date').html("-"); }
                if(thedata.seller.first_name){
                    $('.seller_details').html(thedata.seller.first_name+" "+thedata.seller.last_name);
                }else{ $('.seller_details').html("-"); }



                /********************************
                 * FOR WAYBILLDETAILS.HTML PAGE *
                 ********************************/
                $('#seller_details').val(thedata.seller.first_name+" "+thedata.seller.last_name);
                $('#buyer_details').val(thedata.buyer.first_name+" "+thedata.buyer.last_name);
                // JSON.parse(thedata.products)[0].specification.color

                // Pick up the last item in the product array BCOS the last one is the one agreed on
                let parsedProduct = JSON.parse(thedata.products);
                let thelastproduct = parsedProduct.at(-1);
                console.log(thelastproduct, "thelastproduct");

                $('#product_description').val(thelastproduct.description);
                $('#product_quantity').val(thelastproduct.specification.qty);
                $('#product_details').val(thedata.products);
                /********************************
                 * FOR WAYBILLDETAILS.HTML PAGE *
                 ********************************/
             
                    
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
/************************************************************************************
 * /* -------------------- // POPULATE ORDER DETAILS ------------------- *
 ************************************************************************************/











/************************************************************************************
 * /* ------------------------- UPDATE WAYBILL DETAILS ------------------------- 
 ************************************************************************************/
const waybillDetailsPage =()=>{

    let order_hash = localStorage.getItem('orderHash');

    startPageLoader();
    // console.log($('#product_details').val());

    $.ajax({
        url: `${localBaseUrl}/order/${order_hash}/waybilldetails`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "waybill_details": {
                "dispatch_section": {
                    "from": $('#seller_details').val(),
                    "to": $('#buyer_details').val(),
                    "date": $('#dispatch_date').val(),
                    "cosignee": $('#cosignee').val(),
                    "truck_number": $('#truck_number').val(),
                    "description": $('#product_description').val(),
                    "quantity": $('#product_quantity').val(),
                    "remarks": $('#remarks').val(),
                    "drivers_data": {
                        "drivers_name": $('#driver_name').val(),
                        "driving_license": $('#driver_license').val(),
                        "date": $('#driver_details_date').val()
                    },
                    "sellers_data": {
                        "sellers_representative": $('#seller_representative').val(),
                        "title": $('#seller_title').val(),
                        "date": $('#seller_details_date').val()
                    },
                    "items": $('#product_details').val()
                },
                "receipt_section": {
                    "remarks": $('#receipt_remark').val(),
                    "sellers_data": {
                        "sellers_representative": $('#receipt_seller_rep').val(),
                        "title": $('#receipt_seller_title').val(),
                        "date": $('#receipt_seller_rep_currentdate').val()
                    },
                    "recipient_data": {
                        "received_by": $('#receipt_receiver').val(),
                        "title": $('#receipt_receiver_title').val(),
                        "date": $('#receipt_receiver_currentdate').val()
                    },
                    "items": $('#product_details').val()
                }
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
                setTimeout(()=>{
                    location.assign('ordertracking.html');
                },2500)      
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
/************************************************************************************
 * /* ------------------------- UPDATE WAYBILL DETAILS ------------------------- 
 ************************************************************************************/