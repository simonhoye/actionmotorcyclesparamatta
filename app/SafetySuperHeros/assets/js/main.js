var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;
var queue;
var dragPosY;

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
	//saucepan1.src = queue.getResult("saucepan");
	//console.log(saucepan1);
	saucepan1.on("pressmove", function(e) {
		console.log(e);
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
	saucepan1.x = 400;
	saucepan1.y = 400;



}