require 'hyalite'
require 'js'

class Application
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  AboutUs =
    'リクルートグループの新規事業開発を担当するMedia Technology Lab.や自社顧客からの受託開発、およびNijibox自社のサービス開発・マーケティングソリューション導入を行っています。技術情報は[Qiita](https://qiita.com/organizations/nijibox)で。不定期に[築地ッカソン](http://peatix.com/group/31991)というハッカソンイベントもやってます！'
  CopyRight =
    "<li>&copy; NIJIBOX Co.,Ltd. </li><li>Design: <a href='http://templated.co'>TEMPLATED</a>, Photo: <a href='https://www.flickr.com/photos/itseacrane/6701113981/in/photolist-bd9XHX-6Kusan-6KyB7E-6KyB9W-6KyBcC-6KutKn-6KyzTq-6KyBtm-6Kuu8K-81PPWe-djvrbZ-bd9khz-6yw28t-5FRJyv-6KyBss-6KyBb1-6EZMHA-9CBrdG-6Kus6z-6KyzNY-6yw2ez-6yw23R-6yw472-9ByM9q-6dTPzh-6dTPks-6dPEnV-6dTPWS-6dTP4y-4vR9YB-nmg6SE-8hnoDm-9Bvp2Z-nmg6uf-8hj9c2-nokSqA-8zxwdh-478ePV-8H4wzM-h8q2QP-8zumJn-ufWBZP-4ygzww-noixsv-aeT8AM-4ch3Ye-4ygzxu-4yckPk-47cj4h-f6cKaN'>Sea Crane</a>.</li>"

  def self.render
    Hyalite.render(Hyalite.create_element(Application, nil), $document['#react-app'])
  end

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
        div({className: 'inner'},
          ul({className: 'copyright', dangerouslySetInnerHTML: {__html: CopyRight}})))),
      )
  end

end

$document.ready do
  Application.render
end
