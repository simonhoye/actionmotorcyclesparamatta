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
        var puddleScale = 2.5;
        puddleData.context.drawImage(puddleImage, 0, 0, puddleImage.width / puddleScale, puddleImage.height / puddleScale);

        var puddle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, puddleData);
        puddle.anchor.setTo(0.5, 0.5);

        mop = this.game.add.sprite(200, 150, 'mop');
        mop.anchor.setTo(0.5, 0.5);
        mop.scale.setMagnitude(0.5);

        mop.inputEnabled = true;
        mop.input.enableDrag(false, true);
        mop.events.onInputDown.add(function(arg1) {console.log(arg1)}, this);

    }

    function update() {
        if (this.game.input.activePointer.isDown && mop.input.isDragged) {
            puddleData.context.clearRect(this.game.input.activePointer.position.x, this.game.input.activePointer.position.y, 20, 20);
            puddleData.dirty = true;
        }
    }
};


PuddleGame.prototype.stop = function() {
    this.game.destroy();
};
