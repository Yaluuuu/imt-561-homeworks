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
    table = p.loadTable('/Users/chenyalu/Desktop/IMT561/week6/homework5/Americans_Time_spent_with_relationships_by_age.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p.noLoop();
  };

  p.draw = function () {
    p.background(255);

    let margin = 60;
    let w = p.width - margin * 2;
    let h = p.height - margin * 2;
    
    if (!table) return; // security check for data loading

    p.noStroke();
    p.fill(70);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #5', p.width / 2, p.height / 2);

    // Draw frame as part of the sketch output.
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
