# XMLHttpRequest

## 1. 简介

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

#### 2.1. 构造函数（Constructors）

> *client*  = new XMLHttpRequest()
>
> 返回一个新的 XMLHttpRequest 对象。

XMLHttpRequest() 构造函数在被调用时必须返回一个新的 XMLHttpRequest 对象。

####  2.2. 垃圾回收机制（Garbage collection）

XMLHttpRequest 对象如果处于opened 状态，即拥有 send() 标志、接收响应头、或加载中之一的状态时，或者 XMLHttpRequest 对象拥有一个或多个事件监听注册时（其中事件类型包括 readystatechange、progress、abort、error、load、timeout 和 loadend），XMLHttpRequest 对象都不会被垃圾回收。

如果 XMLHttpRequest 对象在其连接仍然打开时被垃圾回收，则用户代理必须终止请求。

#### 2.3. 事件处理程序（Event handlers）

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

#### 2.4. 状态（States）

> *client* . readyState
>
> 返回客户端的状态

readyState 属性的 getter 必须从第一列的单元格中的值为上下文对象的状态的行返回第二列单元格中的下表中的值：	

|        状态        |           状态码            | 描述                                       |
| :--------------: | :----------------------: | :--------------------------------------- |
|      unsent      |      UNSENT (数值为 0)      | 该对象已经被创建。                                |
|      opened      |      OPENED (数值为 1)      | open() 方法已经成功被调用。 在这种状态请求期间，可以使用setRequestHeader() 设置头文件，并且可以使用 send() 方法初始化获取文件。 |
| headers received | HEADERS_RECEIVED (数值为 2) | 所有的重定向（如果有）已经被遵循，并且已经接收到响应的所有 HTTP 头。    |
|     loading      |     LOADING (数值为 3)      | 响应的主体已经被接收。                              |
|       done       |       DONE (数值为 4)       | 数据传输已完成或传输过程中出现问题（例如无限重定向）。              |

#### 2.5. 请求（Request）

### 2.1. open() 方法

每个 XMLHttpRequest 对象具有以下请求相关概念：**请求方法，请求URL，请求头，请求主体，同步标志，上传完成标志和上传监听标志** 。	

请求头是一个初始化为空的头列表。

请求主体初始化为 null。

同步标志、上传完成标志和上传监听标志初始化为未设置（unset）。

> *client* . open (*method, url [, async = true [, username = null [, password = null ]]]*)
>
> 设置请求方法、请求的 URL，以及同步标志。
>
> 如果 *method* 不是合法的 HTTP 方法或 *url* 不能被解析，则抛出 **SyntaxError** 异常。
>
> 如果 *method* 是没有区分大小写的匹配（例如 CONNECT、TRACE 或 TRACK），则抛出 **SecurityError** 异常。
>
> 如果 *async* 为 false，目前的全局对象是 **Window** 对象，并且 timeout 属性不为零活 responseType 属性不是空字符串，则抛出  **InvalidAccessError** 异常。

**open (*method, url*) **和 **open (method, url, async, username, password)** 方法在调用时，将执行以下步骤：

1. 如果如果上下文对象的相关设置对象（每个全局对象都与相应的环境设置对象一起创建，那就是它的相关设置对象）具有负责任的文档（分配由使用此环境设置对象的脚本执行的操作的文档），并且它不完全活动，则抛出 InvalidStateError 异常。

2. 如果 *method* 不是一个方法，则抛出 SyntaxError 异常。

3. 如果 *method* 是一个被禁止的方法，则抛出 SecurityError 异常。

4. 规范化 *method* 。

5. 使 *parsedURL* 为上下文对象中相关设置对象的 API 基础 URL  解析后 *url* 作为结果。

6. 如果 *parsedURL* 失败，则抛出 SyntaxError 异常。

7. 如果忽略 *async* 参数，则将 *async* 设置为 true，并将 *username* 和 *password* 设置为 null。

