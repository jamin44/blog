---
layout: post
title: Markdown基础
categories: [Linux]
tags: [markdown]
summary: Markdown是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。
---

## 基础语法

### 1.段落与换行
1. 段落的前后必须是空行  
`空行`指的是行内什么都没有，或者只有空白符（空格或制表符，相邻两行文本，如果中间没有空行会显示在一行中（换行符被转换为空格）
2. 如果需要在段落内加入换行（`<br>`）   
可以在前一行的末尾加入至少两个空格，然后换行写其它的文字
3. Markdown 中的多数区块都需要在两个空行之间。

### 2.标题
1\. Setext 形式  
```markdown
H1
====

H2
----
```
>`=` 和 `-` 的数量是没有限制的。通常的做法是使其和标题文本的长度相同，这样看起来比较舒服。或者可以像我一样，用四个 `-` 或 `=`。  
>Setext 形式只支持 `h1` 和 `h2` 两种标题。

2\. atx 形式
① 可以用对称的 `#` 包括文本：

```markdown
####H4####

#####H5#####
```

② 也可以只在左边使用 `#`：

```markdown
####H4

#####H5
```

③ 成对的 `#` 左侧和只在左边使用的 `#` 左侧都不可以有任何空白，但其内侧可以使用空白。

```markdown
 ###左侧使用了空格###

#### 内侧使用了空格
```  

>在这一点上，可能各种 Markdown 的实现会有不同的结果，不过仍然需要我们遵守语法规则。

### 3.引用
1\. 引用内容  
在段落或其他内容前使用 `>` 符号，就可以将这段内容标记为 '引用' 的内容（`<blockquote>`）：
```markdown
>引用内容
```
>引用内容

2\. 多行引用
```markdown
>多行引用
>可以在每行前加 `>`  
```
>多行引用  
>可以在每行前加 `>`  

```markdown
>如果仅在第一行使用 `>`，
后面相邻的行即使省略 `>`，也会变成引用内容
```

>如果仅在第一行使用 `>`，  
后面相邻的行即使省略 `>`，也会变成引用内容

```markdown
>如果引用内容需要换行，  
>可以在行尾添加两个空格
>
>或者在引用内容中加一个空行
```

>如果引用内容需要换行，  
>可以在行尾添加两个空格  
> 
>或者在引用内容中加一个空行  

3\. 嵌套引用
```markdown
>也可以在引用中
>>使用嵌套的引用
```
>也可以在引用中  
>>使用嵌套的引用  

4\. 其他 Markdown
```markdown
>在引用中可以使用使用其他任何 *Markdown* 语法
```
>在引用中可以使用使用其他任何 *Markdown* 语法

### 4.列表
1\. 无序列表
```markdown
* 可以使用 `*` 作为标记
+ 也可以使用 `+`
- 或者 `-`
```
* 可以使用 `*` 作为标记
+ 也可以使用 `+`
- 或者 `-`

2\. 有序列表  
```md
1. 有序列表以数字和 `.` 开始；  
3. 数字的序列并不会影响生成的列表序列；  
4. 但仍然推荐按照自然顺序（1.2.3...）编写。  
```

1. 有序列表以数字和 `.` 开始；
3. 数字的序列并不会影响生成的列表序列；
4. 但仍然推荐按照自然顺序（1.2.3...）编写。

3\. 嵌套的列表
```markdown
1. 第一层
+ 1-1
+ 1-2
2. 无序列表和有序列表可以随意相互嵌套
1. 2-1
2. 2-2
```
1. 第一层
+ 1-1
+ 1-2
2. 无序列表和有序列表可以随意相互嵌套
1. 2-1
2. 2-2

4\. 语法和用法
1. 无序列表项的开始是：符号 空格；
2. 有序列表项的开始是：数字 `.` 空格；
3. 空格至少为一个，多个空格将被解析为一个；
4. 如果仅需要在行前显示数字和 `.`：

```markdown
5\. 可以使用：数字\. 来取消显示为列表
```
5\. 可以使用：数字\\. 来取消显示为列表

