---
layout: post
title: 70.爬楼梯
categories: [LeetCode]
tags: [DP]
summary: 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
---

### 题目要求
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

- **`注意:`**  
给定 n 是一个正整数。

### 题目示例
- **`示例 1:`**  
```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

- **`示例 2:`**  
```
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

### 解题思路

#### 递归
1. `n=1` 走一个台阶是一种方法，`n=0` 不走台阶也是一种方法，`n=2` 走两个台阶是两种方法

#### 动态规划  
1. 定义n+1容量的数组memo
1. 分情况计算台阶 



### 解题代码

#### 递归
```java
class Solution {
    private int[] memo;

    public int climbStairs(int n) {
        memo = new int[n+1];
        Arrays.fill(memo, -1);
        return calcWays(n);
    }

    private int calcWays(int n){

        if(n == 0 || n == 1)
            return 1;

        if(memo[n] == -1)
            memo[n] = calcWays(n - 1) + calcWays(n - 2);

        return memo[n];
    }
}
```

#### 动态规划  
```java
class Solution {
    public int climbStairs(int n) {
        int[] memo = new int[n + 1];
        memo[0] = 1;
        memo[1] = 1;
        for(int i = 2; i <= n; i++)
            memo[i] =  memo[i - 1] + memo[i - 2];
        return memo[n];
    }
}
```

### 题目来源
LeetCode-[70.爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
