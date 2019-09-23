---
layout: post
title: 217.存在重复元素
categories: [LeetCode]
tags: [leetCode, lookup Table]
summary: 给定一个整数数组，判断是否存在重复元素。
---

### 题目要求
给定一个整数数组，判断是否存在重复元素。
如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。

### 题目示例
**`示例 1:`**
```
输入: [1,2,3,1]
输出: true
```

**`示例 2:`**
```
输入: [1,2,3,4]
输出: false
```

**`示例 3:`**
```
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```

### 解题思路
- 查找表 + 滑动窗口
1. 定义HashSet`查找表`map，以`k + 1长度`为`滑动窗口` 
1. 循环遍历nums数组，如果当前元素在map中`存在`，表示在`窗口范围内`是有效的， 返回`true`。如果不存在，则把元素添加进map中。
1. `遍历完成`，没有满足的话，返回`false`

- 时间复杂度: O(n)  空间复杂度: O(k)

### 解题代码
```java
// 时间复杂度: O(n)
// 空间复杂度: O(k)
class Solution {
    public boolean containsDuplicate(int[] nums) {
        if(nums == null || nums.length <= 1)
            return false;
        HashSet<Integer> map = new HashSet<>();
        for(int i = 0; i < nums.length; i++) {
            if(map.contains(nums[i]))
                return true;
            map.add(nums[i]);
        }
        return false;
    }
}
```

### 题目来源
LeetCode-[217.存在重复元素](https://leetcode-cn.com/problems/contains-duplicate/)
