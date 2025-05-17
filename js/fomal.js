/* 阅读进度 start */
document.addEventListener('pjax:complete', function () {
  window.onscroll = percent;
});
document.addEventListener('DOMContentLoaded', function () {
  window.onscroll = percent;
});
// 页面百分比
function percent() {

  // 先让菜单栏消失
  try {
    rmf.showRightMenu(false);
    $('.rmMask').attr('style', 'display: none');
  } catch (err) {

  }

  let a = document.documentElement.scrollTop, // 卷去高度
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round(a / b * 100), // 计算百分比
    btn = document.querySelector("#go-up"); // 获取按钮

  if (result < 95) { // 如果阅读进度小于95% 就显示百分比
    btn.childNodes[0].style.display = 'none'
    btn.childNodes[1].style.display = 'block'
    btn.childNodes[1].innerHTML = result + '<span>%</span>';
  } else { // 如果大于95%就显示回到顶部图标
    btn.childNodes[1].style.display = 'none'
    btn.childNodes[0].style.display = 'block'
  }
}
/* 阅读进度 end */

//----------------------------------------------------------------

/* 导航栏显示标题 start */

document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav() {
  document.getElementById("name-container").setAttribute("style", "display:none");
  var position = $(window).scrollTop();
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      document.getElementById("name-container").setAttribute("style", "");
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");
    } else {
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
      document.getElementById("name-container").setAttribute("style", "display:none");
    }
    position = scroll;
  });
  //修复没有弄右键菜单的童鞋无法回顶部的问题
  document.getElementById("page-name").innerText = document.title.split(" | Aurorp1g")[0];
}

function scrollToTop() {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

/* 导航栏显示标题 end */

//----------------------------------------------------------------

/* 欢迎信息 start */
//get请求
$.ajax({
  type: 'get',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
    key: '5QNBZ-DVQKZ-2BBX2-7TDJH-IFAKZ-XBF6O',  // 这里要写你的KEY!!!
    output: 'jsonp',
  },
  dataType: 'jsonp',
  success: function (res) {
    ipLoacation = res;
  }
})
function getDistance(e1, n1, e2, n2) {
  const R = 6371
  const { sin, cos, asin, PI, hypot } = Math
  let getPoint = (e, n) => {
    e *= PI / 180
    n *= PI / 180
    return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
  }

  let a = getPoint(e1, n1)
  let b = getPoint(e2, n2)
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  let r = asin(c / 2) * 2 * R
  return Math.round(r);
}

