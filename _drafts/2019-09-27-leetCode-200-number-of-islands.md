---
layout: post
title: 200.岛屿数量
categories: [LeetCode]
tags: [recursion]
summary: 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。
---

### 题目要求
给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。


### 题目示例
- **`示例 1:`**
```
输入:
11110
11010
11000
00000

输出: 1
```

- **`示例 2:`**
```
输入:
11000
11000
00100
00011

输出: 3
```

### 解题思路



### 解题代码
```java
class Solution {
    // 表示向四个方向移动的位移（上下左右）
    int d[][] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}}
    // 整个平面有多少行、多少列
    private int m, n;
    // 表示某方格是否被访问过
    private boolean[][] visited;

    public int numIslands(char[][] grid) {
        if(grid == null || grid.length == 0 || grid[0].length == 0)
            return 0;

        m = grid.length;
        n = grid[0].length;
        visited = new boolean[m][n];
        int res = 0;
        for(int i = 0 ; i < m ; i ++) {
            for(int j = 0 ; j < n ; j ++) {
                // 如果是陆地并且没有访问过
                if(grid[i][j] == '1' && !visited[i][j]) {
                    dfs(grid, i, j);
                    res ++;
                }
            }
        }
        return res;
    }

    // 从grid[x][y]的位置开始,进行floodfill
    // 保证(x,y)合法,且grid[x][y]是没有被访问过的陆地
    private void dfs(char[][] grid, int x, int y){

        //assert(inArea(x,y));
        visited[x][y] = true;
        for(int i = 0; i < 4; i ++){
            int newx = x + d[i][0];
            int newy = y + d[i][1];
            if(inArea(newx, newy) && !visited[newx][newy] && grid[newx][newy] == '1')
                dfs(grid, newx, newy);
        }
        return;
    }

    private boolean inArea(int x, int y){
        return x >= 0 && x < m && y >= 0 && y < n;
    }
}
```



### 题目来源
LeetCode-[200.岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
