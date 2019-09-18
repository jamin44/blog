---
layout: post
title: 3.无重复字符的最长子串
categories: [LeetCode]
tags: [leetCode]
summary: 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
---

### 题目要求
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

### 题目示例
- **`示例1: `** 
```sh
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

- **`示例2: `** 
```sh
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

- **`示例3: `** 
```sh
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

### 解题思路
- 滑动窗口的思路 
- 时间复杂度: O(n)  空间复杂度: O(1)

1. 定义freq数组来标识ASCII码对应的`存在次数`（初始值为0）
1. 定义`l和r`指针来表示滑动窗口为s[l...r],整个循环从 l == 0; r == -1 这个`空窗口`开始,到l == `s.size()`; r == `s.size()-1` 这个空窗口截止
1. 循环遍历s字符串, 在每次循环里逐渐改变窗口, `维护freq`, 并记录`当前窗口`中是否找到了一个新的最优值

### 解题代码
```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] freq = new int[256];
        int l = 0, r = -1;
        int res = 0;
        while(l < s.length()) {
            if(r + 1 < s.length() && freq[s.charAt(r+1)] == 0) {
                r++;
                freq[s.charAt(r)]++;
            }
            else {
                freq[s.charAt(l)]--;
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[3.无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
