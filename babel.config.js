module.exports = {
  presets: [
    '@vue/app',
    [
      "@babel/preset-env",
      {
        "corejs": {
          version: 3,
          proposals: true
        },
        "useBuiltIns": "entry"
      }
    ]
  ],
  // 配置babel-plugin-import, 用于按需加载组件代码和样式
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: 'css' },
      'syntax-dynamic-import'
    ],
    ["@babel/plugin-transform-runtime"]
  ],
}
