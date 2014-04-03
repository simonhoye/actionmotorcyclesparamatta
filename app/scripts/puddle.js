var puddleGame = function() {

    var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'puddleGameWindow', { preload: preload, create: create, update: update });
    var puddleData;
    var cloth;
    var prevPoint;

    function preload () {

        game.load.image('puddle', 'images/puddle.png');
        game.load.image('cloth', 'images/cloth.png');

    }

    function create () {

        this.game.stage.backgroundColor = '#473D3B';
        puddleData = game.add.bitmapData(game.world.width, game.world.height);
        var puddleImage = game.cache.getImage('puddle');
        puddleData.context.drawImage(puddleImage, 0, 0);

        var puddle = game.add.sprite(game.world.centerX, game.world.centerY, puddleData);
        puddle.anchor.setTo(0.5, 0.5);
        puddle.scale.setMagnitude(0.9);

        cloth = game.add.sprite(200, 150, 'cloth');
        cloth.anchor.setTo(0.5, 0.5);
        cloth.scale.setMagnitude(0.5);

        cloth.inputEnabled = true;
        cloth.input.enableDrag(false, true);
        cloth.events.onInputDown.add(function(arg1) {console.log(arg1)}, this);

    }

    function update() {
        if (game.input.activePointer.isDown && cloth.input.isDragged) {
            puddleData.context.clearRect(game.input.activePointer.position.x, game.input.activePointer.position.y, 20, 20);
            puddleData.dirty = true;
        }
    }

};