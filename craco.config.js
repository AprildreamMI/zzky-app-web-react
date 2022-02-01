const path = require('path')
const CracoLessPlugin = require('craco-less');
// const sassResourcesLoader = require('craco-sass-resources-loader')

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      "@": path.join(__dirname, "src"),
      "~": path.join(__dirname, "src")
    }
  },
  babel: {
    plugins: [
      // 按需引用antd css 文件
      [
        "import", {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true // 如果你在使用 babel-plugin-import 的 style 配置来引入样式，需要将配置值从 'css' 改为 true，这样会引入 less 文件。
        }
      ]
    ]
  },
  plugins: [
    // scss 全局变量胚子
    // {
    //   plugin: sassResourcesLoader,
    //   options: {
    //     resources: './src/styles/variables.scss'
    //   }
    // },
    // antd 自定义主题
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#186DEC'
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  ]
}