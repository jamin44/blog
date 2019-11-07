---
layout: post
title: Java 注解
categories: [Java]
tags: [java]
summary: Java注解又称为标注，是Java提供了一种原程序中的元素关联任何信息和任何元数据的途径和方法。
---

## 前文
Java注解又称为标注，是Java提供了一种原程序中的元素关联任何信息和任何元数据的途径和方法。Java中的类、方法、变量、参数、包都可以被注解。

## 正文

### Java中常见注解
1. @interface注解：
```
1.表示定义的是一个注解(不是类，也不是接口)；
2.成员要以无参无异常的方式声明；
3.可以用default为成员指定一个默认值；
4.成员类型受限制，合法的类型包括原始数据类型和String(常用),Class,Annotation,Enumeration；
5.如果注解只有一个成员，则该成员名必须为value()，在使用时可忽略成员名和赋值号(=)；
6.注解类可以没用成员，此时该注解被称为“标识注解”；
```

1. 元注解
```java
@Target(ElementType.ANNOTATION_TYPE)  注解的作用域
TYPE //Class,interface  类和接口
FIELD //Field  declaration 字段声明
METHOD //Method  declaration 方法声明
PARAMETER //Formal  parameter  declaration 参数声明
CONSTRUCTOR //Constructor  declaration 构造方法
LOCAL_VARIABLE //Local  variable  declaration 局部变量
ANNOTATION_TYPE //Annotation  type  declaration 注解类型声明
PACKAGE //Packagedeclaration 包声明
```
```java
@Retention(RetentionPolicy.RUNTIME)  注解的生命周期
SOURCE //Annotations are to be discarded by the compiler 
        //只在源代码显示，编译时会放弃
CLASS //Annotations are to be recorded in the class file by the compiler. 
        //But need not be retained by the VM at runtime. This is the default behavior. 
        //编译时会记录到class中，运行时忽略
RUNTIME //Annotations are to be recorded in the class file by the compiler and retained
        //by the VM at runtime, so they may be read reflectively. 
        //运行时存在，可以通过反射读取
```
```java
@Inherited 
//允许子类继承
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Inherited {
}
```
```java
@Documented 
//生成javadoc时会包含注解信息
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Documented {
}
```


1. JDK中自带注解
```java
@Override 
//一般在实现了接口的方法上标识，作用是告诉编译器该方法是接口的方法。该方法的确覆盖或实现了在超类型中声明的方法。
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}
```
```java
@Deprecated 
//一般在接口中的方法上进行标识，作用是该方法过时了。
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
public @interface Deprecated {
}
```
```java
@Suppvisewarnings 
//忽视警告，@SuppressWarnings("deprecation")
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

### 常见第三方注解
```java
@Autowired
//@Service可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。 
//通过@Autowired的使用来消除set()、get()方法,使得接口可以被容器注入
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {
    boolean required() default true;
}
```
```java
@Resource
//@Resource的作用相当于@Autowired
//只不过@Autowired按byType自动注入，而@Resource默认按byName自动注入
@Target({TYPE, FIELD, METHOD})
@Retention(RUNTIME)
public @interface Resource {
    String name() default "";
    Class<?> type() default java.lang.Object.class;
}
//@Resource有两个属性是比较重要的，分是name和type。
//Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。
//所以如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。
//如果既不指定name也不指定type属性，这时将通过反射机制使用byName自动注入策略。
@Resource装配顺序
//1. 如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常
//2. 如果指定了name，则从上下文中查找名称（id）匹配的bean进行装配，找不到则抛出异常
//3. 如果指定了type，则从上下文中找到类型匹配的唯一bean进行装配，找不到或者找到多个，都会抛出异常
//4. 如果既没有指定name，又没有指定type，则自动按照byName方式进行装配；
//   如果没有匹配，则回退为一个原始类型进行匹配，如果匹配则自动装配；
```
```java
@Controller
//用于标注控制层组件
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Controller {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}
```
```java
@Service 
//@Service用于标注业务层组件
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}
```
```java
@Repository
//用于标注数据访问组件
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Repository {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}
```
```java
@Component
//泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Indexed
public @interface Component {
    String value() default "";
}
```

### 使用注解的语法
```java
@<注解名>(<成员名1>=<成员值1>, <成员名2>=<成员值2>, …)
@Description(desc="I am little bird", author="jermi", age=1)
public String bird(){
	return "bird";
}
```