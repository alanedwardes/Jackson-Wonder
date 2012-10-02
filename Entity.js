function Entity()
{
	this.TYPES = {
		DEFAULT: -1,
		PLAYER: 0,
		STATIC: 1,
		ENEMY: 2,
		NPC: 3,
		CAMERA: 4
	}
	this._collisions = true;
	this.setCollisions = function(collisions) { this._collisions = collisions; }
	this.getCollisions = function() { return this._collisions; }

	this._size = [0, 0];
	this.setSize = function(w, h) { this._size = [w, h]; }
	this.getSize = function() { return { w: this._size[0], h: this._size[1] }; }
	
	this.getDimensions = function()
	{
		return {
			left:   this._position.x,
			right:  this._position.x + this._size[0],
			top:    this._position.y,
			bottom: this._position.y + this._size[1]
		};
	}
	
	this._type = this.TYPES.DEFAULT;
	this.setType = function(type) { this._type = type }
	this.getType = function() { return this._type; }
	
	this._name = 'generic';
	this.setName = function(name) { this._name = name; }
	this.getName = function() { return this._name; }
	
	this._position = new Point(0, 0);
	this.setPos = function(x, y) { this._position.set(x, y); }
	this.getPos = function() { return this._position; }
	this.setPosFromPoint = function(point) { this._position = point; }
	
	this._texture = false;
	this.setTextureFromURL = function(url)
	{
		var context = this;
	
		var image = new Image();
		image.onload = function(e)
		{
			context.setTexture(image);
		}
		image.src = url;
	}
	this.setTexture = function(texture) { this._texture = texture; }
	this.getTexture = function() { return this._texture; }
	
	this._alpha = 1;
	this.setAlpha = function(alpha) { this._alpha = alpha; }
	this.getAlpha = function() { return this._alpha; }
}