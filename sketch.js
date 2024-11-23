let score = 0;
let userInput; 
let feedback = "";
let gameStarted = false; // 游戏开始
let backButton; // 返回按钮
let currentCharacterIndex = 0; // 当前角色
let currentCharacters = []; // 当前难度
let difficulty = ""; // 难度等级
let easyButton, mediumButton, hardButton; 

let easyCharacters = [
  { name: "Mickey", drawFunction: drawMickeyColors },
  { name: "Doraemon", drawFunction: drawDoraemonColors },
  { name: "Patrick", drawFunction: drawPatrickColors },
  { name: "WinnieThePooh", drawFunction: drawWinnieThePoohColors },
  { name: "Loopy", drawFunction: drawLoppyColors },
  { name: "Squidward", drawFunction: drawSquidwardColors }
];

let mediumCharacters = [
  { name: "Peppa", drawFunction: drawPeppaColors },
  { name: "Mario", drawFunction: drawMarioColors },
  { name: "Nick", drawFunction: drawNickColors },
  { name: "SpongeBob", drawFunction: drawSpongeBobColors },
  { name: "Garfield", drawFunction: drawGarfieldColors }
];

let hardCharacters = [
  { name: "KungFuPanda", drawFunction: drawKungFuPandaColors },
  { name: "PinkPanther", drawFunction: drawPinkPantherColors },
  { name: "MrKrabs", drawFunction: drawMrKrabsColors },
  { name: "Shinchan", drawFunction: drawShinchanColors },
  // { name: "ChibiMaruko", drawFunction: drawChibiMarukoColors },
  { name: "Pompompurin", drawFunction: drawPompompurinColors }
];

function setup() {
  createCanvas(600, 800); 

  //三个按钮
  easyButton = createButton("Easy");
  easyButton.position(width / 2 - 50, height / 2 - 80);
  easyButton.size(100, 50);
  easyButton.mousePressed(() => startGame("easy"));

  mediumButton = createButton("Medium");
  mediumButton.position(width / 2 - 50, height / 2);
  mediumButton.size(100, 50);
  mediumButton.mousePressed(() => startGame("medium"));

  hardButton = createButton("Hard");
  hardButton.position(width / 2 - 50, height / 2 + 80);
  hardButton.size(100, 50);
  hardButton.mousePressed(() => startGame("hard"));
}

function draw() {
   if (!gameStarted) {
    //初始界面
    background(233, 185, 110); // 背景
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Select Difficulty", width / 2, height / 2 - 200);
  } else {
  // 游戏主界面
    background(233, 185, 110); // 背景
    //浅黄
    stroke(0); 
    strokeWeight(5);
    fill(255, 242, 204); 
    rect(60, 120, 480, 500, 20); 
    // 绘制当前角色
    currentCharacters[currentCharacterIndex].drawFunction();

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

    // Feedback
    fill(255,0,0);
    textSize(20); 
    text(feedback, width / 2, 730); 

    //Score
    fill(0);
    textSize(20);
    text(`Score: ${score}`, width - 100, 50); 

  }
}

function startGame(selectedDifficulty) {
  gameStarted = true; 
  difficulty = selectedDifficulty;

  if (difficulty === "easy") {
    currentCharacters = easyCharacters; 
  } else if (difficulty === "medium") {
    currentCharacters = mediumCharacters;
  } else if (difficulty === "hard") {
    currentCharacters = hardCharacters;
  }

  // 隐藏按钮 
  easyButton.remove();
  mediumButton.remove();
  hardButton.remove();

  // 输入框
  userInput = createInput();
  userInput.position(180, 680); 
  userInput.size(240, 30); 

  // 提交
  submitButton = createButton("Submit");
  submitButton.position(440, 680); 
  submitButton.size(80, 30); 
  submitButton.mousePressed(checkAnswer); 

  // 返回
  backButton = createButton("Back");
  backButton.position(20, 20);
  backButton.size(80, 30);
  backButton.mousePressed(goBack);

  // 随机选择一个角色
  nextCharacter();
}

function goBack() {
  gameStarted = false;
  userInput.remove();
  submitButton.remove();
  backButton.remove();
  setup();
}

// Randomly select the next character
function nextCharacter() {
  currentCharacterIndex = int(random(currentCharacters.length)); // 随机角色
  feedback = "";
}

// Check answer correct
function checkAnswer() {
  let answer = userInput.value(); 
  let correctAnswer = currentCharacters[currentCharacterIndex].name.toLowerCase();
  if (answer.toLowerCase() === correctAnswer) {
    feedback = "Correct! Well done!";
    score++;
    setTimeout(() => {
      nextCharacter(); // 延迟切换
    }, 1000); // 延迟1秒
  } else {
    feedback = "Wrong! Try again.";
  }
  userInput.value("");
}


