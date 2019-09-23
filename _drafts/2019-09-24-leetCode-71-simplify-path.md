---
layout: post
title: 71.简化路径
categories: [LeetCode]
tags: [leetCode, stack]
summary: 给定文件的绝对路径（Unix风格），请简化它。或者换句话说，将其转换为规范路径。
---

### 题目要求
给定文件的绝对路径（Unix风格），请简化它。或者换句话说，将其转换为规范路径。

在UNIX样式的文件系统中，句点`.`引用当前目录。此外，双倍时间`..`会将目录上移。有关更多信息，请参见：  Linux / Unix中的绝对路径与相对路径
请注意，返回的规范路径必须始终以斜杠开头/，并且`两个`目录名称之间必须`只有一个`斜杠。最后的目录名称（如果存在不得以`/`结尾。同样，规范路径必须是代表绝对路径的`最短`字符串。


### 题目示例
- **`示例 1:`** 
```
Input: "/home/"
Output: "/home"
Explanation: Note that there is no trailing slash after the last directory name.
```

- **`示例 2:`** 
```
Input: "/../"
Output: "/"
Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
```

- **`示例 3:`** 
```
Input: "/home//foo/"
Output: "/home/foo"
Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.
```

- **`示例 4:`** 
```
Input: "/a/./b/../../c/"
Output: "/c"
```

- **`示例 5:`** 
```
Input: "/a/../../b/../c//.//"
Output: "/c"
```

- **`示例 6:`** 
```
Input: "/a//b////c/d//././/.."
Output: "/a/b/c"
```

### 解题思路



### 解题代码
```java
class Solution {
    public String simplifyPath(String path) {
        
    }
}
```

### 题目来源
LeetCode-[71.简化路径](https://leetcode-cn.com/problems/simplify-path/)