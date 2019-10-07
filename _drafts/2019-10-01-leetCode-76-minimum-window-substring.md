---
layout: post
title: 76.最小覆盖子串
categories: [LeetCode]
tags: [array]
summary: 给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字母的最小子串。
---

### 题目要求
给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字母的最小子串。

说明：

如果 S 中不存这样的子串，则返回空字符串 ""。
如果 S 中存在这样的子串，我们保证它是唯一的答案。

### 题目示例
- **`示例1: `** 
```sh
输入: S = "ADOBECODEBANC", T = "ABC"
输出: "BANC"
```


### 解题思路


### 解题代码
```java
class Solution {
    public String minWindow(String s, String t) {
        if(s.length() < t.length())
            return "";
        
        int[] freq_t = new int[256];
        for(char c : t.toCharArray()) {
            freq_t[c] ++;
        }
        
        int[] freq_s = new int[256];
        int sCnt = 0;
        
        int minLength = s.length() + 1;
        int startIndex = -1;
        
        int l = 0, r = - 1;
        while(l < s.length()) {
            if(r + 1 < s.length() && sCnt < t.length()) {
                freq_s[s.charAt(r + 1)] ++;
                if(freq_s[s.charAt(r + 1)] <= freq_t[s.charAt(r + 1)]) {
                    sCnt++;
                }
                r++;
            } else {
                assert(sCnt <= t.length());
                if(sCnt == t.length() && r - l + 1 < minLength) {
                    minLength = r -l + 1;
                    startIndex = l;
                }
                freq_s[s.charAt(l)]--;
                if(freq_s[s.charAt(l)] < freq_t[s.charAt(l)]) {
                    sCnt--;
                }
                l++;
            }
        }
        if(startIndex != -1){
            // return s.substring(startIndex, minLength); // error
        }
        return "";
    }
}
```

### 题目来源
LeetCode-[76.最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)
