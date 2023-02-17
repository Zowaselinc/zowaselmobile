function truncate(str, length) {
    if (str.length > length) {
        return str.slice(0, length) + '...';
    } else return str;
}


// HH: hour of day from 0-24, zero-padded, '14'
// H: hour of day from 0-24, '14'
// hh: hour of day on 12-hour clock, zero-padded, '02'
// h: hour of the day on 12 hour clock, '2'
// mm: minute, zero-padded, '04'
// m: minute, '4'
// ss: second, zero-padded
// s: second
// A: 'AM' or 'PM'
// a: 'am' or 'pm'

// '14:04': HH:mm
// '14:04:03': HH:mm:ss
// '2:04pm': h:mma
// '2:04 PM': h:mm A

/************************************************************************************
 * /* ---------------- FETCH USER NOTIFICATION BY USER ID AND TYPE ---------------- *
 ************************************************************************************/
 function fetchUserNotificationsByUserTypeandID2(){
    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    // startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/notification/${usertype}/${userid}`,
        type: "GET",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            // EndPageLoader();
            // $('.loader').addClass('loader-hidden');
            console.log(response, "The get all notification by useridANDtype response");
            if(response.error == true){
                // alert(response.message);
                responsemodal("erroricon.png", "Error", response.message);
                // $('.loader').addClass('loader-hidden');
            }else{
                // alert(response.message);
                let thedata = (response.data).reverse();
                let rowContent = "";
                let index;
                // console.log(thedata, "category data");
                // console.log(JSON.parse(thedata[7].tracking_details).transit.length);
                if(thedata.length > 0){
                    // GET ALL UNSEEN RECORDS
                    // let newnotification = thedata.filter((item)=>item.seen==0);
                    // let total_newnotification = newnotification.length;

                    for (let i = 0; i < thedata.length; i++) {
                    //   console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let date = row.created_at;
                        let time = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();

                        let cardBg, timeColor;
                        if(row.single_seen==0){
                            cardBg = "bg-success";
                            timeColor = "text-white";
                        }else { cardBg = ""; timeColor = "text-dark"; }
                   
                        rowContent += `
                        <a href="javascript:void(0)" class="notification ${cardBg}" onclick="gotoNotificationDestination(${row.id},'${row.model}','${row.model_id}')">
                            <div class="notification-content item-list">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <h6 class="title" style="font-size:15px;">${truncate(row.notification_name, 25)}</h6>
                                        <p class="mb-0">${row.message}</p>
                                    </div>
                                    <div class="ms-auto font-10 ${timeColor} d-flex align-items-center">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M6 3V6L8 7" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        ${time}
                                    </div>
                                </div>
                            </div>
                        </a>
                        `;   
                    }
                    $('#p_notification').append(rowContent);        
          
                }else{
                    $('#p_notification').html("<tr><td colspan='9' class='text-center'><h3 class='pt-2'>No notification found</h3></td></tr>");
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




function gotoNotificationDestination(id, model, model_id){

    // UPDATE SINGLE NOTIFICATION TO SEEN
    $.ajax({
        url: `${liveMobileUrl}/notification/${id}/updatesingle_seen`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            // EndPageLoader();
            // $('.loader').addClass('loader-hidden');
            console.log(response, "Update negotiation singe_seen response");
            if(response.error == true){
                console.log(response.message);
                // responsemodal("erroricon.png", "Error", response.message);
                // $('.loader').addClass('loader-hidden');
            }else{
                console.log(response.message);
                fetchUserNotificationsByUserTypeandID2();
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
    // UPDATE SINGLE NOTIFICATION TO SEEN


    // GO TO NOTIFICATION DESTINATION
    if(model=="order"){
        localStorage.setItem('orderHash', model_id);
        location.assign('/dashboard/order/ordersummary.html');
    }
    if(model=="conversation"){
        // localStorage.setItem('orderHash', model_id);
        location.assign('/dashboard/negotiations.html');
    }
    // GO TO NOTIFICATION DESTINATION

}
/************************************************************************************
 * /* ---------------- FETCH USER NOTIFICATION BY USER ID AND TYPE ---------------- *
 ************************************************************************************/










/************************************************************************************
 * /* -- UPDATE GENERAL NOTIFICATION (BELL) AS SEEN WHEN THIS PAGE IS VISITED -- *
 ************************************************************************************/
function updateGeneralNotificationAsSeen(){
    $.ajax({
        url: `${liveMobileUrl}/notification/general_seen/updatebyuser`,
        type: "POST",
        "timeout": 25000,
        "headers": {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('authToken')
        },
        success: function(response) { 
            // alert("efe");
            // EndPageLoader();
            // $('.loader').addClass('loader-hidden');
            console.log(response, "The get all notification by useridANDtype response");
            if(response.error == true){
                console.log(response.message);
                // responsemodal("erroricon.png", "Error", response.message);
                // $('.loader').addClass('loader-hidden');
            }else{
                console.log(response.message);
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
 * /* -- UPDATE GENERAL NOTIFICATION (BELL) AS SEEN WHEN THIS PAGE IS VISITED -- *
 ************************************************************************************/