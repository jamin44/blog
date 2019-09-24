---
layout: post
title: 203.移除链表元素
categories: [LeetCode]
tags: [linked List]
summary: 删除链表中等于给定值 val 的所有结点。
---

### 题目要求
删除链表中等于给定值 val 的所有结点。

### 题目示例
示例 1:
```
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

### 解题思路
#### 第一种: 不用虚拟头结点解法
> **`注意`** 由于头结点存在为空,或者只有一个结点的情况，我们无法知道链表的结点的数量。所以要将头部与中间分开判断

- **先删除链表头的结点**
- while循环头结点,判断 头结点不为null `&&` 头结点的值等于所传的值。删除头结点，如果头结点接下去结点的值也是等于所传的值，同样也会被删除
- **删除中间上的结点**
- 先判断头部删除过后的头结点是否为null，如果是，直接放回`return null;`
- 将new一个`prev`也是指向`head`。遍历链表，如果中间prev下一结点的值等于所传的值，将那个结点进行删除。如果不是的话，将prev指向下一个结点
- 最后返回链表head

#### 用虚拟头结点解法
- 由于有虚拟头结点的存在不需要判断特殊判断头结点
- new一个为空的结点dummyHead，dummyHead下一个结点指向Head。这样就构建一个虚拟头结点。
- 将new一个`prev`也是指向`dummyHead`。遍历链表，如果中间prev下一结点的值等于所传的值，将那个结点进行删除。如果不是的话，将prev指向下一个结点
- 最后返回虚拟头结点往下的链表 `dummyHead.next`

#### 链表+递归解法
- 先判断是否为空链表
- 递归头结点的下一个结点，并把要删除的值val传过去。头结点的下一个结点head.next来接收递归的结果。
- 判断头结点的值head.val是否等于要删除的值val。如果是的话就删除，不是的话就保留。


### 解题代码
#### 不用虚拟头结点解法
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

        ListNode cur = head;
        while (cur.next != null){
            if (cur.next.val == val){
//                ListNode delNode = cur.next;
//                cur.next = delNode.next;
//                delNode.next = null;
                cur.next = cur.next.next;
            } else {
                cur = cur.next;
            }
        }
        return head;
    }
```

#### 用虚拟头结点解法
```java
    public ListNode removeElements(ListNode head, int val) {
        // 因为dummyHead实例的要是个null，所以传-1即可
        ListNode dummyHead = new ListNode(-1);
        dummyHead.next = head;
        
        ListNode cur = dummyHead;
        while (cur.next != null){
            if (cur.next.val == val){
                cur.next = cur.next.next;
            } else {
                cur = cur.next;
            }
        }
        return dummyHead.next;
    }
```

#### 链表+递归解法
```java
    public ListNode removeElements(ListNode head, int val) {
        if (head == null)
            return null;
        head.next = removeElements(head.next, val);
        return head.val == val ? head.next : head;
    }
```

### 题目来源
LeetCode-[203.移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)
