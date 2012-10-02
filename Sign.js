function Sign(x, y, text)
{
	this.base = new Entity();
	this.base.setSize(51, 53);
	this.base.setPos(x, y);
	this.base.setTextureFromURL('sign.png');
	
	this.text = text;
	
	this.debugText = function() { return "text: " + this.text; }
	this.click = function() { alert(this.text); }
}