---
layout: post
title: 300.最长上升子序列
categories: [LeetCode]
tags: [DP]
summary: 给定一个无序的整数数组，找到其中最长上升子序列的长度。
---

### 题目要求
给定一个无序的整数数组，找到其中最长上升子序列的长度。

- **`说明:`**  
1. 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
1. 你算法的时间复杂度应该为 O(n2) 。

- **`进阶:`**  
你能将算法的时间复杂度降低到 O(n log n) 吗?


### 题目示例
- **`示例:`**  
```
输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
```


### 解题思路



### 解题代码
```java
// 时间复杂度: O(n^2)
// 空间复杂度: O(n)
class Solution {
    public int lengthOfLIS(int[] nums) {

        if(nums.length == 0)
            return 0;
        // memo[i] 表示以 nums[i] 为结尾的最长上升子序列的长度
        int memo[] = new int[nums.length];
        Arrays.fill(memo, 1);
        for(int i = 1 ; i < nums.length ; i ++)
            for(int j = 0 ; j < i ; j ++)
                if(nums[i] > nums[j])
                    memo[i] = Math.max(memo[i], 1 + memo[j]);

        int res = memo[0];
        for(int i = 1 ; i < nums.length ; i ++)
            res = Math.max(res, memo[i]);

        return res;
    }
}
```



### 题目来源
LeetCode-[300.最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
