var Saucepan = cc.Sprite.extend({
	_currentRotation:0,
	ctor:function() {
		this._super();
		this.initWithFile(s_Saucepan);
		
	},
	update:function(dt){
		console.log(dt);
        this.setRotation(this._currentRotation);
    },
	// onEnter: function() {
	// 	//cc.registerTargetedDelegate(1, true, this);
	// },
	handleTouch:function(touchLocation)
    {
        // if(touchLocation.x < 300)
        //     this._currentRotation = 0;
        // else
        //     this._currentRotation = 180;
    },
    handleTouchMove:function(touchLocation){
        console.log('drag');
        var angle = Math.atan2(touchLocation.x-300,touchLocation.y-300);

        angle = angle * (180/Math.PI);
        this._currentRotation = angle;
        console.log(this._currentRotation);

    }
});