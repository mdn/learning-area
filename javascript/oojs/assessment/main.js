// Thanks to Renan Martineli for this version of the demo

// setup canvas
const para = document.querySelector('p'); // The ball counter paragraph
let count = 0; // Initialize ball count

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
};

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// --- Shape Class (Base Class) ---
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// --- Ball Class (Inherits from Shape) ---
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    if (this.exists) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  update() {
    if ((this.x + this.size) >= width) { this.velX = -(this.velX); }
    if ((this.x - this.size) <= 0) { this.velX = -(this.velX); }
    if ((this.y + this.size) >= height) { this.velY = -(this.velY); }
    if ((this.y - this.size) <= 0) { this.velY = -(this.velY); }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists && this.exists) { // Added check for this.exists
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// --- UPDATED: EvilEyes Class (Inherits from Shape) ---
class EvilEyes extends Shape { // Renamed class
  constructor(x, y) {
    super(x, y, 20, 20); // Velocity
    this.color = "white";
    this.size = 10; // Size of each eye

    // Keyboard controls remain the same
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'a': this.x -= this.velX; break;
        case 'd': this.x += this.velX; break;
        case 'w': this.y -= this.velY; break;
        case 's': this.y += this.velY; break;
      }
    });
  }

  // UPDATED: Draw method to draw two eyes
  draw() {
    ctx.beginPath(); // Start drawing
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;

    // Calculate positions for left and right eyes based on center (this.x) and size
    const eyeSpacing = this.size; // Space between the centers of the eyes
    const leftEyeX = this.x - eyeSpacing;
    const rightEyeX = this.x + eyeSpacing;

    // Draw left eye outline
    ctx.arc(leftEyeX, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke(); // Draw the outline

    // Draw right eye outline
    ctx.beginPath(); // Need a new path for the second circle
    ctx.arc(rightEyeX, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke(); // Draw the outline
  }

  // checkBounds remains the same, based on the center point and size
  checkBounds() {
    // Check based on the *center* point and the size of one eye for simplicity
    // Adjust slightly to account for the spacing
    const effectiveRightBound = this.x + this.size + this.size; // Center + eye size + spacing
    const effectiveLeftBound = this.x - this.size - this.size; // Center - eye size - spacing

    if (effectiveRightBound >= width) { this.x = width - this.size * 2; }
    if (effectiveLeftBound <= 0) { this.x = this.size * 2; }
    if ((this.y + this.size) >= height) { this.y = height - this.size; }
    if ((this.y - this.size) <= 0) { this.y = this.size; }
  }

  // collisionDetect remains the same, detecting based on the center point
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x; // Still uses the center point for collision
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Collision happens if distance is less than eye size + ball size
        // (This is an approximation, but good enough for this demo)
        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          para.textContent = 'Ball count: ' + count;
        }
      }
    }
  }
}
// --- END OF EvilEyes Class ---

// --- Create Balls ---
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  count++;
}
para.textContent = 'Ball count: ' + count; // Set initial count display

// --- UPDATED: Create an instance of EvilEyes ---
const evilEyes = new EvilEyes(random(0, width), random(0, height)); // Renamed instance

// --- Animation Loop ---
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // --- UPDATED: Use the evilEyes instance ---
  evilEyes.draw();
  evilEyes.checkBounds();
  evilEyes.collisionDetect();

  requestAnimationFrame(loop);
}

// Start the animation
loop();