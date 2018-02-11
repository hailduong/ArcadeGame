import {COL_WIDTH, ROW_HEIGHT, BOARD_WIDTH} from "./constants";

export default class Enemy {
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