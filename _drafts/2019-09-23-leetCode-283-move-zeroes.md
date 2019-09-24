---
layout: post
title: 283.移动零
categories: [LeetCode]
tags: [array]
summary: 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
---

### 题目要求
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

> **`说明:`**
> 1. 必须在原数组上操作，不能拷贝额外的数组。
> 1. 尽量减少操作次数。

### 题目示例
示例 1:
```
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```


### 解题思路
#### 解法一
把`非0`的元素放在一个新的动态数组nonZeroElements中，随后将nonZeroElements的元素取出来放在`nums数组`中，将nums`剩余`的位置放置`为0`即可

#### 解法二
不需要借助辅助数组，避免空间消耗，借助于`变量k`来标识[0...k)的元素均为`非0元素`

### 解题代码
#### 解法一
```java
// 时间复杂度: O(n) 空间复杂度: O(n)
class Solution {
    public void moveZeroes(int[] nums) {
        ArrayList<Integer> nonZeroElements = new ArrayList<>();
        // 将nums中所有非0元素放入nonZeroElements中
        for(int i = 0; i < nums.length; i++)
            if(nums[i] != 0)
                nonZeroElements.add(nums[i]); 
        // 将nonZeroElements中的所有元素依次放入到nums开始的位置
        for(int i = 0; i < nonZeroElements.size(); i++)
            nums[i] = nonZeroElements.get(i);
        // 将nums剩余的位置放置为0
        for(int i = nonZeroElements.size(); i < nums.length; i++) 
            nums[i] = 0;
    }
}
```

#### 解法二
```java
// 时间复杂度: O(n) 空间复杂度: O(1)
class Solution {
    public void moveZeroes(int[] nums) {
        int k = 0; // nums中, [0...k)的元素均为非0元素
        for(int i = 0; i < nums.length; i++)
            if(nums[i] != 0)
                nums[k++] = nums[i];
        // 将nums剩余的位置放置为0
        for(int i = k; i < nums.length; i++)
            nums[i] = 0;
    }
}
```
**`优化`**
```java
// 时间复杂度: O(n) 空间复杂度: O(1)
class Solution {
    public void moveZeroes(int[] nums) {
        int k = 0; // nums中, [0...k)的元素均为非0元素
        for(int i = 0; i < nums.length; i++)
            if(nums[i] != 0)
                if(k != i)
                    swap(nums, k++, i);
                else
                    k ++;
    }
    private void swap(int[] nums, int i, int j){
        int t = nums[i];
        nums[i] = nums[j];
        nums[j] = t;
    }
}
```

### 题目来源
LeetCode-[283.移动零](https://leetcode-cn.com/problems/move-zeroes/)