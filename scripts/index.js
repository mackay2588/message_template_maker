console.log('js');
$(document).ready(function() {


    let guestsArr = $.getJSON("scripts/Guests.json", function( data ){
        console.log('guest data:', data);
    });

    let companiesArr = $.getJSON("scripts/Companies.json", function( data ){
        console.log('company data:', data);
    });

    let messageTempObj = $.getJSON("scripts/MessageTemplate.json", function( data ){
        console.log('message template:', data);
    });

    console.log(guestsArr);
    console.log(companiesArr);
    console.log(messageTempObj);
});