8. 如果 *parsedURL* 的 host 不为空，再执行下列的步骤：

   1. 如果 *username* 参数不为 null，则设置用户名为所给的 *parsedURL* 和 *username* 。
   2. 如果 *password* 参数不为 null，则设置密码为所给的 *parsedURL* 和 *password* 。

9. 如果 *async* 为 false，目前的全局对象为 Window 对象，并且 timeout 属性值不为零或 responseType 属性值不为空字符串，接着则抛出 InvalidStateError 异常。

10. 终止请求。

  > 此时可以提取数据。

11. 设置与对象关联的变量，如下所示：

    - 未设置 send() 标志、停止 timeout 标志和上传监听标志。
    - 为 *method* 设置请求方法。
    - 为 *parsedURL* 设置请求 URL。
    - 如果 *async* 为 false，设置同步标志；否则，不设置同步标志。
    - 清空请求头。
    - 为网络错误设置响应。
    - 将接收到的字节设置为空字节序列。
    - 将响应对象设置为 null。

12. 如果当前状态不为 *opened* ，则执行下列操作：

    1. 设置状态为 *opened* 。
    2. 触发名为 readystatechange 的事件。

### 2.2. setRequestHeader() 方法

> *client* . setRequestHeader (*name, value*)
>
> 在请求头中组合头文件。
>
> 如果状态不为 *opened* 或 send() 标志已经设置了，则抛出 InvalidStateError 异常。
>
> 如果 *name* 不是响应头中的名称或 *value* 不是响应头中的值，则抛出 SyntaxError 异常。

> **注意：**如下面的算法所示，某些响应头不能被设置，并且要留给用户代理（user agent）设置。另外还有一些其它响应头，如果 send() 方法部分末尾所指出的那样，用户代理将不会被作者设置。

setRequestHeader (*name, value*) 方法将执行以下步骤：

1. 如果状态不为 *opened* ，则抛出 InvalidStateError 异常。

2. 如果 send() 标志已经设置，则抛出 InvalidStateError 异常。

3. 标准化 *value* 。

4. 如果 *name* 不是响应头中的名称或 *value* 不是响应头中的值，则抛出 SyntaxError 异常。

   > 注意：一个空的字节序列表示一个空的头部值。

5. 如果 *name* 设置为被禁止的头名称，则终止这些步骤。

6. 将 *name/value* 组合进请求头中。

举个例子：

```javascript
// 一些简单的代码演示了两次设置相同响应头时会发生什么：

const client = new XMLHttpRequest();
client.open('GET', 'demo.cgi');
client.setRequsetHeader('X-Test', 'one');
client.setRequsetHeader('X-Test', 'two');
client.send();

// 将会导致发送以下标题：
// X-Test: one, two
```

### 2.3 timeout 属性

> *client* . timeout
>
> 可以设置为毫秒的时间。当设置为非零值时，将在给定时间过去后导致提取终止。当时间已过，请求尚未完成，同步标志未设置，则会调度超时事件，否则将抛出 TimeoutError 异常（对于 send() 方法）。当设置时：如果同步标志被设置并且当前全局对象是 Window 对象，则抛出一个 InvalidAccessError 异常。

timeout 属性必须返回它的值。它的初始值一定为零。

设置 timeout 属性会执行以下步骤：

1. 如果当前全局对象为 Window 对象并且同步标志被设置，则抛出 InvalidStateError 异常。

2. 设置它的值为一个新的值。

   > 这意味着在 fetching 进行时可以设置超时属性。如果发生这种情况，它将仍然相对于开始的 fetching 来测量。

### 2.4. withCredentials 属性

> *client* . withCredentials 
>
> 当用户凭证被包含在跨原始请求中时为 true。而当他们被排除在跨原始请求中，并且 cookie 在其响应中被忽略时，则为 false。初始值为 false。
>
> 当设置时：如果状态不为 *unset* 或 *opened* ，或者 send() 标志被设置，则抛出 InvalidStateError 异常。

withCredentials 属性必须返回它的值，并且初始值为 false。

设置 withCredentials 属性时，将执行以下步骤：

1. 如果当前状态不为 *unset* 或 *opened* ，则抛出 InvalidStateError 异常。

