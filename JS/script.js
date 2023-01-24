//Get current date using moment
var currentDay = moment().format('MMMM Do YYYY');

// Display current date at top of page
$('#currentDay').text(currentDay);


// Setting each timeblock for schedule using moment.js

var eight = moment().hour(8);
var nine = moment().hour(9);
var ten = moment().hour(10);
var eleven = moment().hour(11);
var twelve = moment().hour(12);
var thirteen = moment().hour(13);
var fourteen = moment().hour(14);
var fifteen = moment().hour(15);
var sixteen = moment().hour(16);
var seventeen = moment().hour(17);
var eighteen = moment().hour(18);

// Creating array of hour blocks
var hours = [eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen];

// Getting local storage or setting to empty
var events8 = JSON.parse(localStorage.getItem('events' + 8)) || "";
var events9 = JSON.parse(localStorage.getItem('events' + 9)) || "";
var events10 = JSON.parse(localStorage.getItem('events' + 10)) || "";
var events11 = JSON.parse(localStorage.getItem('events' + 11)) || "";
var events12 = JSON.parse(localStorage.getItem('events' + 12)) || "";
var events13 = JSON.parse(localStorage.getItem('events' + 13)) || "";
var events14 = JSON.parse(localStorage.getItem('events' + 14)) || "";
var events15 = JSON.parse(localStorage.getItem('events' + 15)) || "";
var events16 = JSON.parse(localStorage.getItem('events' + 16)) || "";
var events17 = JSON.parse(localStorage.getItem('events' + 17)) || "";
var events18 = JSON.parse(localStorage.getItem('events' + 18)) || "";

// Displaying all timeblocks
// for each hour in hours array
$.each(hours, function (index, value) {
    // set events array to store all event items
    events = [events8, events9, events10, events11, events12, events13, events14, events15, events16, events17, events18];

    // create row div with class row
    var row = $('<div>').addClass('row');
    // create div to hold the time with span that holds the hour 
    var timeCol = $('<div>').addClass('hour col-1 text-right pt-3').append('<span>' + value.format('HH') + '</span>');
    // create text area for event column
    // include event item from local storage if there, add id of eventblock and number (hour)
    var textArea = $('<textarea>' + events[index] + '</textarea>').attr('id', 'eventblock' + (index + 9)).addClass('col-12');
    // create div for event input
    // add timeblock id for reference
    var eventCol = $('<div>').attr('id', (index + 9)).addClass('col-10 timeblock')
        .css({ 'display': 'flex', 'padding-right': '0px', 'padding-left': '0px' }).append(textArea);
    // create div for save button, add id of save and number (hour)
    var saveBtn = $('<button>').attr('id', 'save' + (index + 9)).addClass('saveBtn col-1').append('<i class="fas fa-save"></i>');

    // add all columns to row
    $(row).append(timeCol).append(eventCol).append(saveBtn);
    // add row to container
    $('.container').append(row);
});

// functionality to save the event inputted to local storage when saveBtn pressed
$(document).on('click', '.saveBtn', function () {
    // get the textarea associated with the button
    var textArea = $(this).prev().children();
    // check if textarea is empty
    if (textArea.val().trim() === "") {
        //show alert
        $('.container').prepend('<div class="alert alert-danger" role="alert">You have not entered an event</div>');
        setTimeout(function () {
            $('.alert').remove();
        }, 2000);
    } else {
        // Get the hour from the buttons id
        var hour = this.id.substring(4);
        // Get the value of the textarea for that hour
        var event = $('#eventblock' + hour).val();
        // update textarea with current input after user clicks save button
        $('#eventblock' + hour).val(event);
        // save the event to localStorage
        localStorage.setItem('events' + hour, JSON.stringify(event));

        // add alert to say appointment added
        $('.container').prepend('<div class="alert alert-success" role="alert">Appointment added to localStorage <i class="fas fa-check"></i></div>');
        // remove alert after 2s
        setTimeout(function () {
            $('.alert').remove();
        }, 2000);
    }
});


// clear button

// button element and bootstrap classes
var clearBtn = $('<button>').text('Clear Events').addClass('clearBtn btn btn-secondary d-block mx-auto my-4');

// Append clearBtn to .container div
$('.container').append(clearBtn);

// event listener on button
$('.clearBtn').on('click', function () {
    //clear input fields
    $('textarea').val('');
    // Clear local storage
    localStorage.clear();
})