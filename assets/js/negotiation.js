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
                responsemodal("erroricon.png", "Error", response.message);
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

                        let thecrop;
                        if(row.crop == "" || row.crop===null || row.crop.subcategory===null){
                            thecrop = "";
                        }else if(row.crop.specification == "" || row.crop.specification === null){
                            thecrop = row.crop.subcategory.name+" ("+row.crop.type+")";
                        }else{
                            thecrop = row.crop.subcategory.name+" - "+row.crop.specification.color+" ("+row.crop.type+")";
                        }

                        rowContent += `
                            <li>
                                <a onclick="gotoMessageDetails(${row.crop_id}, ${index})">
                                    <div class="media-content">
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
/************************************************************************************
 * /* -------------------- // FETCH CONVERSATIONS BY USER ID ------------------- *
 ************************************************************************************/









function gotoMessageDetails(n, index){
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
    localStorage.setItem('negotiationpage_type', "cropwanted");
    
    
    location.assign('negotiate.html');
}