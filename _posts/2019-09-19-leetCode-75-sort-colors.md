---
layout: post
title: 75.颜色分类
categories: [LeetCode]
tags: [array]
summary: 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
---

### 题目要求
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得`相同颜色`的元素相邻，并按照红色、白色、蓝色顺序排列。  
此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

> **`注意:`**
> 1. 不能使用代码库中的`排序`函数来解决这道题。

### 题目示例
示例:
```
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

**`进阶：`**
- 一个直观的解决方案是使用计数排序的两趟扫描算法。
- 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
- 你能想出一个仅使用常数空间的一趟扫描算法吗？


### 解题思路
#### 解法一
利用`计数排序`，分别统计0、1、2的元素`个数`
定义数组count分别记录数字0、1、2出现的`次数`
定义变量index，表示数组nums`重新排序`后的`索引`

#### 解法二
利用`三路快排`的思维解决
初始化`zero`为-1、`two`为nums.length，已构成两个`无效`的数组（0数组的`终点`和2数组的`起点`）。
```
                -1  0    中间为nums    nums.length
--------------  zero  --------------- two ---------------
```
最后遍历完成后的数组：
[0...zero] == 0 [zero+1...two-1] == 1 [two...n-1] == 2




### 解题代码
#### 解法一
```java
class Solution {
    public void sortColors(int[] nums) {
        int[] count = {0, 0, 0};    // 存放0, 1, 2三个元素的频率
        for(int i = 0 ; i < nums.length ; i ++){
            assert nums[i] >= 0 && nums[i] <= 2;
            count[nums[i]] ++;
        }
        int index = 0;
        for(int i = 0 ; i < count[0] ; i ++)
            nums[index++] = 0;
        for(int i = 0 ; i < count[1] ; i ++)
            nums[index++] = 1;
        for(int i = 0 ; i < count[2] ; i ++)
            nums[index++] = 2;
    }
}
```

#### 解法二
```java
class Solution {
    public void sortColors(int[] nums) {
        int zero = -1; // [0...zero] == 0
        int two = nums.length; // [two...n-1] == 2
        for(int i = 0; i < two; ) {
            if(nums[i] == 1) {
                i++;
            } else if(nums[i] == 2) {
                two--;
                swap(nums, i, two);
            } else {
                assert nums[i] == 0;
                zero++;
                swap(nums, zero, i);
                i++;
            }
        }
    }
    private static void swap(int[] arr, int i, int j) {
        int t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
}
```


### 题目来源
LeetCode-[75.颜色分类](https://leetcode-cn.com/problems/sort-colors/)