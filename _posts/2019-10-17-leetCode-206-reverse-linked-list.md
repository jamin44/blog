---
layout: post
title: 206.反转链表
categories: [LeetCode]
tags: []
summary: 反转一个单链表。
---

### 题目要求
反转一个单链表。

### 题目示例
示例 1:
```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

> `进阶：`   
> 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？  

### 解题思路
#### 迭代
1. 利用三个指针，pre指向`null`，cur指向`当前`，next指向`下一个` 
1. 遍历链表，先将下一个指针`next`定义出来，进行cur的`next`指向pre（进行`反转`）。然后pre指向cur，cur指向next。
1. 遍历完成后，返回`pre链表`。 

- 时间复杂度: O(n) 空间复杂度: O(1)
#### 递归



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
    /*
    public class ListNode {
        int val;
        ListNode next;
        ListNode(int x) {
            val = x;
        }
    }
    */

    public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode cur = head;
        while( cur != null) {
            ListNode next = cur.next;
            cur.next = pre; // 进行反转
            pre = cur;
            cur = next;
        }
        return pre;
    }
}
```


### 题目来源
LeetCode-[206.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