2. 如果 send() 标志被设置，则抛出 InvalidStateError 异常。

3. 设置 withCredentials 属性的值为所给的值。

   > 注意：当获取同源资源时，withCredentials属性不起作用。

### 2.5. upload 属性

> *client* . upload
>
> 返回关联的 XMLHttpRequestUpload 对象。当数据传输到服务器时，可用于收集传输信息。

upload 属性必须返回关联的 XMLHttpRequestUpload 对象。

> 注意：如前所述，每个 XMLHttpRequest 对象都有一个关联的 XMLHttpRequestUpload 对象。

### 2.6. send() 方法

> *client* . send ([body = null])
>
> 用于启动请求。可选参数提供请求主体。如果请求方法为 **GET** 或 **HEAD** ，则该参数将被忽略。
>
> 如果状态不为 *unset* 或 *opened* ，或者 send() 标志被设置，则抛出 InvalidStateError 异常。

send(*body*) 方法执行时，会执行以下步骤：

1. 如果当前状态不为 *opened* ，则抛出 InvalidStateError 异常。

2. 如果 send() 标志被设置，则抛出 InvalidStateError 异常。

3. 如果请求方法为  **GET** 或 **HEAD** ，将 *body* 设置为 null。

4. 如果 body 为 null，则去下一步。

   否则，使 *encoding* 和 *mimeType* 为 null，并且遵循下列规则在 *body* 中开启：

   - Document

     设置 *encoding* 为 'UTF-8'。

     当 *body* 为 HTML 文档时，设置 *mimeType* 为 'text/html'，否则设置为 'application/xml'。然后添加 ';charset=UTF-8' 给 *mimeType* 。

     设置请求主体为 *body* ，并且执行序列化、转换为 Unicode 编码，以及 utf-8 编码格式。

   - BodyInit

     如果 *body* 是字符串，设置  *encoding* 为 'UTF-8'。

     设置请求主体并且 *mimeType* 为提取 *body* 的结果。

   如果 *mimeType* 不为空并且作者的请求头不包含 'Conent-Type'，那么就将 'Conent-Type'/*mimeType* 添加给作者的请求头中。

   否则，如果在作者请求头中的名称为 'Content-Type' 的字节大小写不匹配的标头具有一个有效的 MIME 类型的值，该值具有一个 ’charset‘ 参数，其值不是字节大小写对编码非敏感匹配，*encoding*  不为空，然后设置所有 ’charset‘ 参数，该参数的值不是字节大小写不匹配，用于将该响应头的值的 *encoding*  为 *encoding*。

5. 如果在关联的 XMLHttpRequestUpload 对象上注册了一个或多个事件侦听，则设置上传监听标志。

6. 使 *req* 为一个新的请求，按照下列方式初始化：

   method

   　请求的方法

   url

   　请求的 URL

   响应头列表

   　作者的请求头

   非安全请求标志

   　设置

   主体

   　请求的主体

   客户端

   　上下文对象的相关设置对象

   同步标志

   　参考同步标志的设置

   模式

   　"cors"

   使用 CORS 预检验标志

   　如果 upload 监听标志被设置时，则设置

   凭证模式

   　如果 withCredentials 属性值为 true，则设置为 "include"，否则设置为 "same-origin"

   使用 URL 凭证标志

   　 如果请求 URL 的用户名不为空字符串或请求 URL 的密码不为空，则设置它。

7. 不设置 upload 完成标志。

8. 如果 *req* 的主体为 null，则设置 upload 完成标志。

9. 设置 send() 标志。

10. 如果同步标志未设置，则执行以下步骤：

  1. 触发使用 0 和 0 的名称为 loadstart  的 progress 事件。
  2. 如果 upload 完成标志未设置，并且设置了 upload 监听器标志，则在XMLHttpRequestUpload 对象上使用 0 和 *req* 的正文字节触发名为 loadstart 的进度事件。
  3. 如果当前状态不为 *opened* 或者 send() 标志未设置，则返回。
  4. ​