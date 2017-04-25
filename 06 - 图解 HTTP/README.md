# 前言

目前，国内讲解 HTTP 的书是在太少了。目前，讲解网络协议的书有两本，一本是《HTTP 权威指南》，另一本是《TCP/IP 详解，卷1》，这两本书被读者们奉为“圣经”的经典之作。

一开始我是想直接从《HTTP 权威指南》开始的，但是，那本书的厚度，以及它的内容比较的深和详细，如果先从那本书开始的话，不是很好理解。所以，我就想，还是先从这本书开始学习，下一本书再讲《HTTP 权威指南》。

HTTP 协议本身不复杂，理解起来并不会花费太多时间，但纯概念式地学习，第一，不形象；第二，由于是纯文字，难免随着时间流逝而遗忘。而图片形式的知识却会深深印在脑海里。

**为什么要学习 HTTP 协议？**

前端工程师也许对前端具有各种炫酷效果的页面和赏心悦目的 UI 更感兴趣，但是往往忽视了 HTTP 这个更基础的内容部分。而掌握 HTTP 协议，是一名前端工程师必须要做的，并且是在许多场合都是一定会使用到它的。例如：实现 HTTP 服务器，Node.js 编程、编写网络爬虫、分析抓包数据等等，无一例外，都会用到 HTTP 协议。

本书作者的写作手法平实易懂，内容讲解透彻到位。前半部分由 HTTP 的成长发展史娓娓道来，基于 HTTP 1.1 标准讲解通信过程，包括 HTTP 方法、协议格式、报文结构、首部字段、状态码等的具体含义，还分别讲解 HTTP 通信过程中代理、网
关、隧道等的作用。接着介绍 SPDY、Web Socket、Web DAV 等 HTTP 的扩展功能。作者还从细节方面举例，让读者更好地理解何为无状态（stateless）、301 和 302 重定向的区别在哪、缓存机制，等等。本书后半部分的重心放在 Web 安全上，涵盖 HTTPS、SSL、证书认证、加密机制、Web 攻击手段等内容。旨在让读者对 HTTP 协议形成一个整体概念，明确设计 HTTP 的目的及意义所在，了解 HTTP 的工作机制，掌握报文中常用的首部字段，返回结果状态码的作用，对各种客户端与服务器的通信交互场景的细节等都做到了然于心，从而在平时的开发工作中独立思考，迅速准确地定位分析由 HTTP 引发的问题，并辅以适当的方法加以解决。

本书图文并茂，大量图片穿插文中，生动形象地向读者介绍每一个应用案例，减少
了读者阅读时的枯燥感。借助一张张配图，读者们不仅会加深视觉记忆，在轻松愉
悦的氛围中，还可以更深刻地理解通信机制等背后的工作原理。正所谓一图胜千
文。

# 目录

第一章　[了解 Web 及网络基础](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/01%20-%20%E4%BA%86%E8%A7%A3%20Web%20%E5%8F%8A%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80)

第二章　[简单的 HTTP 协议](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/02%20-%20%E7%AE%80%E5%8D%95%E7%9A%84%20HTTP%20%E5%8D%8F%E8%AE%AE)

第三章　[HTTP 报文内的 HTTP 信息](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/03%20-%20HTTP%20%E6%8A%A5%E6%96%87%E5%86%85%E7%9A%84%20HTTP%20%E4%BF%A1%E6%81%AF)

第四章　[返回结果的 HTTP 状态](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/04%20-%20%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E7%9A%84%20HTTP%20%E7%8A%B6%E6%80%81)

第五章　[与 HTTP 协作的 Web 服务器](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/05%20-%20%E4%B8%8E%20HTTP%20%E5%8D%8F%E4%BD%9C%E7%9A%84%20Web%20%E6%9C%8D%E5%8A%A1%E5%99%A8)

第六章　[HTTP 首部](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/06%20-%20HTTP%20%E9%A6%96%E9%83%A8)

第七章　[确保 Web 安全的 HTTPS](https://github.com/Hushabyme/Notebook/tree/master/06%20-%20%E5%9B%BE%E8%A7%A3%20HTTP/07%20-%20%E7%A1%AE%E4%BF%9D%20Web%20%E5%AE%89%E5%85%A8%E7%9A%84%20HTTPS)

