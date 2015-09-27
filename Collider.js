var Collider = function(p, s, tag)
{
	this.position = p;
	this.scale = s;
	this.tag = tag;
	this.parent = "";
	
	colliders.push(this);
}

Collider.prototype.draw = function(color)
{
	context.strokeStyle = color;
	context.strokeRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
}

Collider.prototype.isTouching = function(col)
{
	if(this.position.x <= col.position.x + col.scale.x &&
	   this.position.x + this.scale.x >= col.position.x &&
	   this.position.y <= col.position.y + col.scale.y &&
	   this.position.y + this.scale.y >= col.position.y)
	{
		return true;
	}
	else
	{
		return false;
	}
}