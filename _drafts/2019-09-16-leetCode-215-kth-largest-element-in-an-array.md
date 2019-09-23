---
layout: post
title: 215.数组中的第K个最大元素
categories: [LeetCode]
tags: [leetCode, array]
summary: 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
---

### 题目要求
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

> **`注意:`**
> 1. 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

### 题目示例
示例1:
```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

示例2:
```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

### 解题思路
- 快速排序


### 解题代码
```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        if(nums == null || nums.length < 0 || nums.length < k){
            return -1;
        }
        int l = 0, r = nums.length - 1;
        int p = partition(nums, l, r);
        while(p != k - 1){
            if(p > k - 1){
                r = p - 1;
            }
            else{
                l = p + 1;
            }
            p = partition(nums, l, r);
        }
        return nums[p];
    }
    
    private int partition(int[] nums, int l, int r){
        int flag = nums[l];
        int i = l, j = r;
        while(i < j){
            while(nums[j] <= flag && i < j){
                j--;
            }
            while(nums[i] >= flag && i < j){
                i++;
            }
            if(i < j)
                swap(nums, i, j);
        }
        swap(nums, l, i);
        return i;
    }
    
    private void swap(int[] nums, int i, int j){
        int t = nums[i];
        nums[i] = nums[j];
        nums[j] = t;
    }
}
```


### 题目来源
LeetCode-[215.数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)