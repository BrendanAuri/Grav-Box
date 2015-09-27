var GravBox = function(boxNo, pos, image)
{
    this.position = pos;
	this.scale = new Vector2(64 * scaleFactor, 64 * scaleFactor);
	this.number = boxNo;
    this.collider = new Collider(this.position, this.scale, this.number);
	this.collider.parent = this;
	this.top = new Collider(new Vector2(this.position.x + this.scale.x / 2, this.position.y - 64), new Vector2(8, 64));
	this.bottom = new Collider(new Vector2(this.position.x + this.scale.x / 2, this.position.y + this.scale.y), new Vector2(8, 64));
	this.left = new Collider(new Vector2(this.position.x, this.position.y + this.scale.y / 2), new Vector2(64, 8));
	this.right = new Collider(new Vector2(this.position.x, this.position.y + this.scale.y / 2), new Vector2(64, 8));
	
    this.image = document.createElement("img");
	this.image.src = image;
	
	this.canMoveDown = true;
	this.canMoveUp = true;
	this.canMoveLeft = true;
	this.canMoveRight = true;
	
	gravBoxes.push(this);
};

GravBox.prototype.draw = function(image)
{
    //this.sprite.src = this.image;
    //context.drawImage(this.sprite, this.position.x, this.position.y);
	
	this.collider.position = this.position;
	this.top.position = new Vector2(this.position.x + this.scale.x / 2, this.position.y - 68);
	this.bottom.position = new Vector2(this.position.x + this.scale.x / 2, this.position.y + this.scale.y + 4);
	this.left.position = new Vector2(this.position.x - 68, this.position.y + this.scale.y / 2);
	this.right.position = new Vector2(this.position.x + this.scale.x + 4, this.position.y + this.scale.y / 2);
};