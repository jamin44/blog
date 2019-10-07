---
layout: post
title: 350.两个数组的交集 II
categories: [LeetCode]
tags: [array, map]
summary: 给定两个数组，编写一个函数来计算它们的交集。
---

### 题目要求
给定两个数组，编写一个函数来计算它们的交集。

### 题目示例
- 示例 1:
```sh
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
```

- 示例 2:
```sh
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]
```
> `说明`:  
> 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
> 我们可以不考虑输出结果的顺序。

> **`进阶`**:  
> 如果给定的数组已经排好序呢？你将如何优化你的算法？  
> 如果 nums1 的大小比 nums2 小很多，哪种方法更优？  
> 如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？  

### 解题思路
1. 题目要求输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。所以采用`Map映射`来解决。
1. 首先遍历`数组1`中的所有元素，把他们添加进`map映射`中。如果map中没有该元素，则把该元素放进map，并且标记次数1。如果map有该元素，则在该元素在map中的次数加上1。
1. new一个`ArrayList动态数组`来记录数组1和数组2`共同`的元素
1. 遍历数组2的元素，判断该元素是否已经在`map映射`中。如果是，则把该元素`加入动态数组`中，并且将`映射`中的该元素次数减去1。再判断map中该元素的次数是否为0，是的话在map中剔除该元素
1. 因为最后是要返回的是`int[]`,所以以`list.size()`为长度new一个`int[]`,将`动态数组list`中的元素遍历赋值给int[]即可，最后返回回去。

### 解题代码
```java
// 时间复杂度: O(nlogn)
// 空间复杂度: O(n)
public class Solution {
    
    public int[] intersect(int[] nums1, int[] nums2) {
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for(int num: nums1)
            if(!map.containsKey(num))
                map.put(num, 1);
            else
                map.put(num, map.get(num) + 1);

        ArrayList<Integer> list = new ArrayList<>();
        for(int num : nums2)
            if (map.containsKey(num) && map.get(num) > 0){
                list.add(num);
                map.put(num, map.get(num) - 1);
                if (map.get(num) == 0)
                    map.remove(num);
            }

        int[] res = new int[list.size()];
        int index = 0;
        for(Integer num : list)
            res[index++] = num;

        return res;
    }
}
```

### 题目来源
LeetCode-[350.两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)
