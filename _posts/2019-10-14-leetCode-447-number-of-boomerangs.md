---
layout: post
title: 447.回旋镖的数量
categories: [LeetCode]
tags: [lookup Table]
summary: 给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。
---

### 题目要求
给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。
### 题目示例
示例 1:
```
输入:
[[0,0],[1,0],[2,0]]

输出:
2

解释:
两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```


### 解题思路
1. 定义res = 0最后符合的结果有多少组
1. 遍历二维数组，定义HashMap（`两点距离`为Key， 它们的`频次`为Value）
1. `再次`遍历二维数组，求出`点i`到所有其他点的`距离`出现的`频次`，并`记录`于HashMap中
1. 遍历`HashMap`，计算符合的要求的组数。


### 解题代码
```java
// 时间复杂度: O(n^2)
// 空间复杂度: O(n)
class Solution {
    public int numberOfBoomerangs(int[][] points) {
        int res = 0; // 记录有多少组
        for(int i = 0; i < points.length; i++) {
            // 点i 到所有其他点的距离出现的频次 (两点距离为Key， 它们的频次为Value)
            HashMap<Integer, Integer> map = new HashMap<>();
            for(int j = 0; j < points.length; j++) {
                int dis = dis(points[i], points[j]);
                if(map.containsKey(dis))
                    map.put(dis, map.get(dis) + 1);
                else
                    map.put(dis, 1);
            }
            for(Integer dis : map.keySet()) {
                // 可以忽略if(map.get(dis) >= 2)判断
                // 原因是不满足时，也就是为1时，是不满足题目要求不需要在res上+1的，与record.get(dis) - 1 相乘等于0
                res += map.get(dis) * (map.get(dis) - 1);
            }
        }
        return res;
    }
    // 为了避免开根出现浮点型精确不准确的情况，利用两点间距离的平方来比较
    // (AB)^2 = (x1 - x2)^2 + (y1 - y2)^2
    private int dis(int[] pa, int[] pb) {
        return (pa[0] - pb[0])*(pa[0] - pb[0]) + 
                (pa[1] - pb[1])*(pa[1] - pb[1]);
    }

}
```

### 题目来源
LeetCode-[447.回旋镖的数量](https://leetcode-cn.com/problems/number-of-boomerangs/)
