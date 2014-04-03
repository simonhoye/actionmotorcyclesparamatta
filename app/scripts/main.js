

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
                }, 2000);
            });
    }
    $('#kitchenSubMenu div').each(function() {
        animationHover(this, 'bounce');
    });
    $('#homeMenu div').each(function() {
        animationHover(this, 'tada');
    });

    $('div#puddleGameArea').click(function() {
        alert('STARTING PUDDLE! WOO');
    });

    $('div#stoveTopGameArea').click(function() {
        alert('STARTING STOVE TOP! BURN YOSELF FOO');
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

        $("#KitchenContainer").removeClass('fadeIn');

        $("#homeMenu").removeClass("hinge");
        $("#container").removeClass('fadeOut');
        setTimeout(function() {
            $('#KitchenContainer').css( "zIndex", "5" );
            $('#container').css( "zIndex", "10" );
        }, 1000);


    })
});