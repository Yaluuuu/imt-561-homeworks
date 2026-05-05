// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const CANVAS_SIZE = 800;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
    p.background(255);

    let h = p.hour();
    let m = p.minute();
    let s = p.second();

    let cols = 60; 
    let rows = 60; 
    let w = p.width / cols;
    let h_size = p.height / rows;

    p.noStroke();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
 
        if (r < m || (r === m && c < s)) {

          p.fill(p.map(h, 0, 23, 50, 200), 100, 150);
        } else if (r === m && c === s) {
  
          p.fill(255, 0, 0, p.abs(p.sin(p.frameCount * 0.1)) * 255);
        } else {
 
          p.fill(240); 
        }
        p.rect(c * w, r * h_size, w - 1, h_size - 1);
      }
    }

    let totalSeconds = m * 60 + s;
    let percent = (totalSeconds / 3600) * 100;

    p.fill(0,150);
    p.rectMode(p.CENTER);
    p.rect(p.width / 2, p.height / 2 + 10, 220, 100, 10); // UI 区域的底框
    p.rectMode(p.CORNER);

    p.fill(255);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2), p.width / 2, p.height / 2);

    p.fill(80);
    p.rect(p.width * 0.4, p.height / 2 + 15, p.width * 0.2, 8);
    p.fill(255, 204, 0);
    p.rect(p.width * 0.4, p.height / 2 + 15, p.map(percent, 0, 100, 0, p.width * 0.2), 8);
    p.fill(255);
    p.textSize(14);
    p.text(p.floor(percent) + "%", p.width / 2, p.height / 2 + 35);

    // Draw frame as part of the sketch output.
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});


