var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
// Graphics
//[Background]
 
var bg; //The background graphic
 
//[Title View]
  
 
var main; //The Main Background


var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;


var TitleView = new createjs.Container();



function Main()
{
    /* Link Canvas */
     
    canvas = document.getElementById('stage');
    stage = new createjs.Stage(canvas);
         
    stage.mouseEventsEnabled = true;

 
	var queue = new createjs.LoadQueue();
 	queue.installPlugin(createjs.Sound);
 	queue.on("complete", handleComplete, this);
 	queue.loadManifest([
	     {id: "saucepan", src:"assets/img/game-test.png"}
	]);
    /* Ticker */
     
    createjs.Ticker.addEventListener("tick", stage);
}

function handleProgress(event)
{
    //use event.loaded to get the percentage of the loading
}
 
function handleComplete(event) {
         //triggered when all loading is complete
}
 
function handleFileLoad(event) {
         //triggered when an individual file completes loading
             
         switch(event.type)
         {
            case PreloadJS.IMAGE:
            //image loaded
             var img = new Image();
              img.src = event.src;
              img.onload = handleLoadComplete;
              window[event.id] = new Bitmap(img);
            break;
 
            case PreloadJS.SOUND:
            //sound loaded
            handleLoadComplete();
            break;
         }
}

function handleLoadComplete(event) 
{
 
   totalLoaded++;
    
   if(manifest.length==totalLoaded)
   {
       initStage();
       
   }
}

function initStage() {
	
	saucepan = new createjs.Sprite();
	stage.addChild(saucepan, saucepan2);

	saucepan.addEventListener('mousedown', function() {
		alert("click!!!");
	})

}
 
