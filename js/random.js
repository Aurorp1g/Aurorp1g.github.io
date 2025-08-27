var posts=["posts/4d73e682.html","posts/45a2885f.html","posts/b3d7f8a5.html","posts/32f07ba6.html","posts/941719aa.html","posts/e27eb9cb.html","posts/15d54cd8.html","posts/b8f88337.html","posts/1b7675c2.html","posts/dff3c4a6.html","posts/d8a26971.html","posts/cc9c528.html","posts/8d4b7ae1.html","posts/7ab040cc.html","posts/ba04c951.html","posts/9fd071e2.html","posts/a5ada01d.html","posts/8a2ade14.html","posts/1ad824a8.html","posts/22bff566.html","posts/4e95fd80.html","posts/6f6343c5.html","posts/4a17b156.html","posts/1fc0b91f.html","posts/5df87593.html","posts/dfe83dcf.html","posts/70304a71.html","posts/d48b5b38.html","posts/74313cf1.html","posts/dbb136fa.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱"},{"name":"fomalhaut","link":"https://www.fomal.cc/","avatar":"https://sourcebucket.s3.bitiful.net/img/avatar.webp","descr":"fomalhaut主题作者"},{"name":"DIYgod","link":"https://diygod.me/","avatar":"https://npm.elemecdn.com/justlovesmile-img/DIYgod-avatar.jpg","descr":"Aplayer,Rsshub作者"},{"name":"JerryC","link":"https://crazywong.com/","avatar":"https://npm.elemecdn.com/justlovesmile-img/crazywong.png","descr":"Butterfly主题作者"},{"name":"沈宇","link":"https://shen-yu.gitee.io/","avatar":"https://npm.elemecdn.com/justlovesmile-img/202108251738358.jpg","descr":"Ayer主题作者"},{"name":"樱花庄的白猫","link":"https://2heng.xin/","avatar":"https://npm.elemecdn.com/justlovesmile-img/hengxin-avatar.th.jpg","descr":"Sakura主题作者"},{"name":"Hexo","link":"https://hexo.io/zh-cn/","avatar":"https://npm.elemecdn.com/justlovesmile-img/hexo-favicon-32x32.png","descr":"快速，简洁且高效的博客框架"},{"name":"小冰博客","link":"https://zfe.space/","avatar":"https://npm.elemecdn.com/justlovesmile-img/avatar_zfespace.png","descr":"做个有梦想的人！"},{"name":"Heo","link":"https://blog.zhheo.com/","avatar":"https://npm.elemecdn.com/justlovesmile-img/avatar_zhheo.png","descr":"爱折腾的设计师"},{"name":"Akilarの糖果屋","link":"https://akilar.top/","avatar":"https://npm.elemecdn.com/justlovesmile-img/avatar_akilar.png","descr":"期待您的光临！"},{"name":"Wenwu Wang","link":"http://personal.ee.surrey.ac.uk/Personal/W.Wang/index.html","avatar":"https://npm.elemecdn.com/justlovesmile-post@1.0.3/avatar_wenwuwang.jpg","descr":"萨里大学信号处理和机器学习领域教授"},{"name":"Kaiming He","link":"http://kaiminghe.com/","avatar":"https://npm.elemecdn.com/justlovesmile-img/20220331120825.png","descr":"何恺明大佬YYDS，计算机视觉和深度学习领域科学家"},{"name":"Xue Yang","link":"https://yangxue0827.github.io/","avatar":"https://npm.elemecdn.com/justlovesmile-img/yangxueicon.png","descr":"上海交通大学的杨学博士，研究领域为遥感图像目标检测等"},{"name":"Gang YU","link":"http://www.skicyyu.org/","avatar":"https://npm.elemecdn.com/justlovesmile-img/20220331120217.png","descr":"俞刚博士,研究领域为CV"},{"name":"Lil'Log","link":"https://lilianweng.github.io/","avatar":"https://npm.elemecdn.com/justlovesmile-img/20220331115535.png","descr":"OpenAI研究员"},{"name":"龙杰京丹","link":"https://www.zhihu.com/people/long-jie-jing-dan","avatar":"https://npm.elemecdn.com/justlovesmile-img/20220330203059.png","descr":"北航计算机系，研究领域为遥感目标检测"},{"name":"深度眸","link":"https://www.zhihu.com/people/huanghaian/posts","avatar":"https://npm.elemecdn.com/justlovesmile-img/20220330203306.png","descr":"南航工学硕士，视觉算法工程师"},{"name":"小小将","link":"https://www.zhihu.com/people/xiaohuzc/posts","avatar":"https://npm.elemecdn.com/justlovesmile-img/20220330203819.png","descr":"华科工学硕士，算法工程师"},{"name":"慕弋云子","link":"https://muyiyunzi.github.io/","avatar":"https://npm.elemecdn.com/justlovesmile-img/muyiyunzi-avatar.jfif","descr":"心有猛虎，细嗅蔷薇"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };