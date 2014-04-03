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
    var bgR = parseInt(bgColor.substr(1, 3), 16);
    var bgG = parseInt(bgColor.substr(3, 5), 16);

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
        puddleData.context.lineWidth = 65;
        puddleData.context.lineJoin = 'round';
        puddleData.context.lineCap = 'round';

        var puddle = this.game.add.sprite(0, 0, puddleData);

        mop = this.game.add.sprite(150, 100, 'mop');
        mop.scale.setMagnitude(0.5);

        mop.inputEnabled = true;
        mop.input.enableDrag(false, true);

        cactus = this.game.add.sprite(250, 100, 'cactus');
        cactus.scale.setMagnitude(0.5);

        cactus.inputEnabled = true;
        cactus.input.enableDrag(false, true);

        var thisObj = this;
        cactus.events.onInputDown.add(function() {
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
        var pixels = puddleData.getPixels(new Phaser.Rectangle(game.world.centerX - delta, game.world.centerY - delta, 2 * delta, 2 * delta)).data;
//        console.log(pixels);
        for (var i in pixels) {
            if (pixels[i] > 0) {
                return false;
            }
        }
        return true;
    }
};


PuddleGame.prototype.stop = function() {
    this.game.destroy();
};
