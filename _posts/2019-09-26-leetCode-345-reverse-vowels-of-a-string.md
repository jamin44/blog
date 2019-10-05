---
layout: post
title: 345.反转字符串中的元音字母
categories: [LeetCode]
tags: [array]
summary: 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
---

### 题目要求
编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

- **`说明: `** 
元音字母不包含字母"y"。

### 题目示例
- **`示例 1: `** 
```sh
输入: "hello"
输出: "holle"
```

- **`示例 2: `** 
```sh
输入: "leetcode"
输出: "leotcede"
```


### 解题思路


### 解题代码
```java
class Solution {
    public String reverseVowels(String s) {
        if(s == null || s.length() <= 1)
            return s;
        List<Character> vowel = Arrays.asList('a','e','i','o','u','A','E','I','O','U');
        char[] arr=s.toCharArray();
        int l = 0, r = s.length() - 1;
        while(l < r) {
            if(!vowel.contains(arr[l])) // 如果是元音，暂停移动
                l++;
            if(!vowel.contains(arr[r])) // 如果是元音，暂停移动
                r--;
            if(vowel.contains(arr[l]) && vowel.contains(arr[r])){// 首尾都找到元音
                // 交换元音的位置
                swap(arr, l, r);
                // 重新开始移动
                l++;
                r--;
            }
        }
        return new String(arr);
    }
    
    private void swap(char[] ch, int i, int j) {
        char t = ch[i];
        ch[i] = ch[j];
        ch[j] = t;
    }
}
```

### 题目来源
LeetCode-[345.反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)
