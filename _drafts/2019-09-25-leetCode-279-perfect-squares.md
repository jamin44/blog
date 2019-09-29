---
layout: post
title: 279.完全平方数
categories: [LeetCode]
tags: [graph, DP]
summary: 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。
---

### 题目要求
给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

### 题目示例
- **`示例 1:`** 
```
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
```

- **`示例 2:`** 
```
输入: n = 13
输出: 2
解释: 13 = 4 + 9.
```


### 解题思路
- 图论解法

### 解题代码
```java
import javafx.util.Pair;

class Solution {
    public int numSquares(int n) {
        if(n = 0)
            return 0;
        LinkedList<Pair<Integer, Integer>> queue = new LinkedList<Pair<Integer, Integer>>();
        queue.addLast(new Pair<Integer, Integer>(n, 0));
        boolean[] visited = new boolean[n + 1];
        visited[n] = true;

        while(!queue.isEmpty()) {
            Pair<Integer, Integer> front = queue.removeFirst();
            int num = front.getKey();
            int step = front.getValue();
            if(num == 0)
                return step;
            for(int i = 1; num - i*i >= 0; i++) {
                int a = num - i*i;
                if(!visited[a]) {
                    if(a == 0) return step + 1;
                    queue.addLast(new Pair(num - i*i, step + 1));
                    visited[num - i*i] = true;
                }
            }
        }
        throw new IllegalStateException("No Solution.");
    }
}
```

### 题目来源
LeetCode-[279.完全平方数](https://leetcode-cn.com/problems/perfect-squares/)