---
layout: post
title: 1.两数之和
categories: [LeetCode]
tags: [leetCode, lookup Table]
summary: 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
---

### 题目要求
给定一个`整数`数组nums和一个目标值`target`，请你在该数组中找出和为目标值的那`两个`整数，并返回他们的数组下标。 
你可以假设每种输入只会对应`一个答案`。但是，你不能重复利用这个数组中同样的元素。


### 题目示例
**`示例:`** 
```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
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
    public int[] twoSum(int[] nums, int target) {
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for(int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if(map.containsKey(complement))
                int[] res = {i, map.get(complement)}
                return res;
            map.put(nums[i], i);
        }
        throw new IllegalStateException("the input has no solution");
    }
}
```

### 题目来源
LeetCode-[1.两数之和](https://leetcode-cn.com/problems/two-sum/)
