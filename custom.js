//does a call at the end to reset the player game metadata back to zero
jQuery(document).ready(function($) { 

    // console.log(final_total_score);

   $('a#compl').click(function(event) {

        $.ajax({
            url: mnt_space_invaders_game_custom.ajaxurl,
            type: 'GET',
            data: ({
                action: 'mnt_space_invaders_game_custom',
                final_total_score:final_total_score
            }),
            success: function(data) {
                $parsedData = jQuery.parseJSON(data);
                console.log($parsedData);
                var fulldomain = 'http://' + window.location.hostname;
               window.location.replace(fulldomain+"/leaderboard/");
            },
            error: function(data) {}
        });
    });
});