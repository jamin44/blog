---
layout: post
title: 125.验证回文串
categories: [LeetCode]
tags: [array]
summary: 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
---

### 题目要求
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
说明：本题中，我们将空字符串定义为有效的回文串。

### 题目示例
- **`示例1: `** 
```sh
输入: "A man, a plan, a canal: Panama"
输出: true
```

- **`示例2: `** 
```sh
输入: "race a car"
输出: false
```

### 解题思路
- 采用`对撞指针`思路

### 解题代码
```java
class Solution {
    public boolean isPalindrome(String s) {
        if (s.length() <= 1)
            return true;
        char[] chars = s.toLowerCase().toCharArray();
        int l = 0, r = chars.length - 1;

        while(l < r) {
            while(l < r && !isletter(chars[l])) {
                l++;
            }
            while(l < r && !isletter(chars[r])) {
                r--;
            }
            if(chars[l] != chars[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
	private boolean isletter(char c) {
		 if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z')) {
             return true;
         }else {
        	return false; 
         }
	}
}
```

### 题目来源
LeetCode-[125.验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)
