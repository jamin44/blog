---
layout: post
title: 203.移除链表元素
categories: [LeetCode]
tags: [LeetCode]
summary: 删除链表中等于给定值 val 的所有节点。
---

### 题目要求
删除链表中等于给定值 val 的所有节点。

### 题目示例
示例 1:
```
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

### 解题思路
第一种: **`不用虚拟头节点解法`**
> **`注意`** 由于头节点存在为空,或者只有一个节点的情况，我们无法知道链表的节点的数量。所以要将头部与中间分开判断

- **先删除链表头的节点**
- while循环头节点,判断 头节点不为null `&&` 头节点的值等于所传的值。删除头节点，如果头节点接下去节点的值也是等于所传的值，同样也会被删除
- **删除中间上的节点**
- 先判断头部删除过后的头节点是否为null，如果是，直接放回`return null;`
- 将new一个`prev`也是指向`head`。遍历链表，如果中间prev下一节点的值等于所传的值，将那个节点进行删除。如果不是的话，将prev指向下一个节点
- 最后返回链表head

第二种: **`用虚拟头节点解法`**
- 由于有虚拟头节点的存在不需要判断特殊判断头节点
- new一个为空的节点dummyHead，dummyHead下一个节点指向Head。这样就构建一个虚拟头节点。
- 将new一个`prev`也是指向`dummyHead`。遍历链表，如果中间prev下一节点的值等于所传的值，将那个节点进行删除。如果不是的话，将prev指向下一个节点
- 最后返回虚拟头节点往下的链表 `dummyHead.next`

### 解题代码
1. 不用虚拟头节点解法
```java
    public ListNode removeElements(ListNode head, int val) {

        while (head != null && head.val == val) {
//            ListNode delNode = head;
//            head = head.next;
//            delNode.next = null;
            head = head.next;
        }
        if (head == null)
            return null;

        ListNode prev = head;
        while (prev.next != null){
            if (prev.next.val == val){
//                ListNode delNode = prev.next;
//                prev.next = delNode.next;
//                delNode.next = null;
                prev.next = prev.next.next;
            } else {
                prev = prev.next;
            }
        }
        return head;
    }
```

1. 用虚拟头节点解法
```java
    public ListNode removeElements(ListNode head, int val) {
        // 因为dummyHead实例的要是个null，所以传-1即可
        ListNode dummyHead = new ListNode(-1);
        dummyHead.next = head;
        
        ListNode prev = dummyHead;
        while (prev.next != null){
            if (prev.next.val == val){
                prev.next = prev.next.next;
            } else {
                prev = prev.next;
            }
        }
        return dummyHead.next;
    }
```
