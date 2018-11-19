console.log('js');
$(document).ready(function() {


    //import guest info
    let guestsArr = $.getJSON("scripts/Guests.json", function( data ){
        console.log('guest data:', data);
    });

    //import company info
    let companyArr = $.getJSON("scripts/Companies.json", function( obj ){
        console.log('company data:', obj);

        $.each(obj, function(key, value) {
            console.log('hello', value);
            let optionId = 'company' + value.id;
            $("#companyDropDown").append(`<option id="${optionId}" data=${value}>${value.company}</option>`)
        });
    });


    //import message template
    let messageTempObj = $.getJSON("scripts/MessageTemplate.json", function( data ){
        console.log('message template:', data);
    });

    //calculate time of day
    const currentTime = new Date().getTime();

    let timeFormat = moment(1486852373 * 1000).format('LLL');

    console.log('current time:', timeFormat);
});