//1.米奇
function drawMickeyColors() {
  noStroke(); 
  fill(0); // 黑
  rect(200, 195, 200, 65, 10, 10, 0, 0); 
  fill(255, 224, 189); // 肉
  rect(200, 260, 200, 100); 
  fill(0); // 黑
  rect(200, 360, 200, 15); 
  fill(255, 0, 0); // 红
  rect(200, 375, 200, 90);
  fill(0); // 黑
  rect(200, 465, 200, 15); 
  fill(255, 215, 0); // 黄
  rect(200, 480, 200, 80, 0, 0, 20, 20);
  fill(255); // 白niukou
  rect(250, 397, 30, 30); // 左
  rect(320, 397, 30, 30); // 右
}

//2.派大星
function drawPatrickColors() {
  noStroke(); 
  fill("#FE9788");// 粉
  rect(200, 160, 200, 420, 10); 
  fill("#B2DB1F"); // 绿
  rect(200, 450, 200, 85); 
}

//3.小猪佩奇
function drawPeppaColors() {
  noStroke(); 
  fill("#FFBDDB"); // 粉
  rect(190, 160, 220, 420, 10, 10, 0, 0); 
  fill("#FF2314"); // 红
  rect(190, 380, 220, 150); 
  fill(0); // 黑
  rect(190, 580, 220, 15, 0, 0, 10, 10); 
}

//4.章鱼哥
function drawSquidwardColors() {
  noStroke(); 
  fill("#ADD1C5"); // 蓝
  rect(210, 195, 180, 370, 10); 
  fill("#DB8E18"); // 黄
  rect(210, 330, 180, 80);
}

//5.加菲猫 
function drawGarfieldColors() {
  noStroke(); 
  fill(255, 165, 0); // 橙
  rect(190, 200, 220, 340, 10); 
  fill("#FFFA6C"); // 浅黄
  ellipse(245, 290, 15, 15); // 左
  ellipse(355, 290, 15, 15); // 右
    // 左半
    beginShape();
    vertex(300, 295); 
    quadraticVertex(275, 320, 245, 282); 
    quadraticVertex(250, 340, 300, 310, 300, 300); 
    endShape(CLOSE); 
    // 右半
    beginShape();
    vertex(300, 295); 
    quadraticVertex(330, 320, 355, 282); 
    quadraticVertex(355, 340, 300, 310, 300, 300); 
    endShape(CLOSE); 
  fill("#F6B1CD") //鼻子
  ellipse(300, 300, 20, 13);
  fill(0); // 黑色
  rect(190, 350, 220, 10); 
  rect(190, 370, 220, 12); 
  rect(190, 390, 220, 15); 
  // rect(190, 340, 220, 25); 
  // rect(190, 380, 220, 30); 
}

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

// 7.哆啦A梦
function drawDoraemonColors() {
  noStroke(); 
  fill("#00A0E9")//蓝
  // fill(0, 191, 255); 
  rect(180, 220, 240, 300, 10, 10, 0, 0);
  fill(255); // 白
  rect(180, 520, 240, 30, 0, 0, 10, 10);
  fill(255); // 口袋
  rect(210, 400, 180, 90, 0, 0, 10, 10); 
  fill(255, 0, 0); // 红
  rect(180, 400, 240, 13); 
  fill(255, 215, 0); // 黄
  ellipse(300, 420, 30, 30); 
}

//8.小熊维尼
function drawWinnieThePoohColors() {
  noStroke(); 
  fill("#FFC758"); // 黄
  rect(200, 195, 200, 360, 10); 
  fill("#C92A2E"); // 红
  rect(200, 300, 200, 100); 
}

//9.尼克
function drawNickColors() {
  noStroke(); 
  fill("#eb8349"); // 橙
  rect(200, 160, 200, 420, 10); 
  fill("#83cf69"); // 绿
  rect(200, 280, 200, 185); 
  fill("#6D5649")
  rect(200, 465, 200, 90); 
}

//10.超级玛丽
function drawMarioColors() {
  noStroke(); 
  fill("#F20530"); // 红
  rect(200, 195, 200, 60, 10, 10, 0, 0);
  fill("#FDCAA1"); // 脸
  rect(200, 255, 200, 90); 
  fill("#F20530"); // 红衣服
  rect(200, 345, 200, 60);
  fill("#0455BF"); // 蓝
  rect(200, 380, 200, 110, 0, 0, 0, 0);
  rect(250, 345, 25, 100, 0, 0, 0, 0);//左
  rect(330, 345, 25, 100, 0, 0, 0, 0);//右
  fill(255, 223, 0); // 黄
  ellipse(260, 400, 20, 20); 
  ellipse(345, 400, 20, 20); 
  fill(139, 69, 19); // 棕
  rect(200, 490, 200, 50, 0, 0, 10, 10);
}

