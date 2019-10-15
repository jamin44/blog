---
layout: post
title: 219.存在重复元素 II
categories: [LeetCode]
tags: [lookup Table]
summary: 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值不超过 k。
---

### 题目要求
给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值不超过 k。

### 题目示例
**`示例 1:`**
```
输入: nums = [1,2,3,1], k = 3
输出: true
```

**`示例 2:`**
```
输入: nums = [1,0,1,1], k = 1
输出: true
```

**`示例 3:`**
```
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
```

### 解题思路
- 查找表 + 滑动窗口
1. 定义HashSet`查找表`map，以`k + 1长度`为`滑动窗口` 
1. 循环遍历nums数组，如果当前元素在map中`存在`，表示在`窗口范围内`是有效的， 返回`true`。如果不存在，则把元素添加进map中。再判断map的`大小`是否等于`k+1`(形成一个`滑动窗口`，保持map中最多有k个元素),如果满足，将窗口（`从左到右`）的第一个元素`去除`。
1. `遍历完成`，没有满足的话，返回`false`

- 时间复杂度: O(n)  空间复杂度: O(k)

### 解题代码
```java
// 时间复杂度: O(n)
// 空间复杂度: O(k)
class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        if(nums == null || nums.length <= 1)
            return false;
        if(k <= 0)
            return false;
        HashSet<Integer> set = new HashSet<>();
        for(int i = 0; i < nums.length; i++) {
            if(set.contains(nums[i]))
                return true;
            set.add(nums[i]);
            // 保持set中最多有k个元素
            if(set.size() == k + 1)
                set.remove(nums[i - k]);
        }
        return false;
    }
}
```

### 题目来源
LeetCode-[219.存在重复元素 II](https://leetcode-cn.com/problems/contains-duplicate-ii/)
