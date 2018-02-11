import swal from "sweetalert";
import Player from "./Player";
import Enemy from "./Enemy";

import {WATER_ROW_TOP} from "./constants";

window.checkCollisions = () => {
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
		window.userWon = true;
		swal("You win", "Congratulation! You have crossed the street", "success")
	}
};

window.player = new Player();
window.allEnemies = [new Enemy(2), new Enemy(1), new Enemy(4)];