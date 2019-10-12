---
layout: post
title: 49.字母异位词分组
categories: [LeetCode]
tags: [lookup Table]
summary: 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
---

### 题目要求
给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

**`说明：`**
1. 所有输入均为小写字母。
1. 不考虑答案输出的顺序。

### 题目示例
**`示例:`** 
```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

### 解题思路
1. 定义HashMap<String, List<String>> map
1. 遍历遍历数组，先将`字符串s`转化成char[] `chars`，进行`字母排序`后再转化成`String`key。在`map中`判断key是否存在，`存在`的话直接根据键添加`字符串s`，`不存在`的话，将该字符串s添加进`数组list`中，后将key和list分别以`键和值`添加进map中；
1. 定义返回数组res，遍历map，将map中的Value添加进`res数组`中


### 解题代码
```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String, List<String>> map = new HashMap<>();
        for(String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = String.valueOf(chars);
            if(map.containsKey(key)) {
                map.get(key).add(s);
            } else {
                List<String> list = new LinkedList<>();
                list.add(s);
                map.put(key, list);
            }
        }
        List<List<String>> res = new ArrayList<>();
        for(String key: map.keySet()) {
            res.add(map.get(key));
        }
        return res;
    }
}
```

### 题目来源
LeetCode-[49.字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)
