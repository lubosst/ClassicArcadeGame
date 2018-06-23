// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.setStartPositions();
};

// Setting starting position for Enemy instance
// set x = -1
// set y = random(1, 2, 3) - randomly spawn Enemy at one line of pavement
// set speed = random 
Enemy.prototype.setStartPositions = function() {
	this.x = -1;
	this.y = Math.floor(Math.random()*(3-1+1)+1);
	this.speed = Math.floor((Math.random()*3)+1);
	//console.log("x: " + this.x + "; y: " + this.y + "; speed: " + this.speed);
	this.adjust = -20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if (this.x < 5) {
		console.log("this.x = " + this.x + "; this.speed: " + this.speed + "; dt:" + dt);
		this.x += this.speed * dt;
	} else {
		this.x = 0;
		this.setStartPositions();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { 
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 + this.adjust);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = 2;
	this.y = 5;
	this.movement = {x: 0, y: 0};
	this.adjust = -20;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 + this.adjust);
};

Player.prototype.update = function() {
	this.x += this.movement.x;
	this.y += this.movement.y;
	this.movement.x = 0;
	this.movement.y = 0;
	if (this.y === 0) {
		this.x = 2;
		this.y = 5;
	}
};

Player.prototype.handleInput = function(direction) {
	switch(direction) {
		case 'left':
			this.moveLeft();
			break;
		case 'right':
			this.moveRight();
			break;
		case 'up':
			this.moveUp();
			break;
		case 'down':
			this.moveDown();
			break;
		default:
		
	}
};

Player.prototype.moveLeft = function() {
	if (this.x > 0) {
		this.movement.x = -1;
		this.movement.y = 0;
	}
};

Player.prototype.moveRight = function() {
	if (this.x < 4) {
		this.movement.x = 1;
		this.movement.y = 0;
	}
};

Player.prototype.moveUp = function() {
	if (this.y > 0) {
		this.movement.x = 0;
		this.movement.y = -1;
	}
};

Player.prototype.moveDown = function() {
	if (this.y < 5) {
		this.movement.x = 0;
		this.movement.y = 1;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

(function displayEnemies() {
	allEnemies.push(new Enemy());
	allEnemies.push(new Enemy());
	allEnemies.push(new Enemy());
	allEnemies.push(new Enemy());
	allEnemies.push(new Enemy());
}());

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
