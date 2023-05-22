/* --------------------------- SUCCESS ICON MODAL --------------------------- */
function basicmodal(title,body){
    $('.mymodal').show();

    let basicmodalContent = `
        <div class="modal fade dialogbox d-block" style="opacity:1;" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header mt-1">
                        <h5 class="modal-title">${title}</h5>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                    <div class="modal-footer">
                        <div class="btn-inline">
                            <a href="#" class="btn" onclick="closemodal()" data-bs-dismiss="modal">CLOSE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('.mymodal').html(basicmodalContent);
}





function responsemodal(icon, title, body){
    $('.mymodal').show();

    let responsemodalContent = `
        <div class="modal fade dialogbox d-block" style="opacity:1;" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-icon text-success">
                        <img src="../../logos/${icon}" />
                    </div>
                    <div class="modal-header mt-1">
                        <h5 class="modal-title">${title}</h5>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                    <div class="modal-footer">
                        <div class="btn-inline">
                            <a href="#" class="btn" onclick="closemodal()" data-bs-dismiss="modal">CLOSE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('.mymodal').html(responsemodalContent);
}


// <!-- Full White Background Modal -->
function responsefullmodal(icon, title, body, page){
    $('.mymodal').show();

    let responsemodalContent = `
        <div class="modal fade modal-full dialogbox d-block" style="opacity:1;" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-icon text-success">
                        <img src="../../logos/${icon}" />
                    </div>
                    <div class="modal-header mt-1">
                        <h5 class="modal-title zowasel-darkblue-color fontFamily1 fw-600 f-24 lh-36">${title}</h5>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                    <div class="modal-footer" style="border-top:0;">
                        <div class="btn-inline">
                            <a href="#" class="btn zowasel-darkblue-bg text-white f-14" onclick="closefullmodal('${page}')" data-bs-dismiss="modal" style="padding: 9px 50px;line-height: 28px;">
                                Continue
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('.mymodal').html(responsemodalContent);
}




function confirmmodal(title,body,section,section_id){
    $('.mymodal').show();

    let confirmmodalContent = `
        <div class="modal fade dialogbox d-block" style="opacity:1;" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header mt-1">
                        <h5 class="modal-title">${title}</h5>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                    <div class="modal-footer">
                        <div class="btn-inline d-flex justify-content-between">
                            <a href="#" class="btn" onclick="closemodal()" data-bs-dismiss="modal">No</a>
                            <a href="#" class="btn" onclick="confirmaccepted('${section}', ${section_id})" data-bs-dismiss="modal">Yes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('.mymodal').html(confirmmodalContent);
}



function closemodal(){
    $('.mymodal').hide();
}

// function confirmaccepted(){
//     return true;
// }

function closefullmodal(goto){
    $('.mymodal').hide();
    location.assign(goto);
}




/* --------------------------- SUCCESS ICON MODAL --------------------------- */