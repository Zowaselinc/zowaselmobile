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
// const logout =()=>{
//     alert("ef");
//     localStorage.clear();
//     sessionStorage.clear();
//     // alert(window.location.origin);
//     let routeroot = window.location.origin;
//     location.assign(routeroot+'/login.html');
// }
/* -------------------------------- // LOGOUT ------------------------------- */









/************************************************************************************
 * /* -------------------- // FETCH CONVERSATIONS BY USER ID ------------------- *
 ************************************************************************************/
const fetchUserConversations =()=>{

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;

    startPageLoader();
    $.ajax({
        url: `${liveMobileUrl}/conversation/getbyuserid/${userid}`,
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
                // responsemodal("erroricon.png", "Error", response.message);
                $('#pConversationList').html("<tr><td colspan='9' class='text-center'><h6 class='pt-2'>"+response.message+"</h6></td></tr>");
                $('.loader').addClass('loader-hidden'); 
            }else{
                // alert(response.message);
                let thedata = response.data;
                let rowContent = "";
                let index;
                console.log(thedata, "conversation data");
                if(thedata.length > 0){
                    for (let i = 0; i < thedata.length; i++) {
                    //   console.log('Hello World', + i);
                        let row = thedata[i];
                        index= i+1;

                        let fullname, productOwnerDetails;
                        if(row.initiator.id == userid){ //initiator
                            fullname = row.participant.first_name+" "+row.participant.last_name;
                            productOwnerDetails = JSON.stringify(row.participant);
                        }else{ //participant
                            fullname = row.initiator.first_name+" "+row.initiator.last_name;
                            productOwnerDetails = JSON.stringify(row.initiator);
                        }

                        let thecrop, thecroptype;
                        if(row.crop == "" || row.crop===null || row.crop.subcategory===null){
                            thecrop = "";
                            thecroptype = "";
                        }else{
                            thecroptype = row.crop.type;
                            if(row.crop.specification == "" || row.crop.specification === null){
                                thecrop = row.crop.category.name+" ("+row.crop.type+")";
                            }else{
                                thecrop = row.crop.category.name+" - "+row.crop.specification.color+" ("+row.crop.type+")  ";
                            }
                        }

                        rowContent += `
                            <li>
                                <a onclick="gotoMessageDetails(${row.crop_id}, '${thecroptype}', ${index})">
                                    <div class="media-content" style="margin-left:0px !important;">
                                        <div>
                                            <h5 class="name">${fullname}</h5>
                                            <div class="d-none" id="productOwnerDetails${index}">${productOwnerDetails}</div>
                                            <h6>${thecrop}</h6>
                                            <p class="my-1">
                                                ${row.created_at}
                                            </p>
                                        </div>
                                        
                                    </div>
                                </a>
                            </li>
                        `;   
                    }
                    $('#pConversationList').append(rowContent);        
          
                }else{
                    $('#pConversationList').html("<tr><td colspan='9' class='text-center'><h3 class='pt-2'>No conversation yet</h3></td></tr>");
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
/************************************************************************************
 * /* -------------------- // FETCH CONVERSATIONS BY USER ID ------------------- *
 ************************************************************************************/









function gotoMessageDetails(n, thecroptype, index){
    // console.log(n); The CROP ID
    // console.log(index, "index");
    let productOwnerDetails = $('#productOwnerDetails'+index).html();
    // console.log(productOwnerDetails);
    localStorage.setItem('productOwnerDetails', productOwnerDetails);
    localStorage.setItem('singleproductID', n);

    let user = localStorage.getItem('zowaselUser');
    user = JSON.parse(user);
    let userid = user.user.id;
    let usertype = user.user.type;
    localStorage.setItem('negotiationpage_type', thecroptype);
    
    
    location.assign('negotiate.html');
}