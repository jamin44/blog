---
layout: post
title: 112.路径总和
categories: [LeetCode]
tags: [binary Search Tree]
summary: 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
---

### 题目要求
给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

- **`说明:`**
叶子节点是指没有子节点的节点。

### 题目示例
- **`示例:`**
给定如下二叉树，以及目标和 sum = 22，
```
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
```
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。


### 解题思路
- 递归解法

- 时间复杂度: O(n), n为树的节点个数
- 空间复杂度: O(h), h为树的高度
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
    public boolean hasPathSum(TreeNode root, int sum) {
        if(root == null)
            return false;
        if(root.left == null && root.right == null)
            return sum == root.val;
        return hasPathSum(root.left, sum -root.val) || hasPathSum(root.right, sum - root.val);
    }
}
```



### 题目来源
LeetCode-[112.路径总和](https://leetcode-cn.com/problems/path-sum/)
