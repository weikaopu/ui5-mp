const path = require('node:path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isDev = process.argv.includes('--develop')
const isWatch = process.argv.includes('--watch') >= 0
const demoSrc = path.resolve(__dirname, './demo')
const demoDist = path.resolve(__dirname, '../miniprogram_dev')
const src = path.resolve(__dirname, '../src')
const dev = path.join(demoDist, 'components')
const dist = path.resolve(__dirname, '../miniprogram_dist')

module.exports = {
  entry: [
    'ui5-avatar/index',
    'ui5-badge/index',
    'ui5-bar/index',
    'ui5-busy-indicator/index',
    'ui5-button/index',
    'ui5-card/index',
    'ui5-checkbox/index',
    'ui5-checkbox-group/index',
    'ui5-dialog/index',
    'ui5-form/index',
    'ui5-form-group/index',
    'ui5-icon/index',
    'ui5-input/index',
    'ui5-item/index',
    'ui5-link/index',
    'ui5-list/index',
    'ui5-message-strip/index',
    'ui5-page/index',
    'ui5-popover/index',
    'ui5-process-flow/index',
    'ui5-range-slider/index',
    'ui5-rating-indicator/index',
    'ui5-segmented-button/index',
    'ui5-segmented-button-item/index',
    'ui5-select/index',
    'ui5-shellbar/index',
    'ui5-slider/index',
    'ui5-step-input/index',
    'ui5-switch/index',
    'ui5-tab/index',
    'ui5-tab-container/index',
    'ui5-table/index',
    'ui5-table-row/index',
    'ui5-tag/index',
    'ui5-text/index',
    'ui5-textarea/index',
    'ui5-title/index',
    'ui5-toast/index',
    'ui5-viz-column/index',
    'ui5-viz-donut/index',
    'ui5-viz-line/index',
  ],

  isDev,
  isWatch,
  srcPath: src, // 源目录
  distPath: isDev ? dev : dist, // 目标目录

  demoSrc, // demo 源目录
  demoDist, // demo 目标目录

  wxss: {
    less: false, // 使用 less 来编写 wxss
    sourcemap: false, // 生成 less sourcemap
  },

  js: {
    webpack: true, // 使用 webpack 来构建 js
  },

  webpack: {
    mode: 'production',
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    externals: [nodeExternals()], // 忽略 node_modules
    module: {
      rules: [
        {
          test: /\.js$/i,
          use: [
            {
              loader: 'thread-loader',
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
            {
              loader: 'eslint-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'thread-loader',
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                happyPackMode: true,
              },
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [src, 'node_modules'],
      extensions: ['.js', '.json'],
    },
    plugins: [
      new webpack.DefinePlugin({}),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    optimization: {
      minimize: false,
    },
    devtool: 'source-map', // 生成 js sourcemap
    performance: {
      hints: 'warning',
      assetFilter: (assetFilename) => assetFilename.endsWith('.js'),
    },
  },

  copy: ['./assets', './utils'], // 将会复制到目标目录
}
