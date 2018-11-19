
console.log('js');
$(document).ready(function() {

    //import guest info
    let guestsArr = $.getJSON("scripts/json/Guests.json", function( obj ){
        console.log('guest data:', obj);
        
        //populate guest drop down
        $.each(obj, function (key, value) {
            let optionId = 'guest' + value.id;
            $("#guestDropDown").append(`<option id="${optionId}" value=${value.id}>
                                            ${value.lastName},${value.firstName}</option>`)
        });
    });

    //import company info
    let companyArr = $.getJSON("scripts/json/Companies.json", function( obj ){
        console.log('company data:', obj);

        //populate company drop down
        $.each(obj, function(key, value) {
            let optionId = 'company' + value.id;

            $("#companyDropDown").append(`<option id="${optionId}" value=${value.id}>${value.company}</option>`)
        });
    });


    //import message template
    let messageTempArr = $.getJSON("scripts/json/MessageTemplate.json", function( obj ){
        console.log('message template:', obj);

        $.each(obj, function(key, value) {
            let optionId = 'message' + value.id;

            $("#messageDropDown").append(`<option id="${optionId}" value=${value.id}>${value.ready}</option>`)
        });
    });

    //on submit of send message form
    $("#submit").click(sendMessage);
    
    //function to populate and send message
    function sendMessage() {
        console.log('in send message');

        let chosenCompanyId = $("#companyDropDown").val();

        let chosenGuestId = $("#guestDropDown").val();

        let chosenMessageId = $("#messageDropDown").val();

        //object class to get info
        class Info {
            constructor(infoType, infoId){
                this.infoType = infoType,
                this.infoId = infoId
            }

            //function to get specific info
            getInfo() {
                console.log('in getInfo', this.infoType);
                let infoArr = this.infoType.responseJSON;
                
                for (let obj of infoArr){
                    if(obj.id === parseInt(this.infoId)){
                        return obj;
                    }
                }
            }//end getInfo
        }

        // class Info instances
        let company = new Info(companyArr, chosenCompanyId);
        let guest = new Info(guestsArr, chosenGuestId);
        let message = new Info(messageTempArr, chosenMessageId);

        let companyInfo = company.getInfo();
        let guestInfo = guest.getInfo();
        let messageInfo = message.getInfo();

        let timeZone = companyInfo.timezone;
        console.log('timezone', timeZone);

        let currentTime = new Date().getTime();

        currentTime = moment(currentTime).tz(timeZone).format();
  
        currentTime = moment(currentTime).format('HH');

        let greeting = '';
        let firstName = guestInfo.firstName;

        if(currentTime >= 1 && currentTime < 12){
            greeting = `Good Morning ${firstName},`
        }
        else if(currentTime >= 12 && currentTime < 17){
            greeting = `Good Afternoon ${firstName},`
        }
        else{
            greeting = `Good Evening ${firstName},`
        }
        
        //alternative message from text area input
        let altMessage = '';

        altMessage = $("#altMessage").val();
        console.log(altMessage)

        //variable to hold entire message
        let completeMessage = '';

        //check for alt message
        if(altMessage.length > 0){
            
            completeMessage = `${greeting} ${altMessage}`;
        }
        else{
            
            completeMessage = `${greeting} and welcome to ${companyInfo.company}. Room ${guestInfo.reservation.roomNumber} ${messageInfo.ready} ${messageInfo.ending}`;
        }

        console.log(completeMessage);

        $("#messageTemplate").empty();
        $("#messageTemplate").append(`<p>${completeMessage}</p>`);

        return completeMessage;

    }//end sendMessage

});




