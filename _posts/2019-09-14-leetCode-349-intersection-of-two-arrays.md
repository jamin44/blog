---
layout: post
title: 349.两个数组的交集
categories: [LeetCode]
tags: [leetCode]
summary: 给定两个数组，编写一个函数来计算它们的交集。
---

### 题目要求
给定两个数组，编写一个函数来计算它们的交集。

### 题目示例
- 示例 1:
```sh
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2]
```

- 示例 2:
```sh
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [9,4]
```
> `说明:`  
> 输出结果中的每个元素一定是唯一的。  
> 我们可以不考虑输出结果的顺序。

### 解题思路
1. 题目要求输出结果中的每个元素一定是唯一的。所以采用`Set集合`来解决。
1. 首先遍历`数组1`中的所有元素，把他们添加进`set集合`中(根据集合的特性:不会保存重复的元素，所以这时候数组1保存在集合中的元素都是唯一的)
1. new一个`ArrayList动态数组`来记录数组1和数组2`共同`的元素
1. 遍历数组2的元素，判断该元素是否已经在`集合`中。如果是，则把该元素`加入动态数组`中，并且将`集合`中的该元素`删除`。这样的话，就算`数组2`中还有该元素，也不会进入`if语句`被添加到动态数组中。
1. 因为最后是要返回的是`int[]`,所以以`list.size()`为长度new一个`int[]`,将`动态数组list`中的元素遍历赋值给int[]即可，最后返回回去。

### 解题代码
```java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        TreeSet<Integer> set = new TreeSet<>();
        for (int num:nums1){
            set.add(num);
        }
        ArrayList<Integer> list = new ArrayList<>();
        for (int num: nums2){
            if (set.contains(num)){
                list.add(num); // 记录数组1，2都已存在的元素保存在数组list中
                set.remove(num); // 去掉集合1set的已存在元素，以后遍历nums2时该元素就找不到了，也就不用进入if语句
            }
        }
        int[] res = new int[list.size()];
        for (int i =0; i<list.size(); i++){
            res[i] = list.get(i);
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[349.两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)
