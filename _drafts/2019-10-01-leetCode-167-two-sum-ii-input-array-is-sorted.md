---
layout: post
title: 167.两数之和 II - 输入有序数组
categories: [LeetCode]
tags: [leetCode]
summary: 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
---

### 题目要求
给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。  
函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。  

**`说明:`**
返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

### 题目示例
**`示例:`** 
```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```


### 解题思路
#### 解法一
- 采用`对撞指针`思路
l指针为`0`从左边开始，r指针为`numbers.length-1`从右边开始。
```
numbers[l] + numbers[r] < target  ->  l++
numbers[l] + numbers[r] > target  ->  r--
```
- 时间复杂度: O(n)   空间复杂度: O(1)

#### 解法二
- 采用`二分搜索树` 
1. 遍历数组，
1. 用目标值`target` - 遍历的`索引值`获取到需要`二分搜索`的目标值  
1. 二分搜索控制左右边来查找的`target - numbers[i]`，找到返回mid索引


- 时间复杂度: O(nlogn)   空间复杂度: O(1)

### 解题代码
#### 解法一
```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        if(numbers.length < 2)
            throw new IllegalArgumentException("Illegal argument numbers");
        int l = 0, r = numbers.length - 1;
        while(l < r) {
            if(numbers[l] + numbers[r] == target) {
                int[] res = {l + 1, r + 1};
                return res;
            } else if (numbers[l] + numbers[r] < target) {
                l++;
            } else {
                r--;
            }
        }
        throw new IllegalStateException("The input has no solution");
    }
}
```

#### 解法二
```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        if(numbers.length < 2)
            throw new IllegalArgumentException("Illegal argument numbers");
        for(int i = 0 ; i < numbers.length - 1 ; i ++){
            int j = binarySearch(numbers, i+1, numbers.length-1, target - numbers[i]);
            if(j != -1){
                int[] res = {i+1, j+1};
                return res;
            }
        }
        throw new IllegalStateException("The input has no solution");
    }

    private int binarySearch(int[] nums, int l, int r, int target){
        if(l < 0 || l > nums.length)
            throw new IllegalArgumentException("l is out of bound");
        if(r < 0 || r > nums.length)
            throw new IllegalArgumentException("r is out of bound");
        while(l <= r){
            int mid = l + (r - l)/2;
            if(nums[mid] == target)
                return mid;
            if(target > nums[mid])
                l = mid + 1;
            else
                r = mid - 1;
        }
        return -1;
    }
}
```


### 题目来源
LeetCode-[167.两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)
