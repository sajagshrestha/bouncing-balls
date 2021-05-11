function generateRandomIntegerBetween(minValue, maxValue) {
	return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

function detectedCollisionBetween(ball1, ball2) {
	let dx = ball1.x - ball2.x;
	let dy = ball1.y - ball2.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	if (distance <= ball1.radius + ball2.radius) return true;
	return false;
}
