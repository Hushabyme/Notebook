# XMLHttpRequest

## 1. 介绍

XMLHTTPRequest 对象是一个用于获取（fetching）资源的 API。

XMLHttpRequest 这个名称是历史遗留问题，与其功能无关。

先举一些简单的例子感受一下。

下列的代码用于在网络中从 XML 文档中获取一些数据：

```javascript
function processData(data) {
  // 你所关心的数据
}

function handler() {
  if(this.status === 200 &&
  	 this.responseXML != null &&
  	 this.responseXML.getElementById('test').textContent) {
       // 成功！
       processData(this.responseXML.getElementById('test').textContent)
  } else {
    // 如果运行出错时的处理
  } 
} 

const client = new XMLHttpRequest();
client.onload = handler;
client.open('GET', 'file.xml');
client.send();
```

假如你想记录一些消息给服务器：

```javascript
function log(message) {
  const client = new XMLHttpRequest();
  client.open('POST', '/log');
  client.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
  client.send(message);
} 
```

又或者你想检查文档传给服务器的状态：

```javascript
function fetchStatus(address) {
  const client = new XMLHttpRequest();
  client.onload = function() {
  	// 在网络错误的情况下，这可能不会给出可靠的结果
    returnStatus(this.status);
  }
  client.open('HEAD', address);
  client.send();
}
```

### 1.1 XMLHttpRequest 的历史

XMLHttpRequest 对象最初被定义为 WHATWG HTML 工作的一部分。（基于微软多年前的实现）。它于 2006 年移交给 W3C。到 XMLHttpRequest 的扩展（例如 progress 事件和跨原始请求）是在单独的草案（XMLHttpRequest Level 2）中开发的，直到 2011 年底，此时两个草案合并，XMLHttpRequest 从标准的角度再次成为一个单一的实体。2012 年底，它又回到了WHATWG 中。

## 2. 接口

#### 2.1 构造函数（Constructors）

> client = new XMLHttpRequest()
>
> 返回一个新的 XMLHttpRequest 对象。

XMLHttpRequest() 构造函数在被调用时必须返回一个新的 XMLHttpRequest 对象。

####  2.2 垃圾回收机制（Garbage collection）

XMLHttpRequest 对象如果处于opened 状态，即拥有 send() 标志、接收响应头、或加载中之一的状态时，或者 XMLHttpRequest 对象拥有一个或多个事件监听注册时（其中事件类型包括 readystatechange、progress、abort、error、load、timeout 和 loadend），XMLHttpRequest 对象都不会被垃圾回收。

如果 XMLHttpRequest 对象在其连接仍然打开时被垃圾回收，则用户代理必须终止请求。

#### 2.3 事件处理程序（Event handlers）

|   事件处理程序    |  事件处理类型   |
| :---------: | :-------: |
| onloadstart | loadstart |
| onprogress  | progress  |
|   onabort   |   abort   |
|   onerror   |   error   |
|   onload    |   load    |
|  ontimeout  |  timeout  |
|  onloadend  |  loadend  |

以下是唯一由 XMLHttpRequest 对象作为属性支持的事件处理程序（及其对应的事件处理程序事件类型）：

|       事件处理程序       |      事件处理类型      |
| :----------------: | :--------------: |
| onreadystatechange | readystatechange |

#### 2.4 状态（States）

> client . readyState
>
> 返回客户端的状态

readyState 属性的 getter 必须从第一列的单元格中的值为上下文对象的状态的行返回第二列单元格中的下表中的值：	

|   状态   |     状态码      | 描述                                       |
| :----: | :----------: | :--------------------------------------- |
| unsent | UNSENT(数值为0) | 该对象已经被创建。                                |
| opened | OPENED(数值为1) | <font color=#FF0000>open()</font>方法已经成功被调用。 在这种状态请求期间，可以使用setRequestHeader() 设置头文件，并且可以使用 send() 方法初始化获取文件。 |
|        |              |                                          |
|        |              |                                          |
|        |              |                                          |

​	