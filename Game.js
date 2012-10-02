function Game()
{
	this.gameManager = new GameManager();
	this.debug = false;
	this.addEntity = function(entity)
	{
		this.entities.push(entity);
	}
	this.start = function()
	{
		this.gameManager.getRenderer().start();
		
		var entities = this.gameManager.getEntities();
		for (var i = 0; i < entities.length; i++)
		{
			if (entities[i].construct) entities[i].construct();
		}
		
		this.startThinking();
	}
	this.tick = function()
	{
		var entities = this.gameManager.getEntities();
		for (var i = 0; i < entities.length; i++)
		{
			var entity = entities[i];
			if (entity.think) entity.think();
		}
	}
	this.startThinking = function()
	{
		var context = this;
		setInterval(function(){
			context.tick();
		}, 1000 / 60);
	}
}