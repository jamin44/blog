---
layout: post
title: Mysql并发访问问题
categories: [数据库]
tags: [mysql]
summary: Mysql事务并发访问导致的问题--更新丢失、脏读、不可重复读、幻读。
---

### 前言
Mysql数据库事务的`四大`特性--原子性、一致性、隔离性、持久性。而`锁`是数据库中的一个非常重要的概念，它主要用于多用户环境下保证数据库`完整性`和`一致性`。如果在`多用户`并发情况下，他们的事务`同时`对`相同`的数据进行操作，是会导致更新丢失、脏读、不可重复读、幻读的问题的。

### 更新丢失
1. Mysql所有事务隔离级别在数据库层面上均可避免`更新丢失`问题
1. 当两个或多个事务选择同一行，然后基于最初选定的值更新该行时，会发生丢失更新问题。
1. 每个事务都不知道其它事务的存在。最后的更新将重写由其它事务所做的更新，这将导致数据丢失。
1. 如果在`A事务`完成之后，`B事务`才能进行更改，则可以避免该问题。

**更新丢失Demo**  

|取款事务|存款事务|
| :----:| :----: | :----: |
|开始事务|开始事务|
|查询转账余额为100元||
||查询转账余额为100元|
||存入20元，余额变为120元|
||提交事务|
|取出10元，余额改为90元||
|回滚事务，余额恢复为100元|更新丢失|

### 脏读
1. READ-COMMITTED事务隔离级别以上可避免--`脏读`问题
1. 脏读就是指当一个事务正在访问数据，并且对数据进行了`修改`，而这种修改还`没有提交`到数据库中，这时，`另外`一个事务也访问这个数据，然后`使用`了这个数据。因为这个数据是`还没有提交`的数据，那么另外一个事务读到的这个数据是`脏数据`，依据脏数据所做的操作可能是不正确的。
1. 如果在`B事务`确定最终更改前，`A事务`或者其它事务都`不能读取`更改的文档，则可以避免该问题。

**脏读Demo**

数据库默认的隔离级别是REPEATABLE-READ。为了演示脏读效果，需要先将数据库隔离级别设置成READ-UNCOMMITTED。
```sql
select @@tx_isolation;
set session transaction isolation level read uncommitted;
```

|A事务|B事务|
| :----:| :----: | :----: |
|开始事务|开始事务|
|1账户余额1000元，转出100元||
|查询1账户剩900元||
||查询1账户剩900元|
|没有进行事务提交，而是事务回滚，余额恢复1000元||
||不知道A事务进行回滚，对1账户存入200元|
||提交事务|
||再次查询1账户余额1100|


### 不可重复读
1. REPEATABLE_READ事务隔离级别以上可避免--不可重复读问题
1. 不可重复读是指在一个事务内，`多次`读`同一`数据。在这个事务`还没有结束`时，另外一个事务也访问该`同一数据`。那么，在第一个事务中的`两次`读数据`之间`，由于第二个事务的`修改`，那么第一个事务两次读到的的数据可能是`不一样`的。
1. 如果在`B事务`确定最终`更改前`，`A事务`或者其它事务都不能`读取`更改的文档，则可以避免该问题。

**不可重复读Demo**

|A事务|B事务|
| :----:| :----: | :----: |
|开始事务|开始事务|
|查询1账户余额1300元||
||对1账户存入300元|
||查询1账户剩1600元|
||进行事务提交|
|查询1账户余额1600元||

- 数据库默认的隔离级别是REPEATABLE-READ。若将数据库隔离级别设置成REPEATABLE_READ，则`A事务第二次`查询余额还是1300元，不会是1600元。
```sql
select @@tx_isolation;
set session transaction isolation level repeatable read;
```


### 幻读
1. SERIALIZABLE事务隔离级别可避免--`幻读`问题
1. 幻读与不可重复读看似`类似`，不可重复读侧重于对同一数据的`修改`，幻读侧重于`新增`或`删除`。
1. 幻觉读是指当事务不是`独立`执行时发生的一种现象，例如第一个事务对一个表中的数据进行了修改，这种修改涉及到表中的`全部数据行`。同时，第二个事务也修改这个表中的数据，这种修改是向表中`插入`一行新数据。那么，以后就会发生操作第一个事务的用户发现表中还有`没有修改`的数据行，就好象发生了幻觉一样。

**幻读Demo**

|A事务|B事务|
| :----:| :----: | :----: |
|开始事务|开始事务|
|查询全部账号余额，当前有3个账号||
||新增4账号及其余额|
||进行事务提交|
|更新所有的账户余额||
|出现有四个账号幻读的现象||

- 数据库默认的隔离级别是REPEATABLE-READ。若将数据库隔离级别设置成SERIALIZABLE，则`B事务`新增账号4需要等待`A事务`操作完才能进行。  
```sql
select @@tx_isolation;
set session transaction isolation level serializable;
```


### 总结
**`事务并发访问引起的问题以及如何避免`**

|事务隔离级别|更新丢失|脏读|不可重复读|幻读|
| :----:| :----: | :----: | :----:| :----: |
|未提交读|避免|发生|发生|发生|
|已提交读|避免|避免|发生|发生|
|可重复读|避免|避免|避免|发生|
|串行化|避免|避免|避免|避免|

- 事务级别越高安全性越高，串行化执行越严重，这样就可以降低数据库的并发度，但性能要求也会越高。

### 文献参考
[sql语句对数据库表进行加锁和解锁](https://blog.csdn.net/huangli1466384630/article/details/80862693)
