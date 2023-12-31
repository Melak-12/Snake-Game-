// Canvas initialization
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Game objects
var ship = {
	x: canvas.width / 2 - 25,
	y: canvas.height - 100,
	width: 50,
	height: 50,
	color: "blue"
};
var bullets = [];
var enemies = [];
for (var i = 0; i < 10; i++) {
	enemies.push({
		x: Math.random() * canvas.width,
		y: Math.random() * 100,
		width: 50,
		height: 50,
		speed: Math.random() * 5 + 1,
		color: "red"
	});
}

// Input handling
var keysDown = {};
document.addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
});

// Update game objects
function update() {
	// Move ship
	if (37 in keysDown) {
		ship.x -= 5;
	}
	if (39 in keysDown) {
		ship.x += 5;
	}

	// Move bullets
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].y -= 10;

		// Check for collision with enemies
		for (var j = 0; j < enemies.length; j++) {
			if (bullets[i].x < enemies[j].x + enemies[j].width &&
				bullets[i].x + bullets[i].width > enemies[j].x &&
				bullets[i].y < enemies[j].y + enemies[j].height &&
				bullets[i].y + bullets[i].height > enemies[j].y) {
				enemies.splice(j, 1);
				bullets.splice(i, 1);
				break;
			}
		}

		// Remove bullets when they go off screen
		if (bullets[i].y < 0) {
			bullets.splice(i, 1);
		}
	}

	// Move enemies
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].y += enemies[i].speed;

		// Check for collision with ship
		if (ship.x < enemies[i].x + enemies[i].width &&
			ship.x + ship.width > enemies[i].x &&
			ship.y < enemies[i].y + enemies[i].height &&
			ship.y + ship.height > enemies[i].y) {
			alert("Game Over!");
			document.location.reload();
		}

		// Remove enemies when they go off screen
		if (enemies[i].y > canvas.height) {
			enemies.splice(i, 1);
			enemies.push({
				x: Math.random() * canvas.width,
				y: Math.random() * 100,
				width: 50,
				height: 50,
				speed: Math.random() * 5 + 1,
				color: "red"
			});
		}
	}
}

