---
layout: post
title: Git的使用
categories: [Git]
tags: [git]
summary: Git 是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理
---

## 基础命令
- 查看当前所连接的远程仓库 `git remote -v`
- 去除当前的远程仓库 `git remote rm origin`
- 添加远程仓库链接 `git remote add origin git@gitee.com:Zeffon/test.git`
- 克隆远程仓库 `git clone git@gitee.com:Zeffon/test.git`
- 暂存全部代码到缓冲区 `git add .`
- 提交到本地仓库 `git commit -m "<commint info>"`
- 推送到远程仓库 `git psuh origin master`
- 拉取远程仓库代码 `git pull origin master`


## Git分支
- 创建本地分支 dev  `$ git branch dev`
- 切换本地分支 dev  `$ git checkout dev`
- 相当于以上两条命令：创建 dev 分支并切换 `$ git checkout -b dev`
- 查看本地分支 `$ git branch`
- 删除本地分支 dev `$ git branch -d dev`
- 融合分支dev到主支master `git merge --no-ff -m "提交信息" dev`
- 推送分支 `git push origin local_branch:remote_branch`


## Git标签
- 在Git中打标签非常简单，首先，切换到需要打标签的分支上
    ```sh
    git branch
    git checkout master
    ```
- 然后，敲命令`git tag <name>`就可以打一个新标签
    ```sh
    git tag v1.0
    ```
- 可以用命令`git tag`查看所有标签
    ```sh
    $ git tag
    v0.9
    v1.0
    ```
- 比方说要对`add merge`这次提交打标签，它对应的`commit id`是`f52c633`，敲入命令
    ```sh
    $ git tag v0.9 f52c633
    ```
   再用命令git tag查看标签：
    ```sh
    $ git tag
    v0.9
    v1.0
    ```


- 推送标签到远程，使用命令`git push origin <tagname>`
    ```sh
    $ git push origin v1.0
    Total 0 (delta 0), reused 0 (delta 0)
    To github.com:michaelliao/learngit.git
    [new tag]         v1.0 -> v1.0
    ```
- 一次性推送全部尚未推送到远程的本地标签 `git push origin --tags`

- 删除标签 `git tag -d v1.0`

- 如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：
    ```sh
    $ git tag -d v0.9
    Deleted tag 'v0.9' (was f52c633)
    ```
- 然后，从远程删除。删除命令也是`push`，但是格式如下
    ```sh
    $ git push origin :refs/tags/v0.9
    To github.com:michaelliao/learngit.git
    [deleted]         v0.9
    ```
