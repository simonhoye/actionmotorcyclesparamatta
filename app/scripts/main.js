var stars = {};

function updateStars() {

}

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
        var puddleGame = new PuddleGame();
        $('#puddleGameWindow').addClass('active');
        $('#progress').addClass('animate');
        setTimeout(function() {

            $('div#puddleGameInfoContainerText').fadeToggle();
        }, 1000);

        puddleGame.start(
            function() {

                // U WON SON
                clearTimeout(puddleTimer);
                $('#puddleGameWindow').removeClass('active');
                $('#progress').removeClass('animate');
                $('div#puddleGameInfoContainerText').hide();

                $('#puddleGameWindow').empty();
                setTimeout(function() {
                    $('#puddleQuestionBox').fadeIn();
                }, 1000);

                $('#puddleAnswer1').click(function() {
                    stars["puddle"] = true;
                    clearTimeout(puddleTimer);
                    $('#puddleWinState').fadeIn();
                    $('#puddleQuestionBox').fadeOut();
                    setTimeout(function() {
                        $('#puddleWinState').fadeOut();
                    }, 2000);
                });

                $('#puddleAnswer2').click(function() {
                    $('#puddleLoseState').fadeIn();
                    $('#puddleQuestionBox').fadeOut();
                    setTimeout(function() {
                        $('#puddleLoseState').fadeOut();
                    }, 2000);
                });
                puddleGame.stop();
                updateStars();
            }.bind(puddleGame), function(reason) {
                $('#puddleGameWindow').removeClass('active');
                $('#progress').removeClass('animate');

                $('div#puddleGameInfoContainerText').hide();
                puddleGame.stop();

                if (reason == "cactus") {
                    $('#puddleLoseText').html("Cleaning with a cactus is a prickly task :(");
                } else if (reason == "racket"){
                    $('#puddleLoseText').html("It's not cricket to clean with a tennis racket :(");
                }

                $('#puddleGameWindow').empty();
                setTimeout(function() {

                    $('#puddleLoseState').fadeIn();
                    setTimeout(function() {
                        $('#puddleLoseState').fadeOut();

                    }, 2000);
                }, 1000);
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

                }, 2000);
            }, 1000);

        }, 30000);

    });

    // Clicked Stovetop
    $('div#stoveTopGameArea').click(function() {
        var that = this;
        $('#stoveTopGameWindow').addClass('active');
        $('#stoveGameInfoContainerText').addClass('animated bounceInUp');
        $('#stoveGameInfoContainerText').fadeIn();

        $('#progress').addClass('animate');

        var stoveGame = new StoveTop(function() {
            $('#stoveTopCanvas').remove();
            $('#stoveTopGameWindow').removeClass('active');
            $('#progress').removeClass('animate');
            $('#stoveGameInfoContainerText').fadeOut();

            clearTimeout(stoveTimer);
            $('#stoveTopGameWindow').empty();

            //StoveTop.unload();
            setTimeout(function() {
                $('#stoveTopQuestionBox').fadeIn();
            }, 1000);

            $('#stoveTopAnswer1').click(function() {
                stars['stoveTop'] = true;
                $('#stoveTopWinState').fadeIn();
                $('#stoveTopQuestionBox').fadeOut();

                setTimeout(function() {
                    $('#stoveTopWinState').fadeOut();
                }, 2000);

            });

            $('#stoveTopAnswer2').click(function() {
                $('#stoveTopLoseState').fadeIn();
                $('#stoveTopQuestionBox').fadeOut();

                setTimeout(function() {
                    $('#stoveTopLoseState').fadeOut();
                }, 2000);
            });
            updateStars();
        });

    /* clicked oven
    $('div#ovenGameArea').click(function() {
        var that = this;
        console.log('show oven');
        $('#ovenGameWindow').addClass('active');
        $('#progress').addClass('animate');
        $('#kitchenInfo').removeClass('bounceInUp');
        $('#kitchenInfo').addClass('flipOutX');
          $('#ovenGameWindow').click(function() {
              $('#ovenGameWindow').fadeOut();
          });
    });
         */


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
        $('#kitchenDude').addClass('tada');
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