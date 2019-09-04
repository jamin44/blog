---
layout: post
title: Java非线性结构 - 树
categories: [DataStructure]
tags: [java]
summary: 二分搜索树（Binary Search Tree）是一种能够将链表插入的灵活性和有序数组查找的高效性结合起来的符号表实现。
---

## Tree 树
### 二叉树
- 先介绍一下**`二叉树`**的性质
1. 二叉树和链表一样，是动态数据结构。
1. 二叉树具有`天然递归`结构
1. 二叉树具有`唯一`根节点
1. 二叉树每个节点最多有两个孩子
1. 二叉树每个节点最多有一个父亲
1. 没有孩子的节点称为`叶子节点`
1. 二叉树不一定是`满`的。一个节点也是二叉树、`空NULL`也是二叉树
 
### 二分搜索树
- **`二分搜索树`**是二叉树，不过二分搜索树需要满足如下要求:  
1. 二分搜索树的每个节点的值必须`大于`其`左子树`的所有节点的值
1. 二分搜索树的每个节点的值必须`小于`其`右子树`的所有节点的值

- 每一棵子树也是二分搜索树
> **`注意`** 二分搜索树存储的元素必须有`可比较性`。所以二分搜索树的值的类型需要可以进行比较的  

- 二分搜索树的最小值和最大值 : 
1. 最小值 - 一直向左走(最`左`那个节点的值)
1. 最大值 - 一直向右走(最`右`那个节点的值)  

- 二分搜索树遍历 : 
1. 前序遍历  --  根节点 -> 左节点 -> 右节点
1. 中序遍历  --  左节点 -> 根节点 -> 右节点
1. 后序遍历  --  左节点 -> 右节点 -> 根节点

> `中序`遍历将各个节点从小到大排序，`后序遍历` -- 释放内存  
> 采用`栈`实现`前序遍历``非递归`的写法，需要借助栈来标记节点 -- 根节点先入栈，后出栈，再把其右、左孩子分别入栈，先出栈左孩子，然后入栈刚刚出栈节点的右、左孩子。若要出栈`左节点`无左右孩子，则出栈`其父节点`的`右孩子`(也就是其兄弟节点-`右节点`)  

```java
    // 二分搜索树的非递归前序遍历
    public void preOrderNR(){
        Stack<Node> stack = new Stack<>();
        stack.push(root);
        while(!stack.isEmpty()){
            Node cur = stack.pop();
            System.out.println(cur.e);

            if(cur.right != null)
                stack.push(cur.right);
            if(cur.left != null)
                stack.push(cur.left);
        }
    }
```

> 采用`队列`实现二分搜索树的`层序遍历` -- 先根节点入队，出队。把其左、右分别入队。先出对左孩子，再入对其刚刚出队节点的左右孩子。若`左节点`无左右孩子，则将其父节点的右孩子出队（也就是其兄弟节点-`右节点`）。

```java
    // 二分搜索树的层序遍历
    public void levelOrder(){
        if(root == null)
            return;
        Queue<Node> q = new LinkedList<>();
        q.add(root);
        while(!q.isEmpty()){
            Node cur = q.remove();
            System.out.println(cur.e);
            if(cur.left != null)
                q.add(cur.left);
            if(cur.right != null)
                q.add(cur.right);
        }
    }
```


