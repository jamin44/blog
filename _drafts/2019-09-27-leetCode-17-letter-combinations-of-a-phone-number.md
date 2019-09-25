---
layout: post
title: 17.电话号码的字母组合
categories: [LeetCode]
tags: [recursion]
summary: 给定一个包含2到9（含2-9）数字的字符串，请返回该数字可以表示的所有可能的字母组合。
---

### 题目要求
给定一个包含2到9（含2-9）数字的字符串，请返回该数字可以表示的所有可能的字母组合。

下面给出了数字到字母的映射（就像在电话按钮上一样）。请注意，1不会映射到任何字母。


- **`注意：`**
尽管以上答案按字典顺序排列，但您的答案可以按您想要的任何顺序排列。

### 题目示例
- **`示例:`**
```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```


### 解题思路



### 解题代码
```java
class Solution {

    private String letterMap[] = {
                " ",    //0
                "",     //1
                "abc",  //2
                "def",  //3
                "ghi",  //4
                "jkl",  //5
                "mno",  //6
                "pqrs", //7
                "tuv",  //8
                "wxyz"  //9
    };

    private ArrayList<String> res;

    public List<String> letterCombinations(String digits) {
        res = new ArrayList<String>();
        if(digits.equals(""))
            return res;

        findCombination(digits, 0, "");
        return res;
    }

    // s中保存了此时从digits[0...index-1]翻译得到的一个字母字符串
    // 寻找和digits[index]匹配的字母, 获得digits[0...index]翻译得到的解
    private void findCombination(String digits, int index, String s){

        System.out.println(index + " : " + s);
        if(index == digits.length()) {
            res.add(s);
            System.out.println("get " + s + " , return");
            return;
        }

        Character c = digits.charAt(index);
        assert  c.compareTo('0') >= 0 &&
                c.compareTo('9') <= 0 &&
                c.compareTo('1') != 0;
        String letters = letterMap[c - '0'];
        for(int i = 0; i < letters.length(); i++) {
            System.out.println("digits[" + index + "] = " + c + " , use " + letters.charAt(i));
            findCombination(digits, index+1, s + letters.charAt(i));
        }
        return;
    }

}
```



### 题目来源
LeetCode-[17.电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)
