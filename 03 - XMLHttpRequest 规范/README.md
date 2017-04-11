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

或者你想检查文档传给服务器的状态：

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

### 2.5.1. open() 方法

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

**open (*method, url*)** 和 **open (method, url, async, username, password)** 方法在调用时，将执行以下步骤：

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



### 2.5.2. setRequestHeader() 方法

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

5. 如果 *name* 设置为被禁止的头名称时，则终止这些步骤。

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



### 2.5.3 timeout 属性

> *client* . timeout
>
> 可以设置为毫秒的时间。当设置为非零值时，将在给定时间过去后导致提取终止。当时间已过，请求尚未完成，同步标志未设置，则会调度超时事件，否则将抛出 TimeoutError 异常（对于 send() 方法）。当设置时：如果同步标志被设置并且当前全局对象是 Window 对象，则抛出一个 InvalidAccessError 异常。

timeout 属性必须返回它的值。它的初始值一定为零。

设置 timeout 属性会执行以下步骤：

1. 如果当前全局对象为 Window 对象并且同步标志被设置，则抛出 InvalidStateError 异常。

2. 设置它的值为一个新的值。

   > 这意味着在 fetching 进行时可以设置超时属性。如果发生这种情况，它将仍然相对于开始的 fetching 来测量。



### 2.5.4. withCredentials 属性

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



### 2.5.5. upload 属性

> *client* . upload
>
> 返回关联的 XMLHttpRequestUpload 对象。当数据传输到服务器时，可用于收集传输信息。

upload 属性必须返回关联的 XMLHttpRequestUpload 对象。

> 注意：如前所述，每个 XMLHttpRequest 对象都有一个关联的 XMLHttpRequestUpload 对象。



### 2.5.6. send() 方法

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

   4. 获取 *req* 。处理在下面的网络任务源上排队的任务。

      并行运行这些子步骤：

      1. 等待，直到 *req* 完成标志被设置或者
         1. timeout 属性值从这些子程序开始已经过去的毫秒数
         2. 当 timeout 属性值不为零。

      要处理 *request*  请求主体，就会运行以下子步骤：

      1. 如果从上次调用这些子程序以来，如果不是大约 50ms 已经过去，请终止这些子程序。

      2. 如果 upload 监听标志被设置，那么触发一个名为 progress 的进度事件在 `XMLHttpRequestUpload` 对象上，它带着 *request*  的主体的传输字节和 *request*  的正文的总字节。

         > 注意：只有当发送新的字节时，才会调用这些子信息。

      如果要处理 *request*  的请求终端请求，请运行以下子步骤：

      1. 设置 upload 完成标志。
      2. 如果 upload 监听标志未设置，然后终止这些子步骤。
      3. 使 *transmitted* 为  *request*  的主体的传输字节。
      4. 使 *length* 为 *request*  的主体的总子节。
      5. 在携带 *transmitted* 和 *length* 的 `XMLHttpRequestUpload` 对象上触发一个名为 progress 的进度事件。
      6. 在携带 *transmitted* 和 *length* 的 `XMLHttpRequestUpload` 对象上触发一个名为 load的进度事件。
      7. 在携带 *transmitted* 和 *length* 的 `XMLHttpRequestUpload` 对象上触发一个名为 loadend 的进度事件。

      如果要处理 *response* 的响应，则运行以下子步骤：

      1. 如果停止 timeout 标志未设置，则设置停止 timeout 标志。

      2. 为 *response* 设置响应。

      3. 为 *response* 处理错误信息。

      4. 如果响应产生了网络错误，则返回。

         > 注：网络错误是指 status 始终为 0 的状态消息，状态消息始终为空字节序列，头列表始终为空，主体始终为空，头列表始终为空。

      5. 设置 state 为 *headers received* 。

      6. 触发名为 readystatechange 事件。

      7. 如果 state 不为 *headers received* ，则返回。

      8. 如果 *response* 的主体为空，那么则运行处理响应终端（response end-of-body）并返回。

      9. 使 *reader* 为从 *response* 的主体的 stream 中得到的 reader 的结果。

         > 注意：此操作将不会抛出异常。

      10. 使 *read* 为从携带 *reader* 的 *response* 的主体中的 reading of chunk 的结果。

          当 *read* 为带着 `done` 属性为 false 并且 `value` 属性为 `Uint8Array` 对象的对象完成时，运行这些子步骤，然后再次运行上面的子步骤：

          1. 添加 `value` 属性给 received bytes。

          2. 如果从上次调用这些子程序以来，如果不是大约 50ms 已经过去，请终止这些子程序。

          3. 如果 state 为 *headers received* ，设置 state 为 *loading* 状态。

          4. 触发名为 readystatechange 事件。

          5. 触发一个名为 progress 的进度事件在 `XMLHttpRequestUpload` 对象上，它带着 *request*  的主体的传输字节和 *request*  的正文的总字节。

             > 注意：仅当传输新的字节时，才会调用这些子条目。

      当 *read* 带着 `done` 属性为 true 的对象完成（fulfilled）时，则运行 *response* 的处理响应终端。

      当 *read* 带着异常失败（rejected）时，则运行 *response* 的处理响应终端。

