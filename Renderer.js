function Renderer(game)
{
	this.DEBUG_FONT = "10px monospace";

	this.gameManager = new GameManager();
	this.canvas = this.gameManager.getCanvas();
	this.context = this.gameManager.getContext();
	this.camera = new Camera();
	this.viewport = new Point(0, 0);
	this.offsetViewportPos = function(x, y)
	{
		return new Point(x + this.viewport.x, y + this.viewport.y);
	}
	this.getRenderables = function()
	{
		// Cull entities if they're not in view
		var renderables = [];
		var entities = this.gameManager.getEntities();
		for (var i = 0; i < entities.length; i++)
		{
			var entity = entities[i];
			var pos = entity.base.getPos();
			var size = entity.base.getSize();
			if (pos.x > this.canvas.width + this.viewport.x) continue;
			if (pos.x + size.w < this.viewport.x) continue;
			renderables.push(entities[i]);
		}
		return renderables;
	}
	this.debugText = function(text, x, y)
	{
		this.context.font = this.DEBUG_FONT;
		this.context.fillStyle = "rgba(255, 255, 255, 0.9)";
		this.context.fillText(text, x - 1, y - 1);
		this.context.fillStyle = "rgba(0, 0, 0, 0.9)";
		this.context.fillText(text, x, y);
	}
	this.debugBox = function(entity)
	{
		var pos = entity.base.getPos();
		var size = entity.base.getSize();
		var name = entity.base.getName();
		
		if (entity.base.getCollisions())
		{
			this.context.fillStyle = "rgba(255, 54, 54, 0.4)";
			this.context.fillRect(pos.x - this.viewport.x, pos.y - this.viewport.y, size.w, size.h);
		}
		this.debugText(pos.toString(), pos.x - this.viewport.x, pos.y - this.viewport.y);
		if (name) this.debugText(name, pos.x - this.viewport.x, pos.y - this.viewport.y - 10);
		if (entity.debugText) this.debugText(entity.debugText(), pos.x - this.viewport.x, pos.y - this.viewport.y - 20);
	}
	this.render = function()
	{
		// Clear the canvas
		this.clear();
		
		// Calculate scrolling etc
		this.getViewport();
		
		var renderables = this.getRenderables();
		for (var i = 0; i < renderables.length; i++)
		{
			this.drawEntity(renderables[i]);
			if(renderables[i].paint) renderables[i].paint();
		}
		
		if (this.gameManager.getDebug())
		{
			this.debugText('draw ' + renderables.length, 5, 34);
		}
	}
	this.getViewport = function()
	{
		var watchedPos = this.camera.base.getPos();
		
		this.viewport.set(
			watchedPos.x - (this.canvas.width  / 2),
			watchedPos.y - (this.canvas.height / 2)
		);
	}
	this.watchEntity = function(entity) { this.watchedEntity = entity; }
	this.clear = function()
	{
		this.canvas.width = this.canvas.width;
	}
	this.drawEntity = function(entity)
	{
		this.context.globalAlpha = entity.base.getAlpha();
		var texture = entity.base.getTexture();
		var pos = entity.base.getPos();
		var size = entity.base.getSize();
		if (texture)
		{
			this.context.drawImage(texture, pos.x - this.viewport.x, pos.y - this.viewport.y, size.w, size.h);
		}
		if (this.gameManager.getDebug())
		{
			this.debugBox(entity);
		}
	}
	this.start = function()
	{
		var context = this;
		
		(function animloop(){
			requestAnimFrame(animloop);
			context.render();
		})();
	}
}