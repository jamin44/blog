---
layout: post
title: 343.整数拆分
categories: [LeetCode]
tags: [DP]
summary: 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
---

### 题目要求
给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

- **`说明:`**  
你可以假设 n 不小于 2 且不大于 58。

### 题目示例
- **`示例 1:`**  
```
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
```

- **`示例 2:`**  
```
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```

### 解题思路



### 解题代码
#### 递归
```java
// 时间复杂度: O(n^2)
// 空间复杂度: O(n)
class Solution {

    private int[] memo;
    public int integerBreak(int n) {
        if(n < 1)
            throw new IllegalArgumentException("n should be greater than zero");

        memo = new int[n + 1];
        Arrays.fill(memo, -1);
        return breakInteger(n);
    }

    public int breakInteger(int n) {
        if(n == 1)
            return 1;
        if(memo[n] != -1)
            return memo[n];

        int res = -1;
        for(int i = 1; i <= n - 1; i++) {
            res = max3(res, i * (n - i), i * breakInteger(n-i));
        }
        memo[n] = res;
        return res; 
    }

    public int max3(int a, int b, int c) {
        return Math.max(a, Math.max(b, c));
    }
}
```

#### 动态规划
```java
// 时间复杂度: O(n^2)
// 空间复杂度: O(n)
class Solution {

    public int integerBreak(int n) {

        if(n < 1)
            throw new IllegalArgumentException("n should be greater than zero");

        int[] memo = new int[n + 1];
        memo[1] = 1;
        for(int i = 2; i <= n; i++)
            // 求解memo[i]
            for (int j = 1; j <= i - 1; j++)
                memo[i] = max3(memo[i], j * (i - i), j * memo(i - j));

        return memo[n];
    }

    public int max3(int a, int b, int c) {
        return Math.max(a, Math.max(b, c));
    }  

}
```


### 题目来源
LeetCode-[343.整数拆分](https://leetcode-cn.com/problems/integer-break/)
