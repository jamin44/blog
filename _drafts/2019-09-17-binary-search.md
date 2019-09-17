---
layout: post
title: 二分查找树
categories: [DataStructure]
tags: [java]
summary: 
---

```java
public int binarySearch(T arr[], int n, T target) {
    int l = 0, r = n;
    while(l < r) {
        mid = l + (r - l)/2;
        if(arr[mid].compareTo(target) == 0)
            return arr[mid];
        if(target.compareTo(arr[mid]) > 0)
            l = mid + 1;
        else
            r = mid; 
    }
    return -1;
}

```