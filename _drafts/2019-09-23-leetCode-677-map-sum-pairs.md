---
layout: post
title: 677.键值映射
categories: [LeetCode]
tags: [linked List]
summary: 实现一个 MapSum 类里的两个方法，insert 和 sum。
---

### 题目要求
实现一个 MapSum 类里的两个方法，insert 和 sum。

对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。
对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。

### 题目示例
示例 1:
```
输入: insert("apple", 3), 输出: Null
输入: sum("ap"), 输出: 3
输入: insert("app", 2), 输出: Null
输入: sum("ap"), 输出: 5
```

### 解题思路
1. `内部类Node`有记录该节点的权重`value`，还有用TreeMap`映射`的方式来表示节点的`多个`next。
1. Trie类：节点Node变量，并构造一个Trie函数。
1. 用`非递归`或者`递归`(二选一)的方式实现：向Trie中添加一个新的val并记录其权重、查询val前缀总的前缀值。
1. insert()：先把节点指向`根节点`，遍历传进来的单词`所有`的字母，如果该字母所在节点的下一个节点`为空`，则构造一个Node节点。`不为空`的话，只`移动`到下一节点即可。遍历完后，设置最后节点的val权重值。
1. sum()统计val前缀的`总值`。从根节点开始遍历传进来的`prefix前缀`。如果该字母所在节点的下一个节点`为空`，则直接返回0。`不为空`的话，只`移动`到下一节点即可。循环结束后node节点`移动`到val`最后`的节点位置，这样也就得到该prefix前缀的`整一条链节点`。利用`递归`的方式统计prefix前缀`最后节点`的子节点是否`有单词`的val权重值，有的话进行累加。最后返回`累加结果`。



### 解题代码
```java
public class MapSum {

    private class Node{

        public int value;
        public TreeMap<Character, Node> next;

        public Node(int value){
            this.value = value;
            next = new TreeMap<>();
        }

        public Node(){
            this(0);
        }
    }
    private Node root;
    /** Initialize your data structure here. */
    public MapSum() {
        root = new Node();
    }

    public void insert(String key, int val) {
        Node cur = root;
        for(int i = 0 ; i < key.length() ; i ++){
            char c = key.charAt(i);
            if(cur.next.get(c) == null)
                cur.next.put(c, new Node());
            cur = cur.next.get(c);
        }
        cur.value = val;
    }

    public int sum(String prefix) {
        Node cur = root;
        for(int i = 0 ; i < prefix.length() ; i ++){
            char c = prefix.charAt(i);
            if(cur.next.get(c) == null)
                return 0;
            cur = cur.next.get(c);
        }
        return sum(cur);
    }

    private int sum(Node node){
        // 递归终止条件:没有下一个节点则返回该节点的值。可以不用写（因为for循环时也会作判断）
        if(node.next.size() == 0)
            return node.value;

        int res = node.value;
        for(char c: node.next.keySet())
            res += sum(node.next.get(c));
        return res;
    }
}
```


### 题目来源
LeetCode-[677.键值映射](https://leetcode-cn.com/problems/map-sum-pairs/)
