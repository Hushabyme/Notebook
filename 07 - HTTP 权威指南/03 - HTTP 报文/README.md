# 第3章 HTTP 报文 

如果说 HTTP 是因特网的信使，那么 HTTP 报文就是它用来搬东西的包裹了。 通过阅读本章，就可以了解编写自己的 HTTP 应用程序所需掌握的大部分内容。 

## 3.1 报文流  

HTTP 报文是在 HTTP 应用程序之间发送的数据块。这些数据块以一些文本形式的元信息（meta-information）开头，这些信息描述了报文的内容及含义，后面跟着可选的数据部分。 

这些报文在客户端、服务器和代理之间流动。术语“流入”、“流出”、“上游”及“下游”都是用来描述报文方向的。 

### 3.1.1 报文流入源端服务器 

HTTP 使用术语流入（inbound）和流出（outbound）来描述事务处理（transaction）的方向。报文流入源端服务器，工作完成之后，会流回用户的 Agent 代理中。 

![1](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/1.png)

### 3.1.2 报文向下游流动 

HTTP 报文会像河水一样流动。不管是请求报文还是响应报文，所有报文都会向下游（downstream）流动。所有报文的发送者都在接收者的上游（upstream）。  

> 术语“上游”和“下游”都只与发送者和接收者有关。我们无法区分报文是发送给源端服务器的还是发送给客户端的，因为两者都是下游节点。 

![2](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/2.png)

### 3.2 报文的组成部分 

HTTP 报文是简单的格式化数据块。 

起始行和首部就是由行分隔的 ASCII 文本。每行都以一个由两个字符组成的行终止序列作为结束，其中包括一个回车符（ASCII 码 13）和一个换行符（ASCII 码 10）。这个行终止序列可以写做 CRLF。需要指出的是，尽管 HTTP 规范中说明应该用 CRLF 来表示行终止，但稳健的应用程序也应该接受单个换行符作为行的终止。有些老的，或不完整的 HTTP 应用程序并不总是既发送回车符，又发送换行符。 

实体的主体或报文的主体（或者就称为主体）是一个可选的数据块。与起始行和首部不同的是，主体中可以包含文本或二进制数据，也可以为空。 

### 3.2.1 报文的语法 

所有的 HTTP 报文都可以分为两类：**请求报文（request message）和响应报文（response message）**。

请求报文会向 Web 服务器请求一个动作。响应报文会将请求的结果返回给客户端。请求和响应报文的基本报文结构相同。 

图 3-5 展示了一些假想的请求和响应报文。 

![3](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/3.png)

### 3.2.2 起始行 

所有的 HTTP 报文都以一个起始行作为开始。请求报文的起始行说明了要做些什么。响应报文的起始行说明发生了什么。 

1. **请求行** 

   请求报文请求服务器对资源进行一些操作。请求报文的起始行，或称为请求行，包含了一个方法和一个请求 URL，这个方法描述了服务器应该执行的操作，请求 URL 描述了要对哪个资源执行这个方法。请求行中还包含 HTTP 的版本，用来告知服务器，客户端使用的是哪种 HTTP。 

   所有这些字段都由空格符分隔。在图 3-5a 中，请求方法为 GET，请求 URL 为 /test/hi-there.txt 的数据，版本为 HTTP/1.1。  

2. **响应行**

   响应报文承载了状态信息和操作产生的所有结果数据，将其返回给客户端。响应报文的起始行，或称为响应行，包含了响应报文使用的 HTTP 版本、数字状态码，以及描述操作状态的文本形式的原因短语。 

   所有这些字段都由空格符进行分隔。在图 3-5b 中，HTTP 版本为 HTTP/1.0，状态码为 200（表示成功），原因短语为 OK，表示文档已经被成功返回了。 

3. **方法**

   请求的起始行以方法作为开始，方法用来告知服务器要做些什么。比如，在行 “GET
   /specials/saw-blade.gif HTTP/1.0” 中，方法就是 GET。 

