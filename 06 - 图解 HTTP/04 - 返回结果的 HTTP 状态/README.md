# 第四章 返回结果的 HTTP 状态码 

HTTP 状态码负责表示客户端 HTTP 请求的返回结果、标记服务器端的处理是否正常、通知出现的错误等工作。让我们通过本章的学习，好好了解一下状态码的工作机制。 

## 4.1 状态码告知从服务器端返回的请求结果 

状态码的职责是当客户端向服务器端发送请求时，描述返回的请求结果。借助状态码，用户可以知道服务器端是正常处理了请求，还是出现了错误。 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/1.png)

响应的类型有以下 5 种：

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/2.png)

仅记录在 RFC2616 上的 HTTP 状态码就达 40 种，若再加上 WebDAV（Web-based Distributed Authoring and Versioning，基于万维网的分布式创作和版本控制）（RFC4918、 5842）和附加 HTTP 状态码（RFC6585）等扩展，数量就达 60 余种。别看种类繁多，实际上经常使用的大概只有 14 种。接下来，我们就介绍一下这些具有代表性的 14 个状态码。 

## 4.2 2XX 成功 

2XX 的响应结果表明请求被正常处理了。 

### 4.2.1 200 OK

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/3.png)

在响应报文内，随状态码一起返回的信息会因方法的不同而发生改变。比如，使用 GET 方法时，对应请求资源的实体会作为响应返回；而使用 HEAD 方法时，对应请求资源的实体首部不随报文主体作为响应返回（即在响应中只返回首部，不会返回实体的主体部分）。 

### 4.2.2 204 No Content 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/4.png)

该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。比如，当从浏览器发出请求处理后，返回 204 响应，那么浏览器显示的页面不发生更新。 

一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。 

### 4.2.3 206 Partial Content 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/5.png)

该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。 

## 4.3 3XX 重定向 

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。 

### 4.3.1 301 Moved Permanently 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/6.png)

永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存。 

### 4.3.2 302 Found 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/7.png)

临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（ 本次） 能使用新的 URI 访问。 

和 301 Moved Permanently 状态码相似，但 302 状态码代表的资源不是被永久移动， 只是临时性质的。换句话说，已移动的资源对应的URI 将来还有可能发生改变。比如， 用户把 URI 保存成书签，但不会像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。 

### 4.3.3 303 See Other 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/8.png)

该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET方法定向获取请求的资源。 

303 状态码和 302 Found 状态码有着相同的功能，但 303 状态码明确表示客户端应当采用 GET 方法获取资源，这点与 302 状态码有区别。 

### 4.3.4 304 Not Modified 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/9.png)

该状态码表示客户端发送附带条件的请求 2 时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。 

### 4.3.5 307 Temporary Redirect 

临时重定向。该状态码与 302 Found 有着相同的含义。 尽管 302 标准禁止 POST 变换成 GET， 但实际使用时大家并不遵守。 

## 4.4 4XX 客户端错误

4XX 的响应结果表明客户端是发生错误的原因所在。 

### 4.4.1 400 Bad Request 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/10.png)

该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。 

### 4.4.2 401 Unauthorized 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/11.png)

该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证） 的认证信息。另外若之前已进行过 1 次请求， 则表示用户认证失败。 

返回含有 401 的响应必须包含一个适用于被请求资源的 WWWAuthenticate 首部用以质询（ challenge） 用户信息。当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。 

### 4.4.3 403 Forbidden 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/12.png)

该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要给出拒绝的详细理由， 但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。

### 4.4.4 404 Not Found 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/13.png)

该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。 

## 4.5 5XX 服务器错误 

5XX 的响应结果表明服务器本身发生错误。 

### 4.5.1 500 Internal Server Error 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/14.png)

该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。 

### 4.5.2 503 Service Unavailable 

![](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81/images/15.png)

该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。 