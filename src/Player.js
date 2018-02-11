import  $ from "jquery";
import {COL_WIDTH, ROW_HEIGHT} from "./constants";

export default class Player {
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