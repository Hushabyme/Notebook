# 第六章 HTTP 首部

HTTP 协议的请求和响应报文中必定包含 HTTP 首部， 只是我们平时在使用 Web 的过程中感受不到它。 本章我们一起来学习 HTTP 首部的结构， 以及首部中各字段的用法。

## 6.1 HTTP 报文首部 

![1](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/1.png)

**HTTP 协议的请求和响应报文中必定包含 HTTP 首部**。首部内容为客户端和服务器分别处理请求和响应提供所需要的信息。对于客户端用户来说，这些信息中的大部分内容都无须亲自查看。  

#### HTTP 请求报文

在请求中， HTTP 报文由方法、 URI、 HTTP 版本、 HTTP 首部字段等部分构成。 

![2](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/2.png)

下面的示例是访问 `http://hackr.jp` 时， 请求报文的首部信息。 

![3](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/3.png)

#### HTTP 响应报文

在响应中， HTTP 报文由 HTTP 版本、 状态码（数字和原因短语） 、HTTP 首部字段 3 部分构成。 

![4](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/4.png)

以下示例是之前请求访问 `http://hackr.jp/` 时， 返回的响应报文的首部信息。 

![5](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/5.png)

在报文众多的字段当中， HTTP 首部字段包含的信息最为丰富。 首部字段同时存在于请求和响应报文内， 并涵盖 HTTP 报文相关的内容信息。 

因 HTTP 版本或扩展规范的变化， 首部字段可支持的字段内容略有不同。 本书主要涉及 HTTP/1.1 及常用的首部字段。 

## 6.2 HTTP 首部字段 

### 6.2.1 HTTP 首部字段传递重要信息 

HTTP 首部字段是构成 HTTP 报文的要素之一。 在客户端与服务器之间以 HTTP 协议进行通信的过程中， 无论是请求还是响应都会使用首部字段， 它能起到传递额外重要信息的作用。 

**使用首部字段是为了给浏览器和服务器提供报文主体大小、 所使用的语言、 认证信息等内容**。 

![6](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/6.png)

### 6.2.2 HTTP 首部字段结构 

HTTP 首部字段是由首部字段名和字段值构成的， 中间用冒号 `:`分隔。

![7](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/7.png)

例如， 在 HTTP 首部中以 Content-Type 这个字段来表示报文主体的对象类型。 

![8](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/8.png)

就以上述示例来看， 首部字段名为 Content-Type， 字符串 text/html 是字段值。 

另外， 字段值对应单个 HTTP 首部字段可以有多个值， 如下所示。

![9](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/9.png)

> **若 HTTP 首部字段重复了会如何？**
>
> 当 HTTP 报文首部中出现了两个或两个以上具有相同首部字段名时
> 会怎么样？ 这种情况在规范内尚未明确， 根据浏览器内部处理逻辑
> 的不同， 结果可能并不一致。 有些浏览器会优先处理第一次出现的
> 首部字段， 而有些则会优先处理最后出现的首部字段。 

### 6.2.3 4 种 HTTP 首部字段类型 

HTTP 首部字段根据实际用途被分为以下 4 种类型。

1. **通用首部字段（General Header Fields）**

   请求报文和响应报文两方都会使用的首部。 

2. **请求首部字段（Request Header Fields）** 

   从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加内容、客户端信息、 响应内容相关优先级等信息。 

3. **响应首部字段（Response Header Fields）**

   从服务器端向客户端返回响应报文时使用的首部。 补充了响应的附加内容， 也会要求客户端附加额外的内容信息。 

4. **实体首部字段（Entity Header Fields）** 

   针对请求报文和响应报文的实体部分使用的首部。 补充了资源内容更新时间等与实体有关的信息。 

### 6.2.4 HTTP/1.1 首部字段一览 

HTTP/1.1 规范定义了如下 47 种首部字段。

#### 1. 通用首部字段

![10](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/10.png)

#### 2. 请求首部字段

![11](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/11.png)

#### 3. 响应首部字段

![12](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/12.png)

#### 4. 实体首部字段

![13](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/13.png)

### 6.2.5 非 HTTP/1.1 首部字段 

