

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
        $('#kitchenInfo').removeClass('bounceInUp');
        $('#kitchenInfo').addClass('flipOutX');

        $('#progress').addClass('animate');
        setTimeout(function() {

            $('div#puddleGameInfoContainerText').fadeToggle();
        }, 1000);

        var puddleGame = new PuddleGame();
        puddleGame.start(function() {

              // U WON SON
            clearTimeout(puddleTimer);
            $('#puddleGameWindow').removeClass('active');
            $('#progress').removeClass('animate');
            $('div#puddleGameInfoContainerText').hide();

            puddleGame.stop();
            $('#puddleGameWindow').empty();
            setTimeout(function() {

                $('#puddleWinState').fadeOut();

            }, 2000);
            $('#puddleAnswer1').click(function() {
                $('#puddleWinState').fadeOut();

            });

            $('#puddleAnswer2').click(function() {
                $('#puddleWinState').addClass('animated shake');

            });

        }.bind(puddleGame));

        var puddleTimer = setTimeout(function() {
            $('#puddleGameWindow').removeClass('active');
            $('#progress').removeClass('animate');

            $('div#puddleGameInfoContainerText').hide();
            puddleGame.stop();
            $('#puddleGameWindow').empty();
            setTimeout(function() {

            $('#puddleLoseState').fadeIn();
                setTimeout(function() {
                    $('#puddleLoseState').fadeOut();
                    $('#kitchenInfo').addClass('bounceInUp');
                }, 2000);
                }, 1000);

        }, 30000);

    });

    // Clicked Stovetop
    $('div#stoveTopGameArea').click(function() {
        var that = this;
        $('#stoveTopGameWindow').addClass('active');
        $('#progress').addClass('animate');
        $('#kitchenInfo').removeClass('bounceInUp');
        $('#kitchenInfo').addClass('flipOutX');
        var stoveGame = new StoveTop(function() {
            $('#stoveTopCanvas').remove();
            $('#stoveTopQuestionBox').fadeIn();
            $('#stoveTopGameWindow').removeClass('active');
            $('#progress').removeClass('animate');

            clearTimeout(stoveTimer);

            //StoveTop.unload();
            $('#stoveTopAnswer1').click(function() {
                $('#stoveTopQuestionBox').fadeOut();
                $('#stoveTopWinState').fadeIn();
                setTimeout(function() {
                    $('#stoveTopWinState').fadeOut();
                    $('#kitchenInfo').addClass('bounceInUp');
                }, 2000);

            });

            $('#stoveTopAnswer2').click(function() {
                $('#stoveTopLoseState').fadeIn();
                $('#stoveTopQuestionBox').hide();

                setTimeout(function() {
                    $('#stoveTopLoseState').fadeOut();
                    $('#kitchenInfo').addClass('bounceInUp');

                }, 2000);
            });

        });

        var stoveTimer = setTimeout(function() {
            $('#stoveTopGameWindow').removeClass('active');
            $('#progress').removeClass('animate');

            $('#stoveTopGameWindow').empty();
            setTimeout(function() {

                $('#stoveTopLoseState').fadeIn();
                setTimeout(function() {
                    $('#stoveTopLoseState').fadeOut();

                }, 2000);
            }, 1000);

        }, 30000);

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