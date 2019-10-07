---
layout: post
title: 202.快乐数
categories: [LeetCode]
tags: [lookup Table]
summary: 编写一个算法来判断一个数是不是“快乐数”。
---

### 题目要求
编写一个算法来判断一个数是不是“快乐数”。

一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数。


### 题目示例
- **`示例:`**
```
输入: 19
输出: true
解释: 
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```


### 解题思路
1. 定义`集合Set`来记录每次的n值(set中n值只能是唯一一个)



### 解题代码
```java
class Solution {
    public boolean isHappy(int n) {
        HashSet<Integer> set = new HashSet<>();
        set.add(n);
        while(n != 1) {
            n = op(n);
            if(set.contains(n)) {
                return false;
            } else {
                set.add(n);
            }
        }
        return true;
    }
    
    private int op(int x) {
        int res = 0;
        while(x > 0) {
            int t = x % 10;
            res += t * t;
            x /= 10;
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[202.快乐数](https://leetcode-cn.com/problems/happy-number/)
