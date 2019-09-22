---
layout: post
title: 6种常用的排序
categories: [DataStructure]
tags: [java]
summary: 六种常用的排序-冒泡排序、选择排序、插入排序、归并排序、快速排序、堆排序。
---

## 常用排序类型

### Bubble Sort 冒泡排序 
冒泡排序是一种简单的排序算法。它`重复地`走访过要排序的数列，一次比较`两个`元素，如果他们的顺序错误就把他们`交换`过来。
- 冒泡排序算法的运作如下：
1. 比较`相邻`的元素。如果第一个比第二个大，就`交换`他们两个。
1. 对每一对相邻元素作同样的工作，从开始`第一对`到结尾的`最后`一对。这步做完后，最后的元素会是最大的数。
1. 针对所有的元素重复以上的步骤，除了`最后`一个。
1. 持续每次对越来越少的元素`重复`上面的步骤，直到没有任何一对数字需要比较。

- 时间复杂度  
`最坏`时间复杂度  O(n^2)  
`最优`时间复杂度  O(n)  
`平均`时间复杂度  O(n^2)  

- 简单的冒泡排序
```java
    public static void bubbleSort(int [] a, int n){
        for(int i=0; i<n; i++){
            for(int j=1; j<n-i; j++){
                if(arr[j-1] > arr[j]){
                    swap(arr, j-1, j);
                }
            }
        }
    }
    // 交换 i, j 位置
    private static void swap(Object[] arr, int i, int j) {
        Object t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
```

- 优化--面对已经`排好顺序`数组时的优化方案
```java
    public static void bubbleSort(int [] a, int n){
        int j, k = n;
        boolean flag = true; 
        while (flag){
            flag=false; // 如果有一趟没有发生位置交换，说明排序已经完成。
            for(j=1; j<k; j++){
                if(a[j-1] > a[j]){
                    swap(arr, j-1, j);
                    flag = true;
                }
            }
            k--;
        }
    }
    // 交换 i, j 位置
    private static void swap(Object[] arr, int i, int j) {
        Object t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
```

### Selection sort 选择排序
首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
```java
    public static void sort(Comparable[] arr){

        int n = arr.length;
        for( int i = 0 ; i < n ; i ++ ){
            // 寻找[i, n)区间里的最小值的索引
            int minIndex = i;
            for( int j = i + 1 ; j < n ; j ++ )
                // 使用compareTo方法比较两个Comparable对象的大小
                if( arr[j].compareTo( arr[minIndex] ) < 0 )
                    minIndex = j;
            swap( arr , i , minIndex);
        }
    }

    private static void swap(Object[] arr, int i, int j) {
        Object t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
```


### Insertion Sort 插入排序
插入排序的工作原理是通过构建`有序`序列，对于`未排序`数据，在`已排序`序列中从后向前扫描，找到相应位置并插入。
- 具体算法描述如下：
1. 从第一个元素开始，该元素可以认为已经被排序
1. 取出下一个元素，在`已经排序`的元素序列中从后向前扫描
1. 如果该元素（已排序）大于新元素，将该元素移到`下一位置`
1. 重复`步骤3`，直到找到已排序的元素小于或者等于新元素的位置
1. 将新元素插入到该位置后
1. 重复步骤`2~5`

```java
    public static void sort(Comparable[] arr){
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            // 寻找元素arr[i]合适的插入位置

            // 写法1
           for(int j = i ; j > 0 ; j --)
               if(arr[j].compareTo(arr[j-1]) < 0)
                   swap( arr, j , j-1 );
               else
                   break;

            // 写法2
            for(int j = i; j > 0 && arr[j].compareTo(arr[j-1]) < 0 ; j--)
                swap(arr, j, j-1);

            // 写法3 
            Comparable e = arr[i];
            for(int j = i; j > 0 && arr[j-1].compareTo(e) > 0 ; j--)
                arr[j] = arr[j-1];
            arr[j] = e;

        }
    }

    private static void swap(Object[] arr, int i, int j) {
        Object t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
```

### Merge sort 归并排序
采用分治法:
分割：递归地把当前序列平均分割成两半。
集成：在保持元素顺序的同时将上一步得到的子序列集成到一起（归并）。

```java
    // 将arr[l...mid]和arr[mid+1...r]两部分进行归并
    private static void merge(Comparable[] arr, int l, int mid, int r) {

        Comparable[] aux = Arrays.copyOfRange(arr, l, r+1);

        // 初始化，i指向左半部分的起始索引位置l；j指向右半部分起始索引位置mid+1
        int i = l, j = mid+1;
        for( int k = l ; k <= r; k ++ ){

            if( i > mid ){  // 如果左半部分元素已经全部处理完毕
                arr[k] = aux[j-l]; j ++;
            }
            else if( j > r ){   // 如果右半部分元素已经全部处理完毕
                arr[k] = aux[i-l]; i ++;
            }
            else if( aux[i-l].compareTo(aux[j-l]) < 0 ){  // 左半部分所指元素 < 右半部分所指元素
                arr[k] = aux[i-l]; i ++;
            }
            else{  // 左半部分所指元素 >= 右半部分所指元素
                arr[k] = aux[j-l]; j ++;
            }
        }
    }

    // 递归使用归并排序,对arr[l...r]的范围进行排序
    private static void sort(Comparable[] arr, int l, int r) {


        // 优化2: 对于小规模数组, 使用插入排序
        if( r - l <= 15 ){
            InsertionSort.sort(arr, l, r);
            return;
        }
        // if (l >= r)
        //     return;

        int mid = l + (r-l)/2; // (l+r)/2
        sort(arr, l, mid);
        sort(arr, mid + 1, r);

        // 优化1: 对于arr[mid] <= arr[mid+1]的情况,不进行merge
        // 对于近乎有序的数组非常有效,但是对于一般情况,有一定的性能损失
        if( arr[mid].compareTo(arr[mid+1]) > 0 )
            merge(arr, l, mid, r);
        // merge(arr, l, mid, r);
    }

    public static void sort(Comparable[] arr){

        int n = arr.length;
        sort(arr, 0, n-1);
    }
```

