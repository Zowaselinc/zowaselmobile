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








const today = new Date().toISOString().split("T")[0];
var date = $('.today_date_picker');
date.attr('min', today);


function truncate(str, length) {
    if (str.length > length) {
        return str.slice(0, length) + '...';
    } else return str;
}



/************************************************************************************
 * /* -------------------- // POPULATE ORDER DETAILS ------------------- *
 ************************************************************************************/
 const populateOrderSummaryDetails =()=>{

    // alert('fe');
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;
    let userPaymentType = user.type;

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
                // console.log(JSON.parse(thedata.negotiation.message));
                console.log(JSON.parse(thedata.products), "Products");


                // PRICING DETAILS
                if(thedata.negotiation){
                    $('.accepted_price').html("NGN "+JSON.parse(thedata.negotiation.message).price);
                    $('.confirmed_quantity').html(JSON.parse(thedata.negotiation.message).qty);
                    $('.total_price').html("NGN "+thedata.total);   
                    $('#total_price').val(thedata.total);   
                }else{
                    let acceptedprice = JSON.parse(thedata.products)[0].specification.price;
                    let totalprice = parseInt(thedata.total);
                    let quantity =  totalprice/acceptedprice;

                    $('.accepted_price').html("NGN "+acceptedprice);
                    $('.confirmed_quantity').html(quantity);
                    $('.total_price').html("NGN "+totalprice);
                    $('#total_price').val(totalprice); 
                }

                if(userPaymentType=="red-hot"){
                    $('.redHot').show();
                    $('input:radio[name="payment_option"]').filter('[value="Full payment"]').attr('checked', true);
                }else{
                    $('.redHot, .notRedHot').show();
                    $('input:radio[name="payment_option"]').filter('[value="Full payment"]').attr('checked', true);
                }


                // FULL SPECIFICATION
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
                if(thedata.negotiation){

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

                }else{

                    $('.color').html(JSON.parse(thedata.products)[0].specification.color);
                    $('.moisture').html(JSON.parse(thedata.products)[0].specification.moisture);
                    $('.foreign_matters').html(JSON.parse(thedata.products)[0].specification.foreign_matter);
                    $('.brokenGrain').html(JSON.parse(thedata.products)[0].specification.broken_grains);
                    $('.weevil').html(JSON.parse(thedata.products)[0].specification.weevil);
                    if(JSON.parse(thedata.products)[0].specification.damaged_kernel){
                        $('.damaged_kernel').html(JSON.parse(thedata.products)[0].specification.damaged_kernel+"%");
                    }else{ $('.damaged_kernel').html("-"); }
                    $('.rotten').html(JSON.parse(thedata.products)[0].specification.rotten_shriveled);
                    $('.test_weight').html(JSON.parse(thedata.products)[0].specification.test_weight);
                    $('.hardness').html(JSON.parse(thedata.products)[0].specification.hardness);
                    $('.splits').html(JSON.parse(thedata.products)[0].specification.splits);
                    $('.oil_content').html(JSON.parse(thedata.products)[0].specification.oil_content);
                    $('.infestation').html(JSON.parse(thedata.products)[0].specification.infestation);
                    if(JSON.parse(thedata.products)[0].specification.grain_size){
                        $('.grain_size').html(JSON.parse(thedata.products)[0].specification.grain_size);
                    }else{ $('.grain_size').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.hectoliter_weight){
                        $('.hectoliter_weight').html(JSON.parse(thedata.products)[0].specification.hectoliter_weight+"%");
                    }else{ $('.hectoliter_weight').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.total_defects){
                        $('.total_defects').html(JSON.parse(thedata.products)[0].specification.total_defects);
                    }else{ $('.total_defects').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.dockage){
                        $('.dockage').html(JSON.parse(thedata.products)[0].specification.dockage);
                    }else{ $('.dockage').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.ash_content){
                        $('.ash_content').html(JSON.parse(thedata.products)[0].specification.ash_content);
                    }else{ $('.ash_content').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.volatile){
                        $('.volatile').html(JSON.parse(thedata.products)[0].specification.volatile);
                    }else{ $('.volatile').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.mold){
                        $('.mold').html(JSON.parse(thedata.products)[0].specification.mold);
                    }else{ $('.mold').html("-"); }
                    if(JSON.parse(thedata.products)[0].specification.drying_process){
                        $('.drying_process').html(JSON.parse(thedata.products)[0].specification.drying_process);
                    }else{ $('.drying_process').html("-"); }

                }


                // Others
                if(JSON.parse(thedata.products)[0].subcategory.name){
                    $('.crop_type').html(JSON.parse(thedata.products)[0].subcategory.name+" "+JSON.parse(thedata.products)[0].specification.color);
                }else{ $('.crop_type').html("-"); }
                if(JSON.parse(thedata.products)[0].specification.model_type){
                    $('.offer_type').html(JSON.parse(thedata.products)[0].specification.model_type);
                }else{ $('.offer_type').html("-"); }

                if(thedata.negotiation){
                    if(JSON.parse(thedata.negotiation.message).qty){
                        $('.crop_quantity').html(JSON.parse(thedata.negotiation.message).qty);
                    }else{ $('.crop_quantity').html("-"); }
                }else{
                    let acceptedprice = JSON.parse(thedata.products)[0].specification.price;
                    let totalprice = parseInt(thedata.total);
                    let quantity =  totalprice/acceptedprice;
                    if(quantity){
                        $('.crop_quantity').html(quantity);
                    }else{ $('.crop_quantity').html("-"); }
                }
                
                if(croprequest){
                    if(croprequest.delivery_window){
                        $('.delivery_window').html(croprequest.delivery_window);
                    }else{ $('.delivery_window').html("-"); }
                }else{
                    function addWeeks(date, weeks) {
                        date.setDate(date.getDate() + 7 * weeks);
                        return date;
                    }

                    const date = new Date(thedata.created_at);
                    const newDate = addWeeks(date, 2);
                    // alert(date.toISOString()); // 2022-05-27T00:00:00.000Z
                    let startdate = thedata.created_at.split(' ')[0];
                    let enddate = newDate.toISOString().split('T')[0];
                    if(JSON.parse(thedata.products)[0].type=="offer"){
                        $('.delivery_window').html(startdate+" <i>to</i> "+enddate);
                    } 
                    
                }
                
                if(thedata.buyer.first_name){
                    $('.buyer_details').html(thedata.buyer.first_name+" "+thedata.buyer.last_name);
                }else{ $('.buyer_details').html("-"); }

                if(thedata.negotiation){
                    if(thedata.negotiation.updated_at){
                        $('.accepted_date').html(thedata.negotiation.updated_at);
                    }else{ $('.accepted_date').html("-"); }
                }else{
                    if(thedata.updated_at){
                        $('.accepted_date').html(thedata.updated_at);
                    }else{ $('.accepted_date').html("-"); }
                }

                if(thedata.seller.first_name){
                    $('.seller_details').html(thedata.seller.first_name+" "+thedata.seller.last_name);
                }else{ $('.seller_details').html("-"); }

                // First Check if Corporate has made any payment tracking details has be updated to this order
                // THEN Check if tracking details has be updated to this order
                if(usertype == "corporate"){
                    $('.corporateOrderPaymentBtn_Section').show();
                    if(!thedata.waybill_details){
                        $('.corporateNo_waybillInfo').show();
                    }else {
                        $('.corporateNo_waybillInfo').hide();

                        if(!thedata.amount_paid){
                            $('.corporateOrderPayment_button').show();
                        }else if(thedata.tracking_details){
                            $('.ordertracking_button').show();
                        }else{
                            $('.waybilldetails_button').show();
                        }
                    }

                }else{
                    if(thedata.tracking_details){
                        $('.ordertracking_button').show();
                    }

                    if(!thedata.waybill_details){
                        $('.waybilldetails_button').show();
                        $('.ordertracking_button').hide();
                    }
                }




                /********************************
                 * FOR WAYBILLDETAILS.HTML PAGE *
                 ********************************/
                $('#seller_details').val(thedata.seller.first_name+" "+thedata.seller.last_name);
                $('#buyer_details').val(thedata.buyer.first_name+" "+thedata.buyer.last_name);
                // JSON.parse(thedata.products)[0].specification.color

                // Pick up the last item in the product array BCOS the last one is the one agreed on
                let parsedProduct = JSON.parse(thedata.products);
                let thelastproduct = parsedProduct.at(-1);
                // console.log(thelastproduct, "thelastproduct");

                $('#product_description').val(thelastproduct.description);
                $('#product_quantity').val(thelastproduct.specification.qty);
                $('#product_details').val(thedata.products);
                /********************************
                 * FOR WAYBILLDETAILS.HTML PAGE *
                 ********************************/
                

                /**********************************
                 * FOR ORDERPAYMENTPAGE.HTML PAGE *
                 **********************************/
                $('#order_details').val(JSON.stringify(thedata));
                $('#order_hash').val(thedata.order_hash);
                if(thedata.negotiation_id){
                    $('#order_type').val("negotiation");
                    $('#order_type_id').val(thedata.negotiation_id);
                }else{ 
                    $('#order_type').val("order"); 
                    $('#order_type_id').val(thedata.order_hash); 
                }
                $('#order_details_negotiationID').val(JSON.stringify(thedata));
                $('#order_details').val(JSON.stringify(thedata));
                /**********************************
                 * FOR ORDERPAYMENTPAGE.HTML PAGE *
                 **********************************/



                /********************************
                 * FOR ORDERTRACKING.HTML PAGE *
                 ********************************/
                let paymentStatus;
                if(thedata.payment_status.toLowerCase() == "paid"){
                    paymentStatus = "Paid";
                }else if(thedata.payment_status.toLowerCase() == "unpaid"){
                    paymentStatus = "Pending";
                }else{
                    paymentStatus = "NILL";
                }
                $('.order_payment_status').html(paymentStatus);
                // console.log(JSON.parse(thedata.tracking_details), "tracking details");
                if(thedata.tracking_details){
                    $('.tracking_pickup_location').html(JSON.parse(thedata.tracking_details).pickup_location);
                    $('.tracking_delivered_location').html(JSON.parse(thedata.tracking_details).delivery_location);
                    $('.order_hash').html(localStorage.getItem('orderHash'));
                }


                let waybill_details = JSON.parse(thedata.waybill_details);
                // console.log("Waybill_Details", waybill_details);
                if(waybill_details){
                    $('.w_from').html(waybill_details.dispatch_section.from);
                    $('.w_to').html(waybill_details.dispatch_section.to);
                    $('.w_date').html(waybill_details.dispatch_section.date);
                    $('.w_cosignee').html(waybill_details.dispatch_section.cosignee);
                    $('.w_truckno').html(waybill_details.dispatch_section.truck_number);
                } 
                // 
                if(thelastproduct.specification.color){
                    $('.w_crop1').html(thelastproduct.subcategory.name+" - "+thelastproduct.specification.color);
                }else{
                    $('.w_crop1').html(thelastproduct.subcategory.name);
                }
                $('.w_crop1qty').html(thelastproduct.specification.qty);
                // 
                if(waybill_details){
                    $('.w_remark').html(waybill_details.dispatch_section.remarks);
                    $('.w_drivername').html(waybill_details.dispatch_section.drivers_data.drivers_name);
                    $('.w_drivingicense').html("#"+waybill_details.dispatch_section.drivers_data.driving_license);
                    $('.w_sellerRepname').html(waybill_details.dispatch_section.sellers_data.sellers_representative);
                    $('.w_sellertitle').html(waybill_details.dispatch_section.sellers_data.title);
                    $('.w_todaydate').html(new Date().toJSON().split('T')[0]);
                    // 
                    $('.w_receiptremark').html(waybill_details.receipt_section.remarks);
                    $('.w_receipt_sellerRep').html(waybill_details.receipt_section.sellers_data.sellers_representative);
                    $('.w_receipt_receiveBy').html(waybill_details.receipt_section.recipient_data.received_by);
                    $('.w_receipt_sellerTitle').html(waybill_details.receipt_section.sellers_data.title);
                    $('.w_receipt_receiverTitle').html(waybill_details.receipt_section.recipient_data.title);
                }
                // 
                /********************************
                 * FOR ORDERTRACKING.HTML PAGE *
                 ********************************/



                /***************************************
                 * FOR UPDATESHIPPINGDETAILS.HTML PAGE *
                 ***************************************/
                if(thedata.tracking_details){
                    $('.pickup_location').val(JSON.parse(thedata.tracking_details).pickup_location);
                    $('.delivery_location').val(JSON.parse(thedata.tracking_details).delivery_location);
                    let transit_info = JSON.parse(thedata.tracking_details).transit;
                    $('.oldtransit_information').val(JSON.stringify(transit_info));


                    if(thedata.tracking_details !== null){
                        let trackingdata = JSON.parse(thedata.tracking_details);
                        let rowContent, rowContent2 = "";
                        let serialnumber, index;
                        // console.log(trackingdata, "trackingdata in JSON");
                        let transit = trackingdata.transit;
                        console.log(transit, "transit");
                        if(transit.length > 0){
                            for (let i = 0; i < transit.length; i++) {
                            // console.log('Hello World', + i);
                                let row = transit[i];
                                serialnumber= i+1;
                                index = i;

                                rowContent += `
                                <tr>
                                    <td id='transit_pickuplocation${serialnumber}' style="display:none;">${trackingdata.pickup_location}</td>
                                    <td id='transit_deliverylocation${serialnumber}' style="display:none;">${trackingdata.delivery_location}</td>
                                    <td id='fulltransit_info${serialnumber}' style="display:none;">${JSON.stringify(transit)}</td>
                                    <td id='transit${serialnumber}' style="display:none;">${JSON.stringify(row)}</td>
                                    <th scope="row">${row.date}</th>
                                    <td>${order_hash}</td>
                                    <td>${row.location}</td>
                                    <td>
                                        <span style="background:#edbd71;border-radius:7px;padding:4px 10px;font-weight:700;font-size:14px;display:block">
                                            ${row.status}
                                        </span>
                                    </td>
                                    <td><button class="delete" onclick="deleteTrackingData(${serialnumber}, ${index})">Delete</button></td>
                                </tr>
                                `;   


                                rowContent2 += `
                                <tr>
                                    <th scope="row">${row.date}</th>
                                    <td>${row.location}</td>
                                    <td>
                                        <span style="background:#edbd71;border-radius:7px;padding:4px 10px;font-weight:700;font-size:14px;display:block">
                                            ${row.status}
                                        </span>
                                    </td>
                                </tr>
                                `;   
                            }
                            $('#p_shippingUpdates').html(rowContent);
                            $('#p_shippingUpdates2').html(rowContent2);

                            // Got the transit array from fetched data
                            // let thefoundtrackingObj = transit.find((animal) => animal.status.toLowerCase() === "transit");
                            // console.log(thefoundtrackingObj);

                            //returns the first found object. //returns undefined, as not found
                            let foundArrivedObj = transit.find((x) => x.status.toLowerCase() === "arrived");
                            let foundTransitObj = transit.find((x) => x.status.toLowerCase() === "transit");
                            let foundShippedObj = transit.find((x) => x.status.toLowerCase() === "shipped");

                            // console.log(foundArrivedObj);

                            $('.tracker').removeClass('is-active');
                            if(foundArrivedObj){
                                $('.delivered_tracker').addClass('is-active');
                            }else if(foundTransitObj){
                                $('.transit_tracker').addClass('is-active');
                            }else if(foundShippedObj){
                                $('.shipped_tracker').addClass('is-active');
                            }
                
                
                
                        }else{
                            $('#p_shippingUpdates').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No transit information yet.</h5></td></tr>");
                        }
                    }
                }
                /***************************************
                 * FOR UPDATESHIPPINGDETAILS.HTML PAGE *
                 ***************************************/
             
                    
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
/************************************************************************************
 * /* -------------------- // POPULATE ORDER DETAILS ------------------- *
 ************************************************************************************/







/************************************************************************************
 * /* ------------------------- DELETE TRACKING DETAILS ------------------------ *
 ************************************************************************************/
const deleteTrackingData =(sn, index)=>{
    // console.log(sn, "Single Row sn");
    let transit_obj = $('#transit'+sn).html();
    transit_obj = JSON.parse(transit_obj);
    // console.log(transit_obj, "Single transit_obj");

    let fulltransit_info = $('#fulltransit_info'+sn).html();
    fulltransit_info = JSON.parse(fulltransit_info);
    // console.log(fulltransit_info, "All fulltransit_info");

    // console.log(index, "index");
    // let selectd = fulltransit_info[index];
    let removeselectd = fulltransit_info.splice(index,1);
    /*console.log(removeselectd);
    console.log(fulltransit_info);*/
    let order_hash = localStorage.getItem('orderHash');

    startPageLoader();
    // console.log($('#product_details').val());

    $.ajax({
        url: `${liveMobileUrl}/order/${order_hash}/trackingdetails`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "tracking_details": {
                "pickup_location": $('#transit_pickuplocation'+sn).text(),
                "transit": fulltransit_info,
                "delivery_location": $('#transit_deliverylocation'+sn).text()
            }
        }),
        success: function(response) { 
            EndPageLoader();
            // console.log(response);
            if(response.error === true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
            }else{
                // alert(response.message);
                responsemodal("successicon.png", "Success", response.message);
                setTimeout(()=>{
                    populateOrderSummaryDetails();
                    $('.mymodal').hide();
                },2500)      
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
/************************************************************************************
 * /* ------------------------- DELETE TRACKING DETAILS ------------------------ *
 ************************************************************************************/







/************************************************************************************
 * /* ------------------------- UPDATE WAYBILL DETAILS ------------------------- 
 ************************************************************************************/
const waybillDetailsPage =()=>{

    let order_hash = localStorage.getItem('orderHash');

    startPageLoader();
    // console.log($('#product_details').val());

    $.ajax({
        url: `${liveMobileUrl}/order/${order_hash}/waybilldetails`,
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
/************************************************************************************
 * /* ------------------------- UPDATE WAYBILL DETAILS ------------------------- 
 ************************************************************************************/









/************************************************************************************
 * /* ------------------------- UPDATE SHIPPING DETAILS ------------------------ *
 ************************************************************************************/
 const updateshippingDetails =()=>{
    let order_hash = localStorage.getItem('orderHash');

    let transit_arr = $('#oldtransit_information').val();
    transit_arr = JSON.parse(transit_arr);
    

    // // returns the first found object. //returns undefined, as not found
    // let foundArrivedObj = transit_arr.find((x) => x.status.toLowerCase() === "arrived");
    // let foundTransitObj = transit_arr.find((x) => x.status.toLowerCase() === "transit");
    // let foundShippedObj = transit_arr.find((x) => x.status.toLowerCase() === "shipped");

    // // console.log(foundShippedObj,"fref");
    // let selectedStatus = $('#status').val();
    // let checkstatus;

    // if(selectedStatus.toLowerCase() == "transit"){
    //     if(foundShippedObj){
    //         checkstatus = true;
    //     }else { 
    //         checkstatus = false; 
    //         basicmodal("", "Item has not been shipped yet");
    //     }
    // }


    // You can use with Spread Operator (...) like this to add object to the array of objects:
    // arr = [...arr,{num: 3, char: "c"}];
    transit_arr = [...transit_arr,
        {
            "date": $('#update_date').val(), "location": $('#location').val(), "status": $('#status').val()
        },
    ];
    //...arr --> spread operator
    
    // console.log(transit_arr);


    startPageLoader();
    // console.log($('#product_details').val());

    $.ajax({
        url: `${liveMobileUrl}/order/${order_hash}/trackingdetails`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        "data": JSON.stringify({
            "tracking_details": {
                "pickup_location": $('#pickup_location').val(),
                "transit": transit_arr,
                "delivery_location": $('#delivery_location').val()
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
                    populateOrderSummaryDetails();
                    $('.mymodal').hide();
                    $('#location,#status').val('');
                },2500)      
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
/************************************************************************************
 * /* ------------------------- UPDATE SHIPPING DETAILS ------------------------ *
 ************************************************************************************/









/************************************************************************************
 * /* ----------------------- FETCH USER ORDER BY USER ID ---------------------- *
 ************************************************************************************/
function fetchUserOrdersByUserID(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    const urlString = window.location.pathname;
    let paramString = urlString.split('dashboard/')[1];
    console.log(paramString);

    let routeType,tbodySelector;
    if(paramString == "order/orders.html"){
        routeType = "orders";
        tbodySelector = "p_orders";
    }else if(paramString == "mysales.html"){
        routeType = "sales";
        tbodySelector = "p_Sales";
    }

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/users/${userid}/${routeType}`,
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
            console.log(response, "The get all order response");
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

                        let shippingstatus;
                        // console.log(JSON.parse(row.tracking_details).transit.length);
                        if(!JSON.parse(row.tracking_details)){
                            shippingstatus = "---";
                        }else if(JSON.parse(row.tracking_details).transit.length > 0){
                            let lasttracking_details = JSON.parse(row.tracking_details).transit.at(-1);
                            let lasttracking_status = lasttracking_details.status;
                            // let lasttracking_status = JSON.stringify(lasttracking_details.status);
                            shippingstatus = `
                                <span style="background:#edbd71;border-radius:7px;padding:4px 10px;font-weight:700;font-size:14px;display:block">
                                    ${lasttracking_status}
                                </span>
                            `;

                        }else{
                            shippingstatus = "---";
                        }

                        let negotiationstatus;
                        if(row.negotiation_id){
                            negotiationstatus = "yes";
                        }else{
                            negotiationstatus = "no";
                        }

                        rowContent += `
                        <tr>
                            <td id='' style="display:none;">${JSON.stringify(row)}</td>
                            <th scope="row">${row.created_at.split(' ')[0]}</th>
                            <td>${truncate(row.order_hash, 6)}</td>
                            <td>${row.total}</td>
                            <td class="status_${row.payment_status.toLowerCase()}">${row.payment_status}</td>
                            <td class="text-center">${shippingstatus}</td>
                            <td><button class="view" onclick="viewSingleOrder('${row.order_hash}', '${negotiationstatus}')">View</button></td>
                        </tr>
                        `;   
                    }
                    if(tbodySelector == "p_orders"){
                        $('#p_orders').append(rowContent);
                    }else if(tbodySelector == "p_Sales"){
                        $('#p_Sales').append(rowContent);
                    }
                            
                }else{
                    if(tbodySelector == "p_orders"){
                        $('#p_orders').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No sales found</h5></td></tr>");
                    }else if(tbodySelector == "p_Sales"){
                        $('#p_Sales').html("<tr><td colspan='9' class='text-center'><h5 class='pt-2'>No sales found</h5></td></tr>");
                    }
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


function viewSingleOrder(n, negotiationstatus){
    // alert(n);
    localStorage.setItem("orderHash", n);
    if(negotiationstatus=="yes"){
        location.assign('/dashboard/order/ordersummary.html');
    }else{
        location.assign('/dashboard/order/ordersummarydirect.html');
    }
}
/************************************************************************************
 * /* ----------------------- FETCH USER ORDER BY USER ID ---------------------- *
 ************************************************************************************/









/* ----------------------------- // ORDER PAYMENT ---------------------------- */
const orderPaymentPage=()=>{
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
                            verifyTransaction(transaction_id, transaction_reference);
                            alert("Anya mo Anya mo");
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
/* ----------------------------- // ORDER PAYMENT ----------------------------- */