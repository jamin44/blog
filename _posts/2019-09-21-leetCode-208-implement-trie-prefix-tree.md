---
layout: post
title: 208.实现 Trie (前缀树)
categories: [LeetCode]
tags: [leetCode]
summary: 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
---

### 题目要求
实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

### 题目示例
示例 1:
```
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");   
trie.search("app");     // 返回 true
```

> `说明：`   
> 1.你可以假设所有的输入都是由小写字母 a-z 构成的。  
> 2.保证所有输入均为非空字符串。  

### 解题思路
1. `内部类节点`，isWord来标识`是否`是单词的，用TreeMap`映射`的方式来表示节点的`多个`next。
1. Trie类：节点Node变量，并构造一个Trie函数。
1. 用`非递归`或者`递归`(二选一)的方式实现：向Trie中添加一个新的单词word、查询单词word是否在Trie中、查询单词word的前缀是否在Trie中
1. insert()：先把节点指向`根节点`，遍历传进来的单词`所有`的字母，如果该字母所在节点的下一个节点`为空`，则构造一个Node节点。不为空的话，只`移动`到下一节点即可。遍历完后，设置isWord`为true`。
1. search()、startsWith()与insert()`基本`是相同的逻辑，只是处理不同而已。startsWith只要`前缀`符合即可返回true；search需要`整个`单词符合才返回。



### 解题代码
```java
class Trie {

    private class Node{
        public boolean isWord;
        public TreeMap<Character, Node> next;
        public Node(boolean isWord){
            this.isWord = isWord;
            next = new TreeMap<>();
        }
        public Node(){
            this(false);
        }
    }

    private Node root;
    public Trie(){
        root = new Node();
    }

    // 向Trie中添加一个新的单词word(非递归)
    public void insert(String word){
        Node cur = root;
        for(int i = 0 ; i < word.length() ; i ++){
            char c = word.charAt(i);
            if(cur.next.get(c) == null)
                cur.next.put(c, new Node());
            cur = cur.next.get(c);
        }
        cur.isWord = true;
    }

    // 向Trie中添加一个新的单词word(递归)
    public void recursionInsert(String word) {
        Node cur = root;
        add(root, word, 0);
    }
    /**
     * 递归写法调用方法实现递归添加
     * @param node 传入要进行添加的节点
     * @param word 传入要进行添加的单词
     */
    public void add(Node node, String word, int index) {
        // 确定终止条件,这个终止条件在没加index这个参数时,很难确定
        // 此时一个单词已经遍历完成了,如果这个结束节点没有标记为单词,就标记为单词
        if (!node.isWord && index == word.length()) {
            node.isWord = true;
            size++;
        }
        if (word.length() > index) {
            char addLetter = word.charAt(index);
            // 判断trie的下个节点组中是否有查询的字符,如果没有,就添加
            if (node.next.get(addLetter) == null) {
                node.next.put(addLetter, new Node());
            }
            // 基于已经存在的字符进行下个字符的递归查询
            add(node.next.get(addLetter), word, index + 1);
        }
    }

    // 查询单词word是否在Trie中
    public boolean search(String word){
        Node cur = root;
        for(int i = 0 ; i < word.length() ; i ++){
            char c = word.charAt(i);
            if(cur.next.get(c) == null)
                return false;
            cur = cur.next.get(c);
        }
        return cur.isWord;
    }

        public boolean recursionContains(String word) {
        Node cur = root;
        return contains(root, word, 0);
    }


    private boolean contains(Node node, String word, int index) {
        if (index == word.length()) {
            return node.isWord;
        }
        char c = word.charAt(index);
        if (node.next.get(c) == null) {
            return false;
        } else {
            return contains(node.next.get(c), word, index + 1);
        }
    }

    // 查询是否在Trie中有单词以prefix为前缀(非递归)
    public boolean startsWith(String isPrefix){
        Node cur = root;
        for(int i = 0 ; i < isPrefix.length() ; i ++){
            char c = isPrefix.charAt(i);
            if(cur.next.get(c) == null)
                return false;
            cur = cur.next.get(c);
        }
        return true;
    }

    // 查询是否在Trie中有单词以prefix为前缀(递归)
    public boolean recursionStartsWith(String isPrefix){
        Node cur = root;
        return recursionStartsWithWord(cur, isPrefix, 0);
    }
    public boolean recursionStartsWithWord(Node root, String prefix, int index){
        if(prefix.length() == index)
            return true;
        char c = prefix.charAt(index);
        if(root.next.get(c) == null){
            return false;
        } else {
            return recursionStartsWithWord(root.next.get(c), prefix, ++index);
        }          
    }

}
```


### 题目来源
LeetCode-[208.实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)
