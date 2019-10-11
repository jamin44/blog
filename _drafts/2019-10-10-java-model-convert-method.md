---
layout: post
title: Java常见的模型转换方法
categories: [Note]
tags: [java]
summary: 在进行不同领域对象转换时,原对象和目标对象相同属性的类型不一样,所以对象转换时一些需要考虑的问题。
---

### 前文
我在进行不同领域对象转换，一直都是用BeanUtils.copyProperties()搭配Set()使用的。听了张老师讲解之后，才知道方法如此之多。

### 转化方法

**我们的原对象OrderDTO的内容如下：**
```json
{
	"orderDate":1570558718699,
	"orderId":201909090001,
	"orderStatus":"CREATED",
	"orderedProducts":[
		{
			"price":799.990000000000009094947017729282379150390625,
			"productId":1,
			"productName":"吉他",
			"quantity":1
		},
		{
			"price":30,
			"productId":2,
			"productName":"变调夹",
			"quantity":1
		}
	],
	"paymentType":"CASH",
	"shopInfo":{
		"shopId":20000101,
		"shopName":"慕课商铺"
	},
	"totalMoney":829.990000000000009094947017729282379150390625,
	"userInfo":{
		"userId":20100001,
		"userLevel":2147483647,
		"userName":"张小喜"
	}
}
```

**期望转换后得到的目标对象OrderVO如下：**
```json
{
	"orderDate":"2019-10-09 15:49:24.619",
	"orderStatus":"CREATED",
	"orderedProducts":[
		{
			"productName":"吉他",
			"quantity":1
		},
		{
			"productName":"变调夹",
			"quantity":1
		}
	],
	"paymentType":"CASH",
	"shopName":"慕课商铺",
	"totalMoney":"829.99",
	"userName":"张小喜"
}
```

#### 第1种：Get/Set直接对对象操作。
优点：直观、简单、处理速度快；  
缺点:属性过多时，比较浪费表情，而且代码不简洁  

#### 第2种：FastJson
利用序列化和反序列化，这里我们采用先使用FastJson的toJSONString的方法将原对象序列化为字符串，再使用parseObject方法将字符串反序列化为目标对象。
缺点：属性转化后不符合预期的，属性名也不一致问题

**使用方式：**
```java
// JSON.toJSONString将对象序列化成字符串，JSON.parseObject将字符串反序列化为OderVO对象
orderVO = JSON.parseObject(JSON.toJSONString(orderDTO), OrderVO.class);
```

结果：
```json
// 目标对象
{
	"orderDate":"1570558718699",
	"orderId":201909090001,
	"orderStatus":"CREATED",
	"orderedProducts":[
		{
			"productName":"吉他",
			"quantity":1
		},
		{
			"productName":"变调夹",
			"quantity":1
		}
	],
	"paymentType":"CASH",
	"totalMoney":"829.990000000000009094947017729282379150390625"
}
```

**可以看到**
1. 日期不符合我们的要求
1. 金额也有问题
1. 最严重的是，当属性名不一样时，不复制


#### 第3种：Apache工具包PropertyUtils工具类
缺点：属性类型不一样会报错，不能部分属性复制，得到的目标对象部分属性成功、部分失败

使用方式：
```java
PropertyUtils.copyProperties(orderVO, orderDTO);
```
转换过程中报错
```java
java.lang.IllegalArgumentException: Cannot invoke com.imooc.demo.OrderVO.setTotalMoney on bean class 'class com.imooc.demo.OrderVO' - argument type mismatch - had objects of type "java.math.BigDecimal" but expected signature "java.lang.String"
```
结果：
```json
// 目标对象
{
	"orderId":201909090001
}
```
结论：  
1. 属性类型不一样时报错  
1. 不能部分属性复制  
1. 得到的目标对象部分属性成功(这点很要命，部分成功，部分失败！)  


#### 第4种：Apache工具包BeanUtils工具类
缺点：属性转化后不符合预期的，属性名也不一致问题

