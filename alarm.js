$(function(){

    // Cache some selectors

    var clock = $('#clock'),
        alarm = clock.find('.alarm'),
        ampm = clock.find('.ampm'),
        dialog = $('#alarm-dialog').parent(),
        alarm_set = $('#alarm-set'),
        alarm_clear = $('#alarm-clear');

    // Handle setting and clearing alamrs

    $('.alarm-button').click(function(){

        // Show the dialog
        dialog.trigger('show');

    });

    dialog.find('.close').click(function(){
        dialog.trigger('hide')
    });

    dialog.click(function(e){

        // When the overlay is clicked,
        // hide the dialog.

        if($(e.target).is('.overlay')){
            // This check is need to prevent
            // bubbled up events from hiding the dialog
            dialog.trigger('hide');
        }
    });

    alarm_clear.click(function(){
        location.reload();
        // dialog.trigger('hide');
    });

    // Custom events to keep the code clean
    dialog.on('hide',function(){

        dialog.fadeOut();

    }).on('show',function(){

        dialog.fadeIn();

    });

});