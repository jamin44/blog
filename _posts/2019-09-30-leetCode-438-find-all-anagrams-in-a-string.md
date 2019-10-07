---
layout: post
title: 438.找到字符串中所有字母异位词
categories: [LeetCode]
tags: [array]
summary: 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
---

### 题目要求
给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：
字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
### 题目示例
- **`示例1: `** 
```sh
输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
```

- **`示例2: `** 
```
输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
```
### 解题思路
- 滑动窗口  
1. 定义两个`int数组`来储存两个字符串s、p中所包含字母的频次，初始值为0
1. 先将`p字符串`中字母遍历出来，计算其字母的`频次`。
1. 随着`r窗边`进行，计算s字符串中字母的频次。再根据`窗口长度`与`p字符串长度`的关系进行滑行。

### 解题代码
```java
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        
        ArrayList<Integer> res = new ArrayList<>();   
        if(s.length() < p.length())
            return res;
        
        int[] freq_p = new int[26];
        Arrays.fill(freq_p, 0);

        for(char c : p.toCharArray()) {
            freq_p[c - 'a'] ++;
        }
        
        int[] freq_s = new int[26];
        Arrays.fill(freq_s, 0);
        
        int l = 0, r = - 1;

        while(r + 1 < s.length()) {
            r++;
            freq_s[s.charAt(r) - 'a'] ++;
            if(r - l + 1 > p.length()) {
                freq_s[s.charAt(l++) - 'a'] --;
            }
            if(r - l + 1 == p.length() && same(freq_s, freq_p)) {
                res.add(l);
            }
        }
        return res;
    }
    
    private boolean same(int[] freq_s, int[] freq_p) {
        for(int i = 0; i < 26; i++) {
            if(freq_s[i] != freq_p[i])
                return false;
        }
        return true;
    }
}
```

### 题目来源
LeetCode-[438.找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