function showWelcome() {

  let dist = getDistance(116.7515585, 23.4694075, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
  let pos = ipLoacation.result.ad_info.nation;
  let ip;
  let posdesc;
  //根据国家、省份、城市信息自定义欢迎语
  switch (ipLoacation.result.ad_info.nation) {
    case "日本":
      posdesc = "よろしく，一起去看樱花吗";
      break;
    case "美国":
      posdesc = "Let us live in peace!";
      break;
    case "英国":
      posdesc = "想同你一起夜乘伦敦眼";
      break;
    case "俄罗斯":
      posdesc = "干了这瓶伏特加！";
      break;
    case "法国":
      posdesc = "C'est La Vie";
      break;
    case "德国":
      posdesc = "Die Zeit verging im Fluge.";
      break;
    case "澳大利亚":
      posdesc = "一起去大堡礁吧！";
      break;
    case "加拿大":
      posdesc = "拾起一片枫叶赠予你";
      break;
    case "中国":
      pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
      ip = ipLoacation.result.ip;
      switch (ipLoacation.result.ad_info.province) {
        case "北京市":
          posdesc = "北——京——欢迎你~~~";
          break;
        case "天津市":
          posdesc = "讲段相声吧。";
          break;
        case "河北省":
          posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
          break;
        case "山西省":
          posdesc = "展开坐具长三尺，已占山河五百余。";
          break;
        case "内蒙古自治区":
          posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
          break;
        case "辽宁省":
          posdesc = "我想吃烤鸡架！";
          break;
        case "吉林省":
          posdesc = "状元阁就是东北烧烤之王。";
          break;
        case "黑龙江省":
          posdesc = "很喜欢哈尔滨大剧院。";
          break;
        case "上海市":
          posdesc = "众所周知，中国只有两个城市。";
          break;
        case "江苏省":
          switch (ipLoacation.result.ad_info.city) {
            case "南京市":
              posdesc = "这是我挺想去的城市啦。";
              break;
            case "苏州市":
              posdesc = "上有天堂，下有苏杭。";
              break;
            default:
              posdesc = "散装是必须要散装的。";
              break;
          }
          break;
        case "浙江省":
          posdesc = "东风渐绿西湖柳，雁已还人未南归。";
          break;
        case "河南省":
          switch (ipLoacation.result.ad_info.city) {
            case "郑州市":
              posdesc = "豫州之域，天地之中。";
              break;
            case "南阳市":
              posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
              break;
            case "驻马店市":
              posdesc = "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";
              break;
            case "开封市":
              posdesc = "刚正不阿包青天。";
              break;
            case "洛阳市":
              posdesc = "洛阳牡丹甲天下。";
              break;
            default:
              posdesc = "可否带我品尝河南烩面啦？";
              break;
          }
          break;
        case "安徽省":
          posdesc = "蚌埠住了，芜湖起飞。";
          break;
        case "福建省":
          posdesc = "井邑白云间，岩城远带山。";
          break;
        case "江西省":
          posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
          break;
        case "山东省":
          posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
          break;
        case "湖北省":
          posdesc = "来碗热干面！";
          break;
        case "湖南省":
          posdesc = "74751，长沙斯塔克。";
          break;
        case "广东省":
          switch (ipLoacation.result.ad_info.city) {
            case "广州市":
              posdesc = "你好哇，靓仔！";
              break;
            case "汕头市":
              posdesc = "原来是胶己人！！";
              break;
            case "佛山市":
              posdesc = "你会佛山无影脚么";
              break;
            default:
              posdesc = "老板来两斤福建人";
              break;
          }
          break;
        case "广西壮族自治区":
          posdesc = "桂林山水甲天下。";
          break;
        case "海南省":
          posdesc = "朝观日出逐白浪，夕看云起收霞光。";
          break;
        case "四川省":
          posdesc = "康康川妹子。";
          break;
        case "贵州省":
          posdesc = "茅台，学生，再塞200。";
          break;
        case "云南省":
          posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
          break;
        case "西藏自治区":
          posdesc = "躺在茫茫草原上，仰望蓝天。";
          break;
        case "陕西省":
          posdesc = "来份臊子面加馍。";
          break;
        case "甘肃省":
          posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
          break;
        case "青海省":
          posdesc = "牛肉干和老酸奶都好好吃。";
          break;
        case "宁夏回族自治区":
          posdesc = "大漠孤烟直，长河落日圆。";
          break;
        case "新疆维吾尔自治区":
          posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
          break;
        case "台湾省":
          posdesc = "我在这头，大陆在那头。";
          break;
        case "香港特别行政区":
          posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
          break;
        case "澳门特别行政区":
          posdesc = "性感荷官，在线发牌。";
          break;
        default:
          posdesc = "带我去你的城市逛逛吧！";
          break;
      }
      break;
    default:
      posdesc = "带我去你的国家逛逛吧。";
      break;
  }

  //根据本地时间切换欢迎语
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
  else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
  else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
  else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
  else timeChange = "夜深了，早点休息，少熬夜。";

  try {
    //自定义文本和需要放的位置
    document.getElementById("welcome-info").innerHTML =
      `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴。${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
  } catch (err) {
    // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
  }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', showWelcome);

/* 欢迎信息 end */

//----------------------------------------------------------------

/* 微博热搜 start */
document.addEventListener('pjax:complete', getWeibo);
document.addEventListener('DOMContentLoaded', getWeibo);

function getWeibo() {
  fetch('').then(data => data.json()).then(data => {  // 这里要写上你的API!!!
    let html = '<style>.weibo-new{background:#ff3852}.weibo-hot{background:#ff9406}.weibo-jyzy{background:#ffc000}.weibo-recommend{background:#00b7ee}.weibo-adrecommend{background:#febd22}.weibo-friend{background:#8fc21e}.weibo-boom{background:#bd0000}.weibo-topic{background:#ff6f49}.weibo-topic-ad{background:#4dadff}.weibo-boil{background:#f86400}#weibo-container{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}#weibo-container::-webkit-scrollbar{display:none}.weibo-list-item{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:nowrap}.weibo-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:auto}.weibo-num{float:right}.weibo-hotness{display:inline-block;padding:0 6px;transform:scale(.8) translateX(-3px);color:#fff;border-radius:8px}</style>'
    html += '<div class="weibo-list">'
    let hotness = {
      '爆': 'weibo-boom',
      '热': 'weibo-hot',
      '沸': 'weibo-boil',
      '新': 'weibo-new',
      '荐': 'weibo-recommend',
      '音': 'weibo-jyzy',
      '影': 'weibo-jyzy',
      '剧': 'weibo-jyzy',
      '综': 'weibo-jyzy'
    }
    for (let item of data) {
      html += '<div class="weibo-list-item"><div class="weibo-hotness ' + hotness[(item.hot || '荐')] + '">' + (item.hot || '荐') + '</div>'
        + '<span class="weibo-title"><a title="' + item.title + '"href="' + item.url + '" target="_blank" rel="external nofollow noreferrer" style="color:#a08ed5">' + item.title + '</a></span>'
        + '<div class="weibo-num"><span>' + item.num + '</span></div></div>'
    }
    html += '</div>'
    document.getElementById('weibo-container').innerHTML = html
  }).catch(function (error) {
    console.log(error);
  });
}

/* 微博热搜 end */

//----------------------------------------------------------------

/* 禁用f12与按键防抖 start */
// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }, 300);
})


// f12提醒但不禁用
document.onkeydown = function (e) {
  if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) {
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "你已被发现😜",
            message: "小伙子，扒源记住要遵循GPL协议！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
          });
        }
      })
    }, 300);
  }
};
/* 禁用f12与按键防抖 end */

//----------------------------------------------------------------

/* 雪花特效 start */
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  // 移动端不显示
} else {
  // document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none"></canvas>');

  window && (() => {
    let e = {
      flakeCount: 50, // 雪花数目
      minDist: 150,   // 最小距离
      color: "255, 255, 255", // 雪花颜色
      size: 1.5,  // 雪花大小
      speed: .5,  // 雪花速度
      opacity: .7,    // 雪花透明度
      stepsize: .5    // 步距
    };
    const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
      window.setTimeout(e, 1e3 / 60)
    }
      ;
    window.requestAnimationFrame = t;
    const i = document.getElementById("snow"),
      n = i.getContext("2d"),
      o = e.flakeCount;
    let a = -100,
      d = -100,
      s = [];
    i.width = window.innerWidth,
      i.height = window.innerHeight;
    const h = () => {
      n.clearRect(0, 0, i.width, i.height);
      const r = e.minDist;
      for (let t = 0; t < o; t++) {
        let o = s[t];
        const h = a,
          w = d,
          m = o.x,
          c = o.y,
          p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
        if (p < r) {
          const e = (h - m) / p,
            t = (w - c) / p,
            i = r / (p * p) / 2;
          o.velX -= i * e,
            o.velY -= i * t
        } else
          o.velX *= .98,
            o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
            o.velX += Math.cos(o.step += .05) * o.stepSize;
        n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
          o.y += o.velY,
          o.x += o.velX,
          (o.y >= i.height || o.y <= 0) && l(o),
          (o.x >= i.width || o.x <= 0) && l(o),
          n.beginPath(),
          n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
          n.fill()
      }
      t(h)
    }
      , l = e => {
        e.x = Math.floor(Math.random() * i.width),
          e.y = 0,
          e.size = 3 * Math.random() + 2,
          e.speed = 1 * Math.random() + .5,
          e.velY = e.speed,
          e.velX = 0,
          e.opacity = .5 * Math.random() + .3
      }
      ;
    document.addEventListener("mousemove", (e => {
      a = e.clientX,
        d = e.clientY
    }
    )),
      window.addEventListener("resize", (() => {
        i.width = window.innerWidth,
          i.height = window.innerHeight
      }
      )),
      (() => {
        for (let t = 0; t < o; t++) {
          const t = Math.floor(Math.random() * i.width)
            , n = Math.floor(Math.random() * i.height)
            , o = 3 * Math.random() + e.size
            , a = 1 * Math.random() + e.speed
            , d = .5 * Math.random() + e.opacity;
          s.push({
            speed: a,
            velX: 0,
            velY: a,
            x: t,
            y: n,
            size: o,
            stepSize: Math.random() / 30 * e.stepsize,
            step: 0,
            angle: 180,
            opacity: d
          })
        }
        h()
      }
      )()
  }
  )();
}

/* 雪花特效 end */

//----------------------------------------------------------------

/* 星空特效 start */
function dark() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var n, e, i, h, t = .05,
    s = document.getElementById("universe"),
    o = !0,
    a = "180,184,240",
    r = "226,225,142",
    d = "226,225,224",
    c = [];

  function f() {
    n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
  }
  function u() {
    h.clearRect(0, 0, n, e);
    for (var t = c.length, i = 0; i < t; i++) {
      var s = c[i];
      s.move(), s.fadeIn(), s.fadeOut(), s.draw()
    }
  }
  function y() {
    this.reset = function () {
      this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
    }, this.fadeIn = function () {
      this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
    }, this.fadeOut = function () {
      this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()))
    }, this.draw = function () {
      if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1); else if (this.comet) {
        h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1); for (var t = 0; t < 30; t++)h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
      } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
      h.closePath(), h.fill()
    }, this.move = function () {
      this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
    }, setTimeout(function () {
      o = !1
    }, 50)
  }
  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t
  }
  function l(t, i) {
    return Math.random() * (i - t) + t
  }
  f(), window.addEventListener("resize", f, !1), function () {
    h = s.getContext("2d");
    for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
    u()
  }(), function t() {
    document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark' && u(), window.requestAnimationFrame(t)
  }()
};
dark()
/* 星空特效 end */

//----------------------------------------------------------------

/* 表情放大 start */
document.addEventListener('pjax:complete', function () {
  if (document.getElementById('post-comment')) owoBig();
});
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('post-comment')) owoBig();
});

// 表情放大
function owoBig() {
  let flag = 1, // 设置节流阀
    owo_time = '', // 设置计时器
    m = 3; // 设置放大倍数
  // 创建盒子
  let div = document.createElement('div'),
    body = document.querySelector('body');
  // 设置ID
  div.id = 'owo-big';
  // 插入盒子
  body.appendChild(div)

  // 构造observer
  let observer = new MutationObserver(mutations => {

    for (let i = 0; i < mutations.length; i++) {
      let dom = mutations[i].addedNodes,
        owo_body = '';
      if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
      // 如果需要在评论内容中启用此功能请解除下面的注释
      // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
      else continue;

      // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
      if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
      // 鼠标移入
      owo_body.onmouseover = (e) => {
        if (flag && e.target.tagName == 'IMG') {
          flag = 0;
          // 移入300毫秒后显示盒子
          owo_time = setTimeout(() => {
            let height = e.path[0].clientHeight * m, // 盒子高
              width = e.path[0].clientWidth * m, // 盒子宽
              left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
              top = e.y - e.offsetY; // 盒子与屏幕顶部距离

            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
            // 设置盒子样式
            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            // 在盒子中插入图片
            div.innerHTML = `<img src="${e.target.src}">`
          }, 300);
        }
      };
      // 鼠标移出隐藏盒子
      owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
    }

  })
  observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true })
}
/* 表情放大 end */

//----------------------------------------------------------------

/* 随便逛逛 start */
// 随便逛逛
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
  fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    let ls = data.querySelectorAll('url loc');
    while (true) {
      let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
      if (location.href == url) continue;
      location.href = url;
      return;
    }
  })
}
/* 随便逛逛 end */

//----------------------------------------------------------------

/* 小猫咪 start */
if (document.body.clientWidth > 992) {
  function getBasicInfo() {
    var ViewH = $(window).height();
    var DocH = $("body")[0].scrollHeight;
    var ScrollTop = $(window).scrollTop();
    var S_V = DocH - ViewH;
    var Band_H = ScrollTop / (DocH - ViewH) * 100;
    return { ViewH, DocH, ScrollTop, Band_H, S_V };
  }

  function show(basicInfo) {
    $(".neko").css('display', basicInfo.ScrollTop > 0.001 ? 'block' : 'none');
  }

  (function ($) {
    $.fn.nekoScroll = function (option) {
      // 核心配置项
      var defaultSetting = {
        top: '0',
        scroWidth: '6px',
        z_index: 9999,
        zoom: 0.9,
        borderRadius: '5px',
        right: '59.0px',
        nekoImg: [
          "./assets/62d812db74be9.png",   // 主用本地路径
          "../assets/62d812db74be9.png",   // 一级路径1
          "../../assets/62d812db74be9.png",    // 二级路径2
          "../../../assets/62d812db74be9.png" ,    // 三级路径3
          "../../../../assets/62d812db74be9.png",    // 四级路径4
          "../../../../../assets/62d812db74be9.png",    // 五级路径5
        ],
        defaultNekoImg: "https://bu.dusays.com/2022/07/20/62d812db74be9.png", // 云端保底
        hoverMsg: "喵喵喵~",
        color: "var(--theme-color)",
        during: 500,
        blog_body: "body"
      };

      // 合并配置
      var setting = $.extend(defaultSetting, option);
      var getThis = this.prop("className") ? "." + this.prop("className") : 
                   this.prop("id") ? "#" + this.prop("id") : this.prop("nodeName");

      // 创建元素
      if (!$(".neko").length) {
        this.after(`<div class="neko" id="${setting.nekoname}" data-msg="${setting.hoverMsg}"></div>`);
      }

      // 智能图片加载器
      function loadFallbackImage($element, urls, fallback) {
        let currentIndex = 0;
        const tryNext = () => {
          if (currentIndex >= urls.length) {
            $element.css('background-image', `url(${fallback})`);
            return;
          }

          const img = new Image();
          img.onload = () => $element.css('background-image', `url(${urls[currentIndex]})`);
          img.onerror = () => {
            currentIndex++;
            tryNext();
          };
          img.src = urls[currentIndex];
        };
        tryNext();
      }

      // 初始化样式
      const $neko = $("#" + setting.nekoname);
      const basicInfo = getBasicInfo();

      // 滚动条样式
      $(getThis).css({
        'position': 'fixed',
        'width': setting.scroWidth,
        'top': setting.top,
        'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
        'z-index': setting.z_index,
        'background-color': setting.bgcolor,
        "border-radius": setting.borderRadius,
        'right': setting.right,
        'background-image': [
          `url('https://aurorp1g.github.io/assets/rope.png')`,
          '-webkit-linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)'
        ],
        'background-size': 'contain'
      });

      // 应用智能图片加载
      loadFallbackImage($neko, setting.nekoImg, setting.defaultNekoImg);
      $neko.css({
        'position': 'fixed',
        'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
        'z-index': setting.z_index * 10,
        'right': setting.right
      });

      // 滚动事件处理
      $(window).scroll(() => {
        const basicInfo = getBasicInfo();
        show(basicInfo);
        
        $(getThis).css({
          'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px'
        });

        $neko.css({
          'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px'
        });

        // 底部提示处理
        if (basicInfo.ScrollTop === basicInfo.S_V) {
          $neko.addClass("showMsg");
        } else {
          $neko.removeClass("showMsg").attr("data-msg", setting.hoverMsg);
        }
      });

      // 点击事件
      this.add($neko).click(() => btf.scrollToDest(0, 500));
      return this;
    };
  })(jQuery);

  // 初始化实例
  $(document).ready(() => {
    $("#myscoll").nekoScroll({
      bgcolor: 'rgb(0 0 0 / .5)',
      borderRadius: '2em',
      zoom: 0.9
    });
  });
}
/* 小猫咪 end */

//----------------------------------------------------------------

/* 右键菜单 start */
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
    return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;

    // 保存滚动条
    var restoreTop = myField.scrollTop;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

    if (restoreTop > 0) {
      myField.scrollTop = restoreTop;
    }

    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
    $rightMenu.show();
  } else {
    $rightMenu.hide();
  }
}

rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
}
rmf.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)

  function clickFn() {
    $body.classList.remove('read-mode')
    newEle.remove()
    newEle.removeEventListener('click', clickFn)
  }

  newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
}

//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

document.body.addEventListener('touchmove', function () {

}, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
    // if (event.ctrlKey) return true;

    // 当关掉自定义右键时候直接返回
    if (mouseMode == "off") return true;

    $('.rightMenu-group.hide').hide();
    if (document.getSelection().toString()) {
      $('#menu-text').show();
    }
    if (document.getElementById('post')) {
      $('#menu-post').show();
    } else {
      if (document.getElementById('page')) {
        $('#menu-post').show();
      }
    }
    var el = window.document.body;
    el = event.target;
    var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (a.test(window.getSelection().toString()) && el.tagName != "A") {
      $('#menu-too').show()
    }
    if (el.tagName == 'A') {
      $('#menu-to').show()
      rmf.open = function () {
        if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
          pjax.loadUrl(el.href)
        }
        else {
          location.href = el.href
        }
      }
      rmf.openWithNewTab = function () {
        window.open(el.href);
        // window.location.reload();
      }
      rmf.copyLink = function () {
        let url = el.href
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
    } else if (el.tagName == 'IMG') {
      $('#menu-img').show()
      rmf.openWithNewTab = function () {
        window.open(el.src);
        // window.location.reload();
      }
      rmf.click = function () {
        el.click()
      }
      rmf.copyLink = function () {
        let url = el.src
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
      rmf.saveAs = function () {
        var a = document.createElement('a');
        var url = el.src;
        var filename = url.split("/")[-1];
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
      $('#menu-paste').show();
      rmf.paste = function () {
        navigator.permissions
          .query({
            name: 'clipboard-read'
          })
          .then(result => {
            if (result.state == 'granted' || result.state == 'prompt') {
              //读取剪贴板
              navigator.clipboard.readText().then(text => {
                console.log(text)
                insertAtCursor(el, text)
              })
            } else {
              Snackbar.show({
                text: '请允许读取剪贴板！',
                pos: 'top-center',
                showAction: false,
              })
            }
          })
      }
    }
    let pageX = event.clientX + 10;
    let pageY = event.clientY;
    let rmWidth = $('#rightMenu').width();
    let rmHeight = $('#rightMenu').height();
    if (pageX + rmWidth > window.innerWidth) {
      pageX -= rmWidth + 10;
    }
    if (pageY + rmHeight > window.innerHeight) {
      pageY -= pageY + rmHeight - window.innerHeight;
    }
    mask = setMask();
    // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
    $(".rightMenu-item").click(() => {
      $('.rmMask').attr('style', 'display: none');
    })
    $(window).resize(() => {
      rmf.showRightMenu(false);
      $('.rmMask').attr('style', 'display: none');
    })
    mask.onclick = () => {
      $('.rmMask').attr('style', 'display: none');
    }
    rmf.showRightMenu(true, pageY, pageX);
    $('.rmMask').attr('style', 'display: flex');
    return false;
  };

  window.addEventListener('click', function () {
    rmf.showRightMenu(false);
  });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
    timer = 0 // 重置timer
    timer = setTimeout(() => {
      callback();
      timer = 0
    }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
    clearTimeout(timer) // 如果来到这里，说明是滑动
    timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
    if (timer) {
      clearTimeout(timer)
    }
  }
}

addLongtabListener(box, popupMenu)

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

// 右键开关
if (localStorage.getItem("mouse") == undefined) {
  localStorage.setItem("mouse", "on");
}
var mouseMode = localStorage.getItem("mouse");
function changeMouseMode() {
  if (localStorage.getItem("mouse") == "on") {
    mouseMode = "off";
    localStorage.setItem("mouse", "off");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已恢复为系统默认！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  } else {
    mouseMode = "on";
    localStorage.setItem("mouse", "on");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已更换为网站指定样式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  }
}
/* 右键菜单 end */

//----------------------------------------------------------------

/* 控制台输出字符画 start */
var now1 = new Date();

function createtime1() {
  var grt = new Date("03/01/2025 00:00:00"); //此处修改你的建站时间或者网站上线时间
  now1.setTime(now1.getTime() + 250);
  var days = (now1 - grt) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);

  var ascll = [
    `Welcome to Aurorp1g's blog!`,
      
    `Computer Enthusiast 🍭🍭🍭`,
    `
 █████╗ ██╗   ██╗██████╗  ██████╗ ██████╗ ██████╗  ██╗ ██████╗ 
██╔══██╗██║   ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗███║██╔════╝ 
███████║██║   ██║██████╔╝██║   ██║██████╔╝██████╔╝╚██║██║  ███╗
██╔══██║██║   ██║██╔══██╗██║   ██║██╔══██╗██╔═══╝  ██║██║   ██║
██║  ██║╚██████╔╝██║  ██║╚██████╔╝██║  ██║██║      ██║╚██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝      ╚═╝ ╚═════╝ 
                                                               

`,
    "小站已经苟活",
    dnum,
    "天啦!",
    "©2025 By Aurorp1g",
  ];

  setTimeout(
    console.log.bind(
      console,
      `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`,
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      ""
    )
  );
}

createtime1();

function createtime2() {
  var ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为「大聪明」`, `Photo captured: `, ` 🤪 `];

  setTimeout(
    console.log.bind(
      console,
      `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
      "color:white; background-color:#10bcc0",
      "",
      "",
      'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
    )
  );

  setTimeout(console.log.bind(console, "%c WELCOME %c 欢迎光临，大聪明", "color:white; background-color:#23c682", ""));

  setTimeout(
    console.warn.bind(
      console,
      "%c ⚡ Powered by Aurorp1g🥝 %c 你正在访问 Aurorp1g 的博客",
      "color:white; background-color:#f0ad4e",
      ""
    )
  );

  setTimeout(console.log.bind(console, "%c W23-12 %c 系统监测到你已打开控制台", "color:white; background-color:#4f90d9", ""));
  setTimeout(
    console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中", "color:white; background-color:#d9534f", "")
  );
}
createtime2();

