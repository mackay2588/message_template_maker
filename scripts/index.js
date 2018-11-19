console.log('js');
$(document).ready(function() {

    //import guest info
    let guestsArr = $.getJSON("scripts/Guests.json", function( obj ){
        console.log('guest data:', obj);
        
        //populate guest drop down
        $.each(obj, function (key, value) {
            let optionId = 'guest' + value.id;
            $("#guestDropDown").append(`<option id="${optionId}" value=${value.id}>
                                            ${value.lastName},${value.firstName}</option>`)
        });
    });

    //import company info
    let companyArr = $.getJSON("scripts/Companies.json", function( obj ){
        console.log('company data:', obj);

        //populate company drop down
        $.each(obj, function(key, value) {
            let optionId = 'company' + value.id;

            $("#companyDropDown").append(`<option id="${optionId}" value=${value.id}>${value.company}</option>`)
        });
    });


    //import message template
    let messageTempObj = $.getJSON("scripts/MessageTemplate.json", function( data ){
        console.log('message template:', data);
    });

    //on submit of send message form
    $("#submit").click(sendMessage);
    
    //function to populate and send message
    function sendMessage() {
        console.log('in send message');

        let chosenCompanyId = $("#companyDropDown").val();

        let chosenGuestId = $("#guestDropDown").val();

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

        let company = new Info(companyArr, chosenCompanyId);
        let guest = new Info(guestsArr, chosenGuestId);

        console.log("company info:", company.getInfo());
        console.log("guestInfo", guest.getInfo());

    }//end sendMessage

});


//calculate time of day
const currentTime = new Date().getTime();

let timeFormat = moment(1486852373 * 1000).format('LLL');

console.log('current time:', timeFormat);



