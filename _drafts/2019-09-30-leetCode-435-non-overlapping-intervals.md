---
layout: post
title: 435.无重叠区间
categories: [LeetCode]
tags: [greedy]
summary: 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
---

### 题目要求
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

- **`注意:`**  
1. 可以认为区间的终点总是大于它的起点。
1. 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

### 题目示例
- **`示例 1:`**  
```
输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

- **`示例 2:`**  
```
输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```

- **`示例 3:`**  
```
输入: [ [1,2], [2,3] ]

输出: 0

解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
```

### 解题思路
  

### 解题代码

```java
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) {
            return 0;
        }
        Arrays.sort(intervals,new Comparator<int[]>(){
            public int compare(int [] a1,int [] a2) {
                return a1[1] - a2[1];   //升序排列
            }
        });
        int res = 1;	//最多能组成的不重叠区间个数
        int pre = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= pre) {
                pre = intervals[i][1];
                res++;
            }
        }
        return intervals.length - res;
    }
}
```

#### 动态规划
```java
// 时间复杂度: O(n^2)
// 空间复杂度: O(n)
class Solution {
    // Definition for an interval.
    public static class Interval {
        int start;
        int end;
        Interval() { start = 0; end = 0; }
        Interval(int s, int e) { start = s; end = e; }
    }

    public int eraseOverlapIntervals(Interval[] intervals) {

        if(intervals.length == 0)
            return 0;

        Arrays.sort(intervals, new Comparator<Interval>() {
            @Override
            public int compare(Interval o1, Interval o2) {
                if(o1.start != o2.start)
                    return o1.start - o2.start;
                return o1.end - o2.end;
            }
        });

        // memo[i]表示以intervals[i]为结尾的区间能构成的最长不重叠区间序列
        int[] memo = new int[intervals.length];
        Arrays.fill(memo, 1);
        for(int i = 1 ; i < intervals.length ; i ++)
            // memo[i]
            for(int j = 0 ; j < i ; j ++)
                if(intervals[i].start >= intervals[j].end)
                    memo[i] = Math.max(memo[i], 1 + memo[j]);

        int res = 0;
        for(int i = 0; i < memo.length ; i ++)
            res = Math.max(res, memo[i]);

        return intervals.length - res;
    }
}
```

#### 贪心算法
```java
// 时间复杂度: O(n)
// 空间复杂度: O(n)
class Solution {
    // Definition for an interval.
    public static class Interval {
        int start;
        int end;
        Interval() { start = 0; end = 0; }
        Interval(int s, int e) { start = s; end = e; }
    }

    public int eraseOverlapIntervals(Interval[] intervals) {

        if(intervals.length == 0)
            return 0;

        Arrays.sort(intervals, new Comparator<Interval>() {
            @Override
            public int compare(Interval o1, Interval o2) {
                if(o1.end != o2.end)
                    return o1.end - o2.end;
                return o1.start - o2.start;
            }
        });

        int res = 1;
        int pre = 0;
        for(int i = 1 ; i < intervals.length ; i ++)
            if(intervals[i].start >= intervals[pre].end){
                res ++;
                pre = i; 
            }

        return intervals.length - res;
    }
}
```


### 题目来源
LeetCode-[435.无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)
