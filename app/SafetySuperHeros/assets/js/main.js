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
	     {id: "saucepan", src:"assets/img/game-test.png"}
	]);
    /* Ticker */
     
    createjs.Ticker.addEventListener("tick", stage);
}

 
function handleComplete(event) {
         //triggered when all loading is complete
         initStage();
}


function initStage() {
	var that = this;
	console.log('hello');

	var saucepan1 = new createjs.Bitmap(queue.getResult("saucepan"));
	saucepan1.on("pressmove", function(e) {
		console.log(this.rotation);
		if(e.stageY > that.dragPosY) {
			this.rotation = this.rotation-2;
		} else {
			this.rotation = this.rotation+2;
		}
		that.dragPosY = e.stageY;
		
	});
	stage.addChild(saucepan1);
	saucepan1.regX = 334;
	saucepan1.regY = 116;
	saucepan1.x = 300;
	saucepan1.y = 400;

	var saucepan2 = new createjs.Bitmap(queue.getResult("saucepan"));

	saucepan2.on("pressmove", function(e) {
		//console.log(this.rotation);
		if(e.stageY > that.dragPosY) {

			this.rotation = this.rotation-2;
			
		} else {

			this.rotation = this.rotation+2;

		}
		that.dragPosY = e.stageY;
		
	});
	saucepan2.on("pressup", function(e) {
		console.log(this.rotation);
		if(this.rotation > 40 && this.rotation < 130) {
			console.log("good job");
			that.winText.text = "WELL DONE"
			//that.stage.addChild(winText);
		} else {
			that.winText.text = "NOPE TRY AGAIN";
		}
	});
	stage.addChild(saucepan2);
	saucepan2.regX = 334;
	saucepan2.regY = 116;
	saucepan2.x = 800;
	saucepan2.y = 400;
}