// 重写console方法
console.log = function () { };
console.error = function () { };
console.warn = function () { };

/* 控制台输出字符画 end */

//----------------------------------------------------------------

/* 夜间模式切换动画 start */
function switchNightMode() {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
    setTimeout(function () {
      document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
        setTimeout(function () {
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
          setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
          }, 1e3);
        }, 2e3)
    })
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
    }, 1000);

    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
    // 延时弹窗提醒
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "关灯啦🌙",
            message: "当前已成功切换至夜间模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  } else {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "0";
    document.getElementById("moon").style.opacity = "1";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
    }, 1000);

    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "开灯啦🌞",
            message: "当前已成功切换至白天模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}

/* 夜间模式切换动画 end */

//----------------------------------------------------------------

/* 分享按钮 start */
// 分享本页
function share_() {
  let url = window.location.origin + window.location.pathname
  try {
    // 截取标题
    var title = document.title;
    var subTitle = title.endsWith("| Aurorp1g") ? title.substring(0, title.length - 14) : title;
    navigator.clipboard.writeText('Aurorp1g 的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭');
    new Vue({
      data: function () {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "您现在可以通过粘贴直接跟小伙伴分享了！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
        // return { visible: false }
      }
    })
  } catch (err) {
    console.error('复制失败！', err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}

// 防抖
function share() {
  debounce(share_, 300);
}

/* 分享按钮 end */

//----------------------------------------------------------------

/* 恶搞标题 start */
//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = '(・_・?) 你跑哪里去了~ '; //👀
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = '🐈抓到你啦～';
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
/* 恶搞标题 end */

//----------------------------------------------------------------


/* 农历转换 start */
/**

* @1900-2100区间内的公历、农历互转

* @charset UTF-8

* @Author  jiangjiazhi

* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]

* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]

*/



/**

* 农历1900-2100的润大小信息表

* @Array Of Property

* @return Hex

*/

var lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909

  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919

  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929

  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939

  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949

  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959

  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969

  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979

  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989

  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999

  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009

  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019

  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029

  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039

  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049

  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059

  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069

  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079

  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089

  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099

  0x0d520] // 2100



var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]



