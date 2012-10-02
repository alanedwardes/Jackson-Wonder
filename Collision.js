function Collision()
{
	this.gameManager = new GameManager();
	this.isColliding = function(entity1, entity2)
	{
		var d1 = entity1.base.getDimensions();
		var d2 = entity2.base.getDimensions();
		
		var right = d1.left < d2.right;
		
		var left = d1.right > d2.left;

		var top = d1.bottom > d2.top;
		
		var bottom = d1.top < d2.bottom;
		
		return right && left && top && bottom;
	}
	
	this.collidingWith = function(entity)
	{
		var collidingEntities = [];
		var entities = this.gameManager.getEntities();
		for (var i = 0; i < entities.length; i++)
		{
			// We can't collide with ourself.
			if (entities[i] == entity) continue;
			// Check if collisions are turned off
			if (entities[i].base.getCollisions() === false) continue;
			// Check if colliding
			if (this.isColliding(entity, entities[i])) collidingEntities.push(entities[i]);
		}
		
		return collidingEntities;
	}
}