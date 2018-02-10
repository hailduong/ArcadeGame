import  $ from "jquery";

const COL_WIDTH = 101;
const ROW_HEIGHT = 81;
const BOARD_WIDTH = COL_WIDTH * 5;
const BOARD_HEIGHT = ROW_HEIGHT * 6;
// Enemies our player must avoid
var Enemy = function() {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.setInitialPosition();
		this.setupKeyboardNavigation();
	}

	setInitialPosition() {
		// Set initial position of the player to the grass row
		this.x = Math.round(Math.random() * 4);
		this.y = 5;
	}

	setupKeyboardNavigation() {

		const allowedKeys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};

		$(document).keyup((event) => {
			const keyCode = event.keyCode;
			const key = allowedKeys[keyCode];

			let {x, y} = this;
			switch (key) {
				case "left": {
					x > 0 && this.x--;
					break;
				}

				case "right": {
					x < 4 && this.x++;
					break;
				}

				case "up": {
					y > 0 && this.y--;
					break;
				}

				case "down": {
					y < 5 && this.y++;
				}
			}

		})
	}

	render() {
		const {x, y} = this;
		const left = x * COL_WIDTH;
		const top = y * ROW_HEIGHT;
		ctx.drawImage(Resources.get(this.sprite), left, top);
	}
}


class Enemies {
	constructor(speed) {
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
		this.setInitialPosition();
		
	}

	setInitialPosition() {
		this.x = 0;
		this.setRandomRow();

	}
	
	setRandomRow() {
		// y will be added one row, because we do not want the enemy to be created on the water row
		this.y = Math.round(Math.random() * 2) * ROW_HEIGHT + ROW_HEIGHT;
	}

	update() {
		
		// This will move the enemy
		const x = this.x;

		if (x > BOARD_WIDTH) {
			this.setInitialPosition();
		} else {
			this.x = x + this.speed;
		}
	}

	render() {
		const {x, y} = this;
		ctx.drawImage(Resources.get(this.sprite), x, y);
	}
}

window.$ = $;
window.player = new Player();
window.allEnemies = [new Enemies(2), new Enemies(1), new Enemies(4)];