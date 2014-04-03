

var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;
var queue;
var dragPosY;
var winText = new createjs.Text("WELL DONE!", "100px Arial", "#ff7700"); winText.x = 200; winText.y = 400; winText.textBaseline = "alphabetic";

var scene = new createjs.Container();

function Main()
{
    /* Link Canvas */
     
    canvas = document.getElementById('stage');
    stage = new createjs.Stage(canvas);
         
    stage.mouseEventsEnabled = true;

	queue = new createjs.LoadQueue();
 	queue.installPlugin(createjs.Sound);
 	queue.on("complete", handleComplete, this);
 	queue.loadManifest([
	     {id: "saucepan", src:"assets/img/game-test.png"},
	     {id: "fryingpan", src:"assets/img/fryingpan.png"},
	     {id: "stovetop", src:"assets/img/stovetop.png"}
	]);
    
    createjs.Ticker.addEventListener("tick", stage);
}

 
function handleComplete(event) {
    initStage();
}

function rotate(cx,cy,mx,my) {
	var dx = mx -cx;
	var dy = my - cy;
	var angle = Math.atan2(dy,dx) * 360 / Math.PI;

	return angle;
}


function initStage() {
	var that = this;

	var background = new createjs.Bitmap(queue.getResult("stovetop"));
	stage.addChild(background);
	stage.scaleX = 0.5;
	stage.scaleY = 0.5;


	// settings
	var panRegistrationPoint = {
		x: 370,
		y: 364
	};

	var fryingpan = new createjs.Bitmap(queue.getResult("fryingpan"));
	fryingpan.on("pressmove", function(e) {
		//	TODO: need to swap depths
		//that.stage.swapChildren(this, that.fryingpan2);
		
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
		that.stage.setChildIndex(this,4);
		
		// var a = this.regX - e.stageX;
		// var o = this.regY - e.stageY;
		// var angle = Math.atan(o/a) * 360 / Math.PI;

		//this.rotation = angle;
		this.rotation = that.rotate(this.regX, this.regY, e.stageX, e.stageY);
		
	});
	fryingpan2.on("pressup", function(e) {
		console.log(this.rotation);
		if(this.rotation > 40 && this.rotation < 130) {
			console.log("good job");
			that.winText.text = "WELL DONE"
			//that.stage.addChild(winText);
		} else {
			that.winText.text = "NOPE TRY AGAIN";
		}
	});
	stage.addChild(fryingpan2);
	fryingpan2.regX = panRegistrationPoint.x;
	fryingpan2.regY = panRegistrationPoint.y;
	fryingpan2.x = 1400;
	fryingpan2.y = 700;
}

