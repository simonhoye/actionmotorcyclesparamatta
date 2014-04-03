

var SaucepanGame = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,
    saucepan: null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer);

        this.saucepan = new Saucepan();
        this.saucepan2 = new Saucepan();

        this.saucepan.setPosition(100,400);
        this.saucepan2.setPosition(600,400);

        this.setPosition(new cc.Point(0,0));

        this.saucepan.setPosition(new cc.Point(size.width/2,size.height/2));
        this.saucepan.scheduleUpdate();
        this.schedule(this.update);
        

        lazyLayer.addChild(this.saucepan, 1);
        lazyLayer.addChild(this.saucepan2, 2);

        // Set audio volumes
        cc.AudioEngine.getInstance().setMusicVolume(0.7);

        cc.AudioEngine.getInstance().playMusic("res/background.mp3", true);

        this.setTouchEnabled(true);
        return true;
    },
    onEnter:function(){
        this._super();
    },
    update:function(dt){
        
    },
    onTouchesEnded:function (pTouch,pEvent){
        this.saucepan.handleTouch(pTouch[0].getLocation());
    },
    onTouchesMoved:function(pTouch,pEvent){
        this.saucepan.handleTouchMove(pTouch[0].getLocation());
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

