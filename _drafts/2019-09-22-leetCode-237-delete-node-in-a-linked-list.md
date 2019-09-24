---
layout: post
title: 237.删除链表中的节点
categories: [LeetCode]
tags: [linked List]
summary: 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。
---

### 题目要求
请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。
现有一个链表 -- head = [4,5,1,9]，它可以表示为:
```
    4 -> 5 -> 1 -> 9
```

### 题目示例
**`示例 1:`**
```
输入: head = [4,5,1,9], node = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
```

**`示例 2:`**
```
输入: head = [4,5,1,9], node = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
```

### 解题思路
```md
             node
              |    
    4 -> 5 -> 1 -> 9    
因为无法知道 1 前面的节点，也就无法知道1和9的节点，所以利用9`赋值`给1,
             node delNode
              |    |
    4 -> 5 -> 9 -> 9  
最后删除 delNode    
```

-  时间复杂度: O(1) 空间复杂度: O(1)
### 解题代码
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public void deleteNode(ListNode node) {
        // 注意: 这个方法对尾节点不适用。题目中要求了给定的node不是尾节点
        // 我们检查node.next, 如果为null则抛出异常, 确保了node不是尾节点
        if(node == null || node.next == null)
            throw new IllegalArgumentException("node should be valid and can not be the tail node.");
        node.val = node.next.val;
        node.next = node.next.next;
    }
}
```

### 题目来源
LeetCode-[237.删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)
