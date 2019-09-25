---
layout: post
title: 51.N皇后
categories: [LeetCode]
tags: [recursion]
summary: 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
---

### 题目要求
n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

### 题目示例
- **`示例:`**
```
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

### 解题思路



### 解题代码
```java
class Solution {

    private boolean[] col;
    private boolean[] dia1; //  \对角线
    private boolean[] dia2; //  /对角线
    private ArrayList<List<String>> res;

    public List<List<String>> solveNQueens(int n) {

        res = new ArrayList<List<String>>();
        col = new boolean[n];
        dia1 = new boolean[2 * n - 1];
        dia2 = new boolean[2 * n - 1];

        LinkedList<Integer> row = new LinkedList<Integer>();
        putQueen(n, 0, row);

        return res;
    }

    // 尝试在一个n皇后问题中, 摆放第index行的皇后位置
    private void putQueen(int n, int index, LinkedList<Integer> row){
        if(index == n){
            res.add(generateBoard(n, row));
            return;
        }
        for(int i = 0 ; i < n ; i ++)
            // 尝试将第index行的皇后摆放在第i列
            if(!col[i] && !dia1[index + i] && !dia2[index - i + n - 1]){
                row.addLast(i);
                col[i] = true;
                dia1[index + i] = true;
                dia2[index - i + n - 1] = true;
                putQueen(n, index + 1, row);
                col[i] = false;
                dia1[index + i] = false;
                dia2[index - i + n - 1] = false;
                row.removeLast();
            }

        return;
    }

    private List<String> generateBoard(int n, LinkedList<Integer> row){

        assert row.size() == n;

        ArrayList<String> board = new ArrayList<String>();
        for(int i = 0 ; i < n ; i ++){
            char[] charArray = new char[n];
            Arrays.fill(charArray, '.');
            charArray[row.get(i)] = 'Q';
            board.add(new String(charArray));
        }
        return board;
    }

}
```



### 题目来源
LeetCode-[51.N皇后](https://leetcode-cn.com/problems/n-queens/)
