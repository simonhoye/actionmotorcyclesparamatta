function PuddleGame() {
    this.game = null;
    this.successCallback = null;
}

PuddleGame.prototype.start = function(successCallback) {
    this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'puddleGameWindow', { preload: preload, create: create, update: update });
    this.successCallback = successCallback;
    var puddleData;
    var mop;
    var cactus;
    var prevPoint;
    var bgColor = "#473D3B";
    var bgR = parseInt(bgColor.substr(1, 2), 16);
    var bgG = parseInt(bgColor.substr(3, 2), 16);
    var bgB = parseInt(bgColor.substr(5, 2), 16);

    console.log(bgColor.substr(1, 2));
    console.log(bgColor.substr(3, 2));
    console.log(bgColor.substr(5, 2));

    function preload () {
        this.game.load.image('puddle', 'images/puddleGamePuddle.png');
        this.game.load.image('cactus', 'images/puddleGameCactus.png');
        this.game.load.image('mop', 'images/puddleGameMop.png');
    }

    function create () {
        this.game.stage.backgroundColor = bgColor;
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

        mop = this.game.add.sprite(150, 100, 'mop');
        mop.scale.setMagnitude(0.6);

        mop.inputEnabled = true;
        mop.input.enableDrag(false, true);

        cactus = this.game.add.sprite(250, 100, 'cactus');
        cactus.scale.setMagnitude(0.6);

        cactus.inputEnabled = true;
        cactus.input.enableDrag(false, true);

        var thisObj = this;
        cactus.events.onInputDown.add(function() {
            puddleData.context.clearRect(0, 0, game.world.width, game.world.height);
            successCallback();
        }, thisObj);

        mop.events.onInputUp.add(function() {
            if (checkPuddleIsClean(this.game)) {
                successCallback();
            }
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
//        console.log(pixels);
        for (var i=0; i < pixels.length; i += 128) {

            if ( !(pixels[i] > bgR - 2 && pixels[i+1] > bgG - 2 && pixels[i+2] > bgB - 2)
                && !(pixels[i] < bgR + 2 && pixels[i+1] < bgG + 2 && pixels[i+2] < bgB + 2)
                && !(pixels[i] == 0 && pixels[i+1] == 0 && pixels[i+2] == 0) ) {
                console.log(pixels[i] + ", " + pixels[i+1] + ", " + pixels[i+2]);
                console.log(pixels[i] + ", " + pixels[i+1] + ", " + pixels[i+2]);
                console.log(bgR + ", " + bgG + ", " + bgB);
                return false;
            }
        }
        return true;
    }
};


PuddleGame.prototype.stop = function() {
    this.game.destroy();
};
