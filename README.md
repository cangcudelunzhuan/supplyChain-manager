# 大鱼供应链后台-web
## Development

```bash
$ npm i
$ npm run dev
```

## 技术栈
  - [umi](https://umijs.org/zh/guide/)：可插拔的企业级 react 应用框架
  - [dva](https://dvajs.com/)：一个基于 redux 和 redux-saga 的数据流方案
  - [antd](https://ant.design/docs/react/introduce-cn)：组件库
  - [moment](http://momentjs.cn/)：日期处理类库
  - [classnames](https://github.com/JedWatson/classnames#readme)：方便在react处理className
  - [axios](https://github.com/axios/axios)：请求库
  - [mockjs](http://mockjs.com/)：mock时使用，参见/mock/demo.js

## 目录结构
```javascript
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，更改立即生效
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── components                 // 年度计划组件，统一由components/index.js导出
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```

## mock
直接在`/mock`文件夹下新建js文件即可，具体参考demo.js

## 请求
```javascript
import request from 'src/utils/axios';
// 导出的request是axios实例，可使用axios各种方法
request(config)
request.get(url, config)
request.delete(url, config)
request.head(url, config)
request.options(url, config)
request.post(url, data, config)
request.put(url, data, config)
request.patch(url, data, config)
```

## 如何添加新页面
使用[约定式路由](https://umijs.org/zh/guide/router.html#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1)，无需手动配置路由信息

## alias
已配置如下alias：
```javascript
alias:{
  'src': path.resolve(__dirname, './src'),
  'dy-components': path.resolve(__dirname, './src/components'),
},
```
页面中直接引入封装的通用组件：
```javascript
import { DyPage, DySearch } from 'dy-components';
```

## 组件封装规范
- 通用组件放在`/src/components`目录中，`index.js`统一导出，每个组件需有`README.md`来说明相关api
- 年度计划组件直接放在`/page/当前页面目录/components`中

## 组件预览
- [DyLayout](https://gitlab.49capital.cn/web/dayu-supplyChain-manager/tree/master/src/components/DyLayout)：整体布局
- [DyPage](https://gitlab.49capital.cn/web/dayu-supplyChain-manager/tree/master/src/components/DyPage)：页面容器
- [DySearch](https://gitlab.49capital.cn/web/dayu-supplyChain-manager/tree/master/src/components/DySearch)：table上面的搜索栏组件
- [DyAction](https://gitlab.49capital.cn/web/dayu-supplyChain-manager/tree/master/src/components/DyAction)：table中操作项

## 审核状态
```javascript
<Tag color="#ffd591">赎回中</Tag>
<Tag color="#40a9ff">待审核</Tag>
<Tag color="#87d068">审核通过</Tag>
<Tag color="#f50">审核不通过</Tag>
```
## 资金标记
```javascript
<Tag color="green">入金 </Tag>
<Tag color="red">出金 </Tag>
```