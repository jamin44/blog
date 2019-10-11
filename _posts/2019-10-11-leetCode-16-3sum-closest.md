---
layout: post
title: 16.最接近的三数之和
categories: [LeetCode]
tags: [lookup Table]
summary: 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。
---

### 题目要求
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。


### 题目示例
**`示例:`** 
```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

### 解题思路
1. 先对数组nums`排序`(从小到大)，定义三个`最小值`之和作为判断标准。
1. 遍历数组，中注意这里需要`当前i指针`、`l指针`(i + 1)、`r指针`(nums.length - 1)共三个指针。
1. 随着`i指针`的遍历，对l、r指针控制，求出三指针`之和`sum。如果`sum-target`的绝对值比`closestNum-target`的绝对值还小。说明sum比closestNum`更接近`target，将sum赋值closestNum(刷新新的判断标准)。再判断sum==target，直接返回sum；sum < target， `l指针++`；sum > target ，`r指针--`。
1. 若for循环后没有找到`等于target`的值，返回最接近target的`closestNum`。


### 解题代码
```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        
        Arrays.sort(nums);
        int closestNum = nums[0] + nums[1] + nums[2];

        for(int i = 0; i < nums.length - 2; i++) {
            int l = i + 1;
            int r = nums.length - 1;
            
            while(l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if(Math.abs(sum - target) < Math.abs(closestNum - target)) {
                    closestNum = sum;
                }
                if(sum == target) {
                    return sum;
                } else if(sum < target) {
                    l++;                    
                } else {
                    r--;
                }
            }
        }
        return closestNum;
    }
}
```

### 题目来源
LeetCode-[16.最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)
