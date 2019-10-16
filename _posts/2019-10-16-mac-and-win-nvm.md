---
layout: post
title: nvm的使用
categories: [Note]
tags: [node]
summary: nvm是用来管理node的版本管理工具。
---

## 前文
nvm是node版本管理工具，用它可以方便的在机器上安装并维护多个Node的版本

## 使用
### Mac安装nvm
**安装前卸载掉已安装的`Node`和`已安装`的全局模块**  
1. 检查是否安装node。
```sh
$ node -v
```
1. 若是版本信息返回，则进行删除
```sh
$ sudo npm uninstall npm -g
$ sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
$ sudo rm -rf /usr/local/include/node /Users/$USER/.npm
$ sudo rm /usr/local/bin/node
$ sudo rm /usr/local/share/man/man1/node.1
$ sudo rm /usr/local/lib/dtrace/node.d
```
1. 验证是否卸载完成
```sh
node  -v
npm  -v
```

1. 使用`curl`进行安装nvm
```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

1. 配置环境变量
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

1. 完成以后检测是否安装成功
```sh
$ nvm
$ node version manger # 安装成功
```

1. 执行 nvm, 如果提示 `-bash: nvm: command not found`, 需要手动配置变量
```sh
# 新建 ~/.bash_profile 文件
$ vi ~/.bash_profile
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
$ source ~/.nvm/nvm.sh # 使bash_profile生效
```

### Win安装nvm
1. github[官网](https://github.com/coreybutler/nvm-windows/releases)寻找下载包

1. 程序安装过程中，在 Set Node.js Symlink 这一步目录设置，是待会 nvm use 存放你的 nodejs 程序的目录 [C:\\DevTools\\nodejs]。


### Mac卸载nvm
1. nvm卸载
```sh
$ sudo rm -rf `$NVM_DIR`  
```

1. 执行完重启程序，输入 `nvm` 测试是否成功
```sh
$ nvm 
```

1. 还需要到以下文件中删除干净`NVM_DIR`相关的 (如果有)  
~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc

### nvm常见命令
```md
nvm version 查看当前的版本
nvm install 安装最新版本nvm
nvm install <version>  安装相应版本
nvm use <version>  切换使用指定的版本node
nvm ls 列出所有版本
nvm current显示当前版本
nvm uninstall <version> 卸载制定的版本
```
