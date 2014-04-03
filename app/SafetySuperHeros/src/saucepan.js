var Saucepan = cc.Sprite.extend({

	ctor:function() {
		this._super();
		this.saucepan = cc.Sprite.create(s_Saucepan);
        this.saucepan.setPosition(size.width / 2, size.height / 2);
        this.saucepan.setScale(0.5);

	}
});