$(document).ready(function(){
    // When clicking on the Upcoming Events tab
    $('#nav-upcoming-tab').on('click', function() {
        // Remove pink class if it exists
        $('#nav-past-tab').removeClass('pink');
        $('#nav-upcoming-tab').addClass('blue');
        // Remove blue class from other tab if it exists
        $('#nav-past-tab').removeClass('blue');
    });

    // When clicking on the Past Events tab
    $('#nav-past-tab').on('click', function() {
        $('#nav-upcoming-tab').removeClass('blue');
        $('#nav-past-tab').addClass('pink');
        $('#nav-upcoming-tab').removeClass('pink');
    });
   
});