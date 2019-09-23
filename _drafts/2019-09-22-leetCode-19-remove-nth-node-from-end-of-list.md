---
layout: post
title: 19.删除链表的倒数第N个节点
categories: [LeetCode]
tags: [leetCode, linkedList]
summary: 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
---

### 题目要求
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

### 题目示例
**`示例:`**
```
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```


### 解题思路
#### 需要对链表进行两次遍历

- 时间复杂度: O(n)  空间复杂度: O(1)

#### 使用双指针, 对链表只遍历了一遍
- 时间复杂度: O(n)  空间复杂度: O(1)

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummyHead = new ListNode(0);
        dummyHead.next = head;

        ListNode p = dummyHead;
        ListNode q = dummyHead;
        for(int i = 0 ; i < n + 1 ; i ++) {
            assert q != null;
            q = q.next;
        }
        while(q != null){
            p = p.next;
            q = q.next;
        }
        p.next = p.next.next;
        return dummyHead.next;
    }
}
```

### 题目来源
LeetCode-[19.删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)
