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
  
  //人物
//   drawMickeyColors();
  drawPatrickColors();

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

// //1.米奇
// function drawMickeyColors() {
//   noStroke(); 
//   fill(0); // 黑
//   rect(200, 195, 200, 65, 10, 10, 0, 0); 
//   fill(255, 224, 189); // 肉
//   rect(200, 260, 200, 100); 
//   fill(0); // 黑
//   rect(200, 360, 200, 15); 
//   fill(255, 0, 0); // 红
//   rect(200, 375, 200, 90);
//   fill(0); // 黑
//   rect(200, 465, 200, 15); 
//   fill(255, 215, 0); // 黄
//   rect(200, 480, 200, 80, 0, 0, 20, 20);
//   fill(255); // 白niukou
//   rect(250, 397, 30, 30); // 左
//   rect(320, 397, 30, 30); // 右
// }

//2.派大星
function drawPatrickColors() {
  noStroke(); 
  fill("#FE9788");// 粉
  rect(200, 160, 200, 420, 10); 
  fill("#B2DB1F"); // 绿
  rect(200, 450, 200, 85); 
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
