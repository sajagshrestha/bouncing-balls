const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.height = 720;
canvas.width = 1200;

//ball constatnts
const MAX_BALL_VELOCITY = 5;
const MIN_BALL_VELOCITY = -5;
const MAX_BALL_RADIUS = 15;
const MIN_BALL_RADIUS = 8;
const NUMBER_OF_BALLS = 120;
const MASS = 1;

//colors array
const colors = [
	"#EB932B",
	"#2BEBC8",
	"#9327E6",
	"#EB2B2B",
	"#2B3EEB",
	"#F5FA16",
];

//balls array
let balls = [];

//ball class
function Ball(x, y, radius, xVelocity, yVelocity, color, mass) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.velocity = {
		x: xVelocity,
		y: yVelocity,
	};
	this.mass = mass;
	//draw ball to canvas
	this.drawBall = () => {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.shadowColor = this.color;
		context.shadowBlur = this.radius * 2;
		context.fill();
		context.closePath();
	};

	//update ball position after each repaint
	this.updateBall = () => {
		// detect collison with other balls
		for (let i = 0; i < balls.length; i++) {
			if (this === balls[i]) continue;
			if (detectedCollisionBetween(this, balls[i])) {
				resolveCollision(this, balls[i]);
			}
		}
		//detect collision with container
		if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
			this.velocity.x = -this.velocity.x;
		}
		if (
			this.y - this.radius <= 0 ||
			this.y + this.radius >= canvas.height
		) {
			this.velocity.y = -this.velocity.y;
		}

		this.drawBall();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};
}

//create ball

for (i = 0; i < NUMBER_OF_BALLS; i++) {
	let radius = generateRandomIntegerBetween(MIN_BALL_RADIUS, MAX_BALL_RADIUS);
	let x = generateRandomIntegerBetween(radius, canvas.width - radius);
	let y = generateRandomIntegerBetween(radius, canvas.height - radius);
	let yVelocity = generateRandomIntegerBetween(
		MIN_BALL_VELOCITY,
		MAX_BALL_VELOCITY
	);
	let xVelocity = generateRandomIntegerBetween(
		MIN_BALL_VELOCITY,
		MAX_BALL_VELOCITY
	);
	let color = colors[generateRandomIntegerBetween(0, colors.length)];
	//prevent balls form generating on top of ech other
	if (i !== 0) {
		for (let j = 0; j < balls.length; j++) {
			if (
				claculateDistance(x, y, balls[j].x, balls[j].y) -
					(radius + balls[j].radius) <
				0
			) {
				x = generateRandomIntegerBetween(radius, canvas.width - radius);
				y = generateRandomIntegerBetween(
					radius,
					canvas.height - radius
				);

				j = -1;
			}
		}
	}

	balls.push(new Ball(x, y, radius, xVelocity, yVelocity, color, MASS));
}

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	balls.forEach((ball) => {
		ball.updateBall();
	});
}

animate();