**使用方式：**
```java
BeanUtils.copyProperties(orderVO, orderDTO);
```
**结果：**
```json
// 目标对象
{
	"orderDate":"Wed Oct 09 02:36:25 CST 2019",
	"orderId":201909090001,
	"orderStatus":"CREATED",
	"orderedProducts":[
		{
			"price":799.990000000000009094947017729282379150390625,
			"productId":1,
			"productName":"吉他",
			"quantity":1
		},
		{
			"price":30,
			"productId":2,
			"productName":"变调夹",
			"quantity":1
		}
	],
	"paymentType":"CASH",
	"totalMoney":"829.990000000000009094947017729282379150390625"
}
```
**结论：**
1. 日期不符合要求
1. 属性名不一样时不复制
1. 目标对象中的商品集合变成了DTO的对象，这是因为List的泛型被擦除了，而且是浅拷贝，所以造成这种现象。



#### 第5种：Spring封装BeanUtils工具类
缺点：会出现属性丢失

**使用方式：**
```java
/** 对象属性转换，忽略orderedProducts字段 */
BeanUtils.copyProperties(orderDTO, orderVO, "orderedProducts");
```

**结果：**
```java
/** 目标对象 */
{
	"orderId":201909090001
}
```

**结论：**
1. 可以忽略部分属性
1. 属性类型不同，不能转换
1. 属性名称不同，不能转换


> apache的`BeanUtils`和spring的`BeanUtils`中拷贝方法的原理都是先用jdk中 `java.beans.Introspector`类的`getBeanInfo()`方法获取对象的属性信息及属性get/set方法，接着使用反射（`Method`的`invoke(Object obj, Object... args)`）方法进行赋值。  

#### 第6种：cglib工具包BeanCopier
cglib的`BeanCopier`采用了不同的方法：它不是利用反射对属性进行赋值，而是直接使用ASM的`MethodVisitor`直接编写各属性的`get/set`方法生成class文件，然后进行执行。

优点：字节码技术，速度快，自定义地处理的属性，其他未处理的属性就不行，提供自己自定义转换逻辑的方式  
缺点：转换逻辑自己写，比较复杂，繁琐；属性名称相同，类型不同，不会拷贝（原始类型和包装类型也被视为类型不同）  

#### 第7种：Dozer框架
使用以上类库虽然可以不用手动编写`get/set`方法，但是他们都不能对`不同名称`的对象属性进行映射。在定制化的属性映射方面做得比较好的有Dozer，Dozer支持简单属性映射、复杂类型`映射`、`双向映射`、`隐式映射`以及`递归映射`。可使用`xml`或者`注解`进行映射的配置，支持`自动类型`转换，使用方便。但`Dozer底层`是使用reflect包下Field类的set(Object obj, Object value)方法进行属性赋值，执行速度上不是那么理想。

它的`特点`如下：
- 支持多种数据类型自动转换（双向的）
- 支持不同属性名之间转换
- 支持三种映射配置方式（注解方式，API方式，XML方式）
- 支持配置忽略部分属性
- 支持自定义属性转换器
- 嵌套对象深拷贝

#### 第八种：MapStruct框架：
基于JSR269的Java注解处理器，通过注解配置映射关系，在编译时自动生成接口实现类。类似于Lombok的原理一样。
#### 第九种：Orika框架：
支持在代码中注册字段映射，通过javassist类库生成Bean映射的字节码，之后直接加载执行生成的字节码文件。
#### 第十种：ModelMapper框架：
基于反射原理进行赋值或者直接对成员变量赋值。

> 介绍的这些转换方法中，在性能上基本遵循：手动赋值 > cglib	> 反射 > Dozer > 序列化。

在实际项目中，需要综合使用上述方法进行模型转换。
比如较低层的DO，因为涉及到的嵌套对象少，改动也少，所以可以使用BeanUtils直接转。
如果是速度、稳定优先的系统，还是简单粗暴地使用Set、Get实现吧。

### 文献参考
- 本篇学习于慕课网-张小喜老师[手记](http://www.imooc.com/article/293314)
