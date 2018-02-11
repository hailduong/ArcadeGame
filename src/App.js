import  $ from "jquery";
import swal from "sweetalert";

const COL_WIDTH = 101;
const ROW_HEIGHT = 81;
const BOARD_WIDTH = COL_WIDTH * 5;
const BOARD_HEIGHT = ROW_HEIGHT * 6;
const WATER_ROW_TOP = 0;

class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.width = 101; // the width of the sprite
		this.offset = 17; // the offset from the margin of the sprite to the character itself

		this.setInitialPosition();
		this.handleInput();
	}

	setInitialPosition() {
		// Set initial position of the player to the grass row
		this.x = Math.round(Math.random() * 4);
		this.y = 5;
	}

	handleInput() {
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

	update() {
		const {x, y} = this;
		this.left = x * COL_WIDTH;
		this.top = y * ROW_HEIGHT;
		this.collisionLeft = this.left + this.offset;
		this.collisionRight = this.left + this.width - this.offset;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.left, this.top);
	}
}


class Enemy {
	constructor(speed) {
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
		this.width = 101;
		this.standardDeltaTime = (1000 / 60) / 1000; // for 60fps
		this.setInitialPosition();
	}

	setInitialPosition() {
		this.left = 0;
		this.setRandomRow();

	}

	setRandomRow() {
		// y will be added one row, because we do not want the enemy to be created on the water row
		this.top = Math.round(Math.random() * 2) * ROW_HEIGHT + ROW_HEIGHT;
	}

	update(dt) {

		// This will move the enemy
		const left = this.left;

		// Let's add an extra column to the width, 
		// so there is a time when we do not see the enemies on board
		const bufferWidth = BOARD_WIDTH + COL_WIDTH;

		// Need to multiple with the dt, the standard one is 0.016666... for 60fps
		// If the time it took for the previous frame was more than the standard,
		// then the distance should be increased as well
		const distance = this.speed * (dt / this.standardDeltaTime);

		if (left > bufferWidth) {
			this.setInitialPosition();
		} else {
			this.left = left + distance;
		}

		this.collisionLeft = this.left;
		this.collisionRight = this.left + this.width;
	}

	render() {
		const {left, top} = this;
		ctx.drawImage(Resources.get(this.sprite), left, top);
	}
}


global.checkCollisions = () => {
	// Check collision with enemy
	allEnemies.forEach(enemy => {
		const isTopOverlap = enemy.top === player.top;
		const isLeftOverlap = enemy.collisionRight - player.collisionLeft > 0
			&& player.collisionRight - enemy.collisionLeft > 0;
		const overlap = isTopOverlap && isLeftOverlap;

		if (overlap) {
			swal("You are eaten!", "Sorry! You are eaten by that scary bug.", "error");
			player.setInitialPosition()
		}
	});

	// Check collision with the water row.
	if (WATER_ROW_TOP === player.top) {
		global.userWon = true;
		swal("You win", "Congratulation! You have crossed the street", "success")
	}
};

global.player = new Player();
global.allEnemies = [new Enemy(2), new Enemy(1), new Enemy(4)];