在 HTTP 协议通信交互中使用到的首部字段， 不限于 RFC2616 中定义的 47 种首部字段。 还有 Cookie、 Set-Cookie 和 Content-Disposition 等在其他 RFC 中定义的首部字段， 它们的使用频率也很高。

而这些非正式的首部字段统一归纳在 RFC4229 HTTP Header FieldRegistrations 中。 

### 6.2.6 End-to-end 首部和 Hop-by-hop 首部 

HTTP 首部字段将定义成缓存代理和非缓存代理的行为，分成 2 种类型。 

- **端到端首部（End-to-end Header）** 

  分在此类别中的首部会转发给请求 / 响应对应的最终接收目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发。 

- **逐跳首部（Hop-by-hop Header）** 

  分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再转发。HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部，需提供 Connection 首部字段。 

## 6.3 HTTP/1.1 通用首部字段 

通过指定首部字段 Cache-Control 的指令，就能操作缓存的工作机制。 

![14](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/14.png)

指令的参数是可选的，多个指令之间通过 `,` 分隔。首部字段 CacheControl 的指令可用于请求及响应时。 

可用的指令按请求和响应分类如下所示。

 ![15](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/15.png)

![16](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/16.png)

#### 表示是否能缓存的指令 

1. 当指定使用 public 指令时， 则明确表明其他用户也可利用缓存。

2. 当指定 private 指令后， 响应只以特定的用户作为对象， 这与 public 指令的行为相反。 

3. 使用 no-cache 指令的目的是为了防止从缓存中返回过期的资源。

   > 客户端发送的请求中如果包含 no-cache 指令， 则表示客户端将不会接
   > 收缓存过的响应。 于是， “中间”的缓存服务器必须把客户端请求转发
   > 给源服务器。 
   >
   > 如果服务器返回的响应中包含 no-cache 指令， 那么缓存服务器不能对
   > 资源进行缓存。 源服务器以后也将不再对缓存服务器请求中提出的资
   > 源有效性进行确认， 且禁止其对响应资源进行缓存操作。 

#### 控制可执行缓存的对象的指令 

1. 当使用 no-store 指令时，暗示请求（和对应的响应）或响应中包含机密信息。 

   > **从字面意思上很容易把 no-cache 误解成为不缓存， 但事实上 no-cache 代表不缓存过期的资源**， 缓存会向源服务器进行有效期确认后处理资源， 也许称为 do-notserve-from-cache-without-revalidation 更合适。 no-store 才是真正地不进行缓存， 请读者注意区别理解。  

#### 指定缓存期限和认证的指令 

**s-maxage 指令 ** 

s-maxage 指令的功能和 max-age 指令相同，它们的不同点是 s-maxage 指令只适用于供多位用户使用的公共缓存服务器。 也就是说， 对于向同一用户重复返回响应的服务器来说， 这个指令没有任何作用。 

另外， 当使用 s-maxage 指令后， 则直接忽略对 Expires 首部字段及 max-age 指令的处理。 

**max-age 指令** 

当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小， 那么客户端就接收缓存的资源。另外，当指定 max-age 值为 0， 那么缓存服务器通常需要将请求转发给源服务器。

当服务器返回的响应中包含 max-age 指令时， 缓存服务器将不对资源的有效性再作确认， 而 max-age 数值代表资源保存为缓存的最长时间。 

**min-fresh 指令** 

min-fresh 指令要求缓存服务器返回至少还未过指定时间的缓存资源。 

比如， 当指定 min-fresh 为 60 秒后， 过了 60 秒的资源都无法作为响应返回了。 

**max-stale 指令** 

使用 max-stale 可指示缓存资源， 即使过期也照常接收。 

如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；如果指令中指定了具体数值， 那么即使过期，只要仍处于 max-stale指定的时间内，仍旧会被客户端接收。 

**only-if-cached 指令** 

使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。 换言之， 该指令要求缓存服务器不重新加载响应， 也不会再次确认资源有效性。 若发生请求缓存服务器的本地缓存无响应， 则返回状态码 504 Gateway Timeout。 

**must-revalidate 指令** 

