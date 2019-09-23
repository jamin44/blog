---
layout: post
title: 102.二叉树的层次遍历
categories: [LeetCode]
tags: [leetCode, stack]
summary: 给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
---

### 题目要求
给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

### 题目示例
- **`示例:`** 
1. 给定二叉树: [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
1. 返回其层次遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```

- **`示例 3:`** 
```
输入: "(]"
输出: false
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
    public List<List<Integer>> levelOrder(TreeNode root) {
        
    }
}
```

### 题目来源
LeetCode-[102.二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)