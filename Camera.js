function Camera()
{
	// Singleton: http://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern
	if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance;
	else arguments.callee._singletonInstance = this;
	
	// Set up entity
	this.base = new Entity();
	this.base.setName('camera');
	this.base.setType(this.base.TYPES.CAMERA);
	this.base.setCollisions(false);
	
	this.cursor = new Cursor();
	this.gameManager = new GameManager();
	this.canvas = this.gameManager.getCanvas();
	
	this._moveTolerance = 100;
	
	this._watchedEntity = false;
	this.setWatchedEntity = function(entity) { this._watchedEntity = entity; }
	this.getWatchedEntity = function() { return this._watchedEntity; }
	
	this.think = function()
	{
		var watchedPos = this._watchedEntity.base.getPos();
		var thisPos = this.base.getPos();
		var newPos = thisPos;
		
		if (watchedPos.x - thisPos.x > this._moveTolerance)
			newPos.x = watchedPos.x - this._moveTolerance;
		if (thisPos.x - watchedPos.x > this._moveTolerance)
			newPos.x = watchedPos.x + this._moveTolerance;
		if (watchedPos.y - thisPos.y > this._moveTolerance)
			newPos.y = watchedPos.y - this._moveTolerance;
		if (thisPos.y - watchedPos.y > this._moveTolerance)
			newPos.y = watchedPos.y + this._moveTolerance;
		
		//var cursorOffset = this.cursor.getOffset();
		//newPos.add((cursorOffset.x - this.canvas.width / 2) / 200, (cursorOffset.y - this.canvas.height / 2) / 200);
		
		this.base.setPosFromPoint(newPos);
	}
}