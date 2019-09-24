---
layout: post
title: 88.合并两个有序数组
categories: [LeetCode]
tags: [array]
summary: 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
---

### 题目要求
给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。

> **`说明:`**
> 1. 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
> 1. 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

### 题目示例
示例:
```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```


### 解题思路
- `从后向前`数组遍历
1. 设置指针i 和 j 分别指向 nums1 和 nums2 的有`数字尾部`，从`尾部值`开始比较遍历，同时设置指针 k 指向 nums1 的`最末尾`，每次遍历比较值大小之后，则进行`填充`。
1. 当 `i<0` 时遍历结束，此时 nums2 中海油数据`未拷贝`完全，将其直接拷贝到 `nums1` 的前面，最后得到结果数组  
1. 时间复杂度：O(m+n)O(m+n)


### 解题代码
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m-1, j = n-1, k = m+n-1;
        while(i >= 0 && j >= 0){
            if(nums1[i] > nums2[j]){
                nums1[k] = nums2[i--];
            }else{
        	    nums1[k] = nums1[j--];
            }
            k--;
        }
        while(j >= 0){
            nums1[k--] = nums2[j--];
        }
    }
}
```


### 题目来源
LeetCode-[88.合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)