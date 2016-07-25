
// Polyfill for Object.assign
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

/*
 * Components
 */
var Application = React.createClass({
  propTypes: {
    location: React.PropTypes.string.isRequired
  },
  transitionProps: function(title){
    return {onClick: function(){
      history.pushState(null,null,title);
      $('html,body').animate({scrollTop: document.getElementById("post").getBoundingClientRect().height-35},500,"easeOutExpo");
      navigated();
    }}
  },
  render: function(){
    page = window.location.pathname.split('/').pop().split('#').shift()
    switch(page) {
    case '':
    case 'index.html':
      //section = React.createElement('section', {id:"one", className:"wrapper special"},
      section = React.createElement('section', {},
        React.createElement(BlogView,
          Object.assign({}, this.props, {blog:this.props.blogs[0]})
        ),
        React.createElement(BlogView,
          Object.assign({}, this.props, {blog:this.props.blogs[1]})
        )
      );
      break;
    default:
      section = React.createElement(BlogView,
        Object.assign({}, this.props,
          {blog:this.props.blogs.filter(function(blog){ return blog.slug==page?blog:null})[0]}
        )
      )
    }
    return React.createElement('container', {},
      React.createElement('header', { id:"header", className:"alt"},
        React.createElement('h3', {},
          React.createElement('a', {href:'/'}, 'NIJIBOX Engineer Blog')
        )
      ),
      React.createElement('section', {id:"banner"},
        React.createElement('i', {className:"icon"}),
        React.createElement('h2', {}, "俺が魂を込めれば")
      ),
      section,
      React.createElement('section', {id:"post", className:"wrapper style3 special"},
        React.createElement('div', {className:"inner"},
          React.createElement('header', {className:"major narrow"},
            React.createElement('h2', {}, "We Are Hiring! 積極採用中"),
            React.createElement('p', {}, "NIJIBOXの組織文化や働きやすい制度、技術的な背景など表から裏まで紙面の許す限り更に詳しく紹介します"
            )
          ),
          React.createElement('ul', {className:"actions"},
            React.createElement('li', {}, 
              React.createElement('a', {href:"http://nijibox-recruit.jp/engineer", className: "button big alt"}, "詳しくはこちら"
              )
            )
          )
        )
      ),
      React.createElement('footer', { id:"footer"},
        React.createElement('div', {className:"inner"},
          React.createElement('article', {className:"feature left"},
            React.createElement('div', {className:"content"},
              React.createElement('h2', {}, "About Us"),
              React.createElement('span', {dangerouslySetInnerHTML:{__html:marked("リクルートグループの新規事業開発を担当するMedia Technology Lab.や自社顧客からの受託開発、およびNijibox自社のサービス開発・マーケティングソリューション導入を行っています。技術情報は[Qiita](https://qiita.com/organizations/nijibox)で。不定期に[築地ッカソン](https://www.facebook.com/tsukijickathon/)というハッカソンイベントもやってます！")}, style:{textAlign:"left"}}
              )
            ),
            React.createElement('span', {className:"image"},
              React.createElement('img', {src:"images/company.png"}))
          ),
          React.createElement('article', {},
            React.createElement(BlogListView,
              Object.assign({}, this.props,
                {transitionProps:this.transitionProps}
              )
            )
          )
        ),
        React.createElement('div', {className:"inner"},
          React.createElement('ul', {className:"copyright", dangerouslySetInnerHTML:{__html:"<li>&copy; NIJIBOX Co.,Ltd. </li><li>Design: <a href='http://templated.co'>TEMPLATED</a>, Photo: <a href='https://www.flickr.com/photos/itseacrane/6701113981/in/photolist-bd9XHX-6Kusan-6KyB7E-6KyB9W-6KyBcC-6KutKn-6KyzTq-6KyBtm-6Kuu8K-81PPWe-djvrbZ-bd9khz-6yw28t-5FRJyv-6KyBss-6KyBb1-6EZMHA-9CBrdG-6Kus6z-6KyzNY-6yw2ez-6yw23R-6yw472-9ByM9q-6dTPzh-6dTPks-6dPEnV-6dTPWS-6dTP4y-4vR9YB-nmg6SE-8hnoDm-9Bvp2Z-nmg6uf-8hj9c2-nokSqA-8zxwdh-478ePV-8H4wzM-h8q2QP-8zumJn-ufWBZP-4ygzww-noixsv-aeT8AM-4ch3Ye-4ygzxu-4yckPk-47cj4h-f6cKaN'>Sea Crane</a>.</li>"}}
          )
        )
      )
    )
  }
})

