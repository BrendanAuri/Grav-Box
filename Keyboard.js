var Keyboard = function()
{	
	var self = this;
	
	window.addEventListener('keydown', function(e){ self.OnKeyDown(e); }, false);
	window.addEventListener('keyup', function(e){ self.OnKeyUp(e); }, false);
	
	this.keys = [];
}

Keyboard.prototype.OnKeyDown = function(e){
	this.keys[e.keyCode] = true;
}

Keyboard.prototype.OnKeyUp = function(e){
	this.keys[e.keyCode] = false;
}

Keyboard.prototype.IsKeyDown = function(keyCode){
	return this.keys[keyCode];
}