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
三张数据表-学生表(student_id、name、age、sex)、课程表(course_id、name)、成绩表(student_id、course_id、score)
<img src="/img/2019/11/group-by-and-having-01.png" width="102%" alt="data-01"/>
<img src="/img/2019/11/group-by-and-having-02.png" width="102%" alt="data-02"/>
<img src="/img/2019/11/group-by-and-having-03.png" width="102%" alt="data-03"/>

### GROUP BY

1. 查询所有同学的学号、选课数、总成绩
```sql
select student_id, count(course_id), sum(score)
from score
group by student_id;
```
> 列函数对于group by子句定义的每个组各返回一个结果。
> 如果用group by，那么你的select语句中选出的列要么是你group by里用到的列，要么就是带有sum min count等函数的列
<img src="/img/2019/11/group-by-and-having-04.png" width="106%" alt="result-01"/>

1. 查询所有同学的学号、姓名、选课数、总成绩
```sql
select s.student_id, stu.name, count(s.course_id), sum(s.score)
from score s, student stu
where s.student_id = stu.student_id
group by s.student_id;
```
> group by 里出现某个表的字段，select里面的列要么是该group by里面的列，要么是`别的表`的列或者带有函数的列
<img src="/img/2019/11/group-by-and-having-05.png" width="104%" alt="result-02"/>


### HAVING

1. 查询平均成绩大于60分的同学的学号和平均成绩
```sql
select student_id, avg(score)
from score
group by student_id
having avg(score) > 60
```
> having必须要在group by之后，不然会报错。如果省略了group by语句，having子句就跟where语句一样
<img src="/img/2019/11/group-by-and-having-06.png" width="106%" alt="result-03"/>

1. 查询没有学全所有课的同学的学号、姓名
```sql
select stu.student_id, stu.name
from student stu, score s
where stu.student_id = s.student_id
group by s.student_id
having count(*) <
(
    select count(*) from course
)
```
<img src="/img/2019/11/group-by-and-having-07.png" width="105%" alt="result-04"/>  

1. 取出student_id为1的学生的成绩情况
```sql
select s.student_id, c.name, s.score
from  score s, course c
where s.course_id = c.course_id
having s.student_id = 1
```
<img src="/img/2019/11/group-by-and-having-08.png" width="108%" alt="result-05"/>  

> `where` 子句的作用是在对查询结果进行`分组前`，将不符合where条件的行去掉，即在`分组之前`过滤数据，条件中不能包含聚组函数，使用where条件显示特定的行。
`having` 子句的作用是筛选满足条件的组，即在`分组之后`过滤数据，条件中经常包含聚组函数，使用having 条件显示特定的组，也可以使用多个分组标准进行分组。
