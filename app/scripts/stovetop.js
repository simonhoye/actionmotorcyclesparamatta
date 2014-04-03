

var StoveTop = function(successCallback) {
	this.canvas; //Will be linked to the canvas in our index.html page
	this.stage; //Is the equivalent of stage in AS3; we'll add "children" to it

	this.tkr = new Object;

	//preloader
	this.preloader;
	this.manifest;
	this.totalLoaded = 0;
	this.queue;
	this.dragPosY;
	this.fryingpan;
	this.fryingpan2;
	this.scene = new createjs.Container();
	this.pan1Complete = false;
	this.pan2Complete = false;
	this.guide;
	this.guideCorrect;
	this.guide2;
	this.guideCorrect2;
	this.successCallback = successCallback;

	this.init();
}

StoveTop.prototype = {
	init: function() {
     
	    this.canvas = document.getElementById('stoveTopCanvas');
	    this.stage = new createjs.Stage(this.canvas);
	         
	    this.stage.mouseEventsEnabled = true;

		this.queue = new createjs.LoadQueue();
	 	this.queue.installPlugin(createjs.Sound);
	 	this.queue.on("complete", this.handleComplete, this);
	 	this.queue.loadManifest([
		     {id: "saucepan", src:"images/game-test.png"},
		     {id: "fryingpan", src:"images/fryingpan.png"},
		     {id: "stovetop", src:"images/stovetop.png"},
		     {id: "guide", src:"images/guide.png"},
		     {id: "guide-correct", src: "images/guide-correct.png"}
		]);
	    
	    createjs.Ticker.addEventListener("tick", this.stage);
	},
	handleComplete: function(event) {
		this.initStage();
	},
	rotate: function(cx,cy,mx,my) {
		var dx = mx - cx;
		var dy = my - cy;
		var angle = Math.atan2(dy,dx) * 360 / Math.PI -90;
		console.log(angle);
		return angle;
	},
	showDialog: function() {
		var shape = new createjs.Shape();
		var g = shape.graphics;
		g.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.9));
		g.beginStroke('black');
		g.setStrokeStyle(1);
		g.drawRoundRect(0, 0, 1400, 150, 50);

		var panel = new createjs.Container();

		var copy = new createjs.Text("Spin the pan so there's no overhang!", "60px Komika", "#ffffff"); winText.x = 200; winText.y = 400; winText.textBaseline = "alphabetic";
		panel.addChild(shape);
		panel.addChild(copy);
		shape.x = 350;
		shape.y = 815;
		copy.x = 420;
		copy.y = 830;
		this.stage.addChild(panel);
		that = this;
		panel.addEventListener("mousedown", function(e){
			this.stage.removeChild(panel);
			that.startGame();
		});
	},
	initStage: function() {
		var that = this;

		var background = new createjs.Bitmap(this.queue.getResult("stovetop"));
		this.stage.addChild(background);
		this.stage.scaleX = 0.5;
		this.stage.scaleY = 0.5;

		this.guide = new createjs.Bitmap(this.queue.getResult("guide"));
		this.stage.addChild(this.guide);
		this.guide.x = 170;
		this.guide.y = 260;
		this.guide.alpha = 0;

		this.guideCorrect = new createjs.Bitmap(this.queue.getResult("guide-correct"));
		this.stage.addChild(this.guideCorrect);
		this.guideCorrect.x = 170;
		this.guideCorrect.y = 260;
		this.guideCorrect.alpha = 0;

		this.guide2 = new createjs.Bitmap(this.queue.getResult("guide"));
		this.stage.addChild(this.guide2);
		this.guide2.x = 1105;
		this.guide2.y = 320;
		this.guide2.alpha = 0;
		this.guide2.scaleX = 0.85;
		this.guide2.scaleY = 0.85;

		this.guideCorrect2 = new createjs.Bitmap(this.queue.getResult("guide-correct"));
		this.stage.addChild(this.guideCorrect2);
		this.guideCorrect2.x = 1105;
		this.guideCorrect2.y = 320;
		this.guideCorrect2.alpha = 0;
		this.guideCorrect2.scaleX = 0.85;
		this.guideCorrect2.scaleY = 0.85;

		this.startGame();
	},
	startGame: function() {
		var that = this;

		// settings
		var panRegistrationPoint = {
			x: 370,
			y: 364
		};

		this.fryingpan = new createjs.Bitmap(this.queue.getResult("fryingpan"));
		this.fryingpan.on("pressmove", function(e) {

			var kids = that.stage.getNumChildren();
			that.stage.setChildIndex(this, kids-1);
			that.guide.alpha = 1;
			that.guideCorrect.alpha = 0;
			this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
			if((this.rotation > 130 && this.rotation < 278) || (this.rotation > -449 && this.rotation < -420)) {
				that.guide.alpha = 0;
				that.guideCorrect.alpha = 1;
			}
			
		});
		this.fryingpan.on("pressup", function(e) {
			that.guide.alpha = 0;
			if((this.rotation > 130 && this.rotation < 278) || (this.rotation > -449 && this.rotation < -420)) {
				//console.log("good job");
				that.pan1Complete = true;
			}

			if(that.pan1Complete && that.pan2Complete) {
				//showWin();
				that.successCallback.call();
			}
		});
		this.stage.addChild(this.fryingpan);
		this.fryingpan.regX = panRegistrationPoint.x;
		this.fryingpan.regY = panRegistrationPoint.y;
		this.fryingpan.x = 600;
		this.fryingpan.y = 700;
		this.fryingpan.rotation = 90;

		this.fryingpan2 = new createjs.Bitmap(this.queue.getResult("fryingpan"));

		this.fryingpan2.on("pressmove", function(e) {
			var kids = that.stage.getNumChildren();
			that.stage.setChildIndex(this, kids-1);
			that.guide2.alpha = 1;
			that.guideCorrect2.alpha = 0;
			if(this.rotation > -228 && this.rotation < -59) {
				that.guide2.alpha = 0;
				that.guideCorrect2.alpha = 1;
			}
			this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
			
		});
		this.fryingpan2.on("pressup", function(e) {
			that.guide2.alpha = 0;
			if(this.rotation > -228 && this.rotation < -59) {

				that.pan2Complete = true;
			}

			if(that.pan1Complete && that.pan2Complete) {
				//showWin();
				that.successCallback.call();
			}
		});
		this.stage.addChild(this.fryingpan2);
		this.fryingpan2.regX = panRegistrationPoint.x;
		this.fryingpan2.regY = panRegistrationPoint.y;
		this.fryingpan2.x = 1480;
		this.fryingpan2.y = 700;
		this.fryingpan2.scaleX = 0.85;
		this.fryingpan2.scaleY = 0.85;
	},
	showWin: function() {
		var shape = new createjs.Shape();

		var g = shape.graphics;
		g.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.9));
		g.beginStroke('black');
		g.setStrokeStyle(1);
		g.drawRoundRect(0, 0, 1400, 150, 50);

		var panel = new createjs.Container();

		var copy = new createjs.Text("WINNER!!", "60px Komika", "#ffffff"); copy.x = 200; copy.y = 400; copy.textBaseline = "alphabetic";
		panel.addChild(shape);
		panel.addChild(copy);
		shape.x = 350;
		shape.y = 815;
		copy.x = 420;
		copy.y = 830;
		this.stage.addChild(panel);
	},
	unload: function() {
		this.stage.removeAllChildren();
		this.stage.update();
	}
}