/**

* 天干地支之天干速查表

* @Array Of Property trans['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']

* @return Cn string

*/

var Gan = ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678']



/**

* 天干地支之地支速查表

* @Array Of Property

* @trans['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']

* @return Cn string

*/

var Zhi = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5']



/**

* 天干地支之地支速查表<=>生肖

* @Array Of Property

* @trans['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']

* @return Cn string

*/

var Animals = ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a']



/**

* 24节气速查表

* @Array Of Property

* @trans['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至']

* @return Cn string

*/

var solarTerm = ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3']



/**

* 1900-2100各年的24节气日期速查表

* @Array Of Property

* @return 0x string For splice

*/

var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',

  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',

  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',

  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',

  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',

  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',

  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',

  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',

  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',

  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',

  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',

  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',

  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',

  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',

  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722']



/**

 * 数字转中文速查表

* @Array Of Property

* @trans ['日','一','二','三','四','五','六','七','八','九','十']

* @return Cn string

 */

var nStr1 = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341']



/**

* 日期转农历称呼速查表

* @Array Of Property

* @trans ['初','十','廿','卅']

* @return Cn string

*/

var nStr2 = ['\u521d', '\u5341', '\u5eff', '\u5345']



/**

* 月份转农历称呼速查表

* @Array Of Property

* @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']

* @return Cn string

*/

var nStr3 = ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a']



/**

* 返回农历y年一整年的总天数

* @param lunar Year

 * @return Number

* @eg:var count = calendar.lYearDays(1987) ;//count=387

*/

function lYearDays(y) {

  var i

  var sum = 348

  for (i = 0x8000; i > 0x8; i >>= 1) { sum += (lunarInfo[y - 1900] & i) ? 1 : 0 }

  return (sum + leapDays(y))

}



/**

* 返回农历y年闰月是哪个月；若y年没有闰月 则返回0

* @param lunar Year

* @return Number (0-12)

 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6

*/

function leapMonth(y) { // 闰字编码 \u95f0

  return (lunarInfo[y - 1900] & 0xf)

}



/**

* 返回农历y年闰月的天数 若该年没有闰月则返回0

* @param lunar Year

* @return Number (0、29、30)

* @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29

*/

function leapDays(y) {

  if (leapMonth(y)) {

    return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)

  }

  return (0)

}



/**

* 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法

* @param lunar Year

* @return Number (-1、29、30)

 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29

*/

function monthDays(y, m) {

  if (m > 12 || m < 1) { return -1 }// 月份参数从1至12，参数错误返回-1

  return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)

}



/**

* 返回公历(!)y年m月的天数

* @param solar Year

* @return Number (-1、28、29、30、31)

* @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30

*/

function solarDays(y, m) {

  if (m > 12 || m < 1) { return -1 } // 若参数错误 返回-1

  var ms = m - 1

  if (ms === 1) { // 2月份的闰平规律测算后确认返回28或29

    return (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28)

  } else {

    return (solarMonth[ms])

  }

}



/**

* 农历年份转换为干支纪年

* @param  lYear 农历年的年份数

* @return Cn string

*/

function toGanZhiYear(lYear) {

  var ganKey = (lYear - 3) % 10

  var zhiKey = (lYear - 3) % 12

  if (ganKey === 0) ganKey = 10 // 如果余数为0则为最后一个天干

  if (zhiKey === 0) zhiKey = 12 // 如果余数为0则为最后一个地支

  return Gan[ganKey - 1] + Zhi[zhiKey - 1]

}



/**

* 公历月、日判断所属星座

* @param  cMonth [description]

* @param  cDay [description]

* @return Cn string

*/

function toAstro(cMonth, cDay) {

  var s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf'

  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]

  return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7' // 座

}



/**

* 传入offset偏移量返回干支

* @param offset 相对甲子的偏移量

* @return Cn string

*/

function toGanZhi(offset) {

  return Gan[offset % 10] + Zhi[offset % 12]

}



/**

* 传入公历(!)y年获得该年第n个节气的公历日期

* @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起

* @return day Number

* @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春

*/

