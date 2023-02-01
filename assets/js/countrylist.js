// LINKED WITH <script src="../assets/js/plugins/country-state-array.js"></script>
// console.log(countrylist, "Country List");

const populateCountryList =()=>{
    var listItems;
    listItems += '<option value="">- Select country -</option>';

    for (var i=0;i<countrylist.length;i++){
        listItems+='<option value=' + countrylist[i].country + '>'+countrylist[i].country+"</option>";           
    }
    
    // add to DOM
    $('#countryList').append(listItems);
}


$('#countryList').on('change', ()=>{
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
    /* --------------------- CHECK INDEX OF OBJECT IN ARRAY --------------------- */

})
