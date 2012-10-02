function GameManager()
{
	// Singleton: http://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern
	if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance;
	else arguments.callee._singletonInstance = this;
	
	this._debug = false;
	this.setDebug = function(debug) { this._debug = debug; }
	this.getDebug = function(debug) { return this._debug; }
	
	this._game = false;
	this.setGame = function(game) { this._game = game; }
	this.getGame = function(game) { return this._game; }
	
	this._keyboard = false;
	this.setKeyboard = function(keyboard) { this._keyboard = keyboard; }
	this.getKeyboard = function(keyboard) { return this._keyboard; }
	
	this._canvas = false;
	this.setCanvas = function(canvas) { this._canvas = canvas; }
	this.getCanvas = function(canvas) { return this._canvas; }
	
	this._context = false;
	this.getContext = function() { return this._canvas.getContext('2d'); }
	
	this._collision = false;
	this.setCollision = function(collision) { this._collision = collision; }
	this.getCollision = function(collision) { return this._collision; }
	
	this._renderer = false;
	this.setRenderer = function(renderer) { this._renderer = renderer; }
	this.getRenderer = function(renderer) { return this._renderer; }
	
	this._entities = [];
	this.addEntity = function(entity)
	{
		if (!entity.base) throw "Entity has no base.";
		else this._entities.push(entity);
	}
	this.removeEntity = function(entity)
	{
		var index = this._entities.indexOf(entity);
		if (index > 0) this._entities.splice(index, 1);
	}
	this.getEntities = function() { return this._entities; }
}