---
layout: post
title: 257.二叉树的所有路径
categories: [LeetCode]
tags: [binary Search Tree]
summary: 给定一个二叉树，返回所有从根节点到叶子节点的路径。
---

### 题目要求
给定一个二叉树，返回所有从根节点到叶子节点的路径。

- **`说明:`**
叶子节点是指没有子节点的节点。


### 题目示例
- **`示例:`**
```
输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]

解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3、
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
    public List<String> binaryTreePaths(TreeNode root) {
        ArrayList<String> res = new ArrayList<>();
        if(root == null)
            return res;

        if(root.left == null && root.right == null) {
            res.add(Integer.toString(root.val))
            return res;
        }

        List<String> leftPaths = binaryTreePaths(root.left);
        for(String s: leftPaths){
            StringBuilder sb = new StringBuilder(Integer.toString(root.val));
            sb.append("->");
            sb.append(s);
            res.add(sb.toString());
        }

        List<String> rightPaths = binaryTreePaths(root.right);
        for(String s: rightPaths) {
            StringBuilder sb = new StringBuilder(Integer.toString(root.val));
            sb.append("->");
            sb.append(s);
            res.add(sb.toString());
        }

        return res;

    }
}
```



### 题目来源
LeetCode-[257.二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)