11. 否则，如果同步标志设置时，则运行以下子步骤：

    1. 使 *response* 为获取 *req* 的结果。

       如果 timeout 属性不为零，并且如果没有在 timeout 的属性值的毫秒数范围内返回 *timeout* 原因，则终止此获取（fetch）。

    2. 如果 *response* 的主体为空，那么则运行处理响应终端（response end-of-body）并返回。

    3. 使 *reader* 为从 *response* 的主体的 stream 中得到的 reader 的结果。

    4. 使 *promise* 为从 *response* 的主体的 stream 中的 reading all bytes。

    5. 等待 *promise* 为 fulfilled 或 rejected。

    6. 如果 *promise* 带着 *bytes* fulfilled，那么添加 *bytes* 到接收字节中。

    7. 为 *response* 运行处理响应终端。

**当为 *response* 处理响应终端时，运以下步骤：**

1. 如果同步标志已设置，设置响应为 *response* 。
2. 为 *response* 处理错误信息。
3. 如果响应产生网络错误，则返回。
4. 如果同步标志未设置，则使用 *response*  更新响应主体。
5. 使 *transmitted* 为  *request*  的主体的传输字节。
6. 使 *length* 为 *request*  的主体的总子节。
7.  *transmitted* 和 *length* 触发一个名为 progress 的进度事件。
8. 设置 state 为 `done` 。
9. 不设置 send() 标志。
10. 触发 readystatechange 事件。
11. *transmitted* 和 *length* 触发一个名为 load 的进度事件。
12. *transmitted* 和 *length* 触发一个名为 loadend 的进度事件。

为 *response* 处理错误时运行以下步骤：

1. 如果 send() 标志未设置，则返回。

2. 如果 *response* 产生网络错误，则为事件的错误信息运行请求错误步骤，并且抛出 `NetworkError` 异常。

3. 否则，如果 *response* 有一个终止原因：

   end-user abort

   　为事件 abort 运行请求错误步骤并且抛出 `AbortError` 异常。

   fatal

   　1. 设置 state 为 `done` 。
   　2. 不设置 send() 标志。
   　3. 设置响应为网络错误。

   timeout

   　为事件 timeout 运行请求错误步骤，并且抛出 `TimeoutError` 异常。

事件 *event* 的请求错误步骤，以及异常 *exception* 的操作：

1. 设置 state 为 `done` 。

2. 不设置 send() 标志。

3. 设置响应为网络错误。

4. 如果同步标志已设置，抛出一个 *exception* 异常。

5. 触发  readystatechange 事件。

   > 在此情况下，同步标志为未设置。

6. 如果 upload 完成标志未设置，则遵循以下步骤：

   1. 设置 upload 完成标志。
   2. 如果 upload 监听标志未设置，则终止下列子步骤。
   3. 在 `XMLHttpRequest` 上触发携带 0 和 0 的 *event* 的进度事件。
   4. 在 `XMLHttpRequest` 上触发携带 0 和 0 的 loadend 的进度事件。

7. 触发携带  0 和 0 的 *event* 事件。

8. 触发携带  0 和 0 的 loadend 事件。

