function generateRandomIntegerBetween(minValue, maxValue) {
	return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

function detectedCollisionBetween(ball_one, ball_two) {
	const distance = claculateDistance(
		ball_one.x,
		ball_one.y,
		ball_two.x,
		ball_two.y
	);
	if (distance <= ball_one.radius + ball_two.radius) return true;
	return false;
}
function claculateDistance(x1, y1, x2, y2) {
	let dx = x2 - x1;
	let dy = y2 - y1;
	return Math.sqrt(dx * dx + dy * dy);
}
