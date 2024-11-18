let userInput; 
let correctAnswer = "Mickey"; 
let feedback = "";

function setup() {
  createCanvas(600, 800); 

  // 输入框
  userInput = createInput();
  userInput.position(180, 680); 
  userInput.size(240, 30); 

  // 提交
  let submitButton = createButton("Submit");
  submitButton.position(440, 680); 
  submitButton.size(80, 30); 
  submitButton.mousePressed(checkAnswer); 
}

function draw() {
  background(233, 185, 110); // 背景

  //浅黄
  stroke(0); 
  strokeWeight(5);
  fill(255, 242, 204); 
  rect(60, 120, 480, 500, 20); 
  

  // 答题
  stroke(0); 
  strokeWeight(5); 
  fill(255, 242, 204);
  rect(60, 650, 480, 100, 20); 

  fill(233, 185, 110); 
  noStroke();
  rect(100, 630, 400, 10); 

  fill(0); 
  textSize(20); 
  textStyle(BOLD); 
  textAlign(CENTER, CENTER);
  text("Enter your answer below:", width / 2, 635); 

  fill(255,0,0);
  textSize(20); 
  text(feedback, width / 2, 730); 
}

// 检查答案是否正确
function checkAnswer() {
  let answer = userInput.value(); 
  if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback = "Correct! Well done!";
  } else {
    feedback = "Wrong! Try again.";
  }
}
