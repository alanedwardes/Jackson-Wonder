function Player()
{
	this.gameManager = new GameManager();
	this.keyboard = this.gameManager.getKeyboard();
	this.collision = this.gameManager.getCollision();
	this.context = this.gameManager.getContext();
	
	// Constants
	this.WIDTH = 32;
	this.HEIGHT = 62;
	this.SPEED = 2;
	this.GRAVITY = 2;
	this.JUMP = 5;
	this.MAXSPEED = 5;
	this.FRICTION = 1;
	
	// State data
	this.startedJumping = Number.MAX_VALUE;
	this.velocity = new Point(0, 0);
	this.health = 100;
	this.inAir = false;
	this.isJumping = false;
	this.isMoving = false;
	this.stars = 0;
	
	// Set up entity
	this.base = new Entity();
	this.base.setCollisions(false);
	this.base.setName('player');
	this.base.setSize(this.WIDTH, this.HEIGHT);
	this.base.setPos(0, 0);
	this.base.setTextureFromURL('man.png');
	
	// Set up collision feeler
	var thisObject = this;
	this.collisionFeeler = new CollisionFeeler();
	this.collisionFeeler.base.setType(this.base.TYPES.PLAYER);
	this.collisionFeeler.base.setSize(this.WIDTH, this.HEIGHT);
	this.collisionFeeler.damage = function(amount) { thisObject.damage(amount) };
	this.collisionFeeler.addHealth = function(amount) { thisObject.addHealth(amount) };
	this.collisionFeeler.debugText = function() { return "health: " + thisObject.health; }
	this.gameManager.addEntity(this.collisionFeeler);
	
	this.experience_icon = false;
	this.heart_icon = false;
	this.construct = function()
	{
		var context = this;
		var experience = new Image();
		experience.onload = function(e)
		{
			context.experience_icon = experience;
		}
		experience.src = 'experience.png';
		
		var heart = new Image();
		heart.onload = function(e)
		{
			context.heart_icon = heart;
		}
		heart.src = 'heart.png';
	}
	
	this.inputThink = function()
	{
		var keys = this.keyboard.keys;
		
		// if (this.keyboard.isPressed(keys.down))  this.velocity.y = Math.min(this.velocity.y + this.SPEED, -this.MAXSPEED);
		// if (this.keyboard.isPressed(keys.up))    this.velocity.y = Math.max(this.velocity.y - this.SPEED,  this.MAXSPEED);
		if (this.keyboard.isPressed(keys.left))  this.velocity.x = Math.min(this.velocity.x + this.SPEED, -this.MAXSPEED);
		if (this.keyboard.isPressed(keys.right)) this.velocity.x = Math.max(this.velocity.x - this.SPEED,  this.MAXSPEED);
		
		var pressedJump = this.keyboard.isPressed(keys.space) || this.keyboard.isPressed(keys.up);
		
		if (pressedJump && (!this.inAir || this.isJumping))
		{
			if (this.startedJumping + 150 > new Date().getTime())
			{
				if (!this.isJumping)
				{
					this.startedJumping = new Date().getTime();
					this.isJumping = true;
				}
				this.velocity.y -= this.JUMP;
			}
			else
			{
				this.isJumping = false;
				this.startedJumping = Number.MAX_VALUE;
			}
		}
	}
	this.velocityThink = function()
	{
		if (this.velocity.x > 0)      this.velocity.x -= this.FRICTION;
		else if (this.velocity.x < 0) this.velocity.x += this.FRICTION;
		
		if (this.velocity.y > 0)      this.velocity.y -= this.FRICTION;
		else if (this.velocity.y < 0) this.velocity.y += this.FRICTION;
		
		this.velocity.y += this.GRAVITY;
	}
	this.testVelocityCollision = function(x, y)
	{
		this.collisionFeeler.base.setPos(x, y);
		return (this.collision.collidingWith(this.collisionFeeler).length > 0);
	}
	this.think = function()
	{
		this.base.setAlpha(1);
		this.inputThink();
		this.velocityThink();
		
		var pos = this.base.getPos();
		
		// Test with our feeler, are we okay to move left/right
		if (this.testVelocityCollision(pos.x + this.velocity.x, pos.y)) this.velocity.x = -this.velocity.x / 5;
		
		// Again but up/down. Also set whether we're in the air or not.
		if (this.testVelocityCollision(pos.x, pos.y + this.velocity.y))
		{
			this.velocity.y = -this.velocity.y / 5;
			this.inAir = false;
		}
		else this.inAir = true;
		
		// Stop spazzing
		if (this.velocity.y < 1 && this.velocity.y > -1) this.velocity.y = 0;
		if (this.velocity.x < 1 && this.velocity.x > -1) this.velocity.x = 0;
		
		// Set isMoving
		this.isMoving = (this.velocity.x + this.velocity.y !== 0);
		
		// Set the position of the player
		this.base.setPos(this.velocity.x + pos.x, this.velocity.y + pos.y);
	}
	
	this.damage = function(amount)
	{
		this.health -= amount;
		
		if (this.health <= 0)
		{
			this.health = 100;
			this.base.setPos(0, 0);
		}
		
		this.base.setAlpha(0.2);
	}
	
	this.addHealth = function(amount)
	{
		this.stars++;
		this.health += amount;
		
		if (this.health > 100) this.health = 100;
	}
	
	this.paint = function()
	{
		if (this.experience_icon && this.heart_icon)
		{
			this.context.drawImage(this.heart_icon, 5, 5, 14, 15);
			this.context.font = "10px Arial";
			this.context.fillText(this.health + '%', 20, 16);
			
			this.context.drawImage(this.experience_icon, 50, 4, 14, 15);
			this.context.fillText(this.stars, 68, 16);
		}
	}
}