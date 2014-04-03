

var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;
var queue;
var dragPosY;
var winText = new createjs.Text("WELL DONE!", "100px Komica Axis", "#ff7700"); winText.x = 200; winText.y = 400; winText.textBaseline = "alphabetic";
var fryingpan;
var fryingpan2;
var scene = new createjs.Container();

function stoveTop()
{
    /* Link Canvas */
     
    canvas = document.getElementById('stoveTopCanvas');
    stage = new createjs.Stage(canvas);
         
    stage.mouseEventsEnabled = true;

	queue = new createjs.LoadQueue();
 	queue.installPlugin(createjs.Sound);
 	queue.on("complete", handleComplete, this);
 	queue.loadManifest([
	     {id: "saucepan", src:"images/game-test.png"},
	     {id: "fryingpan", src:"images/fryingpan.png"},
	     {id: "stovetop", src:"images/stovetop.png"}
	]);
    
    createjs.Ticker.addEventListener("tick", stage);
}

 
function handleComplete(event) {
    initStage();
}

function rotate(cx,cy,mx,my) {
	var dx = mx - cx;
	var dy = my - cy;
	var angle = Math.atan2(dy,dx) * 360 / Math.PI -90;
	console.log(angle);
	return angle;
}

function showDialog() {
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

}


function initStage() {
	var that = this;

	var background = new createjs.Bitmap(queue.getResult("stovetop"));
	stage.addChild(background);
	stage.scaleX = 0.5;
	stage.scaleY = 0.5;

	this.startGame();
}

function startGame() {

	var that = this;
	
	// settings
	var panRegistrationPoint = {
		x: 370,
		y: 364
	};

	var fryingpan = new createjs.Bitmap(queue.getResult("fryingpan"));
	fryingpan.on("pressmove", function(e) {

		var kids = that.stage.getNumChildren();
		that.stage.setChildIndex(this, kids-1);
		
		this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
		
	});
	stage.addChild(fryingpan);
	fryingpan.regX = panRegistrationPoint.x;
	fryingpan.regY = panRegistrationPoint.y;
	fryingpan.x = 600;
	fryingpan.y = 700;
	fryingpan.rotation = 90;

	var fryingpan2 = new createjs.Bitmap(queue.getResult("fryingpan"));

	fryingpan2.on("pressmove", function(e) {
		var kids = that.stage.getNumChildren();
		that.stage.setChildIndex(this, kids-1);

		this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
		
	});
	fryingpan2.on("pressup", function(e) {
		console.log(e);
		if(this.rotation < -180 && this.rotation > -100) {
			console.log("good job");
			that.winText.text = "WELL DONE"
			//this.removeEventListener("pressmove", arguments.callee);
			//this.removeEventListener("pressup", arguments.callee);
		}
	});
	stage.addChild(fryingpan2);
	fryingpan2.regX = panRegistrationPoint.x;
	fryingpan2.regY = panRegistrationPoint.y;
	fryingpan2.x = 1480;
	fryingpan2.y = 700;
	fryingpan2.scaleX = 0.85;
	fryingpan2.scaleY = 0.85;
}

function showWin() {

}

function showLose() {

}

function unload() {
	this.stage.removeAllChildren();
}

