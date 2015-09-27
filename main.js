var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
{
// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}
}
//-------------------- Don't modify anything above here-----------------------------------------------------------------------------------------------
var gravBox1 = new GravBox(1, new Vector2(2 * UNIT, 0), "gravbox1.png");
var gravBox2 = new GravBox(2, new Vector2(0 * UNIT, 0), "gravbox1.png");
var gravBox3 = new GravBox(3, new Vector2(1 * UNIT, 0), "gravbox1.png");
var gravBox4 = new GravBox(4, new Vector2(2 * UNIT, 1 * UNIT), "gravbox1.png");

var statBox1 = new StatBox(new Vector2(1 * UNIT, 2 * UNIT));
var statBox1 = new StatBox(new Vector2(2 * UNIT, 3 * UNIT));

var keyboard = new Keyboard();
var movingDown = false;
var movingUp = false;
var movingLeft = false;
var movingRight = false;

var floor = new Collider(new Vector2(0, 576), new Vector2(1024, 64), "");

function run()
{
	var deltaTime = getDeltaTime();
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < gravBoxes.length; i++)
	{
		gravBoxes[i].collider.draw("#fff");
		gravBoxes[i].draw();
		context.fillStyle = "#fff";
		context.fillText(gravBoxes[i].number, gravBoxes[i].position.x + 32 * scaleFactor, gravBoxes[i].position.y + 32 * scaleFactor);
		
		gravBoxes[i].top.draw("#f00");
		gravBoxes[i].bottom.draw("#f00");
		gravBoxes[i].right.draw("#f00");
		gravBoxes[i].left.draw("#f00");
		
		for(var x = 0; x < colliders.length; x++)
		{
			if(gravBoxes[i].number != colliders[x].tag)
			{
				if(gravBoxes[i].collider.isTouching(colliders[x]) && gravBoxes[i].bottom.isTouching(colliders[x]))
				{
					gravBoxes[i].canMoveDown = false;
				}
			}
		}
		
		for(var j = 0; j < statBoxes.length; j++)
		{
			if((gravBoxes[i].collider.isTouching(statBoxes[j].collider) && gravBoxes[i].bottom.isTouching(statBoxes[j].collider)) ||
				gravBoxes[i].collider.isTouching(gravBoxes[i].collider) && gravBoxes[i].bottom.isTouching(gravBoxes[i].collider))
			{
				gravBoxes[i].canMoveDown = false;
			}
			//else {gravBoxes[i].canMoveDown = true;}
			
			if((gravBoxes[i].collider.isTouching(statBoxes[j].collider) && gravBoxes[i].top.isTouching(statBoxes[j].collider)) ||
				gravBoxes[i].collider.isTouching(gravBoxes[i].collider) && gravBoxes[i].top.isTouching(gravBoxes[i].collider))
			{
				gravBoxes[i].canMoveUp = false;
			}
			//else {gravBoxes[i].canMoveUp = true;}
			
			if((gravBoxes[i].collider.isTouching(statBoxes[j].collider) && gravBoxes[i].left.isTouching(statBoxes[j].collider)) ||
				gravBoxes[i].collider.isTouching(gravBoxes[i].collider) && gravBoxes[i].left.isTouching(gravBoxes[i].collider))
			{
				gravBoxes[i].canMoveLeft = false;
			}
			//else {gravBoxes[i].canMoveLeft = true;}
			
			if((gravBoxes[i].collider.isTouching(statBoxes[j].collider) && gravBoxes[i].right.isTouching(statBoxes[j].collider)) ||
				gravBoxes[i].collider.isTouching(gravBoxes[i].collider) && gravBoxes[i].right.isTouching(gravBoxes[i].collider))
			{
				gravBoxes[i].canMoveRight = false;
			}
			//else {gravBoxes[i].canMoveRight = true;}
		}
	}
	
	for(var i = 0; i < statBoxes.length; i++)
	{
		statBoxes[i].collider.draw("#0f0");
	}
	
	if(keyboard.IsKeyDown(40) === true)
	{
		movingDown = true;
	}
	if(keyboard.IsKeyDown(38) === true)
	{
		movingUp = true;
	}
	if(keyboard.IsKeyDown(37) === true)
	{
		movingLeft = true;
		console.log(gravBoxes[gravBoxes.length - 1].canMoveDown);
		
	}
	if(keyboard.IsKeyDown(39) === true)
	{
		movingRight = true;
	}
	
	if(movingDown)
	{
		for(var i = 0; i < gravBoxes.length; i++)
		{
			if(gravBoxes[i].canMoveDown)
			{
				gravBoxes[i].position.y += 1;
			}
		}
	}
	if(movingUp)
	{
		for(var i = 0; i < gravBoxes.length; i++)
		{
			if(gravBoxes[i].canMoveUp)
			{
				gravBoxes[i].position.y -= 1;
			}
		}
	}
	if(movingLeft)
	{
		for(var i = 0; i < gravBoxes.length; i++)
		{
			if(gravBoxes[i].canMoveLeft)
			{
				gravBoxes[i].position.x -= 1;
			}
		}
	}
	if(movingRight)
	{
		for(var i = 0; i < gravBoxes.length; i++)
		{
			if(gravBoxes[i].canMoveRight)
			{
				gravBoxes[i].position.x += 1;
			}
		}
	}
}

{
//-------------------- Don't modify anything below here --------------------------------------------------------------------------------------------


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
}
