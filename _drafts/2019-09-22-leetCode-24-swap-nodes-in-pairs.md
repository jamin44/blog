---
layout: post
title: 24.两两交换链表中的节点
categories: [LeetCode]
tags: [leetCode, linked List]
summary: 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
---

### 题目要求
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

### 题目示例
**`示例:`**
```
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

### 解题思路

1. 定义`虚拟`头节点p，p.next节点为node1，p.next.next(node1.next)节点为node2，node2.next节点为next。

```md
 dummyHead -> 1 -> 2 -> 3 -> 4 -> NULL
     |        |    |    |
     p      node1 node2 next

**一轮之后**

 dummyHead -> 2 -> 1 -> 3 -> 4 -> NULL
                   |    |    |     |
                   p  node1 node2 next
```

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
    public ListNode swapPairs(ListNode head) {
        ListNode dummyHead = new ListNode(0);
        dummyHead -> next = head;
        
        ListNode p = dummyHead;
        while(p.next != null && p.next.next != null) {
            ListNode node1 = p.next;
            ListNode node2 = node1.next;
            ListNode next = node2.next;
            node2.next = node1;
            node1.next = next;
            p.next = node2;
            p = node1;
        }
        return dummyHead.next;
    }
}
```

### 题目来源
LeetCode-[24.两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
