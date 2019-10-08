---
layout: post
title: 451.根据字符出现频率排序
categories: [LeetCode]
tags: [lookup Table]
summary: 给定一个字符串，请将字符串里的字符按照出现的频率降序排列。
---

### 题目要求
给定一个字符串，请将字符串里的字符按照出现的频率降序排列。


### 题目示例
- **`示例 1:`**  

```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```


- **`示例 2:`**   

```
输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```

- **`示例 3:`**  

```
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```


### 解题思路
- TreeMap  
1. Key存储`字母`，Value字母出现`频次`
1. 遍历s字符串，存储所有字母及其频次
1. 定义`优先队列`(大顶堆)， 遍历`哈希表`，将`Key`添加进优先队列中。
1. 遍历优先队列，由于`频次高`的`先出队`，并且字母会对应频次出现`n次`


### 解题代码
```java
class Solution {
    public String frequencySort(String s) {
        
        HashMap<Character, Integer> map = new HashMap<>();
        
        for(int i = 0; i < s.length(); i++) {
            char p = s.charAt(i);
            if(!map.containsKey(p)) {
                map.put(p, 1);
            } else {
                map.put(p, map.get(p) + 1);
            }
        }
        // 定义优先队列(频次大的优先)
        PriorityQueue<Character> queue = new PriorityQueue<>(
            (a, b) -> map.get(b) - map.get(a)
        );
        // 遍历哈希表
        for(char key : map.keySet()) {
            queue.add(key);
        }
        
        StringBuilder res = new StringBuilder();
        while(!queue.isEmpty()) { // 遍历优先队列
            char p = queue.remove(); // 频次高的先出队
            for (int i = 0; i < map.get(p); i++) {
                res.append(p);
            }
        }
        return res.toString();
    }
}
```

### 题目来源
LeetCode-[451.根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)
