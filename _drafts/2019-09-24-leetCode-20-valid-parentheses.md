---
layout: post
title: 20.有效的括号
categories: [LeetCode]
tags: [leetCode, stack]
summary: 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
---

### 题目要求
- 有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
1. 左括号必须以正确的顺序闭合。

> **`注意`** 空字符串可被认为是有效字符串。

### 题目示例
- **`示例 1:`** 
```
输入: "()"
输出: true
```

- **`示例 2:`** 
```
输入: "()[]{}"
输出: true
```

- **`示例 3:`** 
```
输入: "(]"
输出: false
```

### 解题思路
本题使用的到数据结构--`栈`。
需要引进Stack `import java.util.Stack;`
1. 先实例化`Stack`对象
```java
Stack<Character> stack = new Stack<>();
```
1. 根据字符串s的长度遍历其的元素，从第一个判断是否是属于 `(`、`{`、`[` 任意一种属于左开闭的括号，若是则让它进栈
```java
stack.push(c);
```
1. 如果不是属于左开闭的括号，先判断当前栈是否为空，若为空直接返回`false`
1. 获取栈顶的元素
```java
char topChar = stack.pop();
```
1. 再来判断栈顶元素与遍历的元素是否一致
```java
if (c == ')' && topChar != '('){
    return false;
}
if (c == ']' && topChar != '['){
    return false;
}
if (c == '}' && topChar != '{'){
    return false;
}
```
1. 最后若`for`循环遍历没有`return false`，不能急得`return true`。因为还要判断栈是否有元素，只有为空时才能`return true`。
```java
return stack.isEmpty();
```


### 解题代码
```java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for(int i=0; i<s.length(); i++){
            char c = s.charAt(i);
            if (c == '(' || c == '{' || c == '['){
                stack.push(c);
            } else {
                if (stack.isEmpty()){
                    return false;
                }
                char topChar = stack.pop();
                if (c == ')' && topChar != '('){
                    return false;
                }
                if (c == ']' && topChar != '['){
                    return false;
                }
                if (c == '}' && topChar != '{'){
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
```

### 题目来源
LeetCode-[20.有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)