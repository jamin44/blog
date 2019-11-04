---
layout: post
title: GROUP BY和HAVING的用法
categories: [数据库]
tags: [mysql]
summary:  
---

## 前言
- GROUP BY 是分组查询, 一般 GROUP BY 是和聚合函数配合使用。 
1. group by 有一个原则,就是 满足`SELECT子句中的列名必须为分组列或列函数`
1. 列函数对于group by子句定义的每个组各返回一个结果。 

- HAVING 通常与GROUP BY子句一起使用
1. WHERE过滤行，HAVING过滤组
1. 出现在同一sql的顺序：WHERE -> GROUP BY -> HAVING 


## 使用




    