//11.海绵宝宝
function drawSpongeBobColors() {
  noStroke(); 
  fill("#FFEB3B"); // 黄
  rect(200, 250, 200, 160, 10, 10, 0, 0);
  fill(255); // 白
  rect(200, 410, 200, 20); 
  fill(255, 0, 0); // 红
  triangle(290, 410, 310, 410, 300, 430);
  fill(139, 69, 19); //棕
  rect(200, 430, 200, 30); 
  fill("#FFEB3B"); // 黄
  rect(200, 460, 200, 20);
  fill(0); // 黑
  rect(200, 480, 200, 2);
  fill(255); // 白
  rect(200, 482, 200, 3);
  fill("#0CC8F2"); // 蓝
  rect(200, 485, 200, 2);
  fill(255); // 白
  rect(200, 487, 200, 3);
  fill(255, 0, 0); // 红
  rect(200, 490, 200, 2);
  fill(255); // 白
  rect(200, 492, 200, 8);
  fill(0); // 黑色
  rect(200, 500, 200, 20, 0, 0, 10, 10);
}

//12.粉红豹
function drawPinkPantherColors() {
  noStroke();
  fill("#F299CA"); // 粉
  rect(200, 195, 200, 360, 10); 
  fill("#F9EAF2"); // 白
  rect(200, 230, 200, 40); 
  fill("#F9EAF2"); // 白
  rect(200, 286, 200, 120); 
}

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

//14.布丁狗
function drawPompompurinColors() {
  noStroke(); 
   fill("#76332E"); // 棕
  rect(200, 270, 200, 30, 10, 10, 0, 0);
  fill("#F5E79C"); // 黄
  rect(200, 300, 200, 200, 0, 0, 10, 10);
  fill("#76332E"); //鼻子
  triangle(292, 340, 308, 340, 300, 352);

  fill("#76332E"); 
  ellipse(250, 340, 10, 10); // 左眼
  ellipse(350, 340, 10, 10); // 右眼

  noFill(); //左胡须
  stroke("#76332E"); 
  strokeWeight(3);
  beginShape();
  vertex(280,350);
  quadraticVertex(285, 370, 302, 345); 
  endShape();
  
  noFill(); //右胡须
  stroke("#76332E"); 
  strokeWeight(3);
  beginShape();
  vertex(320, 350); 
  quadraticVertex(310, 370, 298, 345); 
  endShape();
}

//15.蟹老板
function drawMrKrabsColors() {
  noStroke(); 
  fill("#AFF29B")
  rect(200, 250, 200, 100, 10, 10, 0, 0);
  fill("#F22E3E"); // 红
  rect(200, 350, 200, 50); 
  fill("#ACDEF6"); // 蓝
  rect(200, 400, 200, 40); 
  fill("#778DCF"); // 紫
  rect(200, 440, 200, 60); 
  fill("#F22E3E"); // 红
  rect(200, 500, 200, 12, 0, 0, 10, 10); 
}

//16.功夫熊猫
function drawKungFuPandaColors() {
  noStroke(); 
  fill(0); // 黑
  rect(210, 195, 190, 20, 10, 10, 0, 0); 
  fill(255); // 脸
  rect(210, 215, 190, 80); 
  fill(0); // 黑
  rect(210, 295, 190, 30);
  fill(255); // 身子
  rect(210, 325, 190, 80); 
  fill("#ECD045"); // 腰带
  rect(210, 405, 20, 15); 
  rect(245, 405, 20, 15); 
  rect(280, 405, 20, 15); 
  rect(315, 405, 20, 15);
  rect(350, 405, 20, 15);
  rect(385, 405, 15, 15);
  fill("#E66F3E"); // 腰带
  rect(230, 405, 15, 15); 
  rect(265, 405, 15, 15); 
  rect(300, 405, 15, 15); 
  rect(335, 405, 15, 15); 
  rect(370, 405, 15, 15); 
  fill("#A66933"); // 裤
  rect(210, 420, 190, 50);
  fill(0); // 黑
  rect(210, 470, 190, 30);
  fill("#B8A276"); // 腿套
  rect(210, 500, 190, 20);
  fill("#A66933"); // 裤
  rect(210, 520, 190, 10, 0, 0, 10, 10);
}

//17.蜡笔小新
function drawShinchanColors() {
  noStroke(); 
  fill(0); // 黑
  rect(200, 210, 200, 20, 10, 10, 0, 0); 
  fill(255, 224, 189); // 肉
  rect(200, 230, 200, 120); 
  fill(255, 0, 0); // 红
  rect(200, 340, 200, 90);
  fill("#F6E550E2"); // 黄
  rect(200, 430, 200, 50);
  fill(255, 224, 189); // 肉
  rect(200, 480, 200, 30); 
  fill(255); // 白
  rect(200, 510, 200, 20);
  fill("#F8D658"); // 黄
  rect(200, 530, 200, 15, 0, 0, 10, 10);
}

//18.樱桃小丸子

