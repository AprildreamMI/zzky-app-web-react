# zzky-app-web-react

## 对于ReactDOM.render(）

```
ReactDOM.render(
        <App />
  document.getElementById('root')
);
```

是把app插入进root中的，不是替换root

## react-router-dom

+ 安装

  ```
  npm install react-router-dom@6
  ```

+ 包裹

  ```
  import { BrowserRouter } from "react-router-dom";
  
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
  ```

### config

+ https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src/App.tsx

+ https://reactrouter.com/docs/en/v6/upgrading/v5#use-useroutes-instead-of-react-router-config

   使用`useRoutes`代替`react-router-config`

  v5`react-router-config`软件包中的所有功能都已移至 v6 的核心。如果你喜欢/需要将你的路由定义为 JavaScript 对象而不是使用 React 元素，你会喜欢上它的。

