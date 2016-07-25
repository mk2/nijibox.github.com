require 'json'
require 'date'
require 'uglifier'
require 'sitemap_generator'

Encoding.default_external = "utf-8"

task :compile => ["compile:asset", "compile:blog"]

namespace :compile do
  desc 'concatinate js files and uglify it'
  task :asset do
    js = ["jquery.min", "jquery.easing.1.3.min", "skel.min", "util", "marked.min", "react.min", "react-dom.min", "main"]
    File.write("./assets/js/uglified.js", Uglifier.new.compile(js.map{|e| File.read("./assets/js/#{e}.js")}.join))
  end 
 
  desc 'compile blog files into json data and craete *.html from index.tmpl'
  task :blog do
    create_entry = ->(entry, page_relative_path, image_path){
      File.write("#{entry[:slug]}.html", {
        :title => entry[:title] + " | NIJIBOX ENGINEER BLOG",
        :url => "http://tech.nijibox.jp/#{page_relative_path}",
        :image => "http://tech.nijibox.jp/#{image_path}",
        :version => Time.now.to_i.to_s
      }.inject(File.open("index.tmpl").read){ |html, replacement| html.gsub!(/\{###___#{replacement[0].to_s.upcase}___###\}/, replacement[1])})
    }
    # generate top page
    create_entry.({:title=>"TOP PAGE", :slug=>"index"}, "", "")
    # generate all blog articles
    result = []
    Dir.glob('./blogs/*.md').each do |f|
      result << {
        key:result.size+1,
        date:Date.parse(File.basename(f)[0..7]).strftime("%Y.%m.%d"),
        slug:File.basename(f)[9..-4],
        title:File.open(f).to_a[0].chomp,
        text:File.open(f).to_a[1..-1].join
      }
      create_entry.(result.last, result.last[:slug], (Dir.glob("blogs/#{File.basename(f)[0..-4]}/*.jpg").first || ""))
    end 
    File.write("./assets/js/blog.js", File.open("./assets/js/blog.js.tmpl").read.gsub(/\{###___BLOG_ENTRIES___###\}/, result.reverse.map{|a| a.to_json}.join(",")))
    # generate sitemap.xml.gz
    SitemapGenerator::Sitemap.default_host = 'http://tech.nijibox.jp'
    SitemapGenerator::Sitemap.create do
      add "/", :changefreq => 'always'
      result.each do |page|
        add "/#{page[:slug]}", :changefreq => 'daily'
      end
    end
  end
  
end
