---
layout: post
title: 104. 二叉树的最大深度
categories: [LeetCode]
tags: [binary Search Tree]
summary: 给定一个二叉树，找出其最大深度。
---

### 题目要求
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

- **`说明：`**
叶子节点是指没有子节点的节点。

### 题目示例
- **`示例:`**
给定二叉树 [3,9,20,null,null,15,7]，
```
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。



### 解题思路
- 递归解法
1. 判断根root为空，则返回0
1. 递归其的左右节点，注意层数需要+1
1. 

- 时间复杂度: O(n), n是树中的节点个数; 空间复杂度: O(h), h是树的高度

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
    public int maxDepth(TreeNode root) {
        if(root == null)
            return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}
```



### 题目来源
LeetCode-[104.二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
