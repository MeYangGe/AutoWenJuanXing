## AutoWjx

**基础配置：**

- vue
- less
- webpack

## 目录结构

```
.
├── README.md 说明
├── package-lock.json
├── package.json
├── public 静态文件
│   ├── favicon.ico
│   ├── icon.jpg
│   └── index.html html 文件
├── src
│   ├── app.less
│   ├── app.vue
│   └── index.js 项目入口
├── tampermonkey.txt 油猴脚本入口文件
├── webpack.config.base.js
└── webpack.config.js webpack 配置
```

## 开发

**启动**
进入项目目录后，在命令行中输入：

```shell
npm start
```

**调试**

1. 打开浏览器，输入`localhost:8080`，查看页面展示是否正常。
2. 安装油猴插件
3. 打开油猴插件编辑界面，将 tampermonkey.txt 里的内容复制到编辑框中，保存。
4. 打开任意一个网页，比如`www.baidu.com`，

- 查看油猴 icon 是否有一个 1 的数字标志，如果有说明油猴脚本已经成功激活
- 网页的右上角会出现初始页面

**构建**

```shell
npm run build
```

**发布插件到油猴市场**

油猴市场的优点是不用审核，即发即用，非常方便。

1. 将/dist/app.bundle.js 文件部署到 cdn 上，获取到对应 url。（可以放到 github 上，如果托管到 git 上最好做 cdn 加速）
2. 登录[油猴市场](https://greasyfork.org/)，谷歌账号或 github 账号都可使用。
3. 点击账号名称，再点击**发布你编写的脚本**
4. 进入编辑页，将 tampermonkey.txt 里的内容复制到编辑框中，记得将里面的`localhost:8080`网址替换成静态资源 url
5. 点击 「发布脚本」即可