var BlogItem = React.createClass({
    propTypes: {
      date: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    },
    render: function(){
      return (
        React.createElement('div', {className:"inner"},
          React.createElement('a', {href:"/"+this.props.slug},
            React.createElement('h2', {}, 
              this.props.title
            )
          ),
          React.createElement('p', {}, this.props.date),
          React.createElement('span', {dangerouslySetInnerHTML:{__html:marked(this.props.text)}, style:{textAlign:"left"}}
          )
        )
      )
    }
  })

var BlogListView = React.createClass({
  propTypes: {
    blogs: React.PropTypes.array.isRequired,
    transitionProps: React.PropTypes.func.isRequired
  },
  render: function(){
    var self = this;
    var blogItemElements = this.props.blogs
      .map(function(blog) {
        return React.createElement('div', blog,
          React.createElement('h3', {}, 
            React.createElement('a', self.props.transitionProps(blog.slug), blog.date + ': ' + blog.title)
          )
        )
      })
    return React.createElement('section', {id:"one", className:"wrapper special"},
      React.createElement('h2', {style:{marginBottom:"40px"}}, "ブログ記事 アーカイブ"),
      blogItemElements)
  }
})

var BlogView = React.createClass({
  propTypes: {
    blog: React.PropTypes.object.isRequired,
  },
  render: function(){
    var blogItemElements = this.props.blogs
      .map(function(blog) { return React.createElement( BlogItem, blog) })
    return React.createElement('section', {id:"one", className:"wrapper special"},
      React.createElement(BlogItem, this.props.blog)
    )
  }
})


/*
 * Actions
 */
function navigated(){
  setState({location:window.location.hash})
}

/*
 * Model
 */
