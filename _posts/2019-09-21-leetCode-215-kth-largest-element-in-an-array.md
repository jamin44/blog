---
layout: post
title: 215.数组中的第K个最大元素
categories: [LeetCode]
tags: [array]
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
- 单路快速排序  
1. 根据partition获得的数为判断，若k-1相等则刚好是想找到的数；若小于k，则在findKthLargest(nums, l, p-1, k)中继续查找；大于k，则在findKthLargest(nums, p+1 , r, k)中继续查找。

### 解题代码
```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        if(nums == null || nums.length < 0 || nums.length < k){
            return -1;
        }
        int  n = nums.length;
        return findKthLargest(nums, 0, n-1, k-1);
    }
    
    private int findKthLargest(int[] nums, int l, int r, int k) {
        if(l == r)
            return nums[l];
        int p = partition(nums, l, r);
        
        if(p == k)
            return nums[p];
        else if(k < p)
            return findKthLargest(nums, l, p-1, k);
        else 
            return findKthLargest(nums, p+1 , r, k);

    }
    
    private int partition(int[] nums, int l, int r){
        
        swap(nums , l, (int)(Math.random()*(r-l+1)) + l);
        
        int lt = l + 1; //[l+1...lt) > p ; [lt..i) < p
        for(int i = l + 1; i <= r; i++)
            if(nums[i] > nums[l])
                swap(nums, i, lt++);
        swap(nums, l, lt - 1);
        return lt - 1;
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