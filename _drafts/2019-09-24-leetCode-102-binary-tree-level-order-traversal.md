---
layout: post
title: 102.二叉树的层次遍历
categories: [LeetCode]
tags: [queue]
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
- 采用`先进先出`的队列和二叉树
1. 由于题目返回的是`List<List<Integer>>`，定义`ArrayList<List<Integer>>`的返回结果res。并且判断root为null，直接返回。
1. 定义先入先出的队列queue,存储的是`数据对`将`节点`与`层数`绑成一对 -- `LinkedList<Pair<TreeNode, Integer>>`。
1. 将二叉树根节点root和层数0放进`队列`中，遍历队列。获取到队尾的Pair的Key节点的值和Value层数`level`，如果`level == res.size()`,则需要再开`新的`一层。否则的话，将节点的层数和节点值添加到`res`。再将该节点的`左右节点`分别入队。

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
import javafx.util.Pair;

class Solution {

    public List<List<Integer>> levelOrder(TreeNode root) {

        ArrayList<List<Integer>> res = new ArrayList<List<Integer>>();
        if(root == null)
            return res;

        // 我们使用LinkedList来做为我们的先入先出的队列
        LinkedList<Pair<TreeNode, Integer>> queue = new LinkedList<Pair<TreeNode, Integer>>();
        queue.addLast(new Pair<TreeNode, Integer>(root, 0));

        while(!queue.isEmpty()){
            Pair<TreeNode, Integer> front = queue.removeFirst();
            TreeNode node = front.getKey();
            int level = front.getValue();

            if(level == res.size())
                res.add(new ArrayList<Integer>());
            assert level < res.size();

            res.get(level).add(node.val);
            if(node.left != null)
                queue.addLast(new Pair<TreeNode, Integer>(node.left, level + 1));
            if(node.right != null)
                queue.addLast(new Pair<TreeNode, Integer>(node.right, level + 1);
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[102.二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)