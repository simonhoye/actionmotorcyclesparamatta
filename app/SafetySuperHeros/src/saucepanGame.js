

var SaucepanGame = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

 

        // Set audio volumes
        cc.AudioEngine.getInstance().setMusicVolume(0.7);

        cc.AudioEngine.getInstance().playMusic("res/background.mp3", true);


        this.setTouchEnabled(true);
        return true;
    }
});

var SaucepanGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SaucepanGame();
        layer.init();
        this.addChild(layer);
    }
});

