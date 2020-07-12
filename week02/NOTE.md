学习笔记


### 产生式
```
编程语言都是遵循对应的产生式来设计。

BNF四种文法

0 型 无限制文法
1 型 上下文相关文法
2 型 上下文无关文法
3 型 正则文法

js从设计上实际上是根据上下文无关文法来设计的，对于get、set等特例，实际上是按照上下问相关文法来设计
```

### 编程语言
```
编程语言必备图灵完备性

命令式： goto  if  while

声明式： 递归
```
#### 一般命令式编程语言

##### 原子
    变量名
    字符串/数字直接量

##### 表达式  
    原子 + 操作符 + 符号

##### 语句
    表达式  + 关键字 + 操作符

##### 结构化
    function / class 

##### Program
    用来组织代码   有的语言有 有的没有


### js 类型
```
Boolean Number String Object Null Symbol Undefined
```
#### Number
```
1 位符号位    0 正 / 1 负
11 位指数位   
52 位精度位

10000000000 > n  负
10000000000 < n  正

指数位范围
2 * 11 - 1  ~ 2 * 10

```

#### String
```
字符集
ASCII
GB
Unicode

编码方式
UTF-8

UTF-16

```

#### Boolean
```
true false
```

#### Null Undefined

```
Null 空值
Undefined 未定义
```

#### 对象

```
对象属性包括

  数据属性：
    [[value]]  writable  enumerable configurable

  访问属性： 
    get set enumerable configurable
  

访问：
  当我们访问属性时，如果当前对象没有，则会沿着当前对象的原型查找 


```

#### 宿主对象

```
宿主环境提供的对象 settimeout...
```
