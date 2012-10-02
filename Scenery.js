function Scenery(x, y, w, h, texturePath, collide)
{
	this.base = new Entity();
	this.base.setName('scenery');
	this.base.setType(this.base.TYPES.STATIC);
	this.base.setPos(x, y);
	this.base.setSize(w, h);
	this.base.setTextureFromURL(texturePath);
	if (collide !== undefined)
	{
		this.base.setCollisions(collide);
	}
}