HTTP 规范中定义了一组常用的请求方法。比如，GET 方法负责从服务器获取一个文档，POST方法会向服务器发送需要处理的数据，OPTIONS 方法用于确定 Web 服务器的一般功能，或者 Web 服务器处理特定资源的能力。 

常用的HTTP方法：

|   方法    | 描述                        | 是否包含主体 |
| :-----: | ------------------------- | ------ |
|   GET   | 从服务器获取一份文档                | 否      |
|  HEAD   | 只从服务器获取文档的首部              | 否      |
|  POST   | 向服务器发送需要处理的数据             | 是      |
|   PUT   | 将请求的主体部分存储在服务器上           | 是      |
|  TRACE  | 对可能经过代理服务器传送到服务器上去的报文进行追踪 | 否      |
| OPTIONS | 决定可以在服务器上执行哪些方法           | 否      |
| DELETE  | 从服务器上删除一份文档               | 否      |

4. 状态码 

   状态码用来告诉客户端，发生了什么事情。状态码位于响应的起始行中。比如，在行 HTTP/1.0 200 OK 中，状态码就是 200。 

   状态码是在每条响应报文的起始行中返回的。会返回一个数字状态和一个可读的状态。数字码便于程序进行差错处理，而原因短语则更便于人们理解。 

   可以通过三位数字代码对不同状态码进行分类。200 到 299 之间的状态码表示成功。300 到399 之间的代码表示资源已经被移走了。400 到 499 之间的代码表示客户端的请求出错了。500 到 599 之间的代码表示服务器出错了。 

5. 原因短语

   原因短语是响应起始行中的最后一个组件。它为状态码提供了文本形式的解释。比如，在行 HTTP/1.0 200 OK 中，OK 就是原因短语。 

   原因短语和状态码是成对出现的。原因短语是状态码的可读版本，应用程序开发者将其传送给用户，用以说明在请求期间发生了什么情况。 

6. 版本号

   版本号会以 HTTP/x.y 的形式出现在请求和响应报文的起始行中。为 HTTP 应用程序提供了一种将自己所遵循的协议版本告知对方的方式。 

   使用版本号的目的是为使用 HTTP 的应用程序提供一种线索，以便互相了解对方的能力和报文格式。 

### 3.2.3 首部 

前一小节的重点是请求和响应报文的第一行（方法、状态码、原因短语和版本号）。跟在起始行后面的就是零个、一个或多个 HTTP 首部字段（参见图 3-5）。 

### 3.2.4 实体的主体部分 

HTTP 报文的第三部分是可选的实体主体部分。实体的主体是 HTTP 报文的负荷。就是 HTTP 要传输的内容。 

## 3.3 方法 

即使服务器实现了所有这些方法，这些方法的使用很可能也是受限的。例如，支持 DELETE 方法或 PUT 方法（本节稍后介绍）的服务器可能并不希望任何人都能够删除或存储资源。这些限制通常都是在服务器的配置中进行设置的，因此会随着站点和服务器的不同而有所不同。 

### 3.3.1 安全方法 

HTTP 定义了一组被称为安全方法的方法。GET 方法和 HEAD 方法都被认为是安全的，这就意味着使用 GET 或 HEAD 方法的 HTTP 请求都不会产生什么动作。 

不产生动作，在这里意味着 HTTP 请求不会在服务器上产生什么结果。 

安全方法并不一定是什么动作都不执行的（实际上，这是由 Web 开发者决定的）。使用安全方法的目的就是当使用可能引发某一动作的不安全方法时，允许HTTP应用程序开发者通知用户。 

### 3.3.2 GET 

GET 是最常用的方法。通常用于请求服务器发送某个资源。 

![4](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/4.png)

### 3.3.3 HEAD

HEAD 方法与 GET 方法的行为很类似，但服务器在响应中只返回首部。不会返回实体的主体部分。这就允许客户端在未获取实际资源的情况下，对资源的首部进行检查。 

