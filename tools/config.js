const fs = require('node:fs')
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

// 自动扫描 src 目录下的所有 ui5-* 组件入口
const getEntries = () => {
  const entries = []
  const items = fs.readdirSync(src)
  items.forEach(item => {
    const itemPath = path.join(src, item)
    if (fs.statSync(itemPath).isDirectory() && item.startsWith('ui5-')) {
      const hasJs = fs.existsSync(path.join(itemPath, 'index.js'))
      const hasTs = fs.existsSync(path.join(itemPath, 'index.ts'))
      if (hasJs || hasTs) {
        entries.push(`${item}/index`)
      }
    }
  })
  return entries
}

module.exports = {
  entry: getEntries(),

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
    mode: isDev ? 'development' : 'production',
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: isDev ? dev : dist,
    },
    target: 'node',
    externals: [nodeExternals()], // 忽略 node_modules
    cache: {
      type: 'filesystem',
      buildDependencies: { config: [__filename] },
    },
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
          ],
        },
      ],
    },
    resolve: {
      modules: [src, 'node_modules'],
      extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
      new webpack.DefinePlugin({}),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    optimization: {
      minimize: !isDev,
    },
    devtool: isDev ? 'inline-source-map' : 'source-map',
    performance: {
      hints: 'warning',
      assetFilter: (assetFilename) => assetFilename.endsWith('.js'),
    },
  },

  copy: ['./assets', './utils'], // 将会复制到目标目录
}
