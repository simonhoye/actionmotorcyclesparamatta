$( document ).ready(function() {
    // Init
    $('.goToKitchen').click(function() {
        $('#homeMenu').addClass('hinge');

        $('#KitchenContainer').addClass('animated fadeIn');
        $('#container').addClass('animated fadeOut');

        $('#kitchenInfo').addClass('animated bounceInUp');
        $('#container').css( "zIndex", "5" );
        $('#KitchenContainer').css( "zIndex", "10" );


    });

    $('#kitchenSubMenu #menuHome').click(function() {
        $("#menuHome").addClass('animated rubberBand');
        $("#KitchenContainer").removeClass('fadeIn');
        $("#KitchenContainer").addClass('fadeOut');

        $("#container").show();
        $("#homeMenu").removeClass("hinge");
        $("#container").removeClass('fadeOut');
        $('#container').css( "zIndex", "10" );
        $('#KitchenContainer').css( "zIndex", "5" );


    })
});