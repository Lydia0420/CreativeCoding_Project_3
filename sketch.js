let hintsLeft = 10; 
let hintStage = 1; 
let score = 0;
let timeLeft = 30; // 初始时间
const maxTime = 30;
let userInput;
let feedback = "";
let gameStarted = false; // 游戏开始
let images = {};
let hintImages = {}; 
let currentImage; // 当前图片
let currentCharacterIndex = 0; // 当前角色
let currentHintImage; 
let usedCharacters = [];
let rectY = 0;
let rectHeight = 0;
let currentCharacters = []; // 当前难度
let difficulty = ""; // 难度等级
let easyButton, mediumButton, hardButton;
let submitButton, hintButton;

let easyCharacters = [
  { name: "Mickey", drawFunction: drawMickeyColors, hint: "A famous mouse with big ears." },
  { name: "Doraemon", drawFunction: drawDoraemonColors, hint: "Have a magical pocket." },
  { name: "Patrick", drawFunction: drawPatrickColors, hint: "Pink starfish." },
  { name: "WinnieThePooh", drawFunction: drawWinnieThePoohColors, hint:"Love honey!" },
  { name: "Loopy", drawFunction: drawLoppyColors, hint:"Like cooking and lives in a forest." },
  { name: "Squidward", drawFunction: drawSquidwardColors, hint:"Grumpy!" }
];

let mediumCharacters = [
  { name: "Peppa", drawFunction: drawPeppaColors, hint:"A cheerful pink pig." },
  { name: "Mario", drawFunction: drawMarioColors, hint:"Plumber." },
  { name: "Nick", drawFunction: drawNickColors, hint:"From a famous animated movie." },
  { name: "SpongeBob", drawFunction: drawSpongeBobColors, hint:"Living at the bottom of the sea." },
  { name: "Garfield", drawFunction: drawGarfieldColors, hint:"Lazy cat." },
	{ name: "BuzzLightYear", drawFunction: drawBuzzLightYearColors, hint:"A future astronaut bent on saving the earth."},
  { name: "Shrek", drawFunction: drawShrekColors, hint:"A green ogre living in the swamp."}
];

let hardCharacters = [
  { name: "KungFuPanda", drawFunction: drawKungFuPandaColors, hint:"Skilled in Chinese martial." },
  { name: "PinkPanther", drawFunction: drawPinkPantherColors, hint:"A stylish pink cat." },
  { name: "MrKrabs", drawFunction: drawMrKrabsColors, hint:"Owns a burger restaurant." },
  { name: "Shinchan", drawFunction: drawShinchanColors, hint:"A mischievous boy and a knack for trouble." },
  { name: "ChibiMaruko", drawFunction: drawChibiMarukoColors, hint:"A little girl with a lovely grandfather." },
  { name: "Nobita", drawFunction: drawNobitaColors, hint: "A boy who always relies on Doraemon." },
  { name: "Pompompurin", drawFunction: drawPompompurinColors, hint:"A golden retriever with a brown beret." }
];

let scaleFactor; // 全局缩放比例

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateScale();

  easyButton = createButton("Easy");
  mediumButton = createButton("Medium");
  hardButton = createButton("Hard");

  easyButton.size(100, 50);
  mediumButton.size(100, 50);
  hardButton.size(100, 50);

  positionButtons();
  easyButton.mousePressed(() => startGame("easy"));
  mediumButton.mousePressed(() => startGame("medium"));
  hardButton.mousePressed(() => startGame("hard"));
}

function draw() {
	 background(233, 185, 110); // 背景颜色
   translate((width - 600 * scaleFactor) / 2, (height - 800 * scaleFactor) / 2); 
   scale(scaleFactor); 
	
   if (!gameStarted) {
    //初始界面
    background(233, 185, 110); 
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Select Difficulty", 300, 200);
  } else {
		drawGameScreen();
	}
}

function drawGameScreen(){
  // 游戏主界面
    background(233, 185, 110); 
    //浅黄
    stroke(0); 
    strokeWeight(5);
    fill(255, 242, 204); 
    rect(60, 120, 480, 500, 20); 

    // 生命条
    drawHealthBar();

    // 绘制当前角色
    currentCharacters[currentCharacterIndex].drawFunction();
    // 显示图片
    if (currentImage) {
      let imageHeight = rectHeight;
      let aspectRatio = currentImage.width / currentImage.height;
      let imageWidth = imageHeight * aspectRatio;
      image(currentImage, 60 - imageWidth - 20 + 240, rectY, imageWidth, imageHeight);
    }

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
    text("Enter your answer below:", 300, 635); 

    // Feedback
    fill(255,0,0);
    textSize(20); 
    text(feedback, 300, 730); 

    // Score 
    fill(0);
    textSize(20);
    text(`Score: ${score}`, 500, 50); 

    // Hints
    fill(0);
    textSize(20);
    textAlign(LEFT, CENTER);
    text(`Hints Left: ${hintsLeft}`, 310, 775); 
	
    // 显示提示图片（第二阶段）
  if (currentHintImage) {
    let desiredWidth = 150; // 统一的显示宽度
    let aspectRatio = currentHintImage.height / currentHintImage.width; // 计算宽高比
    let scaledHeight = desiredWidth * aspectRatio; // 根据宽高比计算高度
    image(currentHintImage, 0, 300, desiredWidth, scaledHeight);
	}
}

