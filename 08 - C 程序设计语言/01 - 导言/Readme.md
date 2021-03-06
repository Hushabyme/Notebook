

# 第 1 章 导言

本章不准备完整、详细地讨论 C 语言中的一些技术（当然，这里所举的所有例子都是正确的） 。为此，本章将重点介绍一些基本概念，比如变量与常量、算术运算、控制流、函数、基本输入／输出等。 而对于编写较大型程序所涉及到的一些重要特性，比如指针、结构、C 语言中十分丰富的运算符集合、部分控制流语句以及标准库等，本章将暂不做讨论。 

初学者应编写一些类似的小程序作为本章内容的补充练习。无论是经验丰富的程序员还是初学者，都可以把本章作为后续各章详细讲解的内容的框架。 

## 1.1 入门

学习一门新程序设计语言的惟一途径就是使用它编写程序。对于所有语言的初学者来说，
编写的第一个程序几乎都是相同的，即： "Hello World"。

尽管这个练习很简单，但对于初学语言的人来说，它仍然可能成为一大障碍，因为要实现这个目的，我们首先必须编写程序文本，然后成功地运行编译，并加载、运行，最后输出到某个地方。掌握了这些操作细节以后，其它事情就比较容易了。 

在 C 语言中，我们可以用下列程序打印出 “hello, world” ： 

```c
#include <stdio.h>  // 包含标准库的信息

main()  // 定义名为 main 的函数，它不接受参数值
{  // main 函数的语句都被括在花括号中
  printf("hello, world\n");  // main 函数调用库函数 printf 以显示字符序列；
}  // \n 代表换行符
```

下面对程序本身做些说明。 

**一个 C 语言程序，无论其大小如何，都是由函数和变量组成的。函数中包含一些语句，以指定所要执行的计算操作；变量则用于存储计算过程中使用的值。** 

在本例中，函数的名字为 main。**通常情况下，函数的命名没有限制**，但 main 是一个特殊的函数名——每个程序都从 main 函数的起点开始执行，这意味着每个程序都必须在某个位置包含一个 main 函数。 

main 函数通常会调用其它函数来帮助完成某些工作，被调用的函数可以是程序设计人员自己编写的，也可以来自于函数库。 

例如上述程序段中的第一行语句：`include <stdio.h>` ，就是用于告诉编译器在本程序中包含标准输入／输出库的信息。 

函数之间进行数据交换的一种方法是调用函数向被调用函数提供一个值（称为参数）列表。函数名后面的一对圆括号将参数列表括起来。在本例中，main 函数不需要任何参数，因此用空参数表 () 表示。 

函数中的语句用一对花括号 {} 括起来。本例中的 main 函数仅包含下面一条语句： 

```c
printf("hello, world\n");
```

调用函数时，只需要使用函数名加上用圆括号括起来的参数表即可。上面这条语句将 "hello,
world\n"。作为参数调用 printf 函数。`printf` 是一个用于打印输出的库函数，在此处，它打印双引号中间的字符串。   

在 C 语言中，字符序列\n 表示换行符，在打印中遇到它时，输出打印将换行，从下一行的左端行首开始。 如果用程序的换行代替 \n，例如： 

```c
printf("hello, world
");
```

C 编译器将会产生一条错误信息。 

请注意，\n 只代表一个字符。类似于\n 的转义字符序列为表示无法输入的字符或不可见字符提供了一种通用的可扩充的机制。除此之外，C 语言提供的转义字符序列还包括：\t 表示制表符；\b 表示回退符；\"表示双引号；\\表示反斜杠符本身。 

## 1.2 变量与算术表达式 

**在 C 语言中，所有变量都必须先声明后使用**。声明通常放在函数起始处，在任何可执行语句之前。声明用于说明变量的属性，它由一个类型名和一个变量表组成，例如： 

```c
int a,b;
int sum;
```

其中，类型 `int` 表示其后所列变量为整数，与之相对应的，`float` 表示所列变量为浮点数 （即，可以带有小数部分的数）。int 与 float 类型的取值范围取决于具体的机器。 

> 对于 int 类型，通常为 16 位，其取值范围在 -32768～32767 之间，也有用 32 位表示的 int 类型。float 类型通常是 32 位，它至少有 6 位有效数字，取值范围一般在 10^-38^ ～10^38^之间。 

除 int 与 float 类型之外，C 语高还提供了其它一些基本数据类型，这些数据类型对象的大小也取决于具体的机器。 例如： 

```c
char 字符（一个字节）
short 短整形
long 长整型
double 双精度浮点型
```

## 1.3 for 语句 

对于某个特定任务我们可以采用多种方法来编写程序。 

```c
#include <stdio.h>

int main() {
  for(int a = 1; a < 5; a++) {
    printf("%d", a);
  }
}
```

