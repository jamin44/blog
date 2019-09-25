---
layout: post
title: 46.全排列
categories: [LeetCode]
tags: [recursion]
summary: 给定一个没有重复数字的序列，返回其所有可能的全排列。
---

### 题目要求
给定一个`没有重复`数字的序列，返回其所有可能的全排列。

### 题目示例
- **`示例:`**
```
Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```


### 解题思路



### 解题代码
```java
class Solution {

    private ArrayList<List<Integer>> res;
    private boolean[] used;

    // p中保存了一个有index-1个元素的排列。
    // 向这个排列的末尾添加第index个元素, 获得一个有index个元素的排列
    private void generatePermutation(int[] nums, int index, LinkedList<Integer> p) {

        if(index == nums.length) {
            res.add((LinkedList<Integer>)p.clone());
            return;
        }

        for(int i = 0 ; i < nums.length ; i ++) {
            if(!used[i]){
                used[i] = true;
                p.addLast(nums[i]);
                generatePermutation(nums, index + 1, p );
                p.removeLast();
                used[i] = false;
            }
        }
        return;

    }

    public List<List<Integer>> permute(int[] nums) {

        res = new ArrayList<List<Integer>>();
        if(nums == null || nums.length == 0)
            return res;

        used = new boolean[nums.length];
        LinkedList<Integer> p = new LinkedList<Integer>();
        generatePermutation(nums, 0, p);
        return res;
    }
}
```



### 题目来源
LeetCode-[46.全排列](https://leetcode-cn.com/problems/permutations/)
