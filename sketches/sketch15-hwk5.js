// Instance-mode sketch for tab 15
registerSketch('sk15', function (p) {
  const CANVAS_SIZE = 800;

  // Define variables ---
  let table;
  let categories = [
    "Time spent alone, by age of respondent (United States)",
    "Time spent with partner, by age of respondent (United States)",
    "Time spent with children, by age of respondent (United States)",
    "Time spent with with parents, siblings and other family, by age of respondent (United States)",
    "Time spent with friends, by age of respondent (United States)",
    "Time spent with coworkers, by age of respondent (United States)"
  ];
  let colors = ['#2a363b', '#e84a5f', '#ff847c', '#fecea8', '#99b898', '#355c7d'];

  p.preload = function () {
  table = p.loadTable('Americans_Time_spent_with_relationships_by_age.csv', 'csv', 'header'); 
};

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
    // security check
  if (!table || table.getRowCount() === 0) {
    p.background(255);
    p.text("Loading data...", p.width/2, p.height/2);
    return; 
  }

    p.background(255);

    let margin = 80;
    let w = p.width - margin * 2;
    let h = p.height - margin * 2;

    let maxHours = 8;
    
    if (!table) return; // security check for data loading

    let rowCount = table.getRowCount();
    let previousY = new Array(rowCount).fill(0); 

    // Mouse interaction
    let mx = p.constrain(p.mouseX, margin, margin + w);
    let hoveredIndex = p.round(p.map(mx, margin, margin + w, 0, rowCount - 1));
    let currentAge = hoveredIndex + 15;
    let lineX = p.map(hoveredIndex, 0, rowCount - 1, margin, margin + w);
    
    let selectedCategory = -1;
    let minDistance = 30; 

    for (let i = 0; i < categories.length; i++) {
      let val = table.getNum(hoveredIndex, categories[i]);
      let yPos = p.map(val / 60, 0, maxHours, p.height - margin, margin);
      
      let d = p.abs(p.mouseY - yPos);
      if (d < minDistance) {
        minDistance = d;
        selectedCategory = i;
      }
    } 

    for (let i = 0; i < categories.length; i++) {
      let c = p.color(colors[i % colors.length]);

      // Set alpha based on selection
      if (selectedCategory === -1) {
        c.setAlpha(150); 
        p.noStroke();
      } else if (selectedCategory === i) {
        c.setAlpha(230); 
        p.stroke(c);     
        p.strokeWeight(3);
      } else {
        c.setAlpha(40); 
        p.noStroke();
      }
      
      p.fill(c);
      p.beginShape();
      // Draw the top curve
      for (let r = 0; r < rowCount; r++) {
        let val = table.getNum(r, categories[i]);
        let x = p.map(r, 0, rowCount - 1, margin, margin + w);
        
        let y = p.map(val / 60, 0, maxHours, p.height - margin, margin); 
        p.vertex(x, y);
      }

      // Draw the bottom curve in reverse order
      let baseY = p.height - margin;
      p.vertex(margin + w, baseY); 
      p.vertex(margin, baseY);
      
      p.endShape(p.CLOSE);
    }

    // Legend
    let legendX = margin + 20; 
    let legendY = margin + 20; 
    let shortNames = ["Alone", "Partner", "Children", "Family", "Friends", "Coworkers"];

    for (let i = 0; i < categories.length; i++) {
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(11);

      if (selectedCategory === i) {
        p.textStyle(p.BOLD);
        p.fill(colors[i]);
        p.rect(legendX - 2, legendY + i * 20 - 2, 16, 16); 
      } else {
        p.textStyle(p.NORMAL);
        p.fill(colors[i]);
        p.rect(legendX, legendY + i * 20, 12, 12);
      }

      p.fill(0);
      p.text(shortNames[i], legendX + 25, legendY + i * 20 + 6);
    }
    p.textStyle(p.NORMAL);
       
    p.stroke(0, 50); 
    p.line(lineX, margin, lineX, p.height - margin);

    // Display hovered values
    if (selectedCategory !== -1) {
      let val = table.getNum(hoveredIndex, categories[selectedCategory]);
      let hr = (val / 60).toFixed(1);
      let label = `${shortNames[selectedCategory]}: ${hr}h`;

      p.push();
      let boxW = p.textWidth(label) + 20;
      let boxH = 28;

      // Position the box to the right of the line
      let boxX = lineX + 10; 
      if (lineX > p.width - boxW - 20) {
        boxX = lineX - boxW - 10; // If too close to right edge, position it to the left of the line
      }

      // Draw a semi-transparent background for better readability
      p.noStroke();
      p.fill(40, 40, 40, 220); /
      p.rectMode(p.CORNER);
      let boxY = p.constrain(p.mouseY - 15, margin + 50, p.height - margin - 50);
      p.rect(boxX, boxY, boxW, boxH, 5);

      p.fill(0); 
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(12);
      p.text(label, boxX + boxW/2, boxY + boxH/2);
      
      p.pop();
    }

    // Title
    p.fill(0);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.CENTER);
    p.textStyle(p.BOLD);
    p.text("Time Spent with Relationships", p.width / 2, 40);
    p.textStyle(p.NORMAL);
    p.textSize(12);
    p.text("Average hours per day spent with others", p.width / 2, 60);

    // Y-axis Label
    p.push();
    p.translate(30, p.height / 2);
    p.rotate(-p.HALF_PI);
    p.text("Hours per Day", 0, 0);
    p.pop();

    // X-axis Label
    p.text("Age (Years Old)", p.width / 2, p.height - 20);

    // Ticks
    p.stroke(200);
    p.textSize(10);
    p.textAlign(p.RIGHT, p.CENTER);
    for (let hr = 0; hr <= maxHours; hr++) {
      let yVal = p.map(hr, 0, maxHours, p.height - margin, margin);
      p.line(margin - 5, yVal, margin, yVal);
      p.text(hr, margin - 10, yVal);
    }
    
    for (let ageTick = 15; ageTick <= 80; ageTick += 10) { // every 10 years a tick
      let xVal = p.map(ageTick - 15, 0, rowCount - 1, margin, margin + w);
      p.line(xVal, p.height - margin, xVal, p.height - margin + 5);
      p.textAlign(p.CENTER, p.TOP);
      p.text(ageTick, xVal, p.height - margin + 10);
    }


    // Draw the age text following the line
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(14);
    p.text('Age: ' + currentAge, lineX, p.height - margin + 25);
    

    // Draw frame as part of the sketch output.
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
