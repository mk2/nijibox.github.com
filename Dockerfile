FROM ruby:2.2.5-slim
ARG nodeVersion='v4.4.7'

ENV PATH=/root/.nodebrew/current/bin:$PATH
RUN curl -L git.io/nodebrew | perl - setup && \
    nodebrew install-binary $nodeVersion && \
    nodebrew use $nodeVersion 

RUN mkdir /app /blog
ADD ./Gemfile /app/Gemfile
ADD ./Gemfile.lock /app/Gemfile.lock
WORKDIR /app
RUN bundle install

WORKDIR /blog
CMD ["bundle", "exec", "rake", "compile"]
