---
layout: post
title: 205.同构字符串
categories: [LeetCode]
tags: [lookup Table]
summary: 给定两个字符串 s 和 t，判断它们是否是同构的。
---

### 题目要求
给定两个字符串 s 和 t，判断它们是否是同构的。

如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。

所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。


- **`说明:`**
你可以假设 s 和 t 具有相同的长度。

### 题目示例
- **`示例 1:`**
```
输入: s = "egg", t = "add"
输出: true
```

- **`示例 2:`**
```
输入: s = "foo", t = "bar"
输出: false
```

- **`示例 3:`**
```
输入: s = "paper", t = "title"
输出: true
```


### 解题思路
#### 解法一
- HashMap  
将 `key`（s字符串字母）- `value`（t字符串字母）存在一起，每当遇到一个`字母`就去查看对应的字母。   
`失败`有两种情况：  
1. key`存在`，经过查找字母对应的字母和这个字母不匹配； 
1. key`不存在`，但是这个字母已经被存了；

#### 解法二
定义一个int[256]数组，默认值为-1和一个boolean[256]数组  
以ASCII表对应的为字母的索引

### 解题代码
#### 解法一
```java
class Solution {
    public boolean isIsomorphic(String s, String t) {
        if(s.length() != t.length())
            return false;
        
        HashMap<Character, Character> map = new HashMap<>();
        
        for(int i = 0; i < s.length(); i++) {
            char l = s.charAt(i);
            char r = t.charAt(i);
            if(map.containsKey(l)) {
                if(!map.get(l).equals(r)) {
                    return false;
                }
            } else {
                if(map.containsValue(r)) {
                    return false;
                } else {
                    map.put(l, r);
                }
            }
        }
        return true;
    }
}
```

#### 解法二
```java
class Solution {
    public boolean isIsomorphic(String s, String t) {
        if(s.length() != t.length())
            return false;
        int[] map = new int[256];
        Arrays.fill(map, -1);
        boolean[] mapped = new boolean[256];
        
        for(int i = 0; i < s.length(); i++) {
            char l = s.charAt(i);
            char r = t.charAt(i);
            if(map[l] == -1) {
                if(mapped[r]) {
                    return false;
                }
                map[l] = r;
                mapped[r] = true;
            } else if(map[l] != r) {
                return false; 
            }
        }
        return true;
    }
}
```


### 题目来源
LeetCode-[205.同构字符串](https://leetcode-cn.com/problems/isomorphic-strings/)
