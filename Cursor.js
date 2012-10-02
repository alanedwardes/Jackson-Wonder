function Cursor()
{
	// Singleton: http://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern
	if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance;
	else arguments.callee._singletonInstance = this;
	
	this.base = new Entity();
	this.base.setName('cursor');
	this.base.setSize(1, 1);
	this.base.setCollisions(false);
	
	this.gameManager = new GameManager();
	
	this._offset = new Point(0, 0);
	this.getOffset = function() { return this._offset; }
	
	this.construct = function()
	{
		this.collision = this.gameManager.getCollision();
		this.canvas = this.gameManager.getCanvas();
		this.renderer = this.gameManager.getRenderer();
		
		var context = this;
		this.canvas.addEventListener('click', function(e){
			if (e.target != context.canvas) return;
			else return context.click(e);
		});
		this.canvas.addEventListener('mousemove', function(e){
			if (e.target != context.canvas) return;
			else return context.hover(e);
		});
	}
	
	this.click = function(e)
	{
		this._offset.set(e.offsetX, e.offsetY);
		var pos = this.renderer.offsetViewportPos(e.offsetX, e.offsetY);
		this.base.setPos(pos.x, pos.y);
		var collidingWith = this.collision.collidingWith(this);
		for (var i = 0; i < collidingWith.length; i++)
		{
			if (collidingWith[i].click) collidingWith[i].click();
		}
	}
	
	this.hover = function(e)
	{
		this._offset.set(e.offsetX, e.offsetY);
		var pos = this.renderer.offsetViewportPos(e.offsetX, e.offsetY);
		this.base.setPos(pos.x, pos.y);
		var collidingWith = this.collision.collidingWith(this);
		for (var i = 0; i < collidingWith.length; i++)
		{
			if (collidingWith[i].click) return this.canvas.style.cursor = 'pointer';
		}
		this.canvas.style.cursor = 'default';
	}
	
	this.debugText = function()
	{
		return this._offset.toString();
	}
}