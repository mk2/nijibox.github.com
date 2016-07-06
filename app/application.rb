require 'hyalite'

class Application
  include Hyalite::Component
  include Hyalite::Component::ShortHand

  def self.render
    Hyalite.render(Hyalite.create_element(Application, nil), $document['#react-app'])
  end

  def render
    div(nil,
      div
    )
  end

end

$document.ready do
  Application.render
end
