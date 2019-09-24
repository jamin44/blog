---
layout: post
title: 230.二叉搜索树中第K小的元素
categories: [LeetCode]
tags: [binary Search Tree]
summary: 给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。
---

### 题目要求
给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

- **`说明:`**
你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。


- **`进阶：`**
如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？

### 题目示例
- **`示例 1:`**
```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
```

- **`示例 2:`**
```
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 3
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
LeetCode-[230.二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)
