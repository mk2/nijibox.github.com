require 'hyalite'
require 'js'
require 'native'

class BlogItem
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  def render
    div({className: 'inner'},
      a({href: "/#{@props[:slug]}"},
        h2(nil, @props[:title])),
      p(nil, @props[:date]),
      span({dangerouslySetInnerHTML: {__html: JS.marked(@props[:text])}, style: {textAlign: 'left'}}))
  end

end

class BlogListView
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  def render
    blog_items = @props[:blogs].map do |blog|
      div(blog,
        h3(nil,
          a(@props[:transitionProps].(blog[:slug]), "#{blog[:date]}: #{blog[:title]}")))
    end
    section({id: 'one', className: 'wrapper special'},
      h2({style: {marginBottom: '40px'}}, 'ブログ記事 アーカイブ'),
      blog_items)
  end

end

class BlogView
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  def render
    section({id: 'one', className: 'wrapper special'},
      Hyalite.create_element(BlogItem, @props[:blog]))
  end

end

class Page
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  AboutUs =
    'リクルートグループの新規事業開発を担当するMedia Technology Lab.や自社顧客からの受託開発、およびNijibox自社のサービス開発・マーケティングソリューション導入を行っています。技術情報は[Qiita](https://qiita.com/organizations/nijibox)で。不定期に[築地ッカソン](http://peatix.com/group/31991)というハッカソンイベントもやってます！'
  CopyRight =
    "<li>&copy; NIJIBOX Co.,Ltd. </li><li>Design: <a href='http://templated.co'>TEMPLATED</a>, Photo: <a href='https://www.flickr.com/photos/itseacrane/6701113981/in/photolist-bd9XHX-6Kusan-6KyB7E-6KyB9W-6KyBcC-6KutKn-6KyzTq-6KyBtm-6Kuu8K-81PPWe-djvrbZ-bd9khz-6yw28t-5FRJyv-6KyBss-6KyBb1-6EZMHA-9CBrdG-6Kus6z-6KyzNY-6yw2ez-6yw23R-6yw472-9ByM9q-6dTPzh-6dTPks-6dPEnV-6dTPWS-6dTP4y-4vR9YB-nmg6SE-8hnoDm-9Bvp2Z-nmg6uf-8hj9c2-nokSqA-8zxwdh-478ePV-8H4wzM-h8q2QP-8zumJn-ufWBZP-4ygzww-noixsv-aeT8AM-4ch3Ye-4ygzxu-4yckPk-47cj4h-f6cKaN'>Sea Crane</a>.</li>"

  def render
    Hyalite.create_element('container', nil,
      header({id: 'header', className: 'alt'},
        h3(nil,
          a({href: '/'}, 'NIJIBOX Engineer Blog'))),
      section({id: 'banner'},
        i({className: 'icon'}),
        h3(nil, '俺が魂を込めれば')),
      section({id: 'post', className: 'wrapper style3 special'},
        div({className: 'inner'},
          header({className: 'major narrow'},
            h2(nil, 'We Are Hiring! 積極採用中'),
            p(nil, 'NIJIBOXの組織文化や働きやすい制度、技術的な背景など表から裏まで紙面の許す限り更に詳しく紹介します')),
          ul({className: 'actions'},
            li(nil,
              a({href: 'http://nijibox-recruit.jp/engineer', className: 'button big alt'}, '詳しくはこちら')))
          )),
      footer({id: 'footer'},
        div({className: 'inner'},
          article({className: 'feature left'},
            div({className: 'content'},
              h2(nil, 'About Us'),
              span({dangerouslySetInnerHTML: {__html: JS.marked(AboutUs)}, style: {textAlign: 'left'}})),
            span({className: 'image'},
              img({src: 'images/company.png'})),
            ),
          article(nil,
            Hyalite.create_element(BlogListView, @props)),
        div({className: 'inner'},
          ul({className: 'copyright', dangerouslySetInnerHTML: {__html: CopyRight}})))),
      )
  end

end

class Application
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  def self.render
    Hyalite.render(Hyalite.create_element(Application, nil), $document['#react-app'])
  end

  def initial_state
    {
      blogs: [
          {key: 5,date: "2016.06.27", slug: "yochiyochi-nb-2", title: "よちよち.nb 2016/06/27 レポート", text: "\nどうも開発室所属の[@mk2](https://github.com/mk2)です。\n\n6月27日開催分のよちよち.nbレポートです。\n\n![photo](blogs/20160627-yochiyochi-nb/photo.png)\n\n# やったこと\n\n- paizaの[恋するハッカソン　〜君色に染まるアイドル〜](https://paiza.jp/poh/hatsukoi)\n\nプログラミングクイズを解いて自分好みのアイドルを作っていくゲームです。プログラミングクイズを解くたびに新しい衣装をもらえるので、自分好みのルックスのアイドルを自由自在に作ることが出来ます。\n\n例えばそう、下のような！！\n\n![paiza](blogs/20160627-yochiyochi-nb/paiza.png)\n\n諸々の事情によりモザイクをかけておりますが、\n\n- 恋するハッカソンはHTMLで作られている\n\n上記１点からお察しください。\n\nというわけで、よちよち.nbは今回も平常運転でした！\n"}
      ],
      location: Native(`window`)[:location][:hash],
      transitionProps: -> {
        {onClick: -> { puts 'transitionProps clicked' }}
      }
    }
  end

  def render
    Hyalite.create_element(Page, @state)
  end

end

$document.ready do
  Application.render
end
