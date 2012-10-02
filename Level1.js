function Level1()
{
	var gameManager = new GameManager();
	
	// Trees
	gameManager.addEntity(new Scenery(200, 100, 261, 308, 'bigtree.png', false));
	gameManager.addEntity(new Scenery(50, 310, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(450, 310, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(550, 310, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(550, 210, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(670, 310, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(650, 210, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(600, 110, 66, 91, 'tree.png'));
	gameManager.addEntity(new Scenery(850, 310, 66, 91, 'tree.png'));

	// Signs
	gameManager.addEntity(new Sign(150, 350, 'Enemies hurt. Try to avoid them.'));
	gameManager.addEntity(new Sign(950, 350, 'You beat the game! Well done!'));
	
	// Enemies
	var enemy = new Enemy(800, 359);
	enemy.setSpeed(5);
	gameManager.addEntity(enemy);
	gameManager.addEntity(new Enemy(230, 359));
	
	// Stars
	gameManager.addEntity(new Experience(800, 359));
	gameManager.addEntity(new Experience(130, 385));
	gameManager.addEntity(new Experience(937, 385));
	
	// Ground
	gameManager.addEntity(new Scenery(-812, 400, 812, 300, 'ground.png'));
	gameManager.addEntity(new Scenery(0, 400, 812, 300, 'ground.png'));
	gameManager.addEntity(new Scenery(812, 400, 812, 300, 'ground.png'));
	
	// Grass
	gameManager.addEntity(new Scenery(-812, 390, 812, 10, 'grass.png', false));
	gameManager.addEntity(new Scenery(0, 390, 812, 10, 'grass.png', false));
	gameManager.addEntity(new Scenery(812, 390, 812, 10, 'grass.png', false));
}