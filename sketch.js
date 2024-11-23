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
  // drawMickeyColors();
  // drawPatrickColors();
  // drawPeppaColors();
  // drawSquidwardColors();
  // drawGarfieldColors();
    drawLoopyColors();


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

// //2.派大星
// function drawPatrickColors() {
//   noStroke(); 
//   fill("#FE9788");// 粉
//   rect(200, 160, 200, 420, 10); 
//   fill("#B2DB1F"); // 绿
//   rect(200, 450, 200, 85); 
// }

// //3.小猪佩奇
// function drawPeppaColors() {
//   noStroke(); 
//   fill("#FFBDDB"); // 粉
//   rect(190, 160, 220, 420, 10, 10, 0, 0); 
//   fill("#FF2314"); // 红
//   rect(190, 380, 220, 150); 
//   fill(0); // 黑
//   rect(190, 580, 220, 15, 0, 0, 10, 10); 
// }

// //4.章鱼哥
// function drawSquidwardColors() {
//   noStroke(); 
//   fill("#ADD1C5"); // 蓝
//   rect(210, 195, 180, 370, 10); 
//   fill("#DB8E18"); // 黄
//   rect(210, 330, 180, 80);
// }

// //5.加菲猫 
// function drawGarfieldColors() {
//   noStroke(); 
//   fill(255, 165, 0); // 橙
//   rect(190, 200, 220, 340, 10); 
//   fill("#FFFA6C"); // 浅黄
//   ellipse(245, 290, 15, 15); // 左
//   ellipse(355, 290, 15, 15); // 右
//     // 左半
//     beginShape();
//     vertex(300, 295); 
//     quadraticVertex(275, 320, 245, 282); 
//     quadraticVertex(250, 340, 300, 310, 300, 300); 
//     endShape(CLOSE); 
//     // 右半
//     beginShape();
//     vertex(300, 295); 
//     quadraticVertex(330, 320, 355, 282); 
//     quadraticVertex(355, 340, 300, 310, 300, 300); 
//     endShape(CLOSE); 
//   fill("#F6B1CD") //鼻子
//   ellipse(300, 300, 20, 13);
//   fill(0); // 黑色
//   rect(190, 350, 220, 10); 
//   rect(190, 370, 220, 12); 
//   rect(190, 390, 220, 15); 
//   // rect(190, 340, 220, 25); 
//   // rect(190, 380, 220, 30); 
// }

//6.Loopy
function drawLoppyColors() {
  noStroke(); 
  fill(255, 187, 190); // 粉色
  rect(200, 195, 200, 360, 10, 10, 0, 0); 
  fill("#4D0519"); // 深红
  rect(200, 550, 200, 15, 0, 0, 10, 10); 
  fill("#EFEFEF"); // 白
  rect(240, 450, 120, 100); 
  fill("#4D0519");//嘴
  rect(275, 350, 50, 15);
  fill(250);//牙
  rect(285, 350, 30, 11, 0, 0, 10, 10);
}

//   fill(173, 216, 230); // 蓝
//   rect(200, 195, 200, 370, 10); 
//   fill(120, 100, 0); // 绿
//   rect(200, 330, 200, 80);
// }

// 检查答案是否正确
function checkAnswer() {
  let answer = userInput.value(); 
  if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback = "Correct! Well done!";
  } else {
    feedback = "Wrong! Try again.";
  }
}
