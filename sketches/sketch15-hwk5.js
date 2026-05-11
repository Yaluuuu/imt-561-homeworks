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

    let margin = 60;
    let w = p.width - margin * 2;
    let h = p.height - margin * 2;
    
    if (!table) return; // security check for data loading

    let rowCount = table.getRowCount();
    let previousY = new Array(rowCount).fill(0); 

    for (let i = 0; i < categories.length; i++) {
      p.fill(colors[i % colors.length]);
      p.noStroke();
      
      p.beginShape();
      // Draw the top curve
      for (let r = 0; r < rowCount; r++) {
        let val = table.getNum(r, categories[i]);
        let x = p.map(r, 0, rowCount - 1, margin, margin + w);
        
        previousY[r] += val; 
        let y = p.map(previousY[r], 0, 1440, p.height - margin, margin); 
        p.vertex(x, y);
      }

      // Draw the bottom curve in reverse order
      for (let r = rowCount - 1; r >= 0; r--) {
        let val = table.getNum(r, categories[i]);
        let x = p.map(r, 0, rowCount - 1, margin, margin + w);
        let y = p.map(previousY[r] - val, 0, 1440, p.height - margin, margin);
        p.vertex(x, y);
      }
      
      p.endShape(p.CLOSE);
    }

    // Draw the reference line ---
    // 1. Limit the X-coordinate of the mouse within the valid range of the chart
    let mx = p.constrain(p.mouseX, margin, margin + w);
    
    // 2. Map the mouse coordinates back to the age index (from 0 to rowCount-1)
    let hoveredIndex = p.round(p.map(mx, margin, margin + w, 0, rowCount - 1));
    
    // 3. Calculate the actual age corresponding to the index (assuming the starting age is 15)
    let currentAge = hoveredIndex + 15;

    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Age 70', lineX, p.height - margin + 20);

    // Draw frame as part of the sketch output.
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
