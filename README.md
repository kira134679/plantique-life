# PLANTIQUE LIFE

![Static Badge](https://img.shields.io/badge/node-%5E20.19.4-gray?label=node&labelColor=green)
[![ci](https://github.com/kira134679/plantique-life/actions/workflows/ci.yml/badge.svg)](https://github.com/kira134679/plantique-life/actions/workflows/ci.yml)
[![deploy to GitHub Pages](https://github.com/kira134679/plantique-life/actions/workflows/deploy.yml/badge.svg)](https://github.com/kira134679/plantique-life/actions/workflows/deploy.yml)

## Node.js 版本

- 專案的 Node.js 版本需為 v20.19.4 以上
- 查看自己版本指令：`node -v`

## Clone 專案

```sh
git clone https://github.com/kira134679/team-a13-practice.git
```

## 建立開發環境

### 安裝套件

```sh
npm install
```

### 執行開發模式

```sh
npm run dev
```

若沒有自動開啟瀏覽器，可嘗試手動在瀏覽器上輸入
`http://localhost:5173/<專案名稱>/pages/index.html`

## 安裝擴充功能

### 必須安裝

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 建議安裝

- [Bootstrap IntelliSense](https://marketplace.visualstudio.com/items?itemName=hossaini.bootstrap-intellisense)

## 資料夾結構

```
plantique-life/
├── assets
|  ├── images          // 圖片放置處
|  └── scss            // SCSS 的樣式放置處
├── components         // 元件放置處
├── docs
├── layout             // ejs 模板放置處
├── main.js            // JavaScript 程式碼
├── package-lock.json
├── package.json
├── pages              // 頁面放置處
└── vite.config.js
```

### 注意事項

- 已將 pages 資料夾內的 index.html 預設為首頁，建議不要任意修改 index.html 的檔案名稱
