---
layout: post
title: 387.字符串中的第一个唯一字符
categories: [LeetCode]
tags: [leetCode]
summary: 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
---

### 题目要求
给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

### 题目示例
示例 1:
```
s = "leetcode"
返回 0.

s = "loveleetcode",
返回 2.
```
> **`注意事项:`**您可以假定该字符串只包含小写字母。

### 解题思路
1. 将26个小写字母作为`键`，根据字母`ASCII码`，将它们转化为0-25相对应的`索引`。
1. new一个int[]数组`frep`来记录字母出现的频率次数。循环遍历`字符串`，并记录它其中字母出现的`频率次数`。
1. 再次遍历字符串，如果字母的出现频率次数`最先为1`，返回该字母的`索引`。如果不存在，则返回 `-1`。


### 解题代码
```java
class Solution {
    public int firstUniqChar(String s) {

        int[] freq = new int[26];
        for(int i = 0 ; i < s.length() ; i ++)
            freq[s.charAt(i) - 'a'] ++;

        for(int i = 0 ; i < s.length() ; i ++)
            if(freq[s.charAt(i) - 'a'] == 1)
                return i;

        return -1;
    }
}
```


### 题目来源
LeetCode-[387.字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)