使用 HEAD，可以：

- 在不获取资源的情况下了解资源的情况（比如，判断其类型）。
- 通过查看响应中的状态码，看看某个对象是否存在。
- 通过查看首部，测试资源是否被修改了。 

服务器开发者必须确保返回的首部与GET请求所返回的首部完全相同。 

![5](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/5.png)

### 3.3.4 PUT 

与 GET 从服务器读取文档相反，PUT 方法会向服务器写入文档。 

![6](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/6.png)

PUT 方法的语义就是让服务器用请求的主体部分来创建一个由所请求的 URL 命名的新文档，或者，如果那个 URL 已经存在的话，就用这个主体来替代它。 

因为 PUT 允许用户对内容进行修改，所以很多 Web 服务器都要求在执行 PUT 之前，用密码登录。 

### 3.3.5 POST 

POST 方法起初是用来向服务器输入数据的。实际上，通常会用它来支持 HTML 的表单。表单中填好的数据通常会被送给服务器，然后由服务器将其发送到它要去的地方。  

![7](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/7.png)

### 3.3.6 TRACE 

客户端发起一个请求时，这个请求可能要穿过防火墙、代理、网关或其他一些应用程序。每个中间节点都可能会修改原始的 HTTP 请求。TRACE 方法允许客户端在最终将请求发送给服务器时，看看它变成了什么样子。 

TRACE 请求会在目的服务器端发起一个“环回”诊断。行程最后一站的服务器会弹回一条 TRACE 响应，并在响应主体中携带它收到的原始请求报文。这样客户端就可以查看在所有中间 HTTP 应用程序组成的请求 / 响应链上，原始报文是否，以及如何被毁坏或修改过。

![8](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/8.png)

TRACE 方法主要用于诊断；也就是说，用于验证请求是否如愿穿过了请求 / 响应链。它也是一种很好的工具，可以用来查看代理和其他应用程序对用户请求所产生效果。 

TRACE 请求中不能带有实体的主体部分。TRACE 响应的实体主体部分包含了响应服务器收到的请求的精确副本。 

尽管 TRACE 可以很方便地用于诊断，但它确实也有缺点，它假定中间应用程序对各种不同类型请求（不同的方法——GET、HEAD、POST等）的处理是相同的。 

### 3.3.7 OPTIONS 

OPTIONS 方法请求 Web 服务器告知其支持的各种功能。可以询问服务器通常支持哪些方法，或者对某些特殊资源支持哪些方法。（有些服务器可能只支持对一些特殊类型的对象使用特定的操作）。 

![9](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/9.png)

### 3.3.8 DELETE 

顾名思义，DELETE 方法所做的事情就是请服务器删除请求 URL 所指定的资源。但是，客户端应用程序无法保证删除操作一定会被执行。因为 HTTP 规范允许服务器在不通知客户端的情况下撤销请求。 