function getTerm(y, n) {

  if (y < 1900 || y > 2100) { return -1 }

  if (n < 1 || n > 24) { return -1 }

  var _table = sTermInfo[y - 1900]

  var _info = [

    parseInt('0x' + _table.substr(0, 5)).toString(),

    parseInt('0x' + _table.substr(5, 5)).toString(),

    parseInt('0x' + _table.substr(10, 5)).toString(),

    parseInt('0x' + _table.substr(15, 5)).toString(),

    parseInt('0x' + _table.substr(20, 5)).toString(),

    parseInt('0x' + _table.substr(25, 5)).toString()

  ]

  var _calday = [

    _info[0].substr(0, 1),

    _info[0].substr(1, 2),

    _info[0].substr(3, 1),

    _info[0].substr(4, 2),



    _info[1].substr(0, 1),

    _info[1].substr(1, 2),

    _info[1].substr(3, 1),

    _info[1].substr(4, 2),



    _info[2].substr(0, 1),

    _info[2].substr(1, 2),

    _info[2].substr(3, 1),

    _info[2].substr(4, 2),



    _info[3].substr(0, 1),

    _info[3].substr(1, 2),

    _info[3].substr(3, 1),

    _info[3].substr(4, 2),



    _info[4].substr(0, 1),

    _info[4].substr(1, 2),

    _info[4].substr(3, 1),

    _info[4].substr(4, 2),



    _info[5].substr(0, 1),

    _info[5].substr(1, 2),

    _info[5].substr(3, 1),

    _info[5].substr(4, 2)

  ]

  return parseInt(_calday[n - 1])

}



/**

* 传入农历数字月份返回汉语通俗表示法

* @param lunar month

* @return Cn string

* @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'

*/

function toChinaMonth(m) { // 月 => \u6708

  if (m > 12 || m < 1) { return -1 } // 若参数错误 返回-1

  var s = nStr3[m - 1]

  s += '\u6708' // 加上月字

  return s

}



/**

* 传入农历日期数字返回汉字表示法

* @param lunar day

* @return Cn string

* @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'

*/

function toChinaDay(d) { // 日 => \u65e5

  var s

  switch (d) {

    case 10:

      s = '\u521d\u5341'

      break

    case 20:

      s = '\u4e8c\u5341'

      break

    case 30:

      s = '\u4e09\u5341'

      break

    default:

      s = nStr2[Math.floor(d / 10)]

      s += nStr1[d % 10]

  }

  return (s)

}



/**

* 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”

* @param y year

* @return Cn string

* @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'

*/

function getAnimal(y) {

  return Animals[(y - 4) % 12]

}



/**

* 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

* @param y  solar year

* @param m  solar month

* @param d  solar day

* @return JSON object

* @eg:console.log(calendar.solar2lunar(1987,11,01));

*/

function solar2lunar(y, m, d) { // 参数区间1900.1.31~2100.12.31

  // 年份限定、上限

  if (y < 1900 || y > 2100) {

    return -1 // undefined转换为数字变为NaN

  }

  // 公历传参最下限

  if (y === 1900 && m === 1 && d < 31) {

    return -1

  }

  // 未传参  获得当天

  var objDate = null

  if (!y) {

    objDate = new Date()

  } else {

    objDate = new Date(y, parseInt(m) - 1, d)

  }

  var i

  var leap = 0

  var temp = 0

  // 修正ymd参数

  y = objDate.getFullYear()

  m = objDate.getMonth() + 1

  d = objDate.getDate()

  var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000

  for (i = 1900; i < 2101 && offset > 0; i++) {

    temp = lYearDays(i)

    offset -= temp

  }

  if (offset < 0) {

    offset += temp; i--

  }



  // 是否今天

  var isTodayObj = new Date()

  var isToday = false

  if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {

    isToday = true

  }

  // 星期几

  var nWeek = objDate.getDay()

  var cWeek = nStr1[nWeek]

  // 数字表示周几顺应天朝周一开始的惯例

  if (nWeek === 0) {

    nWeek = 7

  }

  // 农历年

  var year = i

  leap = leapMonth(i) // 闰哪个月

  var isLeap = false



  // 效验闰月

  for (i = 1; i < 13 && offset > 0; i++) {

    // 闰月

    if (leap > 0 && i === (leap + 1) && isLeap === false) {

      --i

      isLeap = true; temp = leapDays(year) // 计算农历闰月天数

    } else {

      temp = monthDays(year, i)// 计算农历普通月天数

    }

    // 解除闰月

    if (isLeap === true && i === (leap + 1)) { isLeap = false }

    offset -= temp

  }

  // 闰月导致数组下标重叠取反

  if (offset === 0 && leap > 0 && i === leap + 1) {

    if (isLeap) {

      isLeap = false

    } else {

      isLeap = true; --i

    }

  }

  if (offset < 0) {

    offset += temp; --i

  }

  // 农历月

  var month = i

  // 农历日

  var day = offset + 1

  // 天干地支处理

  var sm = m - 1

  var gzY = toGanZhiYear(year)



  // 当月的两个节气

  // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

  var firstNode = getTerm(y, (m * 2 - 1)) // 返回当月「节」为几日开始

  var secondNode = getTerm(y, (m * 2)) // 返回当月「节」为几日开始



  // 依据12节气修正干支月

  var gzM = toGanZhi((y - 1900) * 12 + m + 11)

  if (d >= firstNode) {

    gzM = toGanZhi((y - 1900) * 12 + m + 12)

  }

  // 传入的日期的节气与否

  var isTerm = false

  var Term = null

  if (firstNode === d) {

    isTerm = true

    Term = solarTerm[m * 2 - 2]

  }

  if (secondNode === d) {

    isTerm = true

    Term = solarTerm[m * 2 - 1]

  }

  // 日柱 当月一日与 1900/1/1 相差天数

  var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10

  var gzD = toGanZhi(dayCyclical + d - 1)

  // 该日期所属的星座

  var astro = toAstro(m, d)

  return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': getAnimal(year), 'IMonthCn': (isLeap ? '\u95f0' : '') + toChinaMonth(month), 'IDayCn': toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': '\u661f\u671f' + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro }

}





var calendarFormatter = {

  // 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

  solar2lunar: function (y, m, d) { // 参数区间1900.1.31~2100.12.31

    return solar2lunar(y, m, d)

  },

  /**

  * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON

  * @param y  lunar year

  * @param m  lunar month

  * @param d  lunar day

  * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]

  * @return JSON object

  * @eg:console.log(calendar.lunar2solar(1987,9,10));

  */

  lunar2solar: function (y, m, d, isLeapMonth) { // 参数区间1900.1.31~2100.12.1

    isLeapMonth = !!isLeapMonth

    if (isLeapMonth && (leapMonth !== m)) { return -1 }// 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) { return -1 } // 超出了最大极限值

    var day = monthDays(y, m)

    var _day = day

    // bugFix 2016-9-25

    // if month is leap, _day use leapDays method

    if (isLeapMonth) {

      _day = leapDays(y, m)

    }

    if (y < 1900 || y > 2100 || d > _day) { return -1 }// 参数合法性效验



    // 计算农历的时间差

    var offset = 0

    for (var i = 1900; i < y; i++) {

      offset += lYearDays(i)

    }

    var leap = 0

    var isAdd = false

    for (i = 1; i < m; i++) {

      leap = leapMonth(y)

      if (!isAdd) { // 处理闰月

        if (leap <= i && leap > 0) {

          offset += leapDays(y); isAdd = true

        }

      }

      offset += monthDays(y, i)

    }

    // 转换闰月农历 需补充该年闰月的前一个月的时差

    if (isLeapMonth) { offset += day }

    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)

    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0)

    var calObj = new Date((offset + d - 31) * 86400000 + stmap)

    var cY = calObj.getUTCFullYear()

    var cM = calObj.getUTCMonth() + 1

    var cD = calObj.getUTCDate()

    return solar2lunar(cY, cM, cD)

  }

}

/* 农历转换 end */

//----------------------------------------------------------------

/* 节日弹窗 start */
var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

// 公祭日
if (m == 9 && dd == 18) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是九一八事变" + (y - 1931).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 7) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是卢沟桥事变" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 13) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是南京大屠杀" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 14) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是世界慰安妇纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}


