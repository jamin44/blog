---
layout: post
title: 80.删除排序数组中的重复项 II
categories: [LeetCode]
tags: [leetCode]
summary: 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。
---

### 题目要求
给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。  
不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。


**`说明:`**  
为什么返回数值是整数，但输出的答案是数组呢?  
请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### 题目示例
示例 1:
```
给定 nums = [1,1,1,2,2,3],
函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。
你不需要考虑数组中超出新长度后面的元素。
```

示例 2:
```
给定 nums = [0,0,1,1,1,1,2,3,3],
函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。
你不需要考虑数组中超出新长度后面的元素。
```

### 解题思路
采用`双指针`的方法，由于数组是`有序`数组。
k指针初始值0，表示`排除重复`元素后所指引的位置
i指针初始值为1，表示`遍历元素`所要指向的指针
count初始值为1，表示元素出现的次数。
最后返回时`k+1`(因为k初始值是为0)

### 解题代码

```java
// 时间复杂度: O(n) 空间复杂度: O(1)
class Solution {
    public int removeDuplicates(int[] nums) {
        int k = 0;
        int count = 1;
        for(int i = 1; i < nums.length; i++){
            if(nums[i] != nums[k]) {
                k++;
                nums[k] = nums[i];
                count = 1;
            } else if(count >= 2) {
                continue;
            } else {
                k++;
                nums[k] = nums[i];
                count++;
            }
        }
        return k+1;
    }
}
```

### 题目来源
LeetCode-[80.删除排序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)