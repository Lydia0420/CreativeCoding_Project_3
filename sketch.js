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
  // drawLoopyColors();
  // drawDoraemonColors();
  // drawWinnieThePoohColors();
  // drawNickColors();
  // drawMarioColors();
  // drawSpongeBobColors();
  // drawPinkPantherColors();
  drawNobitaColors();

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

// //6.Loopy
// function drawLoppyColors() {
//   noStroke(); 
//   fill(255, 187, 190); // 粉色
//   rect(200, 195, 200, 360, 10, 10, 0, 0); 
//   fill("#4D0519"); // 深红
//   rect(200, 550, 200, 15, 0, 0, 10, 10); 
//   fill("#EFEFEF"); // 白
//   rect(240, 450, 120, 100); 
//   fill("#4D0519");//嘴
//   rect(275, 350, 50, 15);
//   fill(250);//牙
//   rect(285, 350, 30, 11, 0, 0, 10, 10);
// }

// // 7.哆啦A梦
// function drawDoraemonColors() {
//   noStroke(); 
//   fill("#00A0E9")//蓝
//   // fill(0, 191, 255); 
//   rect(180, 220, 240, 300, 10, 10, 0, 0);
//   fill(255); // 白
//   rect(180, 520, 240, 30, 0, 0, 10, 10);
//   fill(255); // 口袋
//   rect(210, 400, 180, 90, 0, 0, 10, 10); 
//   fill(255, 0, 0); // 红
//   rect(180, 400, 240, 13); 
//   fill(255, 215, 0); // 黄
//   ellipse(300, 420, 30, 30); 
// }

// //8.小熊维尼
// function drawWinnieThePoohColors() {
//   noStroke(); 
//   fill("#FFC758"); // 黄
//   rect(200, 195, 200, 360, 10); 
//   fill("#C92A2E"); // 红
//   rect(200, 300, 200, 100); 
// }

// //9.尼克
// function drawNickColors() {
//   noStroke(); 
//   fill("#eb8349"); // 橙
//   rect(200, 160, 200, 420, 10); 
//   fill("#83cf69"); // 绿
//   rect(200, 280, 200, 185); 
//   fill("#6D5649")
//   rect(200, 465, 200, 90); 
// }

// //10.超级玛丽
// function drawMarioColors() {
//   noStroke(); 
//   fill("#F20530"); // 红
//   rect(200, 195, 200, 60, 10, 10, 0, 0);
//   fill("#FDCAA1"); // 脸
//   rect(200, 255, 200, 90); 
//   fill("#F20530"); // 红衣服
//   rect(200, 345, 200, 60);
//   fill("#0455BF"); // 蓝
//   rect(200, 380, 200, 110, 0, 0, 0, 0);
//   rect(250, 345, 25, 100, 0, 0, 0, 0);//左
//   rect(330, 345, 25, 100, 0, 0, 0, 0);//右
//   fill(255, 223, 0); // 黄
//   ellipse(260, 400, 20, 20); 
//   ellipse(345, 400, 20, 20); 
//   fill(139, 69, 19); // 棕
//   rect(200, 490, 200, 50, 0, 0, 10, 10);
// }

// //11.海绵宝宝
// function drawSpongeBobColors() {
//   noStroke(); 
//   fill("#FFEB3B"); // 黄
//   rect(200, 250, 200, 160, 10, 10, 0, 0);
//   fill(255); // 白
//   rect(200, 410, 200, 20); 
//   fill(255, 0, 0); // 红
//   triangle(290, 410, 310, 410, 300, 430);
//   fill(139, 69, 19); //棕
//   rect(200, 430, 200, 30); 
//   fill("#FFEB3B"); // 黄
//   rect(200, 460, 200, 20);
//   fill(0); // 黑
//   rect(200, 480, 200, 2);
//   fill(255); // 白
//   rect(200, 482, 200, 3);
//   fill("#0CC8F2"); // 蓝
//   rect(200, 485, 200, 2);
//   fill(255); // 白
//   rect(200, 487, 200, 3);
//   fill(255, 0, 0); // 红
//   rect(200, 490, 200, 2);
//   fill(255); // 白
//   rect(200, 492, 200, 8);
//   fill(0); // 黑色
//   rect(200, 500, 200, 20, 0, 0, 10, 10);
// }

// //12.粉红豹
// function drawPinkPantherColors() {
//   noStroke();
//   fill("#F299CA"); // 粉
//   rect(200, 195, 200, 360, 10); 
//   fill("#F9EAF2"); // 白
//   rect(200, 230, 200, 40); 
//   fill("#F9EAF2"); // 白
//   rect(200, 286, 200, 120); 
// }

//13.大雄
function drawNobitaColors() {
  noStroke();
  fill(0); // 黑
  rect(200, 170, 200, 40, 10, 10, 0, 0); 
  fill("#FADDC5"); //脸
  rect(200, 210, 200, 95);
  fill("#FFD408"); // 黄
  rect(200, 305, 200, 90); 
  fill("#3F598C"); // 蓝
  rect(200, 390, 200, 80); 
  fill("#FADDC5"); //腿
  rect(200, 450, 200, 90);
  fill("#E1FBEC"); // 淡蓝
  rect(200, 520, 200, 25); 
  fill("#71C6D9"); // 蓝
  rect(200, 545, 200, 30, 0, 0, 10, 10); 
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
