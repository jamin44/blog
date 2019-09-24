---
layout: post
title: 454.四数相加 II
categories: [LeetCode]
tags: [lookup Table]
summary: 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0
---

### 题目要求
给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。



### 题目示例
**`示例:`** 
```
输入:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

输出:
2

解释:
两个元组如下:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

### 解题思路
1. 借助`HashMap`映射，以`C、D数组`的`元素之和`作为key，元素的`频率`作为Value。
1. 定义map映射，遍历C数组在嵌套遍历D数组，将遍历的C、D数组的`元素之和`sum作为key保存在map中。如果map中`已经`有sum了，则在`原来基础`+1;
1. 定义res为0，遍历A数组在嵌套遍历B数组, 在`map中`存在数组A、B的元素之和的`相反值`，则存在一组四数相加`等于0`，将res加上1。
1. 最后返回res的结果值。

### 解题代码
```java
// 时间复杂度: O(n^2)
// 空间复杂度: O(n^2)
class Solution {
    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {
        if(A == null || B == null || C == null || D == null)
            throw new IllegalArgumentException("Illegal argument");
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < C.length; i++)
            for(int j = 0; j < D.length; j++) {
                int sum = C[i] + D[j];
                if(map.containsKey(sum))
                    map.put(sum, map.get(sum) + 1);
                else
                    map.put(sum, 1);
            }
        int res = 0;
        for(int i = 0; i < A.length; i++)
            for(int j = 0; j < B.length; j++)
                if(map.containsKey(0-A[i]-B[j]))
                    res += map.get(0-A[i]-B[j]);
        return res;
    }
}
```

### 题目来源
LeetCode-[454.四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)
