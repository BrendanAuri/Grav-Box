var StatBox = function(pos)
{
	this.position = pos;
	this.scale = new Vector2(64 * scaleFactor, 64 * scaleFactor);
	this.collider = new Collider(this.position, this.scale);
	this.collider.parent = this;
	
	statBoxes.push(this);
}