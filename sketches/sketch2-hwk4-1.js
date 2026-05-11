// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const CANVAS_SIZE = 800;
  let isPaused = false; // Track pause state
  let h, m, s;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
    p.background(255);

    // Only update time if not paused
    if (!isPaused) {
      h = p.hour();
      m = p.minute();
      s = p.second();
    }

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
    p.rect(p.width / 2, p.height / 2 + 10, 220, 140, 10); 
    p.rectMode(p.CORNER);

    p.fill(255);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2), p.width / 2, p.height / 2);

    // --- Progress Bar and Markers ---
    p.fill(80);
    p.rect(p.width * 0.4, p.height / 2 + 15, p.width * 0.2, 8); // Background bar
    
    p.fill(255, 204, 0);
    p.rect(p.width * 0.4, p.height / 2 + 15, p.map(percent, 0, 100, 0, p.width * 0.2), 8); // Progress
    
    // Markers: Red lines at 40 mins (20 left) and 55 mins (5 left)
    p.stroke(255, 0, 0); 
    p.strokeWeight(2);
    let barX = p.width * 0.4;
    let barW = p.width * 0.2;
    
    p.line(barX + (40 / 60) * barW, p.height / 2 + 15, barX + (40 / 60) * barW, p.height / 2 + 23);
    p.line(barX + (55 / 60) * barW, p.height / 2 + 15, barX + (55 / 60) * barW, p.height / 2 + 23);
    
    p.noStroke(); // Always reset stroke so it doesn't affect the text or other shapes
    p.fill(255);
    p.textSize(14);
    p.text(p.floor(percent) + "%", p.width / 2, p.height / 2 + 35);

    // --- PAUSE BUTTON UI ---
    p.fill(isPaused ? 200 : 255); // Change color when clicked
    p.rectMode(p.CENTER);
    p.rect(p.width / 2, p.height / 2 + 60, 80, 25, 5);
    p.fill(0);
    p.textSize(12);
    p.text(isPaused ? "RESUME" : "PAUSE", p.width / 2, p.height / 2 + 60);
    p.rectMode(p.CORNER);

    // Draw frame as part of the sketch output.
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  // Handle clicking the button
  p.mousePressed = function() {
    let btnX = p.width / 2;
    let btnY = p.height / 2 + 60;
    // Check if mouse is within the button bounds
    if (p.mouseX > btnX - 40 && p.mouseX < btnX + 40 && p.mouseY > btnY - 12 && p.mouseY < btnY + 12) {
      isPaused = !isPaused;
    }
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});