![10](https://github.com/Hushabyme/Notebook/blob/master/07%20-%20HTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97/03%20-%20HTTP%20%E6%8A%A5%E6%96%87/images/10.png)

### 3.3.9 扩展方法 

HTTP 被设计成字段可扩展的，这样新的特性就不会使老的软件失效了。扩展方法指的就是没有在HTTP/1.1 规范中定义的方法。服务器会为它所管理的资源实现一些 HTTP 服务，这些方法为开发者提供了一种扩展这些 HTTP 服务能力的手段。 

并不是所有的扩展方法都是在正式规范中定义的，认识到这一点很重要。如果你定义了一个扩展方法，很可能大部分 HTTP 应用程序都无法理解。同样，你的 HTTP 应用程序也可能会遇到一些其他应用程序在用的，而它并不理解的扩展方法。 

在这些情况下，最好对扩展方法宽容一些。如果能够在不破坏端到端行为的情况下将带有未知方法的报文传递给下游服务器的话，代理应尝试传递这些报文。 

## 3.4 状态码 

HTTP 状态码被分成了五大类。本节对这五类 HTTP 状态码中的每一类都进行了总结。 

状态码为客户端提供了一种理解事务处理结果的便捷方式。尽管并没有实际的规范对原因短语的确切文本进行说明，本节还是列出了一些原因短语示例。 

### 3.4.1 100〜199 —— 信息性状态码 

| 状态码  | 原因短语                | 含义                                       |
| :--: | ------------------- | ---------------------------------------- |
| 100  | Continue            | 说明收到了请求的初始部分，请客户端继续。发送了这个状态码之后，服请求之后必须进行响应 |
| 101  | Switching Protocols | 说明服务器正在根据客户端的指定，将协议切换成 Update 首部所列的协议    |

100 Continue 状态码尤其让人糊涂。它的目的是对这样的情况进行优化：HTTP 客户端应用程序有一个实体的主体部分要发送给服务器，但希望在发送之前查看一下服务器是否会接受这个实体。 

### 3.4.2 200〜299——成功状态码 

客户端发起请求时，这些请求通常都是成功的。服务器有一组用来表示成功的状态码，分别对应于不同类型的请求。 

| 状态码  | 原因短语                          | 含义                                       |
| :--: | ----------------------------- | ---------------------------------------- |
| 200  | OK                            | 请求没问题，实体的主体部分包含了所请求的资源                   |
| 201  | Accepted Created              | 用于创建服务器对象的请求（比如，PUT）。响应的实体主体部分中应该包含各种引的资源的 URL，Location首部包含的则是最具体的引用。 |
| 202  | Accepted                      | 请求已被接受，但服务器还未对其执行任何动作。不能保证服务器会完成这个请求味着接受请求时，它看起来是有效的。服务器应该在实体的主体部分包含对请求状态的描述，或许还应该有对请求完成时间的估计（或者包含一个指针，指向可以获取此信息的位置） |
| 203  | Non-Authoritative Information | 实体首部包含的信息不是来自于源端服务自资源的一份副本。如果中间节点上有一份资源副本，但无法或者没有对它所发送的关的元信息（首部）进行验证，就会出现这种情况。  这种响应码并不是非用不可的；如果实体首部来自源端服务器，响应为200状态的应可以将其作为一种可选项使用 |
| 204  | No Content                    | 响应报文中包含若干首部和一个状态行，但没有实体的主体部分。主要用于在浏览器不转为显示新文档的情况下，对其进行更新（比如刷新一个表单页面） |
| 205  | Reset Content                 | 另一个主要用于浏览器的代码。负责告知浏览器清除当前页面中的所有HTML 表单元素 |
| 206  | Partial Content               | 成功执行了一个部分或 Range（范围）请求。稍后我们会看到，客户端可以通过一些特殊获取部分或某个范围内的文档——这个状态码就说明范围请求成功了。 206 响应中必须包括 Content-Range、Date 以及 ETag 或 Content-Location 首部 |

### 3.4.3 300〜399——重定向状态码 

重定向状态码要么告知客户端使用替代位置来访问他们所感兴趣的资源，要么就提供一个替代的响应而不是资源的内容。如果资源已被移动，可发送一个重定向状态码和一个可选的 Location 首部来告知客户端资源已被移走，以及现在可以在哪里找到它。这样，浏览器就可以在不打扰使用者的情况下，透明地转入新的位置了。 

可以通过某些重定向状态码对资源的应用程序本地副本与源端服务器上的资源进行验证。比如，
HTTP 应用程序可以查看其资源的本地副本是否仍然是最新的，或者在源端服务器上资源是否被修改过。  

| 状态码  | 原因短语               | 含义                                       |
| :--: | ------------------ | ---------------------------------------- |
| 300  | Multiple Choices   | 客户端请求一个实际指向多个资源的URL时会返回这个状态码，比如服务器上有某文档的英语和法语版本。返回这个代码时会带有一个选项列表；这样用户就可以选择用的那一项了。 |
| 301  | Moved Permanently  | 在请求的URL已被移除时使用。响应的Location 首部中应该包含资源现在所处的 URL |
| 302  | Found              | 与301状态码类似；但是，客户端应该使用 Location 首部给出的 URL 来临时定位资源。仍应使用老的 URL |
| 303  | See Other          | 告知客户端应该用另一个 URL 来获取资源。新的URL位于响应报文的 Location 首部的是允许 POST 请求的响应将客户端定向到某个资源上去 |
| 304  | Not Modified       | 客户端可以通过所包含的请求首部，使其请求变成有条件的。如果客户端发起了一个条件 GET 请求，而最近资源未被修改的话，就可以用这来说明资源未被修改。带有这个状态码的响应不应该包含实体的主体部分 |
| 305  | Use Proxy          | 用来说明必须通过一个代理来访问资源；代理的位置由Location 首部给出。很重要的一端是相对某个特定资源来解析这条响应的，不能假定所有请求，甚至所有对持有所请服务器的请求都通过这个代理进行。如果客户端错误地让代理介入了某条请求，可能坏性的行为，而且会造成安全漏洞 |
| 306  | （未使用）              | 当前未使用                                    |
| 307  | Temporary Redirect | 与 301 状态码类似；但客户端应该使用 Location 首部给出的URL来临时定位资源。将来该使用老的URL |

你可能已经注意到 302、303 和 307 状态码之间存在一些交叉。这些状态码的用法有着
细微的差别，大部分差别都源于 HTTP/1.0 和 HTTP/1.1 应用程序对这些状态码处理方式的不同。 

当 HTTP/1.0 客户端发起一个 POST 请求，并在响应中收到 302 重定向状态码时，它会接受
Location 首部的重定向 URL，并向那个 URL 发起一个 GET 请求（而不会像原始请求中那样发起 POST 请求）。 

HTTP/1.0 服务器希望 HTTP/1.0 客户端这么做——如果 HTTP/1.0 服务器收到来自 HTTP/1.0 客户端的 POST 请求之后发送了 302 状态码，服务器就期望客户端能够接受重定向 URL，并向重定向的 URL 发送一个 GET 请求。 

问题出在 HTTP/1.1。HTTP/1.1 规范使用 303 状态码来实现同样的行为（服务器发送 303 状态码来重定向客户端的 POST 请求，在它后面跟上一个 GET 请求）。 

为了避开这个问题，HTTP/1.1 规范指出，对于 HTTP/1.1 客户端，用 307 状态码取代 302 状态码来进行临时重定向。这样服务器就可以将 302 状态码保留起来，为 HTTP/1.0 客户端使用了。 

这样一来，服务器要选择适当的重定向状态码放入重定向响应中发送，就需要查看客户端的 HTTP 版本了。 

### 3.4.4 400〜499——客户端错误状态码 

有时客户端会发送一些服务器无法处理的东西，比如格式错误的请求报文，或者最常见的是，请求一个不存在的 URL。 

浏览网页时，我们都看到过臭名昭著的 404 Not Found 错误码——这只是服务器在告诉我们，它对我们请求的资源一无所知。 

很多客户端错误都是由浏览器来处理的，甚至不会打扰到你。只有少量错误，比如 404，还是会穿过浏览器来到用户面前。 

| 状态码  | 原因短语                            | 含义                                       |
| :--: | ------------------------------- | ---------------------------------------- |
| 400  | Bad Request                     | 用于告知客户端它发送了一个错误的请求                       |
| 401  | Unauthorized                    | 与适当的首部一同返回，在这些首部中请求客户端在获取对资源的访问权之进行认证。   |
| 402  | Payment Required                | 现在这个状态码还未使用，但已经被保留，以作未来之用                |
| 403  | Forbidden                       | 用于说明请求被服务器拒绝了。如果服务器想说明为什么拒绝请求，可以包含体部分来对原因进行描述。但这个状态码通常是在服务器不想说明拒绝原因的 |
| 404  | Not Found                       | 用于说明服务器无法找到所请求的URL。通常会包含一个实体，以便客户端应示给用户看 |
| 405  | Method Not Allowed              | 发起的请求中带有所请求的URL不支持的方法时，使用此状态码。应该在响应首部，以告知客户端对所请求的资源可以使用哪些方法。 |
| 406  | Not Acceptable                  | 客户端可以指定参数来说明它们愿意接收什么类型的实体。服务器没有与客的URL相匹配的资源时，使用此代码。通常，服务器会包含一些首部，以便客户什么请求无法满足。 |
| 407  | Proxy Authentication Required   | 与401状态码类似，但用于要求对资源进行认证的代理服务器             |
| 408  | Request Timeout                 | 如果客户端完成请求所花的时间太长，服务器可以回送此状态码，并关闭连接随服务器的不同有所不同，但通常对所有的合法请求来说，都是够长的 |
| 409  | Conflict                        | 用于说明请求可能在资源上引发的一些冲突。服务器担心请求会引发冲突时此状态码。响应中应该包含描述冲突的主体 |
| 410  | Gone                            | 与 404 类似，只是服务器曾经拥有过此资源。主要用于Web站点的维护，这样服理者就可以在资源被移除的情况下通知客户端了 |
| 411  | Length Required                 | 服务器要求在请求报文中包含Conten t-Len gth首部时使用。      |
| 412  | Precondition Failed             | 客户端发起了条件请求，且其中一个条件失败了的时候使用。客户端包含了发起的就是条件请求。 |
| 413  | Request Entity Too Large        | 客户端发送的实体主体部分比服务器能够或者希望处理的要大时，使用此状态码      |
| 414  | Request URI Too Long            | 客户端所发请求中的请求 URL 比服务器能够或者希望处理的要长时，        |
| 415  | Unsupported Media Type          | 服务器无法理解或无法支持客户端所发实体的内容类型时，使用此状态码         |
| 416  | Requested Range Not Satisfiable | 请求报文所请求的是指定资源的某个范围，而此范围无效或无法满足时，使用此状态码   |
| 417  | Expectation Failed              | 请求的 Expect 请求首部包含了一个期望，但服务器无法满足此期望时，使用此状态码。如果代理或其他中间应用程序有确切证据说明源端服务器会为某请求产生期望，就可以发送这个响应状态码 |

### 3.4.5 500〜599——服务器错误状态码 

有时客户端发送了一条有效请求，服务器自身却出错了。这可能是客户端碰上了服务器的缺陷，或者服务器上的子元素，比如某个网关资源，出了错。 

| 状态码  | 原因短语                       | 含义                                       |
| :--: | -------------------------- | ---------------------------------------- |
| 500  | Internal Server Error      | 服务器遇到一个妨碍它为请求提供服务的错误时，使用此状态码             |
| 501  | Not Implemented            | 客户端发起的请求超出服务器的能力范围（比如，使用了服务器不支持的请使用此状态码  |
| 502  | Bad Gateway                | 作为代理或网关使用的服务器从请求响应链的下一条链路上收到了一条伪响应（比如，它无法连接到其父网关）时，使用此状态码 |
| 503  | Service Unavailable        | 用来说明服务器现在无法为请求提供服务，但将来可以。如果服务器知道什么会变为可用的，可以在响应中包含一个 Retry-After 首部。 |
| 504  | Gateway Timeout            | 与状态码 408 类似，只是这里的响应请求来自一个网关或代理，它们在等待另一台服务器对其请求进行响应时超时了 |
| 505  | HTTP Version Not Supported | 服务器收到的请求使用了它无法或不愿支持的协议版本时，使用此状态码。有应用程序会选择不支持协议的早期版本 |

## 3.5 首部

关于首部的具体细节可以参见另一篇文章：[HTTP 首部](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8)。

这里就不再重复叙述了。如果有未提及的，请参考原书。或未来进行补充说明。