// 节假日
if (m == 10 && dd <= 3) {//国庆节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝祖国" + (y - 1949).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 15) {//搞来玩的，小日子投降
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("小日子已经投降" + (y - 1945).toString() + "年了😃");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 1 && dd == 1) {//元旦节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年元旦快乐！🎉");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 3 && dd == 8) {//妇女节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位女神们，妇女节快乐！👩");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
l = ["非常抱歉，因为不可控原因，博客将于明天停止运营！", "好消息，日本没了！", "美国垮了，原因竟然是川普！", "微软垮了！", "你的电脑已经过载，建议立即关机！", "你知道吗？站长很喜欢你哦！", "一分钟有61秒哦", "你喜欢的人跟别人跑了！"]
if (m == 4 && dd == 1) {//愚人节，随机谎话
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(l[Math.floor(Math.random() * l.length)]);
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 1) {//劳动节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("劳动节快乐\n为各行各业辛勤工作的人们致敬！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 4) {//青年节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("青年节快乐\n青春不是回忆逝去,而是把握现在！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 20) {//520
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今年是520情人节\n快和你喜欢的人一起过吧！💑");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 1) {//建党节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝中国共产党" + (y - 1921).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 9 && dd == 10) {//教师节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位老师们教师节快乐！👩‍🏫");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 25) {//圣诞节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("圣诞节快乐！🎄");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 11) {//站长生日
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝站长" + (y - 1998).toString() + "岁生日快乐！🥝");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 6 && dd == 30) {//小猫咪生日
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝小猫咪" + (y - 1999).toString() + "岁生日快乐！🐱");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

//传统节日部分

if ((y == 2023 && m == 4 && dd == 5) || (y == 2024 && m == 4 && dd == 4) || (y == 2025 && m == 4 && dd == 4)) {//清明节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("清明时节雨纷纷,一束鲜花祭故人💐");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((y == 2023 && m == 12 && dd == 22) || (y == 2024 && m == 12 && dd == 21) || (y == 2025 && m == 12 && dd == 21)) {//冬至
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初六") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初五") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初四") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初三") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初二") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初一") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "三十") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "廿九")) {
  //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年新年快乐\n🎊祝你心想事成，诸事顺利🎊");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五")) {
  //元宵节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("元宵节快乐\n送你一个大大的灯笼🧅");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五")) {
  //端午节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("端午节快乐\n请你吃一条粽子🍙");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七")) {
  //七夕节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五")) {
  //中秋节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("中秋节快乐\n请你吃一块月饼🍪");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九")) {
  //重阳节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("重阳节快乐\n独在异乡为异客，每逢佳节倍思亲");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 切换主题提醒
// if (y == 2022 && m == 12 && (dd >= 18 && dd <= 20)) {
//     if (sessionStorage.getItem("isPopupWindow") != "1") {
//         Swal.fire("网站换成冬日限定主题啦⛄");
//         sessionStorage.setItem("isPopupWindow", "1");
//     }
// }


/* 节日弹窗 end */

//----------------------------------------------------------------

/* 听话鼠标 start */
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle2 = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) { }
  return "";
};

