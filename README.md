# jovobo-vue-ui

> 因涉及版权，非江小白员工不得使用。

> 安装依赖

npm install jovobo-vue-ui

```

> 使用依赖

import jovoboVueUi from 'jovobo-vue-ui'

Vue.use(jovoboVueUi)

```

# 组件用法 #

请参见src/App.vue

```

# 本地调试 #

需要修改：

(1)./webpack.config.js:
  注释掉 filename: 'jovo-vue-ui.js'
  解开注释 filename: 'build.js'

(2)./src/index.html:
  注释掉 <script src="./dist/jovo-vue-ui.js"></script>
  解开注释 <script src="./dist/build.js"></script>

(3)./src/main.js:
  解开注释
  // 以下为跑项目的时候测试用 
  这一行下面的全部解开注释

```

# 上线前 #

(1) 第一步：需要修改的和本地调试的相反，并提高package.json的版本号

(2) 第二步：npm run build

(3) 第三步：使用GitKraken推到git

(4) 第四部：npm publish

```

# 升级版本 #

npm uninstall jovobo-vue-ui@1.3.7

npm install jovobo-vue-ui@1.3.9