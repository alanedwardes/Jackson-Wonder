function Keyboard()
{
	// Singleton: http://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern
	if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance;
	else arguments.callee._singletonInstance = this;
	
	this.keys = {
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		space: 32
	};
	this.pressed = [];
	this.listen = function()
	{
		var context = this;
		document.body.addEventListener('keydown', function(e){
			if (context.pressed.indexOf(e.which) < 0)
			{
				context.pressed.push(e.which);
			}
			
			e.preventDefault();
			return false;
		});
		document.body.addEventListener('keyup', function(e){
			var index = context.pressed.indexOf(e.which);
			context.pressed.splice(index, 1);
			
			e.preventDefault();
			return false;
		});
	}
	this.isPressed = function(key)
	{
		return (this.pressed.indexOf(key) > -1);
	}
}