使用 must-revalidate 指令， 代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效。 

若代理无法连通源服务器再次获取有效资源的话， 缓存必须给客户端一条 504（Gateway Timeout） 状态码。 

另外， 使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已经在首部使用了 max-stale， 也不会再有效果）。

**proxy-revalidate 指令** 

proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前， 必须再次验证缓存的有效性。 

**no-transform 指令** 

使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。 

### 6.3.2 Connection 

Connection 首部字段具备如下两个作用： 

- 控制不再转发给代理的首部字段。 
- 管理持久连接。 

**控制不再转发给代理的首部字段：** 

![17](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/17.png)

在客户端发送请求和服务器返回响应内，使用 Connection 首部字段， 可控制不再转发给代理的首部字段（即 Hop-by-hop 首部） 。 

**管理持久连接：** 

![18](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/18.png)

HTTP/1.1 版本的默认连接都是持久连接。 为此， 客户端会在持久连接上连续发送请求。 当服务器端想明确断开连接时， 则指定 Connection 首部字段的值为 Close。 

![19](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/19.png)

HTTP/1.1 之前的 HTTP 版本的默认连接都是非持久连接。 为此， 如果想在旧版本的 HTTP 协议上维持持续连接， 则需要指定 Connection 首部字段的值为 Keep-Alive。 

### 6.3.3 Date 

**首部字段 Date 表明创建 HTTP 报文的日期和时间。** 

![20](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/20.png)

HTTP/1.1 协议使用在 RFC1123 中规定的日期时间的格式， 如下示例： 

```
Date: Tue, 03 Jul 2012 04:40:59 GMT
```

### 6.3.4 Pragma 

**Pragma 是 HTTP/1.1 之前版本的历史遗留字段， 仅作为与 HTTP/1.0 的向后兼容而定义。** 

所有的中间服务器如果都能以 HTTP/1.1 为基准， 那直接采用 `CacheControl: no-cache` 指定缓存的处理方式是最为理想的。 但要整体掌握全部中间服务器使用的 HTTP 协议版本却是不现实的。 因此， 发送的请求会同时含有下面两个首部字段。 

```
Cache-Control: no-cache
Pragma: no-cache
```

### 6.3.5 Trailer 

![21](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/21.png)

**首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码时。** 

### 6.3.6 Transfer-Encoding 

![22](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/22.png)

首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。 

### 6.3.7 Upgrade 

**首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信， 其参数值可以用来指定一个完全不同的通信协议。** 

![23](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/23.png)

上图用例中， 首部字段 Upgrade 指定的值为 TLS/1.0。 请注意此处两个字段首部字段的对应关系， Connection 的值被指定为 Upgrade。Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务器之间。 因此， 使用首部字段 Upgrade 时， 还需要额外指定 Connection:Upgrade。 

对于附有首部字段 Upgrade 的请求， 服务器可用 101 Switching Protocols 状态码作为响应返回。 

### 6.3.8 Via  

**使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。**

报文经过代理或网关时， 会先在首部字段 Via 中附加该服务器的信息， 然后再进行转发。 这个做法和 traceroute 及电子邮件的 Received首部的工作机制很类似。

首部字段 Via 不仅用于追踪报文的转发， 还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容。

 ![24](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/24.png)

Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使用。比如，代理服务器接收到由 TRACE 方法发送过来的请求（其中Max-Forwards: 0）时，代理服务器就不能再转发该请求了。 这种情况下， 代理服务器会将自身的信息附加到 Via 首部后，返回该请求的响应。 

### 6.3.9 Warning 

HTTP/1.1 的 Warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来的。

**该首部通常会告知用户一些与缓存相关的问题的警告。** 

Warning 首部的格式如下。 最后的日期时间部分可省略。

```
Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])
```

HTTP/1.1 中定义了 7 种警告。 警告码对应的警告内容仅推荐参考。另外， 警告码具备扩展性， 今后有可能追加新的警告码。 

![25](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/25.png)

## 6.4 请求首部字段 

请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、 客户端信息、 对响应内容相关的优先级等内容。

### 6.4.1 Accept 

![26](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/26.png)

