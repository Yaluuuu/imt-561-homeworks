// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  const CANVAS_SIZE = 800;
  let leaves = [];
  let lastSecond;
  class Leaf {
    constructor(x, y, col, isLanded = false) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(p.random(-1, 1), p.random(1, 3));
      this.acc = p.createVector(0, 0);
      this.angle = p.random(p.TWO_PI);
      this.rotSpeed = p.random(-0.05, 0.05);
      this.color = col;
      this.size = p.random(10, 20);
      this.isLanded = isLanded;
    }
    update() {
      if (!this.isLanded) {
        let mouse = p.createVector(p.mouseX, p.mouseY);
        let dir = p5.Vector.sub(this.pos, mouse);
        let dist = dir.mag();
        if (dist < 100) {
          dir.setMag(0.5);
          this.acc.add(dir);
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.angle += this.rotSpeed;
        this.acc.mult(0);

        let h = p.hour();
        let m = p.minute();
    
        let dayProgress = (h * 60 + m) / 1440;
        let currentSurface = p.map(dayProgress, 0, 1, p.height - 55, 50);

        if (this.pos.y >= currentSurface) {
          this.pos.y = currentSurface;
          this.isLanded = true;
        }
      }
    }
    display() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);
      p.fill(this.color);
      p.noStroke();
      p.beginShape();
      p.vertex(0, -this.size / 2);
      p.bezierVertex(this.size / 2, -this.size / 4, this.size / 2, this.size / 4, 0, this.size / 2);
      p.bezierVertex(-this.size / 2, this.size / 4, -this.size / 2, -this.size / 4, 0, -this.size / 2);
      p.endShape(p.CLOSE);
      p.pop();
    }
  }
  function getLeafColor(h) {
    if (h >= 5 && h < 11) return p.color(p.random(100, 150), p.random(200, 255), 100);
    if (h >= 11 && h < 16) return p.color(p.random(50, 100), p.random(150, 200), 50);
    if (h >= 16 && h < 19) return p.color(p.random(200, 255), p.random(100, 150), 0);
    return p.color(p.random(150, 200), p.random(50, 100), 50);
  }

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    lastSecond = p.second();

    let h = p.hour();
    let m = p.minute();

    // Calculate the total progress for 24 hous
    let totalMinutesPast = h * 60 + m;
    let dayProgress = totalMinutesPast / 1440;

    let preExistingAmount = dayProgress * 2000; 

    for (let i = 0; i < preExistingAmount; i++) {
      let leafColor = getLeafColor(h);
      let startX = p.random(p.width);
      let currentMaxHeight = p.map(dayProgress, 0, 1, p.height - 20, 50);
      let startY = p.random(currentMaxHeight, p.height - 20);
  
      leaves.push(new Leaf(startX, startY, leafColor, true));
    }
  };

  p.draw = function () {
    let h = p.hour();
    let m = p.minute();
    let s = p.second();

    // Background color
    let bgCol = p.color(20, 30, h * 5 + 20);
    p.background(bgCol);

    // Every second, add a new leaf
    if (s !== lastSecond) {
      let leafColor = getLeafColor(h);
      leaves.push(new Leaf(p.random(p.width), -20, leafColor));
      lastSecond = s;
    }

    if (leaves.length > 2000) leaves.shift();

    for (let i = leaves.length - 1; i >= 0; i--) {
      leaves[i].update();
      leaves[i].display();
    }

    // Display time
    p.fill(255, 100);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.text(p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2), p.width / 2, p.height - 30);
    

    // Draw frame as part of the sketch output.
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
