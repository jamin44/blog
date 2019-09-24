---
layout: post
title: 220.存在重复元素 III
categories: [LeetCode]
tags: [lookup Table]
summary: 给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值不超过 t，并且 i 和 j 之间的差的绝对值不超过 k。
---

### 题目要求
给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值不超过 t，并且 i 和 j 之间的差的绝对值不超过 k。

### 题目示例
**`示例 1:`**
```
输入: nums = [1,2,3,1], k = 3, t = 0
输出: true
```

**`示例 2:`**
```
输入: nums = [1,0,1,1], k = 1, t = 2
输出: true
```

**`示例 3:`**
```
输入: nums = [1,5,9,1,5,9], k = 2, t = 3
输出: false
```

### 解题思路
- 查找表 + 滑动窗口
1. 定义HashSet`查找表`map，以`k + 1长度`为`滑动窗口` 
1. 循环遍历nums数组，如果当前元素在map中`存在`，表示在`窗口范围内`是有效的， 返回`true`。如果不存在，则把元素添加进map中。再判断map的`大小`是否等于`k+1`(形成一个`滑动窗口`，保持map中最多有k个元素),如果满足，将窗口（`从左到右`）的第一个元素`去除`。
1. `遍历完成`，没有满足的话，返回`false`

- 时间复杂度: O(nlogk)  空间复杂度: O(k)

### 解题代码
```java
// 时间复杂度: O(nlogk)
// 空间复杂度: O(k)
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        // 这个问题的测试数据在使用int进行加减运算时会溢出
        // 所以使用long
        TreeSet<Long> map = new TreeSet<>();
        for(int i = 0; i < nums.length; i++) {
        if(map.ceiling((long)nums[i] - (long)t) != null && 
            map.ceiling((long)nums[i] - (long)t) <= (long)nums[i] + (long)t) {
                return true;
            }
        map.add((long)nums[i]);
        if(map.size() == k + 1)
            map.remove((long)nums[i-k]);
        }
        return false;
    }
}
```

### 题目来源
LeetCode-[220.存在重复元素 III](https://leetcode-cn.com/problems/contains-duplicate-iii/)
