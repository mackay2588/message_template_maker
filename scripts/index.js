console.log('js');
$(document).ready(function() {


    let guestsArr = $.getJSON("scripts/Guests.json", function( data){
        console.log('guest data:', data);
    });

    console.log(guestsArr);
});





