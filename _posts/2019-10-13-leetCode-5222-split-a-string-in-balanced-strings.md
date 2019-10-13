---
layout: post
title: 5222.分割平衡字符串
categories: [LeetCode]
tags: [array]
summary: 在一个「平衡字符串」中，'L' 和 'R' 字符的数量是相同的。
---

### 题目要求
在一个「平衡字符串」中，'L' 和 'R' 字符的数量是相同的。

给出一个平衡字符串 s，请你将它分割成尽可能多的平衡字符串。

返回可以通过分割得到的平衡字符串的最大数量。

**`提示:`**  
1. 1 <= s.length <= 1000
1. s[i] = 'L' 或 'R'

### 题目示例
**`示例1:`**  
```
输入：s = "RLRRLLRLRL"
输出：4
解释：s 可以分割为 "RL", "RRLL", "RL", "RL", 每个子字符串中都包含相同数量的 'L' 和 'R'。
```

**`示例2:`**  
```
输入：s = "RLLLLRRRLR"
输出：3
解释：s 可以分割为 "RL", "LLLRRR", "LR", 每个子字符串中都包含相同数量的 'L' 和 'R'。
```

**`示例3:`**  
```
输入：s = "LLLLRRRR"
输出：1
解释：s 只能保持原样 "LLLLRRRR".
```


### 解题思路
**`思路`**：将L看成`-1`，R看成`1`。定义left表示'L'相加之和，right表示'R'相加之和。记录结果res。最后有n次left、right`相加之和`为0，则res == n。
1. 定义res,left,right都为0。遍历数组，判断`当前`元素是'L'或是'R'，进行`赋值`。再判断left + right `之和`为0的话，`res + 1`，并且将left和right`重新赋值`为0。
1. 最后返回res


### 解题代码
```java
class Solution {
    public int balancedStringSplit(String s) {
        int res = 0;
        int left = 0, right = 0;
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if(c == 'L') {
                left += -1;
            }
            if(c == 'R') {
                right += 1;
            }
            if(left + right == 0) {
                res += 1;
                left = right = 0;
            }
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[5222.分割平衡字符串](https://leetcode-cn.com/contest/weekly-contest-158/problems/split-a-string-in-balanced-strings/)
