---
layout: post
title: 242.有效的字母异位词
categories: [LeetCode]
tags: [lookup Table]
summary: 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
---

### 题目要求
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。


- **`说明:`**
你可以假设字符串只包含小写字母。


- **`进阶:`**
如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

### 题目示例
- **`示例 1:`**
```
输入: s = "anagram", t = "nagaram"
输出: true
```

- **`示例 2:`**
```
输入: s = "rat", t = "car"
输出: false
```


### 解题思路
- 滑动窗口(借鉴于438的解法)

- 借助于'哈希表'
1. 定于int[26]数组为哈希表，0-26分别表示a-z。
1. 先将s字符串中的字母遍历进`哈希表`中，相对应的索引进行`频次++`
1. 在遍历t字符串中的字母，若字母`已在`哈希表中，则相对应的索引进行`频次--`，后判断哈希表存在`负数`，则说明s与t中字母`无正确`异位，返回`false`
1. 前面两次遍历完成，则说明s与t字母异位，返回`true`

### 解题代码
#### 解法一
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length())
            return false;
        
        if(s.length() == 0 && t.length() == 0)
            return true;
        
        int[] freq_t = new int[26];
        for(char c : t.toCharArray()) {
            freq_t[c - 'a']++;
        }
        
        int[] freq_s = new int[26];
        int l = 0, r = -1;
        while(r + 1 < s.length()) {
            r++;
            freq_s[s.charAt(r) - 'a']++;
            if(r - l + 1 > t.length()) {
                freq_s[s.charAt(l++) - 'a']--;
            }
            if(r - l + 1 == t.length() && same(freq_s, freq_t)) {
                return true;
            }
        }
        return false;
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

#### 解法二
```java
// 时间复杂度 O(n)
// 空间复杂度 O(26)
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length())
            return false;
        
        int[] freq = new int[26];
        for(int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }
        for(char c : t.toCharArray()) {
            freq[c - 'a']--;
            if(freq[c - 'a'] < 0)
                return false;
        }
        return true;
    }
}
```

### 题目来源
LeetCode-[242.有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)
