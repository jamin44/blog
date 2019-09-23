---
layout: post
title: 347.前 K 个高频元素
categories: [LeetCode]
tags: [leetCode]
summary: 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
---

### 题目要求
给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

### 题目示例
示例 1:
```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

示例 2:
```
输入: nums = [1], k = 1
输出: [1]
```

> `说明：`   
> 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。  
> 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。  

### 解题思路
1. 首先new一个`映射map`循环遍历数组nums,如果元素有在映射中，则在`其存在`的频率次数上`加1`。没有在映射中的话，则`添加`进映射，并设置频率次数为1。
1. new一个`优先队列`，以一个`内部类Freq`作为参数。Freq类中需要定义`元素e`以及元素存在的频率`次数freq`，还有需要Freq实现`Comparable类`，覆盖compareTo方法，对频率次数优先级进行定义。Java自带的PriorityQueue是`最小堆`。
1. 循环遍历`映射`中所有key(也就是元素e)，如果映射中的容量`小于`要求k的值，把映射中Freq的`元素e`和`次数freq`添加`进优先队列`中；如果e的`次数freq`大于优先队列中的最小Freq`次数freq`，则需要把优先队列最小的取出，加入大的。
1. new一个LinkedList`链表数组`res，循环`优先队列pq`是否`为空`，把里面所有元素以`取出`的形式`加入`到数组中，最后返回数组res。


### 解题代码
```java
class Solution {
    private class Freq implements Comparable<Freq>{
        int e, freq;
        public Freq(int e, int freq) {
            this.e = e;
            this.freq = freq;
        }
        @Override
        public int compareTo(Freq another) {
            if (this.freq < another.freq)
                return -1;
            else if (this.freq > another.freq)
                return 1;
            else
                return 0;
        }
    }

    public List<Integer> topKFrequent(int[] nums, int k) {
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for (int num : nums){
            if (map.containsKey(num))
                map.put(num, map.get(num) + 1);
            else
                map.put(num, 1);
        }

        PriorityQueue<Freq> pq = new PriorityQueue<>();
        for(int key : map.keySet()) {
            if (pq.size() < k)
                pq.add(new Freq(key, map.get(key)));
            else if(map.get(key) > pq.peek().freq){
                pq.remove();
                pq.add(new Freq(key, map.get(key)));
            }
        }

        LinkedList<Integer> res = new LinkedList<>();
        while (!pq.isEmpty())
            res.add(pq.remove().e);
        return res;
    }
}
```

------

**`采用比较器、PriorityQueue比较器传参、lambda的方式进行优化`**
```java
class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {

        TreeMap<Integer, Integer> map = new TreeMap<>();
        for(int num: nums){
            if(map.containsKey(num))
                map.put(num, map.get(num) + 1);
            else
                map.put(num, 1);
        }

        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (a, b) -> map.get(a) - map.get(b)
        );
        for(int key: map.keySet()){
            if(pq.size() < k)
                pq.add(key);
            else if(map.get(key) > map.get(pq.peek())){
                pq.remove();
                pq.add(key);
            }
        }

        LinkedList<Integer> res = new LinkedList<>();
        while(!pq.isEmpty())
            res.add(pq.remove());
        return res;
    }
}
```

### 题目来源
LeetCode-[347.前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)