Accept 首部字段可通知服务器， 用户代理能够处理的媒体类型及媒体类型的相对优先级。 可使用 type/subtype 这种形式， 一次指定多种媒体类型。 

比如， 如果浏览器不支持 PNG 图片的显示， 那 Accept 就不指定image/png， 而指定可处理的 image/gif 和 image/jpeg 等图片类型。

若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值， 用分号（;）进行分隔。 权重值 q 的范围是 0~1（可精确到小数点后 3 位），且 1 为最大值。不指定权重 q 值时， 默认权重为 q=1.0。 

### 6.4.2 Accept-Charset 

![27](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/27.png)

Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。 另外， 可一次性指定多种字符集。 与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。 

### 6.4.3 Accept-Encoding 

![28](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/28.png)

Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。 可一次性指定多种内容编码。 

### 6.4.4 Accept-Language 

![29](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/29.png)

首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等） ， 以及自然语言集的相对优先级。 可一次指定多种自然语言集。 

和 Accept 首部字段一样， 按权重值 q 来表示相对优先级。 在上述图例中， 客户端在服务器有中文版资源的情况下， 会请求其返回中文版对应的响应， 没有中文版时， 则请求返回英文版响应。

### 6.4.5 Authorization 

![30](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/30.png)

首部字段 Authorization 是用来告知服务器， 用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接收到返回的 401 状态码响应后， 把首部字段 Authorization 加入请求中。共用缓存在接收到含有 Authorization 首部字段的请求时的操作处理会略有差异。 

### 6.4.6 Expect 

![31](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/31.png)

客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 417 Expectation Failed。 

### 6.4.7 From 

![32](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/32.png)

首部字段 From 用来告知服务器使用用户代理的用户的电子邮件地址。通常，其使用目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。使用代理时，应尽可能包含 From 首部字段（但可能会因代理不同，将电子邮件地址记录在 User-Agent 首部字段内）。 

### 6.4.8 Host 

![33](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/33.png)

首部字段 Host 会告知服务器，请求的资源所处的互联网主机名和端口号。**Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请求内的首部字段。**

首部字段 Host 和以单台服务器分配多个域名的虚拟主机的工作机制有很密切的关联， 这是首部字段 Host 必须存在的意义。 

请求被发送至服务器时，请求中的主机名会用 IP 地址直接替换解决。但如果这时，相同的 IP 地址下部署运行着多个域名， 那么服务器就会无法理解究竟是哪个域名对应的请求。 因此， 就需要使用首部字段 Host 来明确指出请求的主机名。 若服务器未设定主机名，那直接发送一个空值即可。 

### 6.4.9 If-Match 

![34](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/34.png)

**形如 If-xxx 这种样式的请求首部字段， 都可称为条件请求。**

服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。 

![35](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/35.png)

### 6.4.10 If-Modified-Since 

![36](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/36.png)

首部字段 If-Modified-Since， 属附带条件之一， 它会告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应。 

### 6.4.11 If-None-Match 

![37](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/37.png)

首部字段 If-None-Match 属于附带条件之一。 它和首部字段 If-Match 作用相反。用于指定 If-None-Match 字段值的实体标记（ETag）值与请求资源的 ETag 不一致时，它就告知服务器处理该请求。 

在 GET 或 HEAD 方法中使用首部字段 If-None-Match 可获取最新的资源。 因此， 这与使用首部字段 If-Modified-Since 时有些类似。 

### 6.4.12 If-Range 

![38](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/38.png)

首部字段 If-Range 属于附带条件之一。它告知服务器若指定的 If-Range 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间相一致时，则作为范围请求处理。 反之， 则返回全体资源。

![39](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/39.png)

下面我们思考一下不使用首部字段 If-Range 发送请求的情况。 服务器端的资源如果更新， 那客户端持有资源中的一部分也会随之无效， 当然， 范围请求作为前提是无效的。 这时， 服务器会暂且以状态码 412 Precondition Failed 作为响应返回，其目的是催促客户端再次发送请求。 这样一来， 与使用首部字段 If-Range 比起来，就需要花费两倍的
功夫。 

### 6.4.13 If-Unmodified-Since 

