---
layout: post
title: 416.分割等和子集
categories: [LeetCode]
tags: [DP]
summary: 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
---

### 题目要求
给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

- **`注意:`**  
1. 每个数组中的元素不会超过 100
1. 数组的大小不会超过 200

### 题目示例
- **`示例 1:`**  
```
输入: [1, 5, 11, 5]

输出: true

解释: 数组可以分割成 [1, 5, 5] 和 [11].
```

- **`示例 2:`**  
```
输入: [1, 2, 3, 5]

输出: false

解释: 数组不能分割成两个元素和相等的子集.
```


### 解题思路
转化成背包问题，在n个物品中选出一定物品，填满sum/2的背包
F(n, C)考虑将n个物品填满容量为C的背包
F(i, c) = F(i -1, c) || F(i - 1, c - w(i))


### 解题代码
#### 记忆化搜索
```java
class Solution {

    private int[][] memo;

    public boolean canPartition(int[] nums) {
        // 统计该数组总和
        int sum = 0;
        for(int i = 0; i < nums.length; i++)
            if(nums[i] <= 0)
                throw new IllegalArgumentException("numbers in nums must be greater than zero.");
            sum += nums[i];
        if(sum % 2 == 1)
            return false;
        
        memo = new int[nums.length][sum / 2 + 1];
        for(int i = 0; i < nums.length; i++)
            Arrays.fill(memo[i], -1);
        return tryPartition(nums, nums.length - 1, sum / 2);
    }

    // 使用nums[0...index], 是否可以完全填充一个容量为sum的背包
    private boolean tryPartition(int[] nums, int index, int sum){

        if(sum == 0)
            return true;
        if(sum < 0 || index < 0)
            return false;

        if(memo[index][sum] != -1)
            return memo[index][sum] == 1;

        memo[index][sum] = (tryPartition(nums, index - 1, sum) ||
                tryPartition(nums, index - 1, sum - nums[index])) ? 1 : 0;

        return memo[index][sum] == 1;
    }
}
```

#### 动态规划
```java
class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for(int i = 0; i < nums.length; i++) {
            if(nums[i] <=  0) {
                throw new IllegalArgumentException("numbers in nums must be greater than zero.");
            }
            sum += nums[i];
        }

        if(sum % 2 == 1)
            return false;
        int n = nums.length;
        int C = sum / 2;

        boolean[] memo = new boolean[C + 1];
        for(int i = 0; i <= C; i++)
            memo[i] = (nums[0] == i);
        for(int i = 1; i < n; i++)
            for(int j = C; j >= nums[i]; j--)
                memo[j] = memo[j] || memo[j - nums[i]];
        return memo[C];
    }
}
```


### 题目来源
LeetCode-[416.分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)
