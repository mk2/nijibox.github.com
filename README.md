このブログの書き方

- `/blogs/`フォルダ以下に`{YYYYMMDD}-{BLOG_SLUG}.md`の形式でテキストファイルを作成します
  * テキストファイルの中身の1行目をブログのタイトルとして扱います
  * 2行目以降にブログ記事をMarkdownの書式で書き込みます
- `docker-compose up` または `rake compile`するだけでブログ生成できます
- 手元でPreview動作確認したい時は`heroku create && git push heroku master`すれば動きます
  * ただの静的なWebサイトなので、Localでの動作確認はお好きな感じでどうぞ
- ブログを書いたら、Pull Requestを投げて社内関係者各位のレビューとマージを待って下さい
