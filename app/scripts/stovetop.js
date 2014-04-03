

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
		     {id: "stovetop", src:"images/stovetop.png"}
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
			
			this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
			
		});
		this.fryingpan.on("pressup", function(e) {
			console.log(e);
			if(this.rotation > 180 && this.rotation < 260) {
				console.log("good job");
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

			this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
			
		});
		this.fryingpan2.on("pressup", function(e) {
			if(this.rotation > -180 && this.rotation < -100) {
				console.log("good job");
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

// $(function() {
// 	new StoveTop(function() {
// 		alert('hello');
// 	});
// });



// function stoveTop(successCallback)
// {
//     /* Link Canvas */

//     this.successCallback = successCallback;
     
//     canvas = document.getElementById('stoveTopCanvas');
//     stage = new createjs.Stage(canvas);
         
//     stage.mouseEventsEnabled = true;

// 	queue = new createjs.LoadQueue();
//  	queue.installPlugin(createjs.Sound);
//  	queue.on("complete", handleComplete, this);
//  	queue.loadManifest([
// 	     {id: "saucepan", src:"images/game-test.png"},
// 	     {id: "fryingpan", src:"images/fryingpan.png"},
// 	     {id: "stovetop", src:"images/stovetop.png"}
// 	]);
    
//     createjs.Ticker.addEventListener("tick", stage);
// }

 
// function handleComplete(event) {
//     initStage();
// }

// function rotate(cx,cy,mx,my) {
// 	var dx = mx - cx;
// 	var dy = my - cy;
// 	var angle = Math.atan2(dy,dx) * 360 / Math.PI -90;
// 	console.log(angle);
// 	return angle;
// }

// function showDialog() {
// 	var shape = new createjs.Shape();

// 	var g = shape.graphics;
// 	g.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.9));
// 	g.beginStroke('black');
// 	g.setStrokeStyle(1);
// 	g.drawRoundRect(0, 0, 1400, 150, 50);

// 	var panel = new createjs.Container();

// 	var copy = new createjs.Text("Spin the pan so there's no overhang!", "60px Komika", "#ffffff"); winText.x = 200; winText.y = 400; winText.textBaseline = "alphabetic";
// 	panel.addChild(shape);
// 	panel.addChild(copy);
// 	shape.x = 350;
// 	shape.y = 815;
// 	copy.x = 420;
// 	copy.y = 830;
// 	this.stage.addChild(panel);
// 	that = this;
// 	panel.addEventListener("mousedown", function(e){
// 		this.stage.removeChild(panel);
// 		that.startGame();
// 	});

// }


// function initStage() {
// 	var that = this;

// 	var background = new createjs.Bitmap(queue.getResult("stovetop"));
// 	stage.addChild(background);
// 	stage.scaleX = 0.5;
// 	stage.scaleY = 0.5;

// 	this.startGame();
// }

// function startGame() {

// 	var that = this;

// 	// settings
// 	var panRegistrationPoint = {
// 		x: 370,
// 		y: 364
// 	};

// 	var fryingpan = new createjs.Bitmap(queue.getResult("fryingpan"));
// 	fryingpan.on("pressmove", function(e) {

// 		var kids = that.stage.getNumChildren();
// 		that.stage.setChildIndex(this, kids-1);
		
// 		this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
		
// 	});
// 	fryingpan.on("pressup", function(e) {
// 		console.log(e);
// 		if(this.rotation > 180 && this.rotation < 260) {
// 			console.log("good job");
// 			that.pan1Complete = true;
// 		}

// 		if(that.pan1Complete && that.pan2Complete) {
// 			//showWin();
// 			that.successCallback.call();
// 		}
// 	});
// 	stage.addChild(fryingpan);
// 	fryingpan.regX = panRegistrationPoint.x;
// 	fryingpan.regY = panRegistrationPoint.y;
// 	fryingpan.x = 600;
// 	fryingpan.y = 700;
// 	fryingpan.rotation = 90;

// 	var fryingpan2 = new createjs.Bitmap(queue.getResult("fryingpan"));

// 	fryingpan2.on("pressmove", function(e) {
// 		var kids = that.stage.getNumChildren();
// 		that.stage.setChildIndex(this, kids-1);

// 		this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
		
// 	});
// 	fryingpan2.on("pressup", function(e) {
// 		console.log(e);
// 		if(this.rotation > -180 && this.rotation < -100) {
// 			console.log("good job");
// 			that.pan2Complete = true;
// 		}

// 		if(that.pan1Complete && that.pan2Complete) {
// 			//showWin();
// 			that.successCallback.call();
// 		}
// 	});
// 	stage.addChild(fryingpan2);
// 	fryingpan2.regX = panRegistrationPoint.x;
// 	fryingpan2.regY = panRegistrationPoint.y;
// 	fryingpan2.x = 1480;
// 	fryingpan2.y = 700;
// 	fryingpan2.scaleX = 0.85;
// 	fryingpan2.scaleY = 0.85;
// }

// function showWin() {
// 	var shape = new createjs.Shape();

// 	var g = shape.graphics;
// 	g.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.9));
// 	g.beginStroke('black');
// 	g.setStrokeStyle(1);
// 	g.drawRoundRect(0, 0, 1400, 150, 50);

// 	var panel = new createjs.Container();

// 	var copy = new createjs.Text("WINNER!!", "60px Komika", "#ffffff"); winText.x = 200; winText.y = 400; winText.textBaseline = "alphabetic";
// 	panel.addChild(shape);
// 	panel.addChild(copy);
// 	shape.x = 350;
// 	shape.y = 815;
// 	copy.x = 420;
// 	copy.y = 830;
// 	this.stage.addChild(panel);

// }

// function showLose() {

// }

// function unload() {
// 	this.stage.removeAllChildren();
// 	this.stage.update();
// }

