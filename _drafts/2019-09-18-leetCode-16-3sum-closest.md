---
layout: post
title: 16.最接近的三数之和
categories: [LeetCode]
tags: [leetCode, lookup Table]
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
1. TreeMap和HashMap都可以。但是`HashMap`效率更优。
1. 借助map映射，以数组的`元素`作为key，元素的`索引`作为Value。
1. 定义map映射，遍历数组，将`target` - 当前`遍历的元素` == 需要查找的值complement
1. 借助于map是否`找到`complement，找到则返回当前`i的索引`以及`complement的索引`
1. 找不到则将当前的元素和它的索引放进`map`中。

### 解题代码
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}
```

### 题目来源
LeetCode-[16.最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)
