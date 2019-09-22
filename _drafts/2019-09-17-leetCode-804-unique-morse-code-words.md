---
layout: post
title: 804.唯一摩尔斯密码词
categories: [LeetCode]
tags: [leetCode]
summary: 国际摩尔斯密码定义一种标准编码方式，将每个字母对应于一个由一系列点和短线组成的字符串。
---

### 题目要求
- 国际摩尔斯密码定义一种标准编码方式，将每个字母对应于一个由一系列点和短线组成的字符串， 比如: "a" 对应 ".-", "b" 对应 "-...", "c" 对应 "-.-.", 等等。
为了方便，所有26个英文字母对应摩尔斯密码表如下：
```sh
[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.",
"---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
```
- 给定一个单词列表，每个单词可以写成每个字母对应摩尔斯密码的组合。例如，"cab" 可以写成 "-.-..--..."，(即 "-.-." + "-..." + ".-"字符串的结合)。我们将这样一个连接过程称作单词翻译。

### 题目示例
```sh
输入: words = ["gin", "zen", "gig", "msg"]
输出: 2
解释: 
各单词翻译如下:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."
共有 2 种不同翻译, "--...-." 和 "--...--.".
```
- `注意`:
1. 单词列表words 的长度不会超过 100。
1. 每个单词 words[i]的长度范围为 [1, 12]。
1. 每个单词 words[i]只包含小写字母。

### 解题思路
1. 本题要求的是返回所有词不同单词翻译的数量。而有些不同单词却有相同的摩尔斯密码。
1. 首先我们先将`words数组`中单词的摩尔斯密码转化出来。
1. 获得到`words数组`中单词的所有摩尔斯密码后，将他们`扔进`一个`集合`中。在这过程中，如果两个单词的摩尔斯密码相同的话，也不会重复计算
1. 最后集合中有多少个元素，则有个摩尔斯密码。
1. `codes[word.charAt(i) - 'a']` char字母对应ASCII码。例如 : 'a'-'a'=0,'b'-'a'= 1

### 解题代码
```java
class Solution {
    public int uniqueMorseRepresentations(String[] words) {
        String[] codes = {".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", 
                         "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-",
                         "...-", ".--", "-..-", "-.--", "--.."};
        TreeSet<String> set = new TreeSet<>();
        for (String word : words) {
            StringBuilder res = new StringBuilder();
            for (int i = 0; i<word.length(); i++)
                res.append(codes[word.charAt(i) - 'a']);
            set.add(res.toString());
        }
        return set.size();
    }
}
```

### 题目来源
LeetCode-[804.唯一摩尔斯密码词](https://leetcode-cn.com/problems/unique-morse-code-words/)