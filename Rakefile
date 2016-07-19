require 'json'
require 'date'
require 'uglifier'
require 'sitemap_generator'

Encoding.default_external = "utf-8"

desc 'compile blog files into json data and craete index.html from index.tmpl'
task :compile do
  js = ["jquery.min", "jquery.easing.1.3.min", "skel.min", "util", "marked.min", "react.min", "react-dom.min", "main"]
  File.write("./assets/js/uglified.js", Uglifier.new.compile(js.map{|e| File.read("./assets/js/#{e}.js")}.join))
  result = []
  Dir.glob('./blogs/*.md').each do |f|
    result << {
      key:result.size+1,
      date:Date.parse(File.basename(f)[0..7]).strftime("%Y.%m.%d"),
      slug:File.basename(f)[9..-4],
      title:File.open(f).to_a[0].chomp,
      text:File.open(f).to_a[1..-1].join
    }
    File.symlink "index.html", "#{result.last[:slug]}.html" if !File.exists?("#{result.last[:slug]}.html")
  end 
  File.write("index.html", File.open("index.tmpl").read.gsub(/###___REPLACE_HERE___/, result.reverse.map{|a| a.to_json}.join(",")))
  SitemapGenerator::Sitemap.default_host = 'http://tech.nijibox.jp'
  SitemapGenerator::Sitemap.create do
    add "/", :changefreq => 'always'
    result.each do |page|
      add "/#{page[:slug]}", :changefreq => 'daily'
    end
  end
end

