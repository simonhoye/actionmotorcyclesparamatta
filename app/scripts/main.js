

$( document ).ready(function() {
    // Init
    function animationHover(element, animation){
        element = $(element);
        element.hover(
            function() {
                element.addClass('animated ' + animation);
            },
            function(){
                //wait for animation to finish before removing classes
                window.setTimeout( function(){
                    element.removeClass('animated ' + animation);
                }, 500);
            });
    }
    $('#kitchenSubMenu div').each(function() {
        animationHover(this, 'bounce');
    });
    $('#homeMenu div').each(function() {
        animationHover(this, 'tada');
    });

    $('.roomIcon').each(function() {
        animationHover(this, 'bounce');
    });

    // Clicked puddle
    $('div#puddleGameArea').click(function() {
        $('#puddleGameWindow').addClass('active');
        $('#progress').addClass('animate');
        setTimeout(function() {

            $('div#puddleGameInfoContainerText').fadeToggle();
        }, 1000);

        var puddleGame = new PuddleGame(function() {
            alert("Bang Done!");
        });
        puddleGame.start();

        setTimeout(function() {
            $('#puddleGameWindow').removeClass('active');
            $('#progress').removeClass('animate');

            $('div#puddleGameInfoContainerText').hide();
            puddleGame.stop();
            $('#puddleGameWindow').empty();

        }, 30000);

    });

    // Clicked Stovetop
    $('div#stoveTopGameArea').click(function() {
        $('#stoveTopGameWindow').addClass('active');
    });


    $('.goToKitchen').click(function() {
        $('#homeMenu').addClass('hinge');
        $('#KitchenContainer').removeClass('animated fadeOut');

        $('#KitchenContainer').addClass('animated fadeIn');
        $('#container').addClass('animated fadeOut');

        $('#kitchenInfo').addClass('animated bounceInUp');
        setTimeout(function() {
            $('#container').css( "zIndex", "5" );

            $('#KitchenContainer').css( "zIndex", "10" );

        }, 1000);

    });

    $('#kitchenSubMenu #menuHome').click(function() {
        $("#menuHome").addClass('animated rubberBand');
        $("#KitchenContainer").addClass('fadeOut');
        $('#kitchenInfo').removeClass('bounceInUp');

        $("#KitchenContainer").removeClass('fadeIn');

        $("#homeMenu").removeClass("hinge");
        $("#container").removeClass('fadeOut');
        setTimeout(function() {
            $('#KitchenContainer').css( "zIndex", "5" );
            $('#container').css( "zIndex", "10" );
        }, 1000);


    });


});