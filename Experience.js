function Experience(x, y)
{
	// Set up entity
	this.base = new Entity();
	this.base.setName('experience');
	this.base.setCollisions(false);
	this.base.setPos(x, y);
	this.base.setSize(14, 15);
	this.base.setTextureFromURL('experience.png');
	
	this.gameManager = new GameManager();
	this.collision = this.gameManager.getCollision();
	
	this.eaten = false;
	
	this.think = function()
	{
		if (this.eaten)
		{
			var newAlpha = this.base.getAlpha() - 0.01;
			var size = this.base.getSize();
			var newSize = { w: size.w * 1.1, h: size.h * 1.1 };
			var pos = this.base.getPos();
			var newPos = { x: pos.x - 2, y: pos.y - 15 }
			if (newAlpha > 0)
			{
				this.base.setAlpha(newAlpha);
				this.base.setSize(newSize.w, newSize.h);
				this.base.setPos(newPos.x, newPos.y);
			}
			else
			{
				this.gameManager.removeEntity(this);
			}
		}
		else
		{
			var collidingWith = this.collision.collidingWith(this);
			if (collidingWith.length > 0)
			{
				for (var i = 0; i < collidingWith.length; i++)
				{
					if(!collidingWith[i].base) continue; // temporary, map
					if (collidingWith[i].base.getType() === new Entity().TYPES.PLAYER)
					{
						collidingWith[i].addHealth(50);
						this.eaten = true;
					}
				}
			}
		}
	}
}