对于使用 JavaScript 的我来说，这显然并不陌生。for 循环对比与 while 循环最大的好处就是短小精悍。for 循环是对 while 语句的推广，for 循环更加的直观和简练。

在实际编程过程中，可以选择 whi1e 与 for 中的任意一种循环语句，主要要看使用哪一种更清晰。for 语句比较适合初始化和增加步长都是单条语句并且逻辑相关的情形，因为它将循环控制语句集中放在一起，且比 while 语句更紧凑。 

## 1.4 符号常量 

define 指令可以把符号名（或称为符号常量）定义为一个特定的字符串：

```c
#define 名字 替换文本
```

在该定义之后，程序中出现的所有在#define 中定义的名字（既没有用引号引起来，也不是其它名字的一部分）都将用相应的替换文本替换。其中，名字与普通变量名的形式相同：它们都是以字母打头的字母和数字序列；替换文本可以是任何字符序列，而不仅限于数字。 

```c
#include <stdio.h>
#define LOWER 0 /* lower limit of table */
#define UPPER 300 /* upper limit */
#define STEP 20 /* step size */

main()
{
int fahr;
for (fahr = LOWER; fahr <= UPPER; fahr = fahr + STEP)
  printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));
}
```

其中，LOWER、UPPER 与 STEP 都是符号常量，而非变量，因此不需要出现在声明中。**符号常量名通常用大写字母拼写，这样可以很容易与用小写字母拼写的变量名相区别**。

**注意，define 指令行的末尾没有分号**。

如果你学习过更高级的语言，你可以将它视为静态变量。

## 1.5 字符输入／输出 

标准库提供的输入／输出模型非常简单。无论文本从何处输入，输出到何处，其输入／输出都是按照字符流的方式处理。文本流是由多行字符构成的字符序列，而每行字符则由 0 个或多个字符组成，行末是一个换行符。标准库负责使每个输入／输出流都能够遵守这一模型。使用标准库的 C 语言程序员不必关心在程序之外这些行是如何表示的。 

标准库提供了一次读／写一个字符的函数，其中最简单的是 `getchar` 和 `putchar` 两个函数。每次调用时，getchar 函数从文本流中读入下一个输入字符，并将其作为结果值返回。 

### 1.5.1 文件复制 

借助于 getchar 与 putchar 函数，可以在不了解其它输入／输出知识的情况下编写出数量惊人的有用的代码。最简单的例子就是把输入一次一个字符地复制到输出，其基本思想如下： 

```
读一个字符
while (该字符不是文件结束指示符)
输出刚读入的字符
读下一个字符
```

```
#include <stdio.h>

int main() {
  int c;
  c = getchar();
  while(c != EOF) {
    putchar(c);
    c = getchar();
  }
}
```

字符在键盘、屏幕或其它的任何地方无论以什么形式表现，它在机器内部都是**以位模式存储**的。

char 类型专门用于存储这种字符型数据，当然任何整型（int）也可以用于存储字符型数据。  

这里需要解决如何区分文件中有效数据与输入结束符的问题。C 语言采取的解决方法是：在没有输入时，getchar 函数将返回一个特殊值，这个特殊值与任何实际字符都不同。这个值称为 EOF（end of file，文件结束）。我们在声明变量 c 的时候，必须让它大到足以存放 getchar 函数返回的任何值。 这里之所以不把 c 声明成 char 类型，是因为它必须足够大，除了能存储任何可能的字符外还要能存储文件结束符 EOF。因此，我们将 c 声明成 int 类型。 

EOF 定义在头文件 `<stdio.h>` 中，是个整型数，其具体数值是什么并不重要，只要它与任何 char 类型的值都不相同即可。这里使用符号常量，可以确保程序不需要依赖于其对应的任何特定的数值。 

对于经验丰富的 C 语言程序员，可以将上述语句转换为下列较为简洁的写法：

```c
#include <stdio.h>

main() {
  int c;
  while ((c = getchar()) != EOF) {
    putchar(c);
  } 
}
```

以上这段程序将输入集中化，getchar 函数在程序中只出现了一次，这样就缩短了程序，整个程序看起来更紧凑。习惯这种风格后，读者就会发现按照这种方式编写的程序更易阅读。我们经常会看到这种风格。  

### 1.5.2 字符计数 

如果你学习过更高级的语言，那么就会对 `i++` 这样的写法不会陌生，它等价于 `i += 1` 。

## 1.6 函数 

函数为计算的封装提供了一种简便的方法，此后使用函数时不需要考虑它是如何实现的。 

到目前为止，我们所使用的函数（如 printf、getchar 和 putchar 等）都是函数库中提供的函数。

由于本章内容过于分散与不齐，因此不再介绍，后续章节将更详细的讲解。