function calculateScale() {
  // 计算适合窗口大小的缩放比例
  scaleFactor = min(windowWidth / 600, windowHeight / 800);
}

function positionButtons() {
  const canvasX = (windowWidth - 600 * scaleFactor) / 2;
  const canvasY = (windowHeight - 800 * scaleFactor) / 2;

  easyButton.position(canvasX + 250 * scaleFactor, canvasY + 300 * scaleFactor);
  mediumButton.position(canvasX + 250 * scaleFactor, canvasY + 400 * scaleFactor);
  hardButton.position(canvasX + 250 * scaleFactor, canvasY + 500 * scaleFactor);
}

function positionGameElements() {
  const canvasX = (windowWidth - 600 * scaleFactor) / 2;
  const canvasY = (windowHeight - 800 * scaleFactor) / 2;

  userInput.position(canvasX + 180 * scaleFactor, canvasY + 680 * scaleFactor);
  submitButton.position(canvasX + 440 * scaleFactor, canvasY + 685 * scaleFactor);
  hintButton.position(canvasX + 440 * scaleFactor, canvasY + 760 * scaleFactor);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScale();
  positionButtons();
	if (gameStarted) positionGameElements();
}

function preload() {
  images["mickey"] = loadImage("assets/images/mickey.png");
  images["doraemon"] = loadImage("assets/images/doraemon.png");
  images["patrick"] = loadImage("assets/images/patrick.png");
  images["winniethepooh"] = loadImage("assets/images/winniethepooh.png");
  images["loopy"] = loadImage("assets/images/loopy.png");
  images["squidward"] = loadImage("assets/images/squidward.png");
  images["peppa"] = loadImage("assets/images/peppa.png");
  images["mario"] = loadImage("assets/images/mario.png");
  images["nick"] = loadImage("assets/images/nick.png");
  images["spongebob"] = loadImage("assets/images/spongebob.png");
  images["garfield"] = loadImage("assets/images/garfield.png");
  images["kungfupanda"] = loadImage("assets/images/kungfupanda.png");
  images["pinkpanther"] = loadImage("assets/images/pinkpanther.png");
  images["mrkrabs"] = loadImage("assets/images/mrkrabs.png");
  images["shinchan"] = loadImage("assets/images/shinchan.png");
  images["pompompurin"] = loadImage("assets/images/pompompurin.png");
  images["nobita"] = loadImage("assets/images/nobita.png");
	images["chibimaruko"] = loadImage("assets/images/chibimaruko.png");
  images["buzzlightyear"] = loadImage("assets/images/buzzlightyear.png");
	images["shrek"] = loadImage("assets/images/shrek.png");
	
  hintImages["mickey"] = loadImage("assets/images/mickey_hint.png");
  hintImages["doraemon"] = loadImage("assets/images/doraemon_hint.png");
  hintImages["patrick"] = loadImage("assets/images/patrick_hint.png");
  hintImages["winniethepooh"] = loadImage("assets/images/winniethepooh_hint.png");
  hintImages["loopy"] = loadImage("assets/images/loopy_hint.png");
  hintImages["squidward"] = loadImage("assets/images/squidward_hint.png");
  hintImages["peppa"] = loadImage("assets/images/peppa_hint.png");
  hintImages["mario"] = loadImage("assets/images/mario_hint.png");
  hintImages["nick"] = loadImage("assets/images/nick_hint.png");
  hintImages["spongebob"] = loadImage("assets/images/spongebob_hint.png");
  hintImages["garfield"] = loadImage("assets/images/garfield_hint.png");
  hintImages["kungfupanda"] = loadImage("assets/images/kungfupanda_hint.png");
  hintImages["pinkpanther"] = loadImage("assets/images/pinkpanther_hint.png");
  hintImages["mrkrabs"] = loadImage("assets/images/mrkrabs_hint.png");
  hintImages["shinchan"] = loadImage("assets/images/shinchan_hint.png");
  hintImages["pompompurin"] = loadImage("assets/images/pompompurin_hint.png");
  hintImages["nobita"] = loadImage("assets/images/nobita_hint.png");
	hintImages["chibimaruko"] = loadImage("assets/images/chibimaruko_hint.png");
	hintImages["buzzlightyear"] = loadImage("assets/images/buzzlightyear_hint.jpg");
  hintImages["shrek"] = loadImage("assets/images/shrek_hint.jpg");
}

