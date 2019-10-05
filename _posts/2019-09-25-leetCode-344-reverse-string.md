---
layout: post
title: 344.反转字符串
categories: [LeetCode]
tags: [array]
summary: 编写一个函数，其作用是将输入的字符串反转过来。
---

### 题目要求
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

### 题目示例
- **`示例1: `** 
```sh
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

- **`示例2: `** 
```sh
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```


### 解题思路
- 采用`对撞指针`思路

### 解题代码
```java
class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while(l < r) {
            swap(s, l, r);
            l++;
            r--;
        }
    }
    
    private void swap(char[] ch,int i,int j){
        char t = ch[i];
        ch[i] = ch[j];
        ch[j] = t;
    }
}
```

### 题目来源
LeetCode-[344.反转字符串](https://leetcode-cn.com/problems/reverse-string/)