首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。 它的作用的是告知服务器， 指定的请求资源只有在字段值内指定的日期时间之后， 未发生更新的情况下， 才能处理请求。 如果在指定日期时间后发生了更新， 则以状态码 412 Precondition Failed 作为响应返回。 

### 6.4.14 Max-Forwards 

![40](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/40.png)

通过 TRACE 方法或 OPTIONS 方法， 发送包含首部字段 MaxForwards 的请求时， 该字段以十进制整数形式指定可经过的服务器最大数目。 服务器在往下一个服务器转发请求之前， Max-Forwards 的值减 1 后重新赋值。当服务器接收到 Max-Forwards 值为 0 的请求时， 则不再进行转发， 而是直接返回响应。 

使用 HTTP 协议通信时， 请求可能会经过代理等多台服务器。 途中，如果代理服务器由于某些原因导致请求转发失败， 客户端也就等不到服务器返回的响应了。 对此， 我们无从可知。 

可以灵活使用首部字段 Max-Forwards，针对以上问题产生的原因展开调查。由于当 Max-Forwards 字段值为 0 时，服务器就会立即返回响应，由此我们至少可以对以那台服务器为终点的传输路径的通信状况有所把握。 

### 6.4.15 Proxy-Authorization 

接收到从代理服务器发来的认证质询时， 客户端会发送包含首部字段 Proxy-Authorization 的请求，以告知服务器认证所需要的信息。 

```
Proxy-Authorization: Basic dGlwOjkpNLAGfFY5
```

这个行为是与客户端和服务器之间的 HTTP 访问认证相类似的，不同之处在于，认证行为发生在客户端与代理之间。 客户端与服务器之间的认证， 使用首部字段 Authorization 可起到相同作用。 有关 HTTP 访问认证， 后面的章节会作详尽阐述。 

### Range 

```
Range: bytes=5001-10000
```

对于只需获取部分资源的范围请求，包含首部字段 Range 即可告知服务器资源的指定范围。 上面的示例表示请求获取从第 5001 字节至第 10000 字节的资源。 

接收到附带 Range 首部字段请求的服务器， 会在处理请求之后返回状态码为 206 Partial Content 的响应。 无法处理该范围请求时， 则会返回状态码 200 OK 的响应及全部资源。 

### 6.4.17 Referer 

![41](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/41.png)

首部字段 Referer 会告知服务器请求的原始资源的 URI。 

客户端一般都会发送 Referer 首部字段给服务器。 但当直接在浏览器的地址栏输入 URI， 或出于安全性的考虑时， 也可以不发送该首部字段。 

因为原始资源的 URI 中的查询字符串可能含有 ID 和密码等保密信息， 要是写进 Referer 转发给其他服务器， 则有可能导致保密信息的泄露。 

### 6.4.18 TE 

首部字段 TE 会告知服务器客户端能够处理响应的传输编码方式及相对优先级。 它和首部字段 Accept-Encoding 的功能很相像， 但是用于传输编码。

首部字段 TE 除指定传输编码之外， 还可以指定伴随 trailer 字段的分块传输编码的方式。 应用后者时， 只需把 trailers 赋值给该字段值。 

### 6.4.189 User-Agent 

![42](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/42.png)

首部字段 User-Agent 会将创建请求的浏览器和用户代理名称等信息传达给服务器。

由网络爬虫发起请求时， 有可能会在字段内添加爬虫作者的电子邮件地址。 此外， 如果请求经过代理， 那么中间也很可能被添加上代理服务器的名称。 

## 6.5 响应首部字段 

响应首部字段是由服务器端向客户端返回响应报文中所使用的字段，用于补充响应的附加信息、 服务器信息， 以及对客户端的附加要求等信息。 

### 6.5.1 Accept-Ranges 

![43](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/43.png)

首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求， 以指定获取服务器端某个部分的资源。

可指定的字段值有两种， 可处理范围请求时指定其为 bytes， 反之则指定其为 none。 

### 6.5.2 Age 

![44](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/44.png)

首部字段 Age 能告知客户端， 源服务器在多久前创建了响应。字段值的单位为秒。 

