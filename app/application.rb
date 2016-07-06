require 'hyalite'

class Application
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  def self.render
    Hyalite.render(Hyalite.create_element(Application, nil), $document['#react-app'])
  end

  def render
    Hyalite.create_element('container', nil,
      Hyalite.create_element('header', {id: 'header', className: 'alt'},
        h3(nil,
          a({href: '/'}, 'NIJIBOX Engineer Blog'))),
      Hyalite.create_element('section', {id: 'banner'},
        i({className: 'icon'}),
        h3(nil, '俺が魂を込めれば')),
      Hyalite.create_element('section', {id: 'post', className: 'wrapper style3 special'},
        div({className: 'inner'},
          Hyalite.create_element('header', {className: 'major narrow'},
            h2(nil, 'We Are Hiring! 積極採用中'),
            p(nil, 'NIJIBOXの組織文化や働きやすい制度、技術的な背景など表から裏まで紙面の許す限り更に詳しく紹介します')),
          ul({className: 'actions'},
            li(nil,
              a({href: 'http://nijibox-recruit.jp/engineer', className: 'button big alt'}, '詳しくはこちら')))
          ))
      )
  end

end

$document.ready do
  Application.render
end
