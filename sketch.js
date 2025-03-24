let button1, button2;
let sprite1, sprite2;
let currentSprite = null;
let frameIndex = 0;
let frameCount1 = 7; // 精靈1有 7 張小圖片
let frameCount2 = 10; // 精靈2有 10 張小圖片
let frameWidth1 = 86.2857143, frameHeight1 = 90;
let frameWidth2 = 113.8, frameHeight2 = 86;
let animationSpeed = 8; // 動畫更新速度（每隔 5 幀更新一次）
let lastFrameUpdate = 1; // 上一次更新動畫的時間
let iframe; // 用於嵌入 iframe 的變數

function preload() {
  sprite1 = loadImage('1_all.png');
  sprite2 = loadImage('2_all.png');
}

function setup() {
  createCanvas(400, 400);

  // 建立第一個按鈕
  button1 = createButton('自我介紹');
  button1.position(50, 50);
  button1.size(100, 50);
  button1.style('font-size', '20px');
  button1.mouseOver(() => currentSprite = sprite1);
  button1.mouseOut(() => currentSprite = null);
  button1.mousePressed(() => showIframe('https://hudson0811.github.io/20250317/'));

  // 建立第二個按鈕
  button2 = createButton('作品簡介');
  button2.position(180, 50);
  button2.size(100, 50);
  button2.style('font-size', '20px');
  button2.mouseOver(() => currentSprite = sprite2);
  button2.mouseOut(() => currentSprite = null);
  button2.mousePressed(() => showIframe('https://hudson0811.github.io/20250310/'));
}

function draw() {
  background(220);

  // 如果有當前精靈，顯示動畫
  if (currentSprite) {
    let frameWidth, frameHeight, frameCount;

    // 根據當前精靈選擇對應的參數
    if (currentSprite === sprite1) {
      frameWidth = frameWidth1;
      frameHeight = frameHeight1;
      frameCount = frameCount1;
    } else if (currentSprite === sprite2) {
      frameWidth = frameWidth2;
      frameHeight = frameHeight2;
      frameCount = frameCount2;
    }

    let x = 50; // 顯示圖片的 x 座標
    let y = 150; // 顯示圖片的 y 座標

    // 計算當前要顯示的框架
    let sx = frameIndex * frameWidth; // 計算切割的 x 起始位置

    // 顯示當前框架
    image(currentSprite, x, y, frameWidth, frameHeight, sx, 0, frameWidth, frameHeight);

    // 更新框架索引以實現動畫效果
    if (millis() - lastFrameUpdate > animationSpeed * 16.67) { // 每隔 animationSpeed 幀更新一次
      frameIndex = (frameIndex + 1) % frameCount; // 循環切換框架
      lastFrameUpdate = millis();
    }
  }
}

// 顯示 iframe 的函數
function showIframe(url) {
  // 如果已經有 iframe，先移除
  if (iframe) {
    iframe.remove();
  }

  // 建立新的 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', url);
  updateIframeSizeAndPosition(); // 設定 iframe 的大小和位置
  iframe.style('border', 'none');
}

// 動態更新 iframe 的大小和位置
function updateIframeSizeAndPosition() {
  if (iframe) {
    let iframeWidth = windowWidth * 0.8;
    let iframeHeight = windowHeight * 0.8;
    iframe.size(iframeWidth, iframeHeight);
    iframe.position((windowWidth - iframeWidth) / 2, (windowHeight - iframeHeight) / 2);
  }
}

// 當視窗大小改變時，更新 iframe 的大小和位置
function windowResized() {
  updateIframeSizeAndPosition();
}
