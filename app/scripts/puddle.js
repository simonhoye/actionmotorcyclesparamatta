function PuddleGame(successCallback) {
    this.game = null;
    this.successCallback = successCallback;
}

PuddleGame.prototype.start = function() {
    this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'puddleGameWindow', { preload: preload, create: create, update: update });
    var puddleData;
    var mop;
    var cactus;
    var prevPoint;

    function preload () {
        this.game.load.image('puddle', 'images/puddleGamePuddle.png');
        this.game.load.image('cactus', 'images/puddleGameCactus.png');
        this.game.load.image('mop', 'images/puddleGameMop.png');
    }

    function create () {
        this.game.stage.backgroundColor = '#473D3B';
        puddleData = this.game.add.bitmapData(this.game.world.width, this.game.world.height);
        var puddleImage = this.game.cache.getImage('puddle');
        var puddleScale = 2;
        var puddleImageW = puddleImage.width / puddleScale;
        var puddleImageH = puddleImage.height / puddleScale;
        puddleData.context.drawImage(puddleImage, this.game.world.centerX - (puddleImageW / 2), this.game.world.centerY - (puddleImageH / 2), puddleImageW, puddleImageH);
        puddleData.context.strokeStyle = '#473D3B';
        puddleData.context.lineWidth = 65;
        puddleData.context.lineJoin = 'round';
        puddleData.context.lineCap = 'round';
//        puddleData.context.fillRect(0, 0, this.game.world.width, this.game.world.height);

        var puddle = this.game.add.sprite(0, 0, puddleData);

        mop = this.game.add.sprite(150, 100, 'mop');
        mop.scale.setMagnitude(0.5);

        mop.inputEnabled = true;
        mop.input.enableDrag(false, true);

        cactus = this.game.add.sprite(250, 100, 'cactus');
        cactus.scale.setMagnitude(0.5);

        cactus.inputEnabled = true;
        cactus.input.enableDrag(false, true);
//        mop.events.onInputDown.add(function(arg1) {puddleData.context.beginPath()}, this);
//        mop.events.onInputUp.add(function() {checkPuddleIsClean()}, this);

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

    function checkPuddleIsClean() {
        var pixels = puddleData.imageData.data;
        for (var i in pixels) {
            if (pixels[i] > 0) {
                console.log(pixels[i]);
            }
        }
    }
};


PuddleGame.prototype.stop = function() {
    this.game.destroy();
};
