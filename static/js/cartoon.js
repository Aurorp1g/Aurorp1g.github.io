var canvas = document.getElementById('intro-animation');
var ctx = canvas.getContext('2d');

// 使画布全屏
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// 定义下落的字符
var chars = '01';
chars = chars.split('');

// 设置字体大小和列数
var font_size = 15;
var columns = canvas.width / font_size;
var drops = [];

// 初始化drops数组
for (var x = 0; x < columns; x++) {
  drops[x] = 1;
}

// 绘制函数
function draw() {
  // 绘制半透明黑色背景
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 设置字符颜色和字体
  ctx.fillStyle = '#0F0';
  ctx.font = font_size + 'px monospace';

  // 遍历每一列
  for (var i = 0; i < drops.length; i++) {
    // 随机选择一个字符
    var text = chars[Math.floor(Math.random() * chars.length)];
    // 绘制字符
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    // 如果字符超出画布高度，则随机重置位置
    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // 增加Y坐标，控制下落速度
    drops[i] += 0.85;
  }
}

// 设置动画帧率
setInterval(draw, 33);

// 10秒后淡出
setTimeout(() => {
  canvas.style.opacity = '0';
  // 3秒后移除元素
  setTimeout(() => {
    canvas.remove();
  }, 3000);
}, 10000);

// 窗口大小调整处理
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  font_size = 10;
  columns = canvas.width / font_size;
  drops = [];
  for (var x = 0; x < columns; x++) {
    drops[x] = 1;
  }
});