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
        var puddleScale = 2.5;
        var puddleImageW = puddleImage.width / puddleScale;
        var puddleImageH = puddleImage.height / puddleScale;
        puddleData.context.drawImage(puddleImage, this.game.world.centerX - (puddleImageW / 2) + 30, this.game.world.centerY - (puddleImageH / 2) - 20, puddleImageW, puddleImageH);
        puddleData.context.globalCompositeOperation = 'destination-out';
        puddleData.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        puddleData.context.lineWidth = 75;
        puddleData.context.lineJoin = 'round';
        puddleData.context.lineCap = 'round';

        var puddle = this.game.add.sprite(0, 0, puddleData);
        puddle.alpha = 0.9;

        cactus = this.game.add.sprite(75, 75, 'cactus_up');
        cactus.scale.setMagnitude(0.5);
        cactus.inputEnabled = true;
        cactus.input.enableDrag(false, true);

        mop = this.game.add.sprite(75, 175, 'mop_up');
        mop.scale.setMagnitude(0.5);
        mop.inputEnabled = true;
        mop.input.enableDrag(false, true);

        racket = this.game.add.sprite(75, 275, 'racket_up');
        racket.scale.setMagnitude(0.5);
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
        var leeway = 250;
        var notZero = 0;
        var pixels = puddleData.getPixels(new Phaser.Rectangle(0, 0, game.world.width, game.world.height)).data;
        for (var i=0; i < pixels.length; i++) {
            if (pixels[i] > 0) {
                notZero++;
            }
        }
        return notZero < leeway;
    }
};


PuddleGame.prototype.stop = function() {
    // this.game.destroy();
};