var state = {
  blogs: [
{"key":7,"date":"2016.07.18","slug":"phpconwest","title":"PHP Conference 関西 2016 に参加してきました","text":"\nこんにちは皆さん\nいつもはQiita で変な記事を書きなぐっている @niisan-tokyo です。\n\n先日の2016/7/16 に**PHP Conference 関西**にスピーカーとして参加してきました。\nそもそも遠方のカンファレンス参加も初めてであれば、スピーカーとしてカンファレンスで登壇するのも初めて、と個人的にインパクトの強いイベントとなりました。\n\n「おうちに帰ってブログを書くまでがカンファレンス」という実行委員長のありがたいお言葉もいただきましたので、*ヒュイーっと*レポートを上げていこうと思います。\n\n# 前夜祭\n\nスピーカーとして参加するので、スピーカーおよびスタッフとの顔合わせの意味でカンファレンスの前日に大阪で宴会を開いていただきました。\nなので、我々も前日に大阪入りしたのですが。。。\n\n## 大阪駅で迷う\n\n大阪駅周辺は迷いやすいという伝説は冗談ではなかった！\nというわけで、到着早々迷ったりしていました。\n\n![入れないと有名なヨドバシ梅田](blogs/20160718-phpconwest/yodobashi_umeda.jpg)\n\nもはや入るだけでも困難であると有名なヨドバシ梅田の入り口。。。\n迷ったせいで、前夜祭に遅刻するなどトホホな大阪入りでした。\n\n## 前夜祭\n\n前夜祭はカンファレンス会場の大阪駅を挟んで反対側にあるお店で行われました。\n\n![中崎きりがね食堂](blogs/20160718-phpconwest/kirigane.jpg)\n\n熱いプロゲーマー論が盛り上がったりしてました。\n\n# 当日\n\n当日は10:30から開始だったので、10:00ちょい過ぎに入場。\n\n![カンファレンス会場](blogs/20160718-phpconwest/kijou.jpg)\n\n自分の発表は最後のセッションなので、それまでに見たものについてはいかのとおりです。\n\n- Composerを速くするために必要だったもの\n- 全てを結ぶ力\n- PHPで学ぶコンピュータアーキテクチャ\n- ビューのソースコードコンフリクトから解放される、PHPerのための次世代Webアプリケーション開発への道。\n- PHPで稼ぐには。　伝説といわれた給与を獲得した実際の資料も解説\n\n## 発表した\n\nで、いよいよ私の発表だったのですが、結構人が入ってきてめっちゃ緊張しました。\n\n![発表の様子](blogs/20160718-phpconwest/presen.jpg)\n\n暗くてわかりにくいですが、私の発表開始時の光景を同行した @remore に撮ってもらいました。\n\n内容はPHPで非同期処理をどうやってかけばいいのかを薄く浅く説明するというものです。\n正直自画自賛できる内容ではなかったので、心臓バックバクでしたが、なんとか無事終えることができました。\n\n詳細には、こちらにあげていますので、よろしければどうぞ\nhttps://speakerdeck.com/niisantokyo/phpdezuo-rufei-tong-qi-chu-li\n\n## その他\n\n![PHP技術者認定試験の吉政さん](blogs/20160718-phpconwest/yoshimasa_san.jpg)\n\nこちら、PHP技術者認定試験の代表理事さんで、今回のスピーカーのひとり、吉政　忠志さんです。\n彼の講演は、エンジニアとしてキャリアを続けていくための指針になるようなことが多く、大変参考になりました。\n\n\n記念写真撮らせてください！って言ったら、快く撮らせてくれました。\nペチゾーのスタンプ貰うの忘れてた。。。\n\n![自分の属性](blogs/20160718-phpconwest/habatsu.jpg)\n\n自分はこんな属性持ってます！みたいなものを示すシール。\n\nなにげにphalconもあるし、闇とかレガシーとかの怪しげなものが。。。\n\nDockerもあったので、当然貼り付けましたよ！\n\n![懇親会でLT](blogs/20160718-phpconwest/konshin_lt.jpg)\n\n何故か懇親会で始まった、LT。\n知らんかったけど、そういうものなのね。\n\n会場で行われていたLTよりも遥かにカオスな内容で、楽しかったです。\n飛び入りとか延長戦とか。。。\n\n## チラシ\n\n帰りの電車に乗る間際に、入場時に渡された手提げ袋に弊社の求人チラシが入っていることを教えてもらった件。\n\n<img src=\"blogs/20160718-phpconwest/chirashi.jpg\" alt=\"チラシ\" width=\"50%\" title=\"チラシ\">\n\nめっさ緊張しててそれどころではなかったのです。。。\n\n# おわりに\n\nいや〜、カンファレンス、楽しいですね！\nみなさんも、次の蒲田でのPHP Conference、是非とも参加しましょう！\n"},{"key":6,"date":"2016.07.04","slug":"tsukijickathon-vol-3","title":"築地ッカソン vol.3 を開催しました","text":"\n6/25に、弊社にて第3回となるハッカソンイベント、[築地ッカソン vol.3](tsukiji03.peatix.com)が開催されました。\n\n今までは「『築地』をテーマにバカアプリ」「『さくら』をテーマにバカアプリ」と言うようにテーマ縛りでしたが、今回は**VR**という技術をテーマにする築地ッカソンとなりました。\n\n# 概要\n\n「VRをテーマに何かしらのアプリを作る」以外のルールが一切ないハッカソンです。\n\n\n## ざっくりスケジュールなど\n\n* 11:00 開場。来た人から開発開始\n* 18:00 成果発表、投票タイム\n\n# 成果発表\n\n築地ッカソンは開発使える時間が時間がそこまで長くないこともあり、「未完成ですが」という前置きがつく成果発表が多かったようでした。\nそれでも、一人一人のアイデアは多種多様で、\n\n* ホラーゲーム\n* 回避ゲー\n* デート体験\n* ハイジのブランコ\n* VRで道案内\n* 遠隔手術シミュレータ\n* 歌舞伎の気振り\n\nなど、遊び系だけではなく実用系なものが発表されていました。\n\n## 発表の様子など(その1)\n\n![歌舞伎の”けぶり”を目指したもの](blogs/20160704-tsukijickathon-vol-3/demo_keburi.jpg)\n\n歌舞伎の”けぶり”を目指したもの\n\n![全方位からくるオブジェクトを回避しするゲーム](blogs/20160704-tsukijickathon-vol-3/demo_dodge.jpg)\n\n全方位からくるオブジェクトを回避しするゲーム\n\n## 発表の様子など(その2)\n\nまた、今回はテーマがVRというのもあり、前での成果発表の他に、みんなで体験しながらの投票タイムが設けられました。\n\n![体験中の様子、その1](blogs/20160704-tsukijickathon-vol-3/exp_hacosco.jpg)\n\n成果をハコスコの段ボールVRで実際に体験している様子\n\n![体験中の様子、その2](blogs/20160704-tsukijickathon-vol-3/exp_oculus_dk2.jpg)\n\n中には、Oculusを持ち込んで製作していた人もいたり\n\n## 後日Twitterにて発表していた方も\n\n<blockquote class=\"twitter-tweet\" ><p lang=\"ja\" dir=\"ltr\">ここであたしの築地ッカソンの成果である遠隔手術で針と糸が持てないVRの動画を見てみましょう <a href=\"https://t.co/xgoDwriQYX\">pic.twitter.com/xgoDwriQYX</a></p>&mdash; サメジ部長@コミケ日-西c50a (@samezi) <a href=\"https://twitter.com/samezi/status/747811136444071937\">2016年6月28日</a></blockquote> \n\n<blockquote class=\"twitter-tweet\" data-lang=\"ja\"><p lang=\"ja\" dir=\"ltr\">築地ッカソンで作ったくだらないやつ。SUSHI+Visualizer=SUSHIalizer(甘エビ) <a href=\"https://t.co/NwgvhIe2po\">pic.twitter.com/NwgvhIe2po</a></p>&mdash; かみなが れお(Goン) (@334gonn) <a href=\"https://twitter.com/334gonn/status/746676905881964544\">2016年6月25日</a></blockquote>\n\n\n# 主催者側としての振り返り\n\n進行が難しく、ワイワイガヤガヤというよりもモクモクになった今回の築地ッカソンですが、やはり「チームを組んでやってみたい」などの要望もいただきました。\nアンケートとしていただいたご意見はきちんとフィードバックしていき、次回の築地ッカソンがより良くなるように努めていきたいと思います。\n\n\n# Facebookページできました\n\n今回の築地ッカソン開催と合わせて、[Facebookページ](https://www.facebook.com/tsukijickathon/)が開設されました。\n築地ッカソンの情報などは、そちらでも周知されていくので、是非フォローをお願いします。\n"},{"key":5,"date":"2016.06.27","slug":"yochiyochi-nb-2","title":"よちよち.nb 2016/06/27 レポート","text":"\nどうも開発室所属の[@mk2](https://github.com/mk2)です。\n\n6月27日開催分のよちよち.nbレポートです。\n\n![photo](blogs/20160627-yochiyochi-nb/photo.png)\n\n# やったこと\n\n- paizaの[恋するハッカソン　〜君色に染まるアイドル〜](https://paiza.jp/poh/hatsukoi)\n\nプログラミングクイズを解いて自分好みのアイドルを作っていくゲームです。プログラミングクイズを解くたびに新しい衣装をもらえるので、自分好みのルックスのアイドルを自由自在に作ることが出来ます。\n\n例えばそう、下のような！！\n\n![paiza](blogs/20160627-yochiyochi-nb/paiza.png)\n\n諸々の事情によりモザイクをかけておりますが、\n\n- 恋するハッカソンはHTMLで作られている\n\n上記１点からお察しください。\n\nというわけで、よちよち.nbは今回も平常運転でした！\n"},{"key":4,"date":"2016.06.23","slug":"did-an-offsite-hackathon","title":"開発合宿に行ってきました（2016年3月度）","text":"\n![odawara](blogs/20160623-did-an-offsite-hackathon/top.jpg)\n\n開発室室長の澤田です。少し前のことになりますが、3月下旬にNIJIBOX開発室の一部メンバーで開発合宿＠小田原に行ってきました。NIJIBOXの開発合宿はこれまで伊東の山喜旅館を利用することが多かったのですが、今回は育児の都合で日帰りするメンバーがおり、都内からアクセスが良いことを優先的に検討した結果小田原での開催となりました。\n\n小田原で開発合宿というと、簡単にググって調べてみるとどうも「おんやど恵」さんで開催されてる団体が多いようで（例えば[ノハナさんの開発品質向上合宿の例](http://alpha.mixi.co.jp/entry/2016/03/29/195513)）、我々も利用してみたかったのですが、予約のスケジュールが埋まってしまっており断念。そこで今回はヒルトン小田原リゾートさんにお世話になりました。費用もそれなりにかかりますが、都内からのアクセスがしやすく（駅に近いわけではないが、伊東よりも都内に近く、かつ箱根の山を登らなくて済む）、施設の設備も充実しており、充実した合宿となりました。\n\n合宿の旅程としては、以下の通りです。\n\n- 1日目\n  * 午前10時　小田原にて現地集合\n  * 午前13時まで作業＠小田原のコワーキングスペース旧三福\n  * 小田原駅周辺のカフェでランチ\n  * ヒルトン小田原に移動し、15時過ぎから宿泊先の和室で作業再開\n  * 夜ホテル内で食事を取りつつ、気の済むまで作業\n  * （育児の都合で帰宅するメンバーあり）\n- 2日目\n  * 午前中宿泊先でキリのよいところまで開発（レイトチェックアウト）\n  * 昼前に解散（平日開催だったためこの後東海道線で会社に出社）\n\n# 写真で振り返る実際の合宿の様子\n\n小田原駅から徒歩圏内のコワーキングスペースの旧三福さんで合宿を開始しました\n\n![93puku entrance](blogs/20160623-did-an-offsite-hackathon/93puku_entrance.jpg)\n\n午前中一部屋がほぼ貸し切り状態で集中して開発に取り組めました\n\n![93puku room](blogs/20160623-did-an-offsite-hackathon/93puku_room.jpg)\n\n施設の設備が充実している様子\n\n![hilton odawara entrance](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_entrance.jpg)\n\n宿泊先の和洋室のうち、和室部分で開発に取り組みます\n\n![hilton odawara room](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_room.jpg)\n\n部屋からの眺めが良く、お菓子が20%増しでおいしい\n\n![hilton odawara sea](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_sea.jpg)\n\n開発は夜まで続き、普段よりも密度の高いコミュニケーションや知識共有をしながら集中して開発に取り組むことができました\n\n![private hackathon at hilton odawara](blogs/20160623-did-an-offsite-hackathon/hilton_odawara_hackathon.jpg)\n\n行くまでネットワークの回線速度が一番の懸念でしたが、無線LANの速度も速くはありませんでしたが、7名程度であれば大きな問題なく開発を進行可能なレベルでは整備されていました（帯域を食う作業をすることはお薦めできませんが）\n\n今回の合宿では日頃の業務の中で山積していた開発テーマを各個人が集中して取り組むというテーマで合宿を行いましたが、[DeployGateを使ったCI環境の改善](http://qiita.com/nb-nishizawa/items/d765e1c194cb30418d15)をしたり[社内Wikiのプロトタイプを開発してOSSとして公開したり](https://github.com/nijibox/textbox)するなど、通常の業務から離れることで生むことができた成果をいくつか出すことができました。\n\n# 開発合宿プランがない宿で小規模な開発合宿を計画する時には\n\n開発合宿の勝手が分かっている山喜旅館やおんやど恵さんのような宿泊先の場合に比べると、今回のように開発合宿プランのない宿で開発合宿を開催する場合にいくつか気をつける必要がありました。本稿のまとめとして、今回の宿選定で気をつけたポイントを箇条書きしておきたいと思います。\n\n- インターネットが利用可能である\n- 会議室が長時間安価で利用可能であるか、または宿泊先がアーリーチェックイン/レイトチェックアウト対応で無線LANが利用可能である\n- 宿泊先で会議室を確保できない場合→開発合宿を開始できるのがチェックイン時間＝午後14時前後以降になってしまうため、午前の時間を有効活用する案を考える必要もあります。（今回は小田原のコワーキングスペースをドロップイン利用することで辻褄を合わせました）\n\n他に自前で開発合宿を企画する際のノウハウなどの知見をお持ちの方がいましたら、ぜひコメント等お寄せいただけると大変うれしいです。（コメント欄については現在準備中のため、nijibox_tech あっとマーク nijibox.co.jp までご連絡ください！）\n"},{"key":3,"date":"2016.05.23","slug":"yochiyochi-nb","title":"[社内イベント] よちよち.nb 2016年5月23日分 レポート","text":"\nどうも、開発室所属の @mk2 です。\n\nニジボックス社内で毎週開催している技術イベント（懇親会？）があります。\n\nそれはなんと…\n\n**よちよち.nb**\n\nというイベントです！\n\nよちよち.rbのパクリです！！\n\nさて、よちよち.nbなのですが、下記のようなことをやっております。\n\n- 初心にかえってプログラミングを学ぶ\n    - Ruby Warrior\n    - Paiza\n    - CodingGame\n    - CodeIQ\n    - コードを書いて遊べるゲーム\n    - などをやる（お菓子を食べつつ）\n- ペアプロをやる\n    - 社内ツール開発のペアプロとか\n- 本職のプログラマ以外のひともプログラムを学ぶ\n    - ディレクターの方なども参加予定です！\n\n今回は2016年5月23日の開催の様子を写真とともにお送りします。\n\n# 開催中の様子\n合計5名のエンジニアが参加しました。お菓子は近くので買ったチョコボール（1080円/100g）をセレクトしました。ナッツ入りのチョコボールおいしー :laughing: \n\n![yochiyochi.nb](blogs/20160523-yochiyochi-nb/yochiyochi-nb.jpg)\n\n# やったこと\nCodeIQというプログラミング問題を解くウェブサービスを皆でやりました。取り組んだ問題は下記のような感じです。\n\n- [「はしれ！コード学園」   JSちゃん(JavaScript)さんからの問題](https://codeiq.jp/q/2378)\n- [言語不問：素数の数を数えてください](https://codeiq.jp/q/1621)\n- [言語不問：「7」の数を数えよう](https://codeiq.jp/q/1630)\n\nJSちゃんの問題はこんなことも知らなかったー！俺たちー！と自分で自分につっこみつつ、素数や７の問題はどうやるんだー！これー！と楽しんでコーディングしました。\n\n~~本当は書いたコードも見せたいのですが、ちょっとまだ公開できる状況が整っていないので、また次回のレポートにご期待ください！~~\nすいません、CodIQの回答コードは勝手に公開したらまずい感じでしたね。申し訳ございません。\n\n以上、よちよち.nbレポートでしたー！\n\n"},{"key":2,"date":"2016.03.26","slug":"the-second-tsukijikkathon","title":"第二回築地ッカソンを終えて得られたもの","text":"\nこんにちは皆さん\n\n本日弊社ニジボックスでハッカソンイベント「第二回築地ッカソン」を実施しました\n多くの方にご参加いただき、とても有意義な時間を過ごせたように思います\nhttp://peatix.com/event/153432\n\nそんなハッカソンで自分なりに得たものについてこの場を借りて書いてみようかなと思います\n\n# イベントの概要\n\n## 内容\n\n馬鹿なアプリを作ろうという趣旨の非常にカジュアルなハッカソンです。\nアイデアしか出ていなくて、完成品ができていなくても問題なし！\n技術力に自身がなくても気軽に参加できるイベントとなっています\n一応、テーマを決めたほうが作りやすいと考えて、「さくら」をテーマにしました\n\n## スケジュール\n\n11:00 ~ monacaハンズオン(どうやって作ったらいいかわからない方、monacaさわってみたい方向け)\n12:00 ~ 昼食\n13:00 ~ 製作開始\n18:00 ~ 成果発表\n\n# 成果\n\n## 多種多様な成果物\n\n本会は概要にもある通り非常にカジュアルなイベントであり、しかも5時間という短い時間内で完成を目指すということや、各個人個人が制作するということからも、成果物自体は規模の小さいものとなります。\nしかし、成果の中身は本当に千差万別と言ってよく、桜の花を愛でるもの、SNS、VRを含むアニメーション、アクションゲームにパズルゲーム、UIを変更するアドオンなど、こんなにもネタやアイデアがあるのかと驚くものばかりです。\nまあ、私のように「さくら」と聞いて偽客を真っ先に思い浮かべたひねくれ者や、CCさくらへの熱い思いをダダ漏れさせた豪の者もおりましたが。。。\nSNSのようなものについては、特にアイデアが素晴らしかったのもあり、もう少し作りこみが進めば、それだけでちょっとしたジョークアプリとしてサービスイン出来ちゃうんじゃないかってくらいレベルでした。\nまた、カメラ共有を使って花見を遠隔で見ようというアプリも有りましたが、なにげに複数PC間での画面共有や中継なども実装され、普通にアプリケーションとして出しても遜色のないものも有りました。\n何がスゴイって、このようなアプリが5時間で形としてできてしまうことです。\n\n## 題材の傾向\n\nさくらをテーマにしましたが、そこからどのような題材を連想したのかをまとめてみましょう\n\n- 桜の木、花びら\n- 花見\n- 桜の花の色\n- ワシントンと桜の木\n- サクラ(おとり、偽客)\n- CCさくら\n\n花びらを題材に、ひらひら落ちるアニメーションやゲームなどが割と多めだったように思います\nついで花見も題材としては多かった印象です。花見の場所取りを題材にしたものは、なかなかとんがってるなぁと思いました\n花の色を題材に既存UIに手を加えたり、特定文字色を変えたり、絵の色調を変えたりとバリエーションに富んだアプリケーションが出てきました。\nさくらを題材にしてワシントンの逸話が出てきたのにはびっくりしました(成果はかなり難しいスロットゲームでした)\nCCさくらに関しては。。。技術力の~~無駄遣い~~素晴らしい使いみちを示したのだと確信しています！\n\n# 感想\n\n## 高品質多アプリ時代の予感\n\n再度述べますが、今回のハッカソンはカジュアルなものでしたし、時間も短いので大きな成果を期待しにくいものでした。\nにも関わらず、VRやSNSやゲームなど、様々なアプリが高いレベルで出てきました。\nこれは、参加したエンジニアのレベルの高さも有りましたが、その成果を短時間で実現するだけの環境が整っていることを示唆しているように思います。\nエンジニアとしてこのような環境の充実は歓迎すべきものでは有りますが、同時にその流れについていかなければならないとも思います。\n本日のイベントで改めてそのことを思い知らされたと思います。\n精密な設計の元、品質の高いアプリをじっくり作るのも大事ですが、今回のようにカジュアルなアプリを短時間で沢山作ることも、技術を追いかける上では必要なことかなと思いました。\n\n## エンジニアにもアイデアはある\n\nまた、これも当然といえば当然ですが、アイデアを持つのは何もプランナーやディレクターだけではないのだなと思いました。\nむしろ、エンジニアの場合、アイデアをその場で形にできるというアドバンテージを持っているように見えます。\nまた、アイデアを形にするという練習をする意味でも、今回のようなカジュアルなハッカソンイベントは一定の意味を持っていると考えています。\n\n# まとめ\n\n今回のハッカソンで得られた知見や感想を徒然に書いてみました\n全部まとめると\n\n- たくさんの成果が出たよ！\n- 高レベルの成果が多数出てきたよ！\n- たくさんアプリを作るといいね！\n\n参加した皆様、お疲れ様でした。\n運営スタッフの方々、ありがとうございます\n\n# 関連\n\n[aviファイルとかを連番の画像に書き出す](http://qiita.com/mk2/items/595e211b947f63f6eafd) - CCさくらネタ関連\n"},{"key":1,"date":"2016.02.02","slug":"running-the-first-hackathon","title":"ハッカソンを初めて主催したレポート","text":"\n先日、NIJIBOX主催で初めてハッカソンイベント「築地ッカソン」を\n開催したときのレポートです。\n\n**※第二回築地ッカソンが開催されることになりました！下記のURLから飛べますのでぜひご参加ください！**\nhttp://peatix.com/event/153432\n\n# 築地ッカソンとは？\n\n築地を眺めながら、バカなアプリを開発するハッカソンです。\n作るものはバカであればアプリでもWebでも何でもＯＫで、\nテクニカルなテーマもありません。\n1/23に行われた第一回は「築地」をテーマにおいて\nみんなで、がやがやもくもくとバカアプリを作りました！\n\n# 開発中の皆さんの様子\n\n![](blogs/20160202-running-the-first-hackathon/01.jpg)\n\n開発中は皆さん真剣。\n分からないことを相談したり、\nアイデアソン的に何を作ろうか話していたりといい雰囲気。\n自分は裏方だったのですが、次は参加者として何か作りたいです。\n\n# アプリ発表会\n\n11時～18時の開発の後(うち2時間はMonacaやCloudVisionのチュートリアル)\nそれぞれの成果物を発表しました。\n発表した皆さんの作品に\n「いいね！」と「バカだね！」を各々で好きなだけつけて評価。\n作品は、画像認証と画像合成で割とガチなアプリがあったり、\nMonacaを使ってJSでバカアプリを作っちゃったりと多種多様。\n\n![](blogs/20160202-running-the-first-hackathon/02_1.jpg)\n\n発表を見ながら、お酒とピザと寿司！\n全員が何かしらの作品を発表することができました。\nこれって結構すごいことな気がする。\n\n![](blogs/20160202-running-the-first-hackathon/02_2.jpg)\n\n寿司うめぇ。築地だかんね！\n\n![](blogs/20160202-running-the-first-hackathon/02_3.jpg)\n\n優勝はどんぶりに回転する具材を乗せて海鮮丼を作るアプリ！\nいいねポイントもバカだねポイントも高く、面白くて完成度が高かったです。\n\n![](blogs/20160202-running-the-first-hackathon/03.jpg)\n\n賞品は築地で買った乾物詰め合わせです。\n兵庫県産…？知らんがな。\n\n![](blogs/20160202-running-the-first-hackathon/04.jpg)\n\n最後はみんなで記念撮影。\nこの写真だけで凄く楽しかったことが伝わるだろうという自慢。\n\n# 反省点\n\n発表時にスマホをプロジェクタで映す手段がなかったり、\n開発中の写真をあまり撮影してなかったり、\nもうちょっと技術側のサポートが出来る人を準備するべきだったと反省。\n次回はもっとちゃんと準備しよう。\n\n# 終わりに\n\nハッカソンと言うと、\n凄い技術者がくるんだろうなぁ…とか、\nちゃんとモノヅクリが出来るか不安だなぁ…とか、\nそんな人でも気軽に参加できるハッカソン！みたいな位置づけで、\nこれからも定期的に開催していきたいなと思います。\n"}
  ],
  location: window.location.hash
};

function setState(changes){
  var component;
  Object.assign(state, changes);
  ReactDOM.render(
    React.createElement(Application, state),
    document.getElementById('react-app')
  )
}

window.addEventListener('hashchange', navigated, false);
window.addEventListener('popstate', navigated, false);

navigated()
