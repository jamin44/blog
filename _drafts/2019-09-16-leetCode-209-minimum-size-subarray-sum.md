---
layout: post
title: 209.长度最小的子数组
categories: [LeetCode]
tags: [leetCode, array]
summary: 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。
---

### 题目要求
给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

### 题目示例
- **`示例: `** 
```sh
输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
```
- `进阶`:
如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。

### 解题思路
- 滑动窗口的思路 
- 时间复杂度: O(n)  空间复杂度: O(1)


### 解题代码
```java
class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        int l = 0, r = -1; // nums[l...r]为滑动窗口
        int sum = 0;
        int res = nums.length + 1;
        while(l < nums.length) { // 窗口的左边界在数组范围内,则循环继续
            if(r + 1 < nums.length && sum < s) {
                r++;
                sum += nums[r];
            } else {
                sum -= nums[l];
                l++;
            }   
            if(sum >= s)
                res = Math.min(res, r - l + 1);
        }
        if(res = nums.length + 1)
            return 0;
        return res;
    }
}
```

### 题目来源
LeetCode-[209.长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)
