const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }], //装饰器
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true, //ture -> enable usage of less
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    port: 80,
  },
};