>`\*` 的语法专门用来显示 Markdown 语法中使用的特殊字符，参考`字符转义`

### 5.代码
1\. 代码块 - 可以使用缩进来插入代码块:  

    <html> // Tab开头
        <title>Markdown</title>
    </html> // 四个空格开头

    代码块前后需要有至少一个空行，且每行代码前需要有至少一个 Tab 或四个空格；

2\. 行内代码
也可以通过 \`\`，插入行内代码（\` 是 `Tab` 键上边、数字 `1` 键左侧的那个按键）：
例如 `<title>Markdown</title>`

3\. 转换规则
代码块中的文本（包括 Markdown 语法）都会显示为原始内容，而特殊字符会被转换为 HTML [字符实体](https://zh.wikipedia.org/wiki/XML%E4%B8%8EHTML%E5%AD%97%E7%AC%A6%E5%AE%9E%E4%BD%93%E5%BC%95%E7%94%A8%E5%88%97%E8%A1%A8)。


### 6.分隔线
1\. 可以在一行中使用三个或更多的 `*`、`-` 或 `_` 来添加分隔线（`<hr>`）：

```markdown
***
------
___
```

***
------
___

2\. 多个字符之间可以有空格（空白符），但不能有其他字符：

```markdown
* * *
- - -
```

* * *
- - -

### 7.超链接

1\. 行内式

格式为 `[link text](URL 'title text')`。

① 普通链接：

```markdown
[Google](http://www.google.com/)
```

[Google](http://www.google.com/)

② 指向本地文件的链接：

```markdown
[icon.png](./images/icon.png)
```

[icon.png](./images/icon.png)

③ 包含 'title' 的链接:

```markdown
[Google](http://www.google.com/ "Google")
```

[Google](http://www.google.com/ "Google")

>title 使用 ' 或 " 都是可以的。

2\. 参考式

参考式链接的写法相当于行内式拆分成两部分，并通过一个 *识别符* 来连接两部分。参考式能尽量保持文章结构的简单，也方便统一管理 URL。

① 首先，定义链接：

```markdown
[Google][link]
```

[Google][link]

第二个方括号内为链接独有的 *识别符*，可以是字母、数字、空白或标点符号。识别符是 *不区分大小写* 的；

② 然后定义链接内容：

```markdown
[link]: http://www.google.com/ "Google"
```

[link]: http://www.google.com/ "Google"

其格式为：`[识别符]: URL 'title'`。

>其中，URL可以使用 <\> 包括起来，title 可以使用 ""、''、() 包括（考虑到兼容性，建议使用引号），title 部分也可以换行来写；

>链接内容的定义可以放在同一个文件的 *任意位置*；

③ 也可以省略 *识别符*，使用链接文本作为 *识别符*：

```markdown
[Google][]
[Google]: http://www.google.com/ "Google"
```

[Google][]
[Google]: http://www.google.com/ "Google"

>参考式相对于行内式有一个明显的优点，就是可以在多个不同的位置引用同一个 URL。

3\. 自动链接

使用 `<>` 包括的 URL 或邮箱地址会被自动转换为超链接：

```markdown
<http://www.google.com/>

<123@email.com>
```

<http://www.google.com/>

<123@email.com>

该方式适合行内较短的链接，会使用 URL 作为链接文字。邮箱地址会自动编码，以逃避抓取机器人。

### 8.图片
插入图片的语法和插入超链接的语法基本一致，只是在最前面多一个 `!`。也分为行内式和参考式两种。

1\. 行内式


```markdown
![GitHub](https://avatars3.githubusercontent.com/u/33784785?s=100&v=3 "GitHub,Social Coding")
```

![GitHub](https://avatars3.githubusercontent.com/u/33784785?s=100&v=3 "GitHub,Social Coding")

方括号中的部分是图片的替代文本，括号中的 'title' 部分和链接一样，是可选的。

2\. 参考式


```markdown
![GitHub][github]

[github]: https://avatars3.githubusercontent.com/u/33784785?s=100&v=3 "GitHub,Social Coding"
```

![GitHub][github]

[github]: https://avatars3.githubusercontent.com/u/33784785?s=100&v=3 "GitHub,Social Coding"

3\. 指定图片的显示大小

Markdown 不支持指定图片的显示大小，不过可以通过直接插入`<img />`标签来指定相关属性：

```html
<img src="https://avatars3.githubusercontent.com/u/33784785?s=100&v=3" alt="GitHub" title="GitHub,Social Coding" width="50" height="50" />
```

<img src="https://avatars3.githubusercontent.com/u/33784785?s=100&v=3" alt="GitHub" title="GitHub,Social Coding" width="50" height="50" />


### 9.强调
1\. 使用 `* *` 或 `_ _` 包括的文本会被转换为 `<em></em>` ，通常表现为斜体：

```markdown
这是用来 *演示* 的 _文本_
```

这是用来 *演示* 的 _文本_

2\. 使用 `** **` 或 `__ __` 包括的文本会被转换为 `<strong></strong>`，通常表现为加粗：

```markdown
这是用来 **演示** 的 __文本__
```

这是用来 **演示** 的 __文本__

3\. 用来包括文本的 `*` 或 `_` 内侧不能有空白，否则 `*` 和 `_` 将不会被转换（不同的实现会有不同的表现）：

```markdown
这是用来 * 演示* 的 _文本 _
```

这是用来 * 演示* 的 _文本 _

4\. 如果需要在文本中显示成对的 `*` 或 `_`，可以在符号前加入 `\` 即可：

```markdown
这是用来 \*演示\* 的 \_文本\_
```

这是用来 \*演示\* 的 \_文本\_

5\. `*`、`**`、`_` 和 `__` 都必须 *成对使用* 。



### 10.字符转义
[Markdown 标准](http://daringfireball.net/projects/markdown/syntax 'Markdown: Syntax') 本身所包含的功能有限，所以产生了许多第三方的扩展语法，如 [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)。  
这里只介绍众多扩展语法中的一部分内容，它们在不同平台或工具的支持程度不同，请参考具体平台或工具的文档和说明来使用。

1. [删除线](strikethrougn.md)
2. [代码块和语法高亮](code-blocks-and-highlighting.md)
3. [表格](table.md)
4. [Task List](task-list.md)

- CommonMark
[CommonMark](http://commonmark.org/) 试图将碎片化的 Markdown 实现和扩展进行标准化，提供统一的 [规范](http://spec.commonmark.org/) 及不同语言的 [实现](http://code.commonmark.org/) 。

## 扩展语法

### 1.删除线
```markdown
这就是 ~~删除线~~
```

这就是 ~~删除线~~
### 2.代码块和语法高亮
1\. 代码块
与原来使用缩进来添加代码块的语法不同，这里使用 \`\`\` \`\`\` 来包含多行代码：

```
<p>code here</p>
```

>三个 \`\`\` 要独占一行。

2\. 代码高亮

在上面的代码块语法基础上，在第一组 \`\`\` 之后添加代码的语言，如 'javascript' 或 'js'，即可将代码标记为 `JavaScript`：

```js
window.addEventListener('load', function() {
  console.log('window loaded');
});
```

### 3.表格
1\. 单元格和表头

使用 `|` 来分隔不同的单元格，使用 `-` 来分隔表头和其他行：

```markdown
name | age
---- | ---
Zhangsan | 13
Lisi | 14
```

name | age
---- | ---
Zhangsan | 13
Lisi | 14

为了美观，可以使用空格对齐不同行的单元格，并在左右两侧都使用 `|` 来标记单元格边界：

```markdown
|    name    | age |
| ---------- | --- |
| zhangsan   |  13 |
| Listsi     |  14 |
```

|    name    | age |
| ---------- | --- |
| zhangsan   |  13 |
| Listsi     |  14 |

>为了使 Markdown 更清晰，`|` 和 `-` 两侧需要至少有一个空格（最左侧和最右侧的 `|` 外就不需要了）。

2\. 对齐


在表头下方的分隔线标记中加入 `:`，即可标记下方单元格内容的对齐方式：

+ `:---` 代表左对齐
+ `:--:` 代表居中对齐
+ `---:` 代表右对齐

```markdown
| left | center | right |
| :--- | :----: | ----: |
| aaaa | bbbbbb | ccccc |
| a    | b      | c     |
```

| left | center | right |
| :--- | :----: | ----: |
| aaaa | bbbbbb | ccccc |
| a    | b      | c     |

>如果不使用对齐标记，单元格中的内容默认左对齐；表头单元格中的内容会一直居中对齐（不同的实现可能会有不同表现）。

3\. 插入其他内容

表格中可以插入其他 Markdown 中的行内标记：

```markdown
|    project   |             blog                |
| ------------ | ------------------------------- |
| _ZeffonWu_   | [ZeffonWu](https://github.com/ZeffonWu) |
| __Blog__     | [Blog](https://github.com/ZeffonWu/ZeffonWu.github.io)  |
```

|    project   |             blog                |
| ------------ | ------------------------------- |
| _ZeffonWu_   | [ZeffonWu](https://github.com/ZeffonWu) |
| __Blog__     | [Blog](https://github.com/ZeffonWu/ZeffonWu.github.io)  |


### 4.Task List
```markdown
- [ ] Eat
- [x] Code
  - [x] HTML
  - [x] CSS
  - [x] JavaScript
- [ ] Sleep
```

- [ ] Eat
- [x] Code
  - [x] HTML
  - [x] CSS
  - [x] JavaScript
- [ ] Sleep

## 格式转换

### 1.HTML
1\. MdCharm


选择 'File', 'Export to...'，勾选 'HTML', 点击 'Browser...' 选择导出目录并输入导出的文件名，点击 'OK'，即可将当前的 Markdown 文档转换为 HTML 文档。

如果不满意 HTML 文档的样式，可以在设置中自定义 CSS。

2\. Pandoc


参考 [Installing](http://pandoc.org/installing.html) 安装 Pandoc。

打开命令行，进入文档所在目录：

```
cd /path/to/file/
```

执行下面的命令，将 Markdown 转换为 HTML：

```
pandoc -o hello.html hello.md
```

>默认的转换，只是将 Markdown 内容转换为 HTML 标签，所以只能看到浏览器的默认样式。

可以执行下面的命令，为导出的 HTML 添加自定义样式：

```
pandoc -o hello.html -c style.css hello.md
```

>`style.css` 仍然是以 `<link>` 的方式关联到 HTML 文档中的，所以在发布的时候需要将 CSS 一同发布出去。


### 2.PDF
1\. MdCharm


与导出 HTML 文档类似，选择 'File', 'Export to...'，勾选 'PDF', 点击 'Browser...' 选择导出目录并输入导出的文件名，点击 'OK'，即可将当前的 Markdown 文档转换为 PDF 文档。

如果不满意 PDF 文档的样式，可以在设置中自定义 CSS。

1\. Pandoc


使用 Pandoc 导出 PDF 文档，需要先安装某个 LaTeX 引擎（参考 [Creating a PDF](http://pandoc.org/README.html#creating-a-pdf)）。然后执行命令：

```
pandoc -o hello.pdf hello.md
```

当然，也可以通过 `-c style.css` 来指定样式文件。

1\. Chrome


在将 Markdown [转换为 HTML 文档](html.md) 之后，可以通过 [Chrome 浏览器](https://www.google.com/chrome/) 打开它。选择 '打印'（Ctrl+P），然后更改 '目标打印机' 为 '另存为 PDF'，再进行一些设置后，即可保存为 PDF 文档。


### 3.Word
1\. 复制粘贴
在导出为 HTML 文档之后，可以（在浏览器中）手动复制 HTML 页面的内容，然后粘贴到 Word 文档中，保存即可。

1\. Pandoc
执行下面的命令，即可将 Markdown 文档转换为 Word 文档：

```
pandoc -o hello.docx hello.md
```


## 参考文献
Github-LearnShare-[Learning-Markdown](https://github.com/LearnShare/Learning-Markdown)