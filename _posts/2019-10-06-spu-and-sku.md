---
layout: post
title: 初识spu和sku
categories: [Note]
tags: [E-commerce]
summary: SPU英文全称Standard Product Unit(标准产品单位)、SKU英文全称stock keeping unit(库存量单位)
---

## 基本概念
`SPU`英文全称Standard Product Unit(标准产品单位)、`SKU`英文全称stock keeping unit(库存量单位)。

### 商品SPU
1. SPU 是`商品`信息聚合的`最小`单位，是一组`可复用`、`易检索`的标准化信息的`集合`，该集合描述了一个产品的特性。
1. 我们在浏览[mac官网](https://www.apple.com/cn/mac/)时，上栏有MacBook Air、MacBook Pro、iMac...等等。其中MacBook Air是一个SPU，MacBook Pro也是一个SPU，iMac也是一个SPU。
简单的说：`MacBook Air`就是一个SPU，这与颜色和内存大小`都无关`。总体上指的就是`MacBook Air`这台笔记本。
<img src="/img/2019/10/spu-and-sku-01.png" width="102%" alt="spu"/>

### 商品SKU  
1. SKU 即`库存`进出计量的单位， 可以是以件、盒、托盘等为单位。
1. 当你点进`MacBook Air`购买时,页面有两种内存大小不同的款式，并且`不同`的款式间有三种颜色选择。
如果你选择 128G 银色 的`MacBook Air`。这时候你选择了具体的内存大小和颜色的`MacBook Air`就是一个SKU。
不同的内存大小`MacBook Air`的价格是肯定是不同，而且`不同`的颜色和内存大小的库存也是`不同`的。可能256G 银色这款比较受欢迎，所以256G 银色 的`MacBook Air`库存会比较少。
<img src="/img/2019/10/spu-and-sku-02.png" width="100%" alt="sku"/>

## SPU和SKU间关系
- 结合前面所举的列子来看，SPU与SKU两者的`关系`似乎就是类目下包含SPU，SPU包含SKU。  
1. SPU是一个`抽象概念`的商品（MacBook Air），而SKU是一个`更为具体`的商品（128G 银色 的MacBook Air）。这里不难看出商品SKU`从属于`商品SPU。
1. 由于SKU从属于SPU，故两者的`功能`有所差别：  
    SPU通常是用来`定位`某件商品，而SKU通常是用来`定价`和`管理库存`。

<img src="/img/2019/10/spu-and-sku-03.png" width="100%" alt="spu-and-sku-relation"/>