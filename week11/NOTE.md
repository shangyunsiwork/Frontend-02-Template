学习笔记

## Proxy

Proxy 对象用于定义基本操作的自定义行为

现在应用比较多的是：qiankun、mobx、vue3.0

主要用来实现对象的代理

### 语法

```js
const p = new Proxy(target, handler)
```

1. revocable 可撤销 proxy
```js
var revocable = Proxy.revocable({}, {
  get(target, name) {
    return "[[" + name + "]]";
  }
});
var proxy = revocable.proxy;
proxy.foo;              // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // 抛出 TypeError

proxy.foo = 1           // 还是 TypeError
delete proxy.foo;       // 又是 TypeError
typeof proxy            // "object"，因为 typeof 不属于可代理操作

```

2. 拦截器

```js
handler.getPrototypeOf() // Object.getPrototypeOf 方法的捕捉器。
handler.setPrototypeOf() //Object.setPrototypeOf 方法的捕捉器。
handler.isExtensible() // Object.isExtensible 方法的捕捉器。
handler.preventExtensions() //Object.preventExtensions 方法的捕捉器。
handler.getOwnPropertyDescriptor() //Object.getOwnPropertyDescriptor 方法的捕捉器。
handler.defineProperty() //Object.defineProperty 方法的捕捉器。
handler.has() //in 操作符的捕捉器。
handler.get() //属性读取操作的捕捉器。
handler.set() //属性设置操作的捕捉器。
handler.deleteProperty() //delete 操作符的捕捉器。
handler.ownKeys() // Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
handler.apply() //函数调用操作的捕捉器。
handler.construct() //new 操作符的捕捉器。
```

