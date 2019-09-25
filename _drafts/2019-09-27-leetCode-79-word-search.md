---
layout: post
title: 77.组合
categories: [LeetCode]
tags: [recursion]
summary: 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
---

### 题目要求
给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
### 题目示例
- **`示例:`**
```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true.
给定 word = "SEE", 返回 true.
给定 word = "ABCB", 返回 false.
```


### 解题思路
- 递归 + 回溯
- 平面中位移量数组`d[][]`


### 解题代码
```java
class Solution {
    // 表示向四个方向移动的位移（上下左右）
    int d[][] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}}
    // 整个平面有多少行、多少列
    private int m, n;
    // 表示某方格是否被访问过
    private boolean[][] visited;

    public boolean exist(char[][] board, String word) {
        if(board == null || word == null)
            throw new IllegalArgumentException("board or word can not be null!");

        m = board.length; // 初始化board有多少行
        if(m == 0)
            throw new IllegalArgumentException("board can not be empty.");
        n = board[0].length; // 初始化board有多少列
        if(n == 0)
            throw new IllegalArgumentException("board can not be empty.");
        // 初始化每一个方格为false
        visited = new boolean[m][n];
        // 遍历所有方格
        for(int i = 0 ; i < m ; i ++)
            for(int j = 0 ; j < n ; j ++)
                if(searchWord(board, word, 0, i, j))
                    return true;

        return false;
    }
    // 在二维平面中是否越界。
    private boolean inArea( int x , int y ){
        return x >= 0 && x < m && y >= 0 && y < n;
    }

    // 从board[startx][starty]开始, 寻找word[index...word.size())
    private boolean searchWord(char[][] board, String word, int index, int startx, int starty){

        // 终止条件 assert(inArea(startx,starty));
        if(index == word.length() - 1)
            return board[startx][starty] == word.charAt(index);
        // 进行搜索
        if(board[startx][starty] == word.charAt(index)) {
            visited[startx][starty] = true;
            // 从startx, starty出发,向四个方向寻
            for(int i = 0 ; i < 4 ; i ++) {
                int newx = startx + d[i][0];
                int newy = starty + d[i][1];
                if(inArea(newx, newy) && !visited[newx][newy] &&
                        searchWord(board, word, index + 1, newx, newy))
                    return true;
            }
            visited[startx][starty] = false;
        }
        return false;
    }
}
```


### 题目来源
LeetCode-[77.组合](https://leetcode-cn.com/problems/combinations/)
