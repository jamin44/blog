---
layout: post
title: vim的使用
categories: [Note]
tags: [java]
summary: 使用vim的keymap提高效率--Vimium和IdeaVim
---

## 前言
- vimium类似于vim的快捷键，是chrome浏览器的一款插件, 可以用键盘代替鼠标的操作, 提高我们的浏览速度和上网体验。
- ideavim是 JetBrains 开发软件扩展插件, 有效提升开发效率。


## 使用

### Chrome使用Vimium
1. `Vimium`作为Chrome的一个扩展工具，安装当然很简单。在Chrome应用店上安装即可[Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?utm_source=chrome-ntp-icon)

1. 自定义快捷方式  
右击右上角扩展的图标 -> 进入选项 -> 在Custom key mappings新增下面快捷内容 -> 点击下面save changes
```
// Insert your preferred key mappings here.
map w scrollUp
map s scrollDown
map a scrollLeft
map d scrollRight
map l scrollPageDown
map h scrollPageUp
map qq scrollToTop
map ee scrollToBottom
map j goBack
map k goForward
```

1. 常用的快捷方式

    |按键|效果|
    | :--: |:--:|
    |r|刷新|
    |f/F|跳转链接|
    |^|上一个标签|
    |w/s/a/d|上/下/左/右|
    |j/k|后退/前进|
    |J/K|跳转标签页|
    |x/X|关闭/恢复页面|
    |h/l|上下半页滚动|
    |qq/ee|回到顶部/底部|
    |t/T|创建/查看标签页|
    |o/O|查找历史记录+书签|
    |v|复制模式|
    |y|进行复制|
    |gu/gU|跳转到当前url上一级/最高级|
    |p/P|搜索剪贴板关键字 在当前/新窗口|



### IDEA是ideavim
1. 直接在`插件`浏览器搜索安装即可，重启后在边栏`tools`上可以看到`vim Emulator`

1. 由于ideavim有些快捷方式与IDEA本快捷方式会冲突, 可以在
preferences -> Editor -> Vim Emulation(mac系统)  
Settings -> Other Settings-Vim Emulation设置(win系统)


## 参考文献

