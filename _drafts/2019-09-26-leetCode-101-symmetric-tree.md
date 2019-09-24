---
layout: post
title: 101.对称二叉树
categories: [LeetCode]
tags: [binary Search Tree]
summary: 给定一个二叉树，检查它是否是镜像对称的。
---

### 题目要求
给定一个二叉树，检查它是否是镜像对称的。

- **`说明:`**
如果你可以运用递归和迭代两种方法解决这个问题，会很加分。

### 题目示例
- **`示例 1:`**
二叉树 [1,2,2,3,4,4,3] 是对称的。
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

- **`示例 2:`**
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```
    1
   / \
  2   2
   \   \
   3    3
```


### 解题思路


### 解题代码
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSymmetric(TreeNode root) {
        
    }
}
```



### 题目来源
LeetCode-[101.对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)
