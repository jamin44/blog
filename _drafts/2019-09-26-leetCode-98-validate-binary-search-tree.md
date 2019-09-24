---
layout: post
title: 98.验证二叉搜索树
categories: [LeetCode]
tags: [binary Search Tree]
summary: 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
---

### 题目要求
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：
- 节点的左子树只包含小于当前节点的数。
- 节点的右子树只包含大于当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。


### 题目示例
- **`示例 1:`**
```
输入:
    2
   / \
  1   3
输出: true
```

- **`示例 2:`**
```
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
```


### 解题思路
- 利用二叉树的性质：左节点小于父节点、右节点大于父节点
- 递归往某一节点的左右节点进行遍历

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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(p == null || q == null)
            throw new IllegalArgumentException("p or q can not be null.");

        if(root == null)
            return null;

        if(p.val < root.val && q.val < root.val)
            return lowestCommonAncestor(root.left, p, q);
        if(p.val > root.val && q.val > root.val)
            return lowestCommonAncestor(root.right, p, q);
        return root;
    }
}
```

### 题目来源
LeetCode-[98.验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
