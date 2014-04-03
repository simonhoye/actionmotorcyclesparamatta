function PuddleGame() {
    this.game = null;
    this.successCallback = null;
}

PuddleGame.prototype.start = function(successCallback, lossCallback) {
    this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'puddleGameWindow', { preload: preload, create: create, update: update });
    var puddleData;
    var mop;
    var cactus;
    var racket;
    var prevPoint;
    var bgColor = "#473D3B";
    var bgR = parseInt(bgColor.substr(1, 2), 16);
    var bgG = parseInt(bgColor.substr(3, 2), 16);
    var bgB = parseInt(bgColor.substr(5, 2), 16);

    function preload () {
        this.game.load.image('puddle', 'images/puddleGamePuddle.png');
        this.game.load.image('cactus_up', 'images/puddleGameCactus_up.png');
        this.game.load.image('mop_up', 'images/puddleGameMop_up.png');
        this.game.load.image('racket_up', 'images/puddleGameRacket_up.png');
        this.game.load.image('cactus_down', 'images/puddleGameCactus_down.png');
        this.game.load.image('mop_down', 'images/puddleGameMop_down.png');
        this.game.load.image('racket_down', 'images/puddleGameRacket_down.png');
    }

    function create () {
        this.game.stage.backgroundColor = bgColor;
        this.stage.disableVisibilityChange = true;
        puddleData = this.game.add.bitmapData(this.game.world.width, this.game.world.height);
        var puddleImage = this.game.cache.getImage('puddle');
        var puddleScale = 2;
        var puddleImageW = puddleImage.width / puddleScale;
        var puddleImageH = puddleImage.height / puddleScale;
        puddleData.context.drawImage(puddleImage, this.game.world.centerX - (puddleImageW / 2), this.game.world.centerY - (puddleImageH / 2), puddleImageW, puddleImageH);
        puddleData.context.strokeStyle = bgColor;
        puddleData.context.lineWidth = 75;
        puddleData.context.lineJoin = 'round';
        puddleData.context.lineCap = 'round';

        var puddle = this.game.add.sprite(0, 0, puddleData);

        cactus = this.game.add.sprite(100, 100, 'cactus_up');
        cactus.scale.setMagnitude(0.6);
        cactus.inputEnabled = true;
        cactus.input.enableDrag(false, true);

        mop = this.game.add.sprite(175, 100, 'mop_up');
        mop.scale.setMagnitude(0.6);
        mop.inputEnabled = true;
        mop.input.enableDrag(false, true);

        racket = this.game.add.sprite(250, 100, 'racket_up');
        racket.scale.setMagnitude(0.6);
        racket.inputEnabled = true;
        racket.input.enableDrag(false, true);

        mop.events.onInputUp.add(function(game, sprite) {
            if (checkPuddleIsClean(this.game)) {
                puddleData.context.clearRect(0, 0, game.world.width, game.world.height);
                successCallback();
            }
        }, this);

        cactus.events.onInputDown.add(function(game, sprite) {
//            sprite.setTexture();
            lossCallback("cactus");
        }, this);

        racket.events.onInputDown.add(function(game, sprite) {
            lossCallback("racket");
        }, this);


    }

    function update() {
        if (this.game.input.activePointer.isDown && mop.input.isDragged) {
            var point = new Phaser.Point(this.game.input.activePointer.position.x, this.game.input.activePointer.position.y);
            if (prevPoint) {
                var context = puddleData.context;
                context.lineTo(point.x, point.y);
                context.stroke();
            }
            prevPoint = point;
            puddleData.dirty = true;
        } else if (this.game.input.activePointer.isDown && cactus.input.isDragged) {
            puddleData.context.clearRect(this.game.input.activePointer.position.x, this.game.input.activePointer.position.y, 20, 20);
            puddleData.dirty = true;
        }
    }

    function checkPuddleIsClean(game) {
        var delta = 25;
        var pixels = puddleData.getPixels(new Phaser.Rectangle(0, 0, game.world.width, game.world.height)).data;
        for (var i=0; i < pixels.length; i+=16) {

            if ( !(pixels[i] > bgR - 6 && pixels[i+1] > bgG - 6 && pixels[i+2] > bgB - 6)
                && !(pixels[i] < bgR + 6 && pixels[i+1] < bgG + 6 && pixels[i+2] < bgB + 6)
                && !(pixels[i] == 0 && pixels[i+1] == 0 && pixels[i+2] == 0) ) {
                return false;
            }
        }
        return true;
    }
};


PuddleGame.prototype.stop = function() {
    //this.game.destroy();
};
