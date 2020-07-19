# Week2

## 表达式

### Member

- a.b
- a[b]
- foo`string`
- super.b
- super[b]
- new Target
- new Target()

### New

- new a()()

	- (new a())()

- new new a()

	- new (new a())

### Call

- foo()

	- new a()[`b`]

		- (new a())['b']

- super()
- foo()[`b`]
- foo()`abc`

### Left Handside

### Right headside

- update

	- a++

		- ++ a ++

			- ++ (a ++)

	- ++a
	- a--
	- --a

### unary

- delete
- void
- typeof
- + a
- - a
- ~ a
- ! a
- await a

### exponental

- **

	- 2 ** 1 ** 2

		- 2 ** (1 ** 2)

### multiplicative

- * /

### additive

- + -

### shift 

- >> << >>>

### relationship

- < > <= >= instanceof in

### equality

- == === != !==

### Bitwise

- & | ^

### Logical

- && ||

### Conditional

- ? :

## 语句/声明

### 类型转换

- 'a' + true

	- 'atrue'

- 'false' == false

	- 1 == 0

- undefined 

	- => string

		- 'undefined'

	- => number

		- NaN

- null

	- => string

		- 'null'

	- => number

		- 0

- object

	- => string

		- valueOf toString

		  var o = {
		  	toString(){ return '2'},
		      valueOf(){ return 1},
		      [Symbol.toPrimitive()]:{return 3},
		  }
		  
		  如果有toPrimitive 优先返回
		  若没有 根据语义来返回
		  'x' + o => 'x2'

	- => number

		- valueOf

### Completion Record

- type

	- break; return ; throw; continue;normal

- value

	- 基本类型

- target

	- label

### block

### iteration

### try

## 运行时

### 预处理

### 作用域

## 宏任务、微任务

### 宏任务

- 由宿主环境

### 微任务

- js

### 事件循环

- 执行代码 => 等待 => 获取代码

## 函数调用

### 执行上下文

- async await
- function

	- 闭包

- script、module
- generator
- relam
- 词法环境
- 变量环境

*XMind - Trial Version*