function nextCharacter() {
  currentCharacterIndex = int(random(currentCharacters.length)); 
  currentImage = images[currentCharacters[currentCharacterIndex].name.toLowerCase()]; // 获取对应图片
  feedback = "";
  hintStage = 1; // 重置提示
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

  // 初始化时间
  timeLeft = maxTime;

  // 隐藏按钮 
  easyButton.remove();
  mediumButton.remove();
  hardButton.remove();

  // 输入框
  userInput = createInput();
  userInput.size(240, 30); 

  // 提交
  submitButton = createButton("Submit");
  submitButton.size(80, 30); 
  submitButton.mousePressed(checkAnswer); 

  // 提示按钮
  hintButton = createButton("Hint"); 
  hintButton.size(80, 30); 
  hintButton.mousePressed(showHint);
	
	positionGameElements();

  //倒计时
  startTimer();

  // 随机选择一个角色
  nextCharacter();
	usedCharacters = [];
}


function showHint() {
  if (hintsLeft > 0) {
    hintsLeft--; 

    let currentCharacter = currentCharacters[currentCharacterIndex];
    if (hintStage === 1) {
      // 1：角色特征
      feedback = `Hint: ${currentCharacter.hint}`;
      hintStage++; 
		 } else if (hintStage === 2) {
      // 第二次点击：显示提示图片
      currentHintImage = hintImages[currentCharacter.name.toLowerCase()];
      feedback = "Here's a related image hint!";
      hintStage++;
    } else if (hintStage === 3) {
      // 第三次点击：显示字幕（部分角色名称）
      let name = currentCharacter.name;
      let partialName = name.split("").map((char, index) => {
          if (index === 0 || index === name.length - 1) {
            return char; // 显示首字母和末字母
          } else {
            return "*"; // 其他字母替换为 *
          }
        }).join(""); // 重新组合成字符串

      feedback = `Hint: ${partialName}`;
      hintStage = 1; // 重置提示阶段
    }
  } else {
    feedback = "No hints left!";
  }
}

function goBack() {
  gameStarted = false;
  clearInterval(timer);
  score = 0;
  timeLeft = maxTime;
  userInput.remove();
  submitButton.remove();
  setup();
}

function startTimer(){
  timer = setInterval(() => {
    if (timeLeft > 0 && gameStarted) {
      timeLeft--;
    } else{
      clearInterval(timer);
      if (timeLeft === 0) {
        feedback = `Game Over! Your final score: ${score}`;
        gameOver();
      }
    }
  }, 1000); //每秒减1
}

function gameOver() {
  goBack(); 
  feedback = "Time Over! Restart the game.";
}

function drawHealthBar(){
  fill(200);
  rect(60, 80, 480, 20);

 // 动态生命条
  fill(255, 0, 0);
  let barWidth = map(timeLeft, 0, maxTime, 0, 480);
  rect(60, 80, barWidth, 20);
}

// Randomly select the next character
// function nextCharacter() {
//   currentCharacterIndex = int(random(currentCharacters.length)); // 随机角色
//   feedback = "";
//   hintStage = 1; 
// }
function nextCharacter() {
  if (usedCharacters.length === currentCharacters.length) {
    // 所有角色都已出现
    feedback = "All characters have been shown!";
    gameOver(); // 游戏结束或重新开始
    return;
  }
	  let newCharacterIndex;

  // 随机选择未出现过的角色
  do {
    newCharacterIndex = int(random(currentCharacters.length));
  } while (usedCharacters.includes(newCharacterIndex));

  // 记录已出现的角色索引
  usedCharacters.push(newCharacterIndex);

  currentCharacterIndex = newCharacterIndex;
  currentImage = images[currentCharacters[currentCharacterIndex].name.toLowerCase()];
  currentHintImage = null; // 清空提示图片
  feedback = "";
  hintStage = 1; // 重置提示阶段
	currentImage = null; 
}

// Check answer correct
function checkAnswer() {
  let answer = userInput.value(); 
  let correctAnswer = currentCharacters[currentCharacterIndex].name.toLowerCase();
  if (answer.toLowerCase() === correctAnswer) {
    feedback = "Correct! Well done!";
    score++;

   // 立即更新图片，避免延迟影响
    currentImage = images[currentCharacters[currentCharacterIndex].name.toLowerCase()];

   //奖励时间
    timeLeft = min(maxTime, timeLeft + 5);
    
    setTimeout(() => {
      currentImage = null;
      nextCharacter(); // 延迟切换
    }, 2000); // 延迟1秒
  } else {
    feedback = "Wrong! Try again.";

   //扣除时间
    timeLeft = max(0, timeLeft - 3);
  }
  userInput.value("");
}


