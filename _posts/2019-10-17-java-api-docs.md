---
layout: post
title: Java API自动生成文档
categories: [Note]
tags: [java]
summary: Java API文档自动生成有swagger2和spring restdocs两种受欢迎的工具。
---

## 前文

## Swagger2的使用
### 介绍
`swagger2`通过配置，会提供了一个url：`http://localhost:8080/v2/api-docs`，返回了所有api的信息。读取这个url，将结果存储到`swagger.json`。利用swagger2markup-maven-plugin插件读取swagger.json，生成一系列`adoc`文件。最后利用asciidoctor-maven-plugin插件将index.adoc文件转成`html`或`pdf`。

### 使用过程
1. 引进依赖包
```xml
	<!-- swagger工具包 -->
	<dependency>
		<groupId>io.springfox</groupId>
		<artifactId>springfox-swagger2</artifactId>
		<version>${swagger.version}</version>
	</dependency>
	<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
	<dependency>
		<groupId>io.springfox</groupId>
		<artifactId>springfox-swagger-ui</artifactId>
		<version>${swagger.version}</version>
	</dependency>
```

1. 在配置application.yml中，用于SwaggerConfig读取。这样可以控制是否开启(线上环境关闭)
```yml
swagger2:
  show: true
```

1. 配置Swagger2（注意扫描的包的路径是否正确，否则会显示不了数据）
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Value("${swagger2.show}")
    private boolean swagger2Show;

    @Bean
    public Docket swaggerSpringMvcPlugin() {
        return new Docket(DocumentationType.SWAGGER_2)
                .enable(swagger2Show)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.zeffon.esave"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("swagger-bootstrap-ui RESTful APIs")
                .version("1.0")
                .build();
    }
}
```

1. 在API类和方法上加注解
```java
@Api(value = "解锁日志")
@RestController
@RequestMapping("/log")
public class UnlockLogAPI {

    private final UnlockLogService unlockLogService;

    @Autowired
    public UnlockLogAPI(UnlockLogService unlockLogService) {
        this.unlockLogService = unlockLogService;
    }

    @GetMapping("/listUnlockLog")
    @ApiOperation(value = "获取用户全部解锁记录", notes = "全部解锁记录", tags = "日志")
    public ResultVOUtil listUnlockLog() {
        List<UnlockLogVO> unlockLog = unlockLogService.listUnlockLog();
        return ResultVOUtil.success(unlockLog);
    }
}
```

1. 实体类和其属性加注解
```java
@Data
@ApiModel(value = "开锁日志", description = "用户每次开锁的记录")
public class UnlockLog extends Base {
    @ApiModelProperty(example = "1", notes = "用户id")
    private Long uid;
}
```

1. 运行程序，在浏览器中打开`http://127.0.0.1:8081/esave/swagger-ui.html#/`

### 注解说明

|API|作用范围|使用位置|
| :----:| :----: | :----: |
|@ApiModel|描述返回对象的意义|用在返回对象类上|
|@ApiModelProperty|对象属性|用在出入参数对象的字段上|
|@Api|协议集描述|用于 controller 类上|
|@ApiOperation|协议描述|用在 controller 的方法上|
|@ApiResponses|Response集|用在 controller 的方法上|
|@ApiResponse|Response|用在 @ApiResponses 里边|
|@ApiImplicitParams|非对象参数集|用在 controller 的方法上|
|@ApiImplicitParam|非对象参数描述|用在 @ApiImplicitParams 的方法里边|

## Spring REST Docs
### 介绍
1. Spring REST Docs的目标替代SpringFox Swagger，帮助自动化生成RESTful服务的文档。
1. 使用Asciidoctor编写的手写文档；Spring REST Docs为RESTful服务生成准确且可读的文档。
1. 将手写文档与使用Spring测试生成的文档片段相结合。
1. 不受Swagger等工具生成的文档的限制。
1. 它可以生成准确，简洁和结构良好的API文档。
1. Spring REST Docs支持测试驱动Test Driven。
1. Spring REST Docs支持Spring MVC Test框架，Spring WebFlux的WebTestClient或REST Assured 3测试驱动。
1. Spring Boot 提供了注解@AutoConfigureRestDocs简化文档开发。

### 使用过程（未完待续）

1. 引进依赖包
```xml
	<dependency>
		<groupId>org.springframework.restdocs</groupId>
		<artifactId>spring-restdocs-mockmvc</artifactId>
		<version>2.0.2.RELEASE</version>
		<scope>test</scope>
	</dependency>
```

### 注解说明



## 总结
1. Swagger2的定位是和应用一起启动的`在线文档`，文档的浏览者可以很简单的填写表单并发起一个`真实`的请求，而 Spring REST Docs 更倾向于导出一份`离线文档`作为展示，并配合 curl、httpie 这种工具请求真实部署的服务。

1. Swagger2最大的特点是`使用简单`，只需要在源码中增加一些描述性的注解即可完成整份文档，而使用 Spring REST Docs 的前提条件是需要在项目中对`API`进行`单元测试`。除了依赖，还需要严格的编写Test测试代码，保证测试代码通过。但是Spring REST Docs生成的文档比较符合于测试团队。

	
## 文献参考