若创建该响应的服务器是缓存服务器， Age 值是指缓存后的响应再次发起认证到认证完成的时间值。 代理创建响应时必须加上首部字段 Age。 

### 6.5.3 ETag 

![45](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/45.png)

首部字段 ETag 能告知客户端实体标识。 它是一种可将资源以字符串形式做唯一性标识的方式。 服务器会为每份资源分配对应的 ETag 值。

另外， 当资源更新时， ETag 值也需要更新。生成 ETag 值时，并没有统一的算法规则，而仅仅是由服务器来分配。

资源被缓存时，就会被分配唯一性标识。 例如，当使用中文版的浏览器访问 `http://www.google.com/` 时， 就会返回中文版对应的资源， 而使用英文版的浏览器访问时， 则会返回英文版对应的资源。两者的URI 是相同的，所以仅凭 URI 指定缓存的资源是相当困难的。若在下载过程中出现连接中断、 再连接的情况，都会依照 ETag 值来指定资源。 

#### 强 ETag 值和弱 Tag 值 

1. 强 ETag 值

   强 ETag 值， 不论实体发生多么细微的变化都会改变其值。 

2. 弱 ETag 值 

   弱 ETag 值只用于提示资源是否相同。 只有资源发生了根本改变， 产生差异时才会改变 ETag 值。 这时， 会在字段值最开始处附加 W/。 

### 6.5.4 Location 

![46](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/46.png)

使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。

基本上， 该字段会配合 3xx ：Redirection 的响应，提供重定向的URI。 

几乎所有的浏览器在接收到包含首部字段 Location 的响应后， 都会强制性地尝试对已提示的重定向资源的访问。 

### 6.5.5 Proxy-Authenticate 

首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端。 

它与客户端和服务器之间的 HTTP 访问认证的行为相似，不同之处在于其认证行为是在客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 WWW-Authorization 有着相同的作用。有关HTTP 访问认证， 后面的章节会再进行详尽阐述。

### 6.5.6 Retry-After 

![47](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/47.png)

首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。 主要配合状态码 503 Service Unavailable 响应， 或 3xx Redirect 响应一起使用。 

### 6.5.7 Server 

![48](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/48.png)

首部字段 Server 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。 不单单会标出服务器上的软件应用名称， 还有可能包括版本号和安装时启用的可选项。

### 6.5.8 Vary 

![49](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/49.png)

上图的意思是：当代理服务器接收到带有 Vary 首部字段指定获取资源的请求时， 如果使用的 Accept-Language 字段的值相同， 那么就直接从缓存返回响应。 反之， 则需要先从源服务器端获取资源后才能作为响应返回。

首部字段 Vary 可对缓存进行控制。 源服务器会向代理服务器传达关于本地缓存使用方法的命令。 

从代理服务器接收到源服务器返回包含 Vary 指定项的响应之后， 若再要进行缓存， 仅对请求中含有相同 Vary 指定首部字段的请求返回缓存。 即使对相同资源发起请求， 但由于 Vary 指定的首部字段不相同， 因此必须要从源服务器重新获取资源。

 ### 6.5.9 WWW-Authenticate 

首部字段 WWW-Authenticate 用于 HTTP 访问认证。它会告知客户端适用于访问请求 URI 所指定资源的认证方案（Basic 或是 Digest） 和带参数提示的质询（challenge）。 状态码 401 Unauthorized 响应中，肯定带有首部字段 WWW-Authenticate。

 ## 6.6 实体首部字段 

实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部， 用于补充内容的更新时间等与实体相关的信息。 

![50](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/50.png)

在请求和响应两方的 HTTP 报文中都含有与实体相关的首部字段。

 ### 6.6.1 Allow 

![51](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/51.png)

首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。 当服务器接收到不支持的 HTTP 方法时， 会以状态码 405 Method Not Allowed 作为响应返回。 与此同时， 还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。

 ### 6.6.2 Content-Encoding 

首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选用的内容编码方式。 内容编码是指在不丢失实体信息的前提下所进行的压缩。

![52](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/52.png)

 ### 6.6.3 Content-Language 

![53](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/53.png)

首部字段 Content-Language 会告知客户端， 实体主体使用的自然语言（指中文或英文等语言）。

