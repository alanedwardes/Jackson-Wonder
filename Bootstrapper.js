function Bootstrap()
{
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       || 
			  window.webkitRequestAnimationFrame || 
			  window.mozRequestAnimationFrame    || 
			  window.oRequestAnimationFrame      || 
			  window.msRequestAnimationFrame     || 
			  function(callback){
				window.setTimeout(callback, 1000 / 60);
			  };
	})();

	var gameManager = new GameManager();

	var canvas = document.getElementById('game');
	gameManager.setCanvas(canvas);

	var game = new Game();
	gameManager.setGame(game);

	var collision = new Collision();
	gameManager.setCollision(collision);

	var keyboard = new Keyboard();
	keyboard.listen();
	gameManager.setKeyboard(keyboard);
	
	Level1();

	var player = new Player();
	gameManager.addEntity(player);

	var cursor = new Cursor();
	gameManager.addEntity(cursor);
	
	var camera = new Camera();
	camera.setWatchedEntity(player);
	gameManager.addEntity(camera);

	var renderer = new Renderer();
	gameManager.setRenderer(renderer);

	game.start();
}