---
layout: post
title: 290.单词规律
categories: [LeetCode]
tags: [lookup Table]
summary: 给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。
---

### 题目要求
给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。

这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。


- **`说明:`**
你可以假设 pattern 只包含小写字母， str 包含了由单个空格分隔的小写字母。 

### 题目示例
- **`示例 1:`**
```
输入: pattern = "abba", str = "dog cat cat dog"
输出: true
```

- **`示例 2:`**
```
输入:pattern = "abba", str = "dog cat cat fish"
输出: false
```

- **`示例 3:`**
```
输入: pattern = "aaaa", str = "dog cat cat dog"
输出: false
```

- **`示例 4:`**
```
输入: pattern = "abba", str = "dog dog dog dog"
输出: false
```

### 解题思路
- HashMap  
将 `key`（a）- `value`（dog）存在一起，每当遇到一个`字母`就去查看对应的单词。   
`失败`有两种情况：  
1. key`存在`，经过查找字母对应的单词和这个单词不匹配； 
1. key`不存在`，但是这个单词已经被存了；

### 解题代码

```java
class Solution {
    public boolean wordPattern(String pattern, String str) {
        
        if(pattern == null || str==null) return false;
        String[] words = str.split(" ");
        if(pattern.length() != words.length)
            return false;
        
        HashMap<Character, String> map = new HashMap<>();
        
        for(int i = 0; i < pattern.length(); i++) {
            char p = pattern.charAt(i);
            
            if(map.containsKey(p)) {
                if(!map.get(p).equals(words[i])) {
                    return false;
                } 
            } else {
                if(map.containsValue(words[i])) {
                    return false;
                } else {
                    map.put(p, words[i]);
                }                
            }
        }
        return true;
    }
}
```

### 题目来源
LeetCode-[290.单词规律](https://leetcode-cn.com/problems/word-pattern/)
