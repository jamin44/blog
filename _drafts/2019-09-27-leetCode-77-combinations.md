---
layout: post
title: 77.组合
categories: [LeetCode]
tags: [recursion]
summary: 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
---

### 题目要求
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

### 题目示例
- **`示例:`**
```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```


### 解题思路



### 解题代码
```java
class Solution {
    private ArrayList<List<Integer>> res;

    // 求解C(n,k), 当前已经找到的组合存储在c中, 需要从start开始搜索新的元素
    private void generateCombinations(int n, int k, int start, LinkedList<Integer> c) {
        if(c.size() == k) {
          res.add((List<Integer>)c.clone());
          return;
        }

        // 还有k - c.size()个空位, 所以, [i...n] 中至少要有 k - c.size() 个元素
        // i最多为 n - (k - c.size()) + 1
        for(int i = start ; i <= n - (k - c.size()) + 1; i ++){
            c.addLast(i);
            generateCombinations(n, k, i + 1, c);
            c.removeLast();
        }
        return;
    }

    public List<List<Integer>> combine(int n, int k) {
        res = new ArrayList<List<Integer>>();
        if(n <= 0 || k <= 0 || k > n)
            return res;
        LinkedList<Integer> c = new LinkedList<Integer>();
        generateCombinations(n, k, 1, c);
        return res;
    }
}
```


### 题目来源
LeetCode-[77.组合](https://leetcode-cn.com/problems/combinations/)
