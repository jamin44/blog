---
layout: post
title: 11.盛最多水的容器
categories: [LeetCode]
tags: [array]
summary: 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
---

### 题目要求
给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

### 题目示例
- **`示例1: `** 
```sh
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```


### 解题思路
- 采用`双指针`思路  
1. 先取最小的两边指针为高，两者间的间距为宽
1. 取每次面积最大的保存起来，最后返回。


### 解题代码
```java
class Solution {
    public int maxArea(int[] height) {
        if(height.length <= 1) {
            return -1;
        }
        int l = 0, r = height.length - 1;
        int res = 0;
        while(l < r) {
            int h = Math.min(height[l], height[r]);
            res = Math.max(res, h * (r - l));
            if(height[l] < height[r])
                l++;
            else
                r--;
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[11.盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