### 6.6.4 Content-Length 

![54](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/54.png)

首部字段 Content-Length 表明了实体主体部分的大小（ 单位是字节）。对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。由于实体主体大小的计算方法略微复杂， 所以在此不再展开。

### 6.6.5 Content-Location 

首部字段 Content-Location 给出与报文主体部分相对应的 URI。 和首部字段 Location 不同， Content-Location 表示的是报文主体返回资源对应的 URI。

 ### 6.6.6 Content-MD5 

![55](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/55.png)

首部字段 Content-MD5 是一串由 MD5 算法生成的值， 其目的在于检查报文主体在传输过程中是否保持完整， 以及确认传输到达。 

对报文主体执行 MD5 算法获得的 128 位二进制数， 再通过 Base64 编码后将结果写入 Content-MD5 字段值。 由于 HTTP 首部无法记录二进制值， 所以要通过 Base64 编码处理。 为确保报文的有效性， 作为接收方的客户端会对报文主体再执行一次相同的 MD5 算法。 计算出的值与字段值作比较后， 即可判断出报文主体的准确性。 

采用这种方法， 对内容上的偶发性改变是无从查证的， 也无法检测出恶意篡改。 其中一个原因在于， 内容如果能够被篡改， 那么同时意味着 Content-MD5 也可重新计算然后被篡改。 所以处在接收阶段的客户端是无法意识到报文主体以及首部字段 Content-MD5 是已经被篡改过的。

### 6.6.7 Content-Range 

![56](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/56.png)

针对范围请求， 返回响应时使用的首部字段 Content-Range， 能告知客户端作为响应返回的实体的哪个部分符合范围请求。 字段值以字节为单位， 表示当前发送部分及整个实体大小。 

### 6.6.8 Content-Type 

首部字段 Content-Type 说明了实体主体内对象的媒体类型。 和首部字段 Accept 一样， 字段值用 type/subtype 形式赋值。 

### 6.6.9 Expires 

![57](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/57.png)

首部字段 Expires 会将资源失效的日期告知客户端。 缓存服务器在接收到含有首部字段 Expires 的响应后， 会以缓存来应答请求， 在Expires 字段值指定的时间之前， 响应的副本会一直被保存。当超过指定的时间后， 缓存服务器在请求发送过来时， 会转向源服务器请求资源。 

源服务器不希望缓存服务器对资源缓存时， 最好在 Expires 字段内写入与首部字段 Date 相同的时间值。

但是，当首部字段 Cache-Control 有指定 max-age 指令时，比起首部字段 Expires， 会优先处理 max-age 指令。 

### 6.6.10 Last-Modified 

![58](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/58.png)

首部字段 Last-Modified 指明资源最终修改的时间。 一般来说， 这个值就是 Request-URI 指定资源被修改的时间。 但类似使用 CGI 脚本进行动态数据处理时， 该值有可能会变成数据最终修改时的时间。 

## 6.7 为 Cookie 服务的首部字段 

管理服务器与客户端之间状态的 Cookie， 虽然没有被编入标准化 HTTP/1.1 的 RFC2616 中， 但在 Web 网站方面得到了广泛的应用。

Cookie 的工作机制是用户识别及状态管理。 Web 网站为了管理用户的状态会通过 Web 浏览器， 把一些数据临时写入用户的计算机内。 接着当用户访问该 Web 网站时， 可通过通信方式取回之前发放的 Cookie。

调用 Cookie 时， 由于可校验 Cookie 的有效期， 以及发送方的域、 路径、 协议等信息， 所以正规发布的 Cookie 内的数据不会因来自其他 Web 站点和攻击者的攻击而泄露。 

![59](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/59.png)

### 6.7.1 Set-Cookie 

![60](https://github.com/Hushabyme/Notebook/blob/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8/images/60.png)

### 6.7.2 Cookie 

首部字段 Cookie 会告知服务器， 当客户端想获得 HTTP 状态管理支持时， 就会在请求中包含从服务器接收到的 Cookie。 接收到多个Cookie 时， 同样可以以多个 Cookie 形式发送。 

