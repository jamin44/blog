---
layout: post
title: Jekyll环境的搭建
categories: [Linux]
tags: [jekyll]
summary: Jekyll 是一个简单的，博客感知，静态站点生成器，与github的pages很相配。
---

### 安装ruby环境(mac自带 ruby -v)
```sh
$ brew install ruby
```

### 修改Jekyll版本
- mac安装jekyll 需要ruby大于2.4（mac自带2.3.x）
```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install ruby
```
- 添加到shell配置
```sh
$ export PATH=/usr/local/opt/ruby/bin:$PATH
```
- 查看路径和版本
```sh
$ which ruby
/usr/local/opt/ruby/bin/ruby
$ ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [x86_64-darwin18]
```

### 安装rbenv管理ruby版本

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
$ brew install rbenv
$ rbenv init
$ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
$ rbenv install 2.6.3 
$ rbenv global 2.6.3 
$ ruby -v
```

### 配置加速
- 查看源列表
```sh
$ gem sources -l
```
- 将国外源移除，并添加国内源
```sh
$ gem sources --remove https://rubygems.org/
$ gem sources --add https://gems.ruby-china.com/
```
- 缓存国内源
```sh
$ gem sources -u
```

### 全局安装Jekyll和Jekyll bundler

```sh
$ sudo gem install bundler
$ sudo gem install -n /usr/local/bin/ jekyll
```

### 博客创建与运行
- 新建blog博客
```sh
$ jekyll new blog
```
- 安装bundle(依赖)
```sh
$ sudo bundle install
```
- 启动项目
```sh
$ bundle exec jekyll server
```
Now browse to `http://localhost:4000`