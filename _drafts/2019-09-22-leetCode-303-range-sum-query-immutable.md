---
layout: post
title: 303.区域和检索 - 数组不可变
categories: [LeetCode]
tags: [leetCode]
summary: 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
---

### 题目要求
给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。

### 题目示例
示例 1:
```
给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3
```

> `说明：`   
> 1.你可以假设数组不可变。  
> 2.会多次调用 sumRange 方法。   

### 解题思路
#### **`数组解法思路`**：
1. 定义一个`数组sum`来存储前i个元素的和。这里sum数组的长度需要在传入数组nums的长度上`加1`，因为sum[0]=0`占用`了一个位置。
1. 所以求取i-j区间之和等于sum[j+1] - sum[i]之和

#### **`线段树解法思路`**：
1. `注意`：这里采取`自定义`的线段树
1. 线段树的传参是`泛型传参`的，参入其中的参数的类型不能是`基本类型`。先入参数`int[]` nums就不符合了。所以首先将其转化成`封装类`Integer[]类型的数组
1. 将转化好的Integer类型数组data传入`SegmentTree`线段树中，并且传一个`匿名函数`进去。匿名函数`作用`：定义同层不同父节点的节点进行相加`求和`。

### 解题代码
#### **`数组解法`**：
```java
class NumArray {

    private int[] sum; // sum[i]存储前i个元素和, sum[0] = 0
                       // 即sum[i]存储nums[0...i-1]的和
                       // sum(i, j) = sum[j + 1] - sum[i]
    public NumArray(int[] nums) {

        sum = new int[nums.length + 1];
        sum[0] = 0;
        for(int i = 1 ; i < sum.length ; i ++)
            sum[i] = sum[i - 1] + nums[i - 1];
    }

    public int sumRange(int i, int j) {
        return sum[j + 1] - sum[i];
    }
}
```


#### **`线段树解法`**：

```java
class NumArray {
    
    public interface Merger<E> {
        E merge(E a, E b);
    }
    
    public class SegmentTree<E> {
        private E[] tree;
        private E[] data;
        private Merger<E> merger;
        public SegmentTree(E[] arr, Merger<E> merger){
            this.merger = merger;
            data = (E[])new Object[arr.length];
            for(int i = 0 ; i < arr.length ; i ++)
                data[i] = arr[i];

            tree = (E[])new Object[4 * arr.length];
            buildSegmentTree(0, 0, arr.length - 1);
        }
        // 在treeIndex的位置创建表示区间[l...r]的线段树
        private void buildSegmentTree(int treeIndex, int l, int r){
            if(l == r){
                tree[treeIndex] = data[l];
                return;
            }
            int leftTreeIndex = leftChild(treeIndex);
            int rightTreeIndex = rightChild(treeIndex);
            // int mid = (l + r) / 2;
            int mid = l + (r - l) / 2;
            buildSegmentTree(leftTreeIndex, l, mid);
            buildSegmentTree(rightTreeIndex, mid + 1, r);

            tree[treeIndex] = merger.merge(tree[leftTreeIndex], tree[rightTreeIndex]);
        }
        // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
        private int leftChild(int index){
            return 2*index + 1;
        }
        // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
        private int rightChild(int index){
            return 2*index + 2;
        }
        // 返回区间[queryL, queryR]的值
        public E query(int queryL, int queryR){
            if(queryL < 0 || queryL >= data.length ||
                    queryR < 0 || queryR >= data.length || queryL > queryR)
                throw new IllegalArgumentException("Index is illegal.");

            return query(0, 0, data.length - 1, queryL, queryR);
        }
        // 在以treeIndex为根的线段树中[l...r]的范围里，搜索区间[queryL...queryR]的值
        private E query(int treeIndex, int l, int r, int queryL, int queryR){
            if(l == queryL && r == queryR)
                return tree[treeIndex];

            int mid = l + (r - l) / 2;
            // treeIndex的节点分为[l...mid]和[mid+1...r]两部分

            int leftTreeIndex = leftChild(treeIndex);
            int rightTreeIndex = rightChild(treeIndex);
            if(queryL >= mid + 1)
                return query(rightTreeIndex, mid + 1, r, queryL, queryR);
            else if(queryR <= mid)
                return query(leftTreeIndex, l, mid, queryL, queryR);

            E leftResult = query(leftTreeIndex, l, mid, queryL, mid);
            E rightResult = query(rightTreeIndex, mid + 1, r, mid + 1, queryR);
            return merger.merge(leftResult, rightResult);
        }
    }


    private SegmentTree<Integer> segmentTree;
    public NumArray(int[] nums) {

        if(nums.length > 0){
            Integer[] data = new Integer[nums.length];
            for (int i = 0; i < nums.length; i++)
                data[i] = nums[i];
            segmentTree = new SegmentTree<>(data, (a, b) -> a + b);
        }

    }

    public int sumRange(int i, int j) {

        if(segmentTree == null)
            throw new IllegalArgumentException("Segment Tree is null");

        return segmentTree.query(i, j);
    }
}
```


### 题目来源
LeetCode-[303.区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)