### Quicksort 快速排序
- 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为较小和较大的2个子序列，然后`递归`地排序两个子序列。`步骤`为：
1. 挑选基准值：从数列中挑出一个元素，称为`基准`（pivot），
1. 分割：`重新`排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（与基准值相等的数可以到任何一边）。在这个分割结束之后，对基准值的排序就已经完成，
1. 递归排序子序列：`递归`地将小于基准值元素的子序列和大于基准值元素的子序列排序。 
- 递归到最底部的`判断条件`是数列的大小是零或一，此时该数列显然已经`有序`。

```java
    // 对arr[l...r]部分进行partition操作
    // 返回p, 使得arr[l...p-1] < arr[p] ; arr[p+1...r] > arr[p]
    private static int partition(Comparable[] arr, int l, int r){

        Comparable v = arr[l];

        int j = l; // arr[l+1...j] < v ; arr[j+1...i) > v
        for( int i = l + 1 ; i <= r ; i ++ )
            if( arr[i].compareTo(v) < 0 ){
                j ++;
                swap(arr, j, i);
            }
        swap(arr, l, j);
        return j;
    }

    // 递归使用快速排序,对arr[l...r]的范围进行排序
    private static void sort(Comparable[] arr, int l, int r){
        if( l >= r )
            return;
        int p = partition(arr, l, r);
        sort(arr, l, p-1 );
        sort(arr, p+1, r);
    }

    public static void sort(Comparable[] arr){
        int n = arr.length;
        sort(arr, 0, n-1);
    }

    private static void swap(Object[] arr, int i, int j) {
        Object t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
```

### Heapsort 堆排序
- 重复从最大堆积取出数值`最大`的结点(把根结点和最后一个结点交换，把交换后的最后一个结点移出堆)，并让残余的堆积维持`最大堆积`性质。
- 通常堆是通过一维`数组`来实现的。在数组起始位置`为1`的情形中：
1. 父节点i的`左子节点`在位置 (2i);
1. 父节点i的`右子节点`在位置 (2i+1);
1. 子节点i的`父节点`在位置 （i/2);

```java
    public static void sort(Comparable[] arr){

        int n = arr.length;

        // 注意，此时我们的堆是从0开始索引的
        // 从(最后一个元素的索引-1)/2开始
        // 最后一个元素的索引 = n-1
        for( int i = (n-1-1)/2 ; i >= 0 ; i -- )
            shiftDown2(arr, n, i);

        for( int i = n-1; i > 0 ; i-- ){
            swap( arr, 0, i);
            shiftDown2(arr, i, 0);
        }
    }

    // 交换堆中索引为i和j的两个元素
    private static void swap(Object[] arr, int i, int j){
        Object t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }

    // 原始的shiftDown过程
    private static void shiftDown(Comparable[] arr, int n, int k){

        while( 2*k+1 < n ){
            int j = 2*k+1;
            if( j+1 < n && arr[j+1].compareTo(arr[j]) > 0 )
                j += 1;

            if( arr[k].compareTo(arr[j]) >= 0 )break;

            swap( arr, k, j);
            k = j;
        }
    }

    // 优化的shiftDown过程, 使用赋值的方式取代不断的swap
    private static void shiftDown2(Comparable[] arr, int n, int k){

        Comparable e = arr[k];
        while( 2*k+1 < n ){
            int j = 2*k+1;
            if( j+1 < n && arr[j+1].compareTo(arr[j]) > 0 )
                j += 1;

            if( e.compareTo(arr[j]) >= 0 )
                break;
            arr[k] = arr[j];
            k = j;
        }
        arr[k] = e;
    }
```

## 总结
- `原地排序`就是指在排序过程中不申请多余的存储空间，只利用`原来存储`待排数据的存储空间进行比较和交换的数据排序。

| 类型 | 平均时间复杂度 | 原地排序 | 稳定性 |
| :----: | :----: | :----: | :----: | :----: | 
| 冒泡排序 | O(n^2) | √| 稳定 |
| 选择排序 | O(1) | √ | 不稳定 |
| 插入排序 | O(n^2) | √ | 稳定 |
| 归并排序 | O(nlog n) | X | 稳定 |
| 快速排序 | O(nlog n) | √ | 不稳定 | 
| 堆排序 | O(nlog n) | √ | 不稳定 |


## 参考文献
1. 维基百科-[冒泡排序](https://zh.wikipedia.org/wiki/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)
1. 维基百科-[选择排序](https://zh.wikipedia.org/wiki/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F)
1. 维基百科-[插入排序](https://zh.wikipedia.org/wiki/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F)
1. 维基百科-[归并排序](https://zh.wikipedia.org/wiki/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F)
1. 维基百科-[快速排序](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
1. 维基百科-[堆排序](https://zh.wikipedia.org/wiki/%E5%A0%86%E6%8E%92%E5%BA%8F)