### 2.5.7. abort() 方法

> *client* . abort()
>
> 取消任何的网络活动。

当 **abort()** 方法被调用时，则运行以下步骤：

1. 终止请求。

2. 如果 state 为带着 send() 标志设置完成的 *opened* ，或为 *headers received* ，或 *loading* 三者中任意之一，则为事件 abort 运行请求错误步骤。

3. 如果 state 为 *done* ，则设置 state 为 *unsent* 并且响应为网络错误。

   > 注意：此时 readystatechange 事件没有被分配（dispatch）。

#### 2.6. 响应（Response）

XMLHttpRequest 与 **response** 紧紧相连。除非另有说明，否则为网络错误。

XMLHttpRequest 同时也与 **received bytes**（一个字节序列）紧紧相连。除非另有说明，否则为空序列。

### 2.6.1. responseURL 属性

如果响应的 url 为空，responseURL 属性会返回空字符串，否则带着 *exclude fragment flag* 设置序列化。

### 2.6.2. status 属性

status 属性返回响应的状态。

### 2.6.3. statusText 属性

statusText 属性返回响应的状态信息。

### 2.6.4. getResponseHeader 方法

getResponseHeader(*name*) 方法会执行以下步骤：

1.  如果响应的头列表不包含 *name* ，则返回 null。

2. 否则，返回与所给的 *name* 相关联的值以及响应的头列表。

   > 注意：Fetch 标准过滤了响应的头列表。

例如：

```javascript
const client = new XMLHttpRequest();
client.open("GET", "unicorns-are-teh-awesome.txt", true);
client.send();

client.onreadystatechange = function() {
  if(this.readyState == this.HEADERS_RECEIVED) {
    console.log(client.getResponseHeader("Content-Type"));
    // text/plain; charset=UTF-8
  }
}
```

### 2.6.5. getAllResponseHeaders() 方法 

当 getAllResponseHeaders() 方法被调用时，则运行以下步骤：

1. 使 *output* 为空的字节序列。
2. 使 *headers* 为运行的带着响应头列表的排序和组合的结果。
3. *headers* 中每一个 *header* ，都添加  *header* 的名称，遵循 0x3A 0x20 字节对，遵循 *header* 的值，遵循 0x0D 0x0A 字节对，最终都给 *output* 。
4. 返回 *output* 。

例如：

```javascript
const client = new XMLHttpRequest();
client.open("GET", "unicorns-are-teh-awesome.txt", true);
client.send();

client.onreadystatechange = function() {
  if(this.readyState == this.HEADERS_RECEIVED) {
    console.log(this.getAllResponseHeaders());
  }
}

// 返回结果如下：
/*
Date: Sun, 24 Oct 2004 04:58:38 GMT
Server: Apache/1.3.31 (Unix)
Keep-Alive: timeout=15, max=99
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: text/plain; charset=utf-8
*/
```

### 2.6.6. 响应主体

响应的 MIME 类型是运行下列步骤的结果：

1. 使 *mimeType* 为从响应的头列表中提取的 MIME 类型的结果。
2. 如果 *mimeType* 为空的字节序列，设置 *mimeType* 为 'text/xml'。
3. 返回 *mimeType* 。

覆盖（override）MIME 类型初始为 null，并且如果 overrideMimeType() 方法调用，可以获得一个值。最终的 MIME 类型为 override MIME 类型，否则情况为 response MME 类型时为 null。

**response charset** 为 `Content-Type` 响应头的 `charset ` 参数的值，或如果 `charset ` 参数不存在或者响应头不能被解析或被忽略时为 null。**override charset** 初始为 null，并且如果overrideMimeType() 方法调用，可以获取一个值。最终的 charset 为  override charset，否则为情况为 response charset 时为 null。

XMLHttpRequest 对象与 **response object** （一个对象，failure 或 null）紧密相连。除非另有说明，否则为 null。

 **arraybuffer response** 遵循以下步骤返回值：

1. 设置 response object 为 new ArrayBuffer 对象呈现为接收的字节。如果此步骤抛出异常，则设置 response object 为 failure 并且返回 null。
2. 返回 response object 。