// 为了屏蔽异步加载导致无法读取颜色值，这里统一用哈希表预处理
const map = new Map();
map.set('red', "rgb(241, 71, 71)");
map.set('orange', "rgb(241, 162, 71)");
map.set('yellow', "rgb(241, 238, 71)")
map.set('purple', "rgb(179, 71, 241)");
map.set('blue', "rgb(42, 119, 161)"); // rgb(102, 204, 255)
map.set('gray', "rgb(226, 226, 226)");
map.set('green', "rgb(57, 197, 187)");
map.set('whitegray', "rgb(241, 241, 241)");
map.set('pink', "rgb(237, 112, 155)");
map.set('black', "rgb(0, 0, 0)");
map.set('darkblue', "rgb(40, 88, 166)");
map.set('heoblue', "rgb(66, 90, 239)");

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }
    var el = document.getElementsByTagName('*');
    for (let i = 0; i < el.length; i++)
      if (getStyle2(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML);
    var colorVal = map.get(localStorage.getItem("themeColor"));
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='` + colorVal + `'/></svg>") 4 4, auto}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
    document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
    document.onmousemove = e => { (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; this.cursor.classList.remove("hidden"); };
    document.onmouseenter = e => this.cursor.classList.remove("hidden");
    document.onmouseleave = e => this.cursor.classList.add("hidden");
    document.onmousedown = e => this.cursor.classList.add("active");
    document.onmouseup = e => this.cursor.classList.remove("active");
  }

  render() {
    if (this.pos.prev) {
      // 跟踪速度调节
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

(() => {
  CURSOR = new Cursor();
  // 需要重新获取列表时，使用 CURSOR.refresh()
})();

/* 听话鼠标 end */

//----------------------------------------------------------------

/* 新年倒计时 start */
// let newYearTimer = null;
// var newYear = () => {
//   clearTimeout(newYearTimer);
//   if (!document.querySelector('#newYear')) return;
//   // 新年时间戳 and 星期对象
//   let newYear = new Date('2023-01-22 00:00:00').getTime() / 1000,
//     week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }

//   time();

//   // 补零函数
//   function nol(h) { return h > 9 ? h : '0' + h; };

//   function time() {
//     // 现在 时间对象
//     let now = new Date();

//     // 右下角 今天
//     document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]

//     // 现在与新年相差秒数
//     let second = newYear - Math.round(now.getTime() / 1000);

//     // 小于0则表示已经过年
//     if (second < 0) {
//       document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
//       document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</p>';
//     } else {
//       // 大于0则还未过年
//       document.querySelector('#newYear .title').innerHTML = '距离2023年春节：'

//       // 大于一天则直接渲染天数
//       if (second > 86400) {
//         document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
//       } else {
//         // 小于一天则使用时分秒计时。
//         let h = nol(parseInt(second / 3600));
//         second %= 3600;
//         let m = nol(parseInt(second / 60));
//         second %= 60;
//         let s = nol(second);
//         document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
//         // 计时
//         newYearTimer = setTimeout(time, 1000);
//       }
//     }
//   }

//   // 元宝飘落
//   jQuery(document).ready(function ($) {
//     $('#newYear').wpSuperSnow({
//       flakes: ['https://tuchuang.voooe.cn/images/2023/01/02/yb1.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb2.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb3.webp'],
//       totalFlakes: '100',
//       zIndex: '999999',
//       maxSize: '30',
//       maxDuration: '20',
//       useFlakeTrans: false
//     });
//   });
// }
// // Pjax适配：若没有开启Pjax这里直接是newYear()即可
// // 开了Pjax的用以下两句
// document.addEventListener('pjax:complete', newYear);
// document.addEventListener('DOMContentLoaded', newYear);

/* 新年倒计时 end */

//----------------------------------------------------------------

/* 页脚计时器 start */
var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
  var unit = (dis / 149600000).toFixed(6);  // 天文单位
  // 网站诞生时间
  var grt = new Date("03/01/2025 00:00:00");
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
      ? `<img class='boardsign' src='https://aurorp1g.github.io/assets/F小屋-科研摸鱼中.svg' title='什么时候能够实现财富自由呀~'' title='什么时候能够实现财富自由呀~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
      : `<img class='boardsign' src='https://aurorp1g.github.io/assets/F小屋-下班休息啦.svg' title='下班了就该开开心心地玩耍~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);

/*页脚计时器 end */

//----------------------------------------------------------------


/* fps检测 start */
if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
  var rAF = function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  }();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);

    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime));
      if (fps <= 5) {
        var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`
      } else if (fps <= 15) {
        var kd = `<span style="color:red">电竞级帧率😖</span>`
      } else if (fps <= 25) {
        var kd = `<span style="color:orange">有点难受😨</span>`
      } else if (fps < 35) {
        var kd = `<span style="color:#9338e6">不太流畅🙄</span>`
      } else if (fps <= 45) {
        var kd = `<span style="color:#08b7e4">还不错哦😁</span>`
      } else {
        var kd = `<span style="color:#39c5bb">十分流畅🤣</span>`
      }
      document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
      frame = 0;
      lastTime = now;
    };

    rAF(loop);
  }

  loop();
} else {
  document.getElementById("fps").style = "display:none!important"
}
/* fps检测 end */

//----------------------------------------------------------------

/* 美化模块 start */

// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_4") == undefined) {
  localStorage.setItem("reset_4", "1");
  // 清空之前的标记值
  for (var i = 1; i <= 3; i++) {
    localStorage.removeItem("reset_" + i);
  }
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "提示🍒",
          message: " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000
        });
      }
    })
  }, 1500);
}

// 清除localStorage配置项
function clearItem() {
  localStorage.removeItem('blogbg');
  localStorage.removeItem('universe');
  localStorage.removeItem('blur');
  localStorage.removeItem('fpson');
  localStorage.removeItem('transNum');
  localStorage.removeItem('blurRad');
  localStorage.removeItem('font');
  localStorage.removeItem('themeColor');
  localStorage.removeItem('rs');
  localStorage.removeItem('mouse');
  localStorage.removeItem('light');
  localStorage.removeItem('snow');
}


// 设置字体
if (localStorage.getItem("font") == undefined) {
  localStorage.setItem("font", "LXGW");
}
setFont(localStorage.getItem("font"));
function setFont(n) {
  localStorage.setItem("font", n)
  if (n == "default") {
    document.documentElement.style.setProperty('--global-font', '-apple-system');
    document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
  }
  else {
    document.documentElement.style.setProperty('--global-font', n);
    document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
  }
  try { setFontBorder(); } catch (err) { };
}

// 设置字体选择框边界
function setFontBorder() {
  var curFont = localStorage.getItem("font");
  var swfId = "swf_" + curFont;
  document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
  Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
    if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
  });
}


// 设置主题色
if (localStorage.getItem("themeColor") == undefined) {
  localStorage.setItem("themeColor", "blue");
}
setColor(localStorage.getItem("themeColor"));
function setColor(c) {
  document.getElementById("themeColor").innerText = `:root{--theme-color:` + map.get(c) + ` !important}`;
  localStorage.setItem("themeColor", c);
  // 刷新鼠标颜色
  CURSOR.refresh();
  // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
  var theme_color = map.get(c);
  var trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
  var high_trans_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.5)";
  document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
  document.documentElement.style.setProperty("--high-trans-color", high_trans_color);
}


// 星空背景开关
if (localStorage.getItem("universe") == undefined) {
  localStorage.setItem("universe", "block");
}
setUniverse2(localStorage.getItem("universe"));
function setUniverse2(c) {
  document.getElementById("universe").style.display = c;
  localStorage.setItem("universe", c);
}
function setUniverse() {
  if (document.getElementById("universeSet").checked) {
    setUniverse2("block");
  } else {
    setUniverse2("none");
  }
}

// 雪花开关
if (localStorage.getItem("snow") == undefined) {
  localStorage.setItem("snow", "none");
}
document.getElementById("snow").style.display = localStorage.getItem("snow");
function setSnow() {
  if (document.getElementById("snowSet").checked) {
    document.getElementById("snow").style.display = "block";
    localStorage.setItem("snow", "block");
  } else {
    document.getElementById("snow").style.display = "none";
    localStorage.setItem("snow", "none");
  }
}


// 帧率监测开关
if (localStorage.getItem("fpson") == undefined) {
  localStorage.setItem("fpson", "1");
}
function fpssw() {
  if (document.getElementById("fpson").checked) {
    localStorage.setItem("fpson", "1");
  } else {
    localStorage.setItem("fpson", "0");
  }
  setTimeout(reload, 600);
}

// 刷新窗口
function reload() {
  window.location.reload();
}

// 侧边栏开关
if (localStorage.getItem("rs") == undefined) {
  localStorage.setItem("rs", "block");
}
if (localStorage.getItem("rs") == "block") {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
} else {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
}
function toggleRightside() {
  // 先设置localStorage变量
  if (document.getElementById("rightSideSet").checked) {
    localStorage.setItem("rs", "block");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
  } else {
    localStorage.setItem("rs", "none");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
  }
}


// 透明度调节滑块
if (localStorage.getItem("transNum") == undefined) {
  localStorage.setItem("transNum", 45);
}
var curTransNum = localStorage.getItem("transNum");
var curTransMini = curTransNum * 0.95;
document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
function setTrans() {
  var elem = document.getElementById("transSet");
  var newTransNum = elem.value;
  var target = document.querySelector('.transValue');
  target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
  localStorage.setItem("transNum", newTransNum);
  curTransMini = newTransNum * 0.95;
  curTransNum = newTransNum;  // 更新当前透明度
  document.querySelector('#rang_trans').style.width = curTransMini + "%";
  document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
};


// 模糊度调节滑块
if (localStorage.getItem("blurRad") == undefined) {
  localStorage.setItem("blurRad", 20);
}
var curBlur = localStorage.getItem("blurRad"); // 当前模糊半径
var miniBlur = curBlur * 0.95;
document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
function setBlurNum() {
  var elem = document.getElementById("blurSet");
  var newBlur = elem.value;
  var target = document.querySelector('.blurValue');
  target.innerHTML = "模糊半径 (开启模糊生效 0px-100px): " + newBlur + "px";
  localStorage.setItem("blurRad", newBlur);
  curBlur = newBlur;
  miniBlur = curBlur * 0.95;
  // var max = elem.getAttribute("max");
  document.querySelector('#rang_blur').style.width = miniBlur + "%";
  document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
};


// 模糊效果开关
if (localStorage.getItem("blur") == undefined) {
  localStorage.setItem("blur", 0);
}
if (localStorage.getItem("blur") == 0) {
  document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
} else {
  document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
}
function setBlur() {
  if (document.getElementById("blur").checked) {
    localStorage.setItem("blur", 1);
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
  } else {
    localStorage.setItem("blur", 0);
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
  }
}

// 更换背景(原来Leonus的代码)
// 存数据
// name：命名 data：数据
// function saveData(name, data) {
//   localStorage.setItem(name, JSON.stringify({ time: Date.now(), data: data }));
// }
// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
// function loadData(name, time) {
//   let d = JSON.parse(localStorage.getItem(name));
//   // 过期或有错误返回 0 否则返回数据
//   if (d) {
//     let t = Date.now() - d.time;
//     if (t < time * 60 * 1000 && t > -1) return d.data;
//   }
//   return 0;
// }
// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 读取背景
// try {
//   let data = loadData("blogbg", 1440);
//   if (data) changeBg(data, 1);
//   else localStorage.removeItem("blogbg");
// } catch (error) {
//   localStorage.removeItem("blogbg");
// }
// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
// function changeBg(s, flag) {
//   let bg = document.getElementById("web_bg");
//   if (s.charAt(0) == "#") {
//     bg.style.backgroundColor = s;
//     bg.style.backgroundImage = "none";
//   } else {
//     bg.style.backgroundImage = s
//   };
//   if (!flag) {
//     saveData("blogbg", s);
//   }
// }

// 切换自定义颜色
var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
function changeBgColor() {
  changeBg(document.querySelector("#define_colors").value);
}

// 必应每日壁纸API
let bingDayBg = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
// 必应历史壁纸API
let bingHistoryBg = screen.width <= 768 ? "url(https://bing.img.run/rand_m.php)" : "url(https://bing.img.run/rand.php)";
// EEE.DOG
let EEEDog = "url(https://api.yimian.xyz/img?type=moe&size=1920x1080)";
// 随机美图cdn.seovx.com
let seovx = "url(https://cdn.seovx.com/?mom=302)";
// picsum随机
let picsum = "url(https://picsum.photos/1920/1080.webp)";
// 小歪二次元
// let waiDongman = "url(https://api.ixiaowai.cn/api/api.php)";
//  小歪高清壁纸
let waiBizhi = "url(https://api.ixiaowai.cn/gqapi/gqapi.php)";
// 博天随机
let btstu = "url(http://api.btstu.cn/sjbz/?lx=suiji)";
// tuapi 动漫
// let tuapi = "url(https://tuapi.eees.cc/api.php?category=dongman)";
// unsplash随机 https://source.unsplash.com/random/1920x1080/daily (weekly)
let unsplash = "url(https://source.unsplash.com/random/1920x1080/)";


// 更换背景(自己的代码)
if (localStorage.getItem("blogbg") != undefined) {
  setBg(localStorage.getItem("blogbg"));
} else {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: url('../assets/default_background.jpg');
    --darkmode-bg:url('../assets/darkmode_background.jpg');
    --mobileday-bg: url("../assets/mb5.jpg");
    --mobilenight-bg: url("../assets/mb5.webp");
  }`;
}
// 切换背景主函数
function changeBg(s) {
  // 自定义颜色框
  defineColor = s.charAt(0) == "#" ? s : '#F4D88A';
  setBg(s);
  localStorage.setItem("blogbg", s);
}
// 设置背景属性
function setBg(s) {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: ${s};
    --darkmode-bg: ${s};
    --mobileday-bg: ${s};
    --mobilenight-bg: ${s};
  }`;
}

// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}

function getPicture_() {
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    // 有效的图片链接
    var link = "url(" + document.getElementById("pic-link").value + ")";
    changeBg(link);
    // 提示切换成功
    new Vue({
      data: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    // 无效的图片链接，提示无效
    new Vue({
      data: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}

// 黑夜霓虹灯开关
if (localStorage.getItem("light") == undefined) {
  localStorage.setItem("light", "true");
}
// 这里要适配Pjax
document.addEventListener('pjax:complete', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false)
});
document.addEventListener('DOMContentLoaded', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false)
});
function setLight() {
  if (document.getElementById("lightSet").checked) {
    changeLight(true);
    localStorage.setItem("light", "true");
  } else {
    changeLight(false);
    localStorage.setItem("light", "false");
  }
}
// 更换霓虹灯状态
function changeLight(flag) {
  if (document.getElementById("site-name"))
    document.getElementById("site-name").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-title"))
    document.getElementById("site-title").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-subtitle"))
    document.getElementById("site-subtitle").style.animation = flag ? "light_10px 10s linear infinite" : "none";
  if (document.getElementById("post-info"))
    document.getElementById("post-info").style.animation = flag ? "light_5px 10s linear infinite" : "none";
  document.getElementById("menu_shadow").innerText = flag ? `:root{--menu-shadow: 0 0 1px var(--theme-color);}` : `:root{--menu-shadow: none;}`;
}



// 解决开启Pjax的问题
// function whenDOMReady() {
//   try {
//     let data = loadData('blogbg', 1440)
//     if (data) changeBg_noWindow(data, 0)
//     else localStorage.removeItem('blogbg');
//   } catch (error) { localStorage.removeItem('blogbg'); }
// }
// whenDOMReady()
// document.addEventListener("pjax:success", whenDOMReady)

// 无弹窗提醒更换背景
// function changeBg_noWindow(s, flag) {
//   let bg = document.getElementById("web_bg");
//   if (s.charAt(0) == "#") {
//     bg.style.backgroundColor = s;
//     bg.style.backgroundImage = "none";
//   } else bg.style.backgroundImage = s;
//   if (!flag) {
//     saveData("blogbg", s);
//   }
// }

// 创建窗口
var winbox = "";

function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "meihuaBox",
    index: 99,
    title: "美化设置",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    // "#76c8f1"
    background: 'var(--theme-color)',
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<center><p><button onclick="reset()" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>

<h2>一、显示偏好</h2>

<div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
<div class="range">
  <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
  <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
</div>

<div class="blurValue" style="font-weight:bold;padding-left:10px">模糊半径 (开启模糊生效 0px-100px): ${curBlur} px</div>
<div class="range">
  <input id="blurSet" type="range" min="0" max="100" step="1" value="${curBlur}" oninput="setBlurNum()">
  <p class="rang_width" id="rang_blur" style="width:${miniBlur}%"></p>
</div>


<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 星空特效 (夜间模式) </div><input type="checkbox" id="universeSet" onclick="setUniverse()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 霓虹灯 (夜间模式) </div><input type="checkbox" id="lightSet" onclick="setLight()">
</div>

<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 模糊效果 (消耗性能) </div><input type="checkbox" id="blur" onclick="setBlur()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 侧边栏 (默认开) </div><input type="checkbox" id="rightSideSet" onclick="toggleRightside()">
</div>

<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 帧率监测 (刷新生效) </div><input type="checkbox" id="fpson" onclick="fpssw()">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 雪花特效 (白天模式) </div><input type="checkbox" id="snowSet" onclick="setSnow()">
</div>


<h2>二、字体设置</h2>
<div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>
<p id="swfs">
<a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">筑紫A丸标准体2.0</a>
<a class="swf" id="swf_HYTMR" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a>
<a class="swf" id="swf_LXGW" href="javascript:;" rel="noopener external nofollow" style="font-family:'LXGW'!important;color:black" onclick="setFont('LXGW')">霞鹜文楷</a>
<a class="swf" id="swf_TTQHB" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQHB'!important;color:black" onclick="setFont('TTQHB')">甜甜圈海报</a>
<a class="swf" id="swf_YSHST" href="javascript:;" rel="noopener external nofollow" style="font-family:'YSHST'!important;color:black" onclick="setFont('YSHST')">优设好身体</a>
<a class="swf" id="swf_MiSans" href="javascript:;" rel="noopener external nofollow" style="font-family:'MiSans'!important;color:black" onclick="setFont('MiSans')">MiSans</a>
<a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
</p>

<h2>三、主题色设置</h2>
<div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
        onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
        onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
        onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
        onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
        onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
        onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
        onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
        onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
        onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
        onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
        onclick="setColor('blackgray')"></div>

<h2>四、背景设置</h2>
<center><button onclick="resetBg()" style="background:var(--theme-color);display:block;width:35%;padding:15px 0;border-radius:30px;color:white;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认背景</button></center>

<h3>1. 二次元</h3>
<details class="folding-tag" cyan><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)')"></a></div>
              </div>
            </details>


<h3>2. 风景</h3>

<details class="folding-tag" cyan><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)')"></a></div>
              </div>
            </details>

<h3>3. 萌宠</h3>

<details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)')"></a></div>
              </div>
            </details>

<h3>4. 渐变色</h3>
<details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a></div>
              </div>
            </details>


<h3>5. 纯色</h3>
<details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  <input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>



<h3>6. 适配手机</h3>
<details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mb4.webp)" class="pimgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mb4.webp)')"></a></div>
              </div>
            </details>


<h3>7. 壁纸API</h3>
<details class="folding-tag" cyan><summary> 查看壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox"><a id="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a><a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a><a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a><a id="seovxBox" rel="noopener external nofollow" style="background-image: ${seovx}" class="box apiBox" onclick="changeBg('${seovx}')"></a><a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a><a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a><a id="btstuBox" rel="noopener external nofollow" style="background-image: ${btstu}" class="box apiBox" onclick="changeBg('${btstu}')"></a><a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a></div>
              </div>
            </details>


<h3>8. 自定义背景</h3>
<details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://source.fomal.cc/img/home_bg.webp"></center></p><p><center><button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🌈切换背景🌈</button></center></p>
              </div>
            </details>

<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
<br>

</div>

</div>

`;

  // 打开小窗时候初始化
  $("#" + localStorage.getItem("themeColor")).attr("checked", true);
  if (localStorage.getItem("blur") == 1) {
    document.getElementById("blur").checked = true;
  } else {
    document.getElementById("blur").checked = false;
  }
  if (localStorage.getItem("universe") == "block") {
    document.getElementById("universeSet").checked = true;
  } else if (localStorage.getItem("universe") == "none") {
    document.getElementById("universeSet").checked = false;
  }
  if (localStorage.getItem("fpson") == "1") {
    document.getElementById("fpson").checked = true;
  } else {
    document.getElementById("fpson").checked = false;
  }
  if (localStorage.getItem("rs") == "block") {
    document.getElementById("rightSideSet").checked = true;
  } else if (localStorage.getItem("rs") == "none") {
    document.getElementById("rightSideSet").checked = false;
  }
  if (localStorage.getItem("light") == "true") {
    document.getElementById("lightSet").checked = true;
  } else {
    document.getElementById("lightSet").checked = false;
  }
  setFontBorder();
  if (localStorage.getItem("snow") == "block") {
    document.getElementById("snowSet").checked = true;
  } else if (localStorage.getItem("snow") == "none") {
    document.getElementById("snowSet").checked = false;
  }
}

// 恢复默认背景
function resetBg() {
  localStorage.removeItem('blogbg');
  reload();
}

// 恢复默认设置并刷新页面
function reset() {
  clearItem();
  reload();
}

// 适应窗口大小
function winResize() {
  try {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
  } catch (err) {
    // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector("#meihuaBox")) {
    winbox.toggleClass("hide");
  } else {
    createWinbox();
  };
}

/* 美化模块 end */
