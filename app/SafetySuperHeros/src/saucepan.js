var Saucepan = cc.Sprite.extend({
	instance:null,
	ctor:function() {
		this._super();

		this.initWithSpriteFrameName("res/game-test.png");
        this.setPosition(100, 100);
        this.setScale(0.5);
        this.addChild(this.saucepan);
	},
	onEnter: function() {
		console.log('on enter');
	},
	onTouchBegan: function(touch, event) {
        console.log(touch);
    }
});