const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.height = 720;
canvas.width = 1200;

//ball constatnts
const MAX_BALL_VELOCITY = 5;
const MIN_BALL_VELOCITY = 1;
const MAX_BALL_RADIUS = 30;
const MIN_BALL_RADIUS = 10;
const NUMBER_OF_BALLS = 10;

//balls array
let balls = [];

//ball class
function Ball(x, y, radius, xVelocity, yVelocity, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.xVelocity = xVelocity;
	this.yVelocity = yVelocity;

	//draw ball to canvas
	this.drawBall = () => {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.shadowColor = this.color;
		context.shadowBlur = this.radius;
		context.fill();
		context.closePath();
	};

	//update ball position after each repaint
	this.updateBall = () => {
		//detect collison with other balls
		for (let i = 0; i < balls.length; i++) {
			if (this === balls[i]) continue;
			if (detectedCollisionBetween(this, balls[i])) {
				this.xVelocity = -this.yVelocity;
				this.yVelocity = -this.yVelocity;
				balls[i].xVelocity = -balls[i].xVelocity;
				balls[i].yVelocity = -balls[i].yVelocity;
			}
		}
		//detect collision with container
		if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
			this.xVelocity = -this.xVelocity;
		}
		if (
			this.y - this.radius <= 0 ||
			this.y + this.radius >= canvas.height
		) {
			this.yVelocity = -this.yVelocity;
		}

		this.drawBall();
		this.x += this.xVelocity;
		this.y += this.yVelocity;
	};
}

//create ball

for (i = 0; i < NUMBER_OF_BALLS; i++) {
	let x = generateRandomIntegerBetween(
		MAX_BALL_RADIUS,
		canvas.width - MAX_BALL_RADIUS
	);
	let y = generateRandomIntegerBetween(
		MAX_BALL_RADIUS,
		canvas.height - MAX_BALL_RADIUS
	);
	let radius = generateRandomIntegerBetween(MIN_BALL_RADIUS, MAX_BALL_RADIUS);
	let yVelocity = generateRandomIntegerBetween(
		MIN_BALL_VELOCITY,
		MAX_BALL_VELOCITY
	);
	let xVelocity = generateRandomIntegerBetween(
		MIN_BALL_VELOCITY,
		MAX_BALL_VELOCITY
	);
	balls.push(new Ball(x, y, radius, xVelocity, yVelocity, "#3be6c6"));
}

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	balls.forEach((ball) => {
		ball.updateBall();
	});
}

animate();