//1.米奇
function drawMickeyColors() {
  noStroke(); 
  rectY = 195
  rectHeight = 365
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
  rectY = 170
  rectHeight = 430
  fill("#FE9788");// 粉
  rect(200, 160, 200, 420, 10); 
  fill("#B2DB1F"); // 绿
  rect(200, 450, 200, 85); 
}

//3.小猪佩奇
function drawPeppaColors() {
  noStroke(); 
  rectY = 160
  rectHeight = 445
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
  rectY = 195
  rectHeight = 370
  fill("#ADD1C5"); // 蓝
  rect(210, 195, 180, 370, 10); 
  fill("#DB8E18"); // 黄
  rect(210, 330, 180, 80);
}

//5.加菲猫 
function drawGarfieldColors() {
  noStroke(); 
  rectY = 200
  rectHeight = 370
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
  rectY = 195
  rectHeight = 370
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
  rectY = 220
  rectHeight = 330
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
  rectY = 195
  rectHeight = 380
  fill("#FFC758"); // 黄
  rect(200, 195, 200, 360, 10); 
  fill("#C92A2E"); // 红
  rect(200, 300, 200, 100); 
}

//9.尼克
function drawNickColors() {
  noStroke(); 
  rectY = 160
  rectHeight = 420
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
  rectY = 195
  rectHeight = 345
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
  rectY = 250
  rectHeight = 270
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
  rectY = 195
  rectHeight = 370
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
  rectY = 170
  rectHeight = 405
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
  rectY = 230
  rectHeight = 270
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
  rectY = 240
  rectHeight = 292
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
  rectY = 165
  rectHeight = 380   
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
  fill("#A66933"); // 鞋
  rect(210, 520, 190, 10, 0, 0, 10, 10);
}

//17.蜡笔小新
function drawShinchanColors() {
  noStroke(); 
  rectY = 210
  rectHeight = 335
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
function drawChibiMarukoColors() {
  noStroke();
  rectY = 190
  rectHeight = 365
  fill("#212B40"); // 黑
  rect(200, 190, 200, 50, 10, 10, 0, 0); 
  fill("#F2D5C4"); // 肉
  rect(200, 240, 200, 120); 
  fill(255); // 白
  rect(200, 360, 200, 80);
  fill("#E30140"); // 红
  rect(200, 440, 200, 55);
   fill("#E30140"); // 红
   rect(240, 360, 12, 80);
   fill("#E30140"); // 红
   rect(350, 360, 12, 80);
  fill("#F2D5C4"); // 肉
  rect(200, 495, 200, 25); 
  fill(255); // 白
  rect(200, 520, 200, 25);
  fill("#9B3235"); // 鞋
  rect(200, 545, 200, 10, 0, 0, 10, 10);
}

 //19.巴斯光年
 function drawBuzzLightYearColors() {
  noStroke(); 
  rectY = 170
  rectHeight = 360   
  fill("#7C3E8B"); // 紫
  rect(210, 170, 190, 20, 10, 10, 0, 0); 
  fill("#FBE2C3"); // 肉
  rect(210, 190, 190, 70); 
  fill("#BCEF7D"); // 绿
  rect(210, 260, 190, 60);
  fill(255); // 白
  rect(210, 320, 190, 180); 
  fill(0); // 黑
  rect(210, 350, 190, 30);
  fill("#BCEF7D");
  rect(210, 380, 190, 10)
  fill("#BCEF7D"); // 腿套
  rect(210, 500, 190, 20);
  fill("#7C3E8B"); // 鞋
  rect(210, 520, 190, 10, 0, 0, 10, 10);
}

//20.史莱克
function drawShrekColors() {
  noStroke(); 
  rectY = 190
  rectHeight = 370
  fill("#D1C620"); // 绿
  rect(200, 190, 200, 370, 10); 
  fill("#E7D6A3")
  rect(200, 290, 200, 10)
  fill("#5C4938"); // 棕
  rect(200, 300, 200, 50); 
  fill("#EFDDA9");
  rect(200, 350, 200, 75)
  fill("#5C4938"); // 棕
  rect(200, 425, 200, 7); 
  fill("#E7D6A3");
  rect(200, 432, 200, 35)
  fill("#5D4C3D"); 
  rect(200, 467, 200, 63); 
  fill("#49403D"); // 棕
  rect(200, 530, 200, 30, 0, 0, 10, 10); 
}

