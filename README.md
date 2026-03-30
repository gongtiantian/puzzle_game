# Vue 拼图游戏

基于 **Vue 3** + **Vite** + **TypeScript** 的在线滑动拼图：将打乱的图片块通过拖拽交换还原为完整图像，支持多档难度、自定义图片与步数/计时统计。

## 功能概览

- **难度**：简单 3×3、中等 4×4、困难 5×5（切换难度会重新洗牌开局）
- **操作**：拖拽一块到另一块上完成交换；完成后停止计时并提示成功
- **图片**：可输入任意图片 URL 作为拼图底图（更换图片会重新开始当前难度）
- **统计**：步数、耗时（秒，保留一位小数）

## 技术栈

| 类别 | 说明 |
|------|------|
| 框架 | Vue 3（`<script setup>` + Composition API） |
| 构建 | Vite 8 |
| 语言 | TypeScript |
| UI | Ant Design Vue 4、@ant-design/icons-vue |

核心逻辑集中在 `src/features/puzzle/`：`usePuzzleGame` 管理状态与计时，拼图块由 `image` 工具按行列切片，`shuffle` 负责初始打乱。

## 环境要求

- [Node.js](https://nodejs.org/)（建议当前 LTS）
- 包管理：npm（随 Node 附带）

## 开发与构建

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:5173）
npm run dev

# 类型检查 + 生产构建，输出在 dist/
npm run build

# 本地预览构建结果
npm run preview
```

## 项目结构（节选）

```
puzzle_game/
├── index.html
├── vite.config.ts
├── package.json
├── src/
│   ├── main.ts              # 入口，注册 Ant Design Vue
│   ├── App.vue              # 页面布局与拼图组合件
│   ├── style.css
│   └── features/puzzle/
│       ├── constants.ts     # 难度、默认图片 URL
│       ├── types.ts
│       ├── composables/usePuzzleGame.ts
│       ├── components/      # PuzzleBoard、PuzzleControls、GameStatus 等
│       └── utils/           # image 切片、shuffle 打乱
└── public/
```

## 自定义图片说明

默认使用远程示例图；若使用其他站点的图片 URL，需该资源允许在浏览器中跨域加载（否则可能无法显示切片）。本地开发时也可将图片放在 `public/` 下，通过站点根路径引用（例如 `/your-image.jpg`）。

## 许可证

私有项目（`package.json` 中 `"private": true`）。若需开源请自行补充许可证文件与说明。
