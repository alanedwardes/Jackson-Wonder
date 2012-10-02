function Point(x, y)
{
	this.x = 0;
	this.y = 0;
	this.set = function(x, y)
	{
		this.x = x;
		this.y = y;
	}
	this.add = function(x, y)
	{
		this.x = this.x + x;
		this.y = this.y + y;
	}
	this.toString = function()
	{
		return Math.floor(this.x) + 'x' + Math.floor(this.y);
	}
	
	this.set(x, y);
}