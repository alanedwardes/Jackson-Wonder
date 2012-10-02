function Enemy(x, y)
{
	this.gameManager = new GameManager();
	this.collision = this.gameManager.getCollision();
	
	this.base = new Entity();
	this.base.setName('enemy');
	this.base.setSize(55, 41);
	this.base.setPos(x, y);
	this.base.setTextureFromURL('badguy.png');

	this.speed = 2;	
	this.setSpeed = function(newSpeed) { this.speed = newSpeed; }
	
	this.direction = 0;
	
	this.think = function()
	{
		var pos = this.base.getPos();
		
		if (this.direction === 0)
		{
			this.base.setPos(pos.x - this.speed, pos.y);
			var collidingWith = this.collision.collidingWith(this);
			if (collidingWith.length > 0)
			{
				this.direction = 1;
			}
		}
		else
		{
			this.base.setPos(pos.x + this.speed, pos.y);
			var collidingWith = this.collision.collidingWith(this);
			if (collidingWith.length > 0)
			{
				this.direction = 0;
			}
		}
		
		if (collidingWith.length > 0)
		{
			for (var i = 0; i < collidingWith.length; i++)
			{
				if(!collidingWith[i].base) continue; // temporary, map
				if (collidingWith[i].base.getType() === new Entity().TYPES.PLAYER)
				{
					collidingWith[i].damage(10);
				}
			}
		}
	}
	
	this.click = function()
	{
		alert('Enemy!');
	}
}