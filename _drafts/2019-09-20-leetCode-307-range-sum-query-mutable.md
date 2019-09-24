---
layout: post
title: 307.区域和检索 - 数组可修改
categories: [LeetCode]
tags: [array]
summary: 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
---

### 题目要求
给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。  
update(i, val) 函数可以通过将下标为 i 的数值更新为 val，从而对数列进行修改。


### 题目示例
示例 1:
```
Given nums = [1, 3, 5]

sumRange(0, 2) -> 9
update(1, 2)
sumRange(0, 2) -> 8
```

> `说明：`   
> 1.数组仅可以在 update 函数下进行修改。
> 2.你可以假设 update 函数与 sumRange 函数的调用次数是均匀分布的。

### 解题思路
1. `注意`：这里采取`自定义`的线段树。`更新set(`)和`查询query()`的时间复杂度都是`O(log n)`。
1. 线段树的传参是`泛型传参`的，参入其中的参数的类型不能是`基本类型`。先入参数`int[]` nums就不符合了。所以首先将其转化成`封装类`Integer[]类型的数组
1. 将转化好的Integer类型数组data传入`SegmentTree`线段树中，并且传一个`匿名函数`进去。匿名函数`作用`：定义同层不同父节点的节点进行相加`求和`。
1. 需要在线段树上原有的基础上有set`更新节点`数值的方法。


### 解题代码
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
            if(queryL < 0 || queryL >= data.length || queryR < 0 ||
                queryR >= data.length || queryL > queryR)
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
        // 将index位置的值，更新为e
        public void set(int index, E e){

            if(index < 0 || index >= data.length)
                throw new IllegalArgumentException("Index is illegal");

            data[index] = e;
            set(0, 0, data.length - 1, index, e);
        }

        // 在以treeIndex为根的线段树中更新index的值为e
        private void set(int treeIndex, int l, int r, int index, E e){
            if(l == r){
                tree[treeIndex] = e;
                return;
            }
            int mid = l + (r - l) / 2;
            // treeIndex的节点分为[l...mid]和[mid+1...r]两部分
            int leftTreeIndex = leftChild(treeIndex);
            int rightTreeIndex = rightChild(treeIndex);
            if(index >= mid + 1)
                set(rightTreeIndex, mid + 1, r, index, e);
            else // index <= mid
                set(leftTreeIndex, l, mid, index, e);
            // 更新->修改后节点的父节点的值
            tree[treeIndex] = merger.merge(tree[leftTreeIndex], tree[rightTreeIndex]);
        }
    }

    private SegmentTree<Integer> segTree;
    public NumArray(int[] nums) {

        if(nums.length > 0){
            Integer[] data = new Integer[nums.length];
            for (int i = 0; i < nums.length; i++)
                data[i] = nums[i];
            segTree = new SegmentTree<>(data, (a, b) -> a + b);
        }
    }

    public void update(int i, int val) {
        if(segTree == null)
            throw new IllegalArgumentException("Error");
        segTree.set(i, val);
    }
    
    public int sumRange(int i, int j) {

        if(segTree == null)
            throw new IllegalArgumentException("Segment Tree is null");
        return segTree.query(i, j);
    }    
}
```

### 题目来源
LeetCode-[307.区域和检索 - 数组可修改](https://leetcode-cn.com/problems/range-sum-query-mutable/)
