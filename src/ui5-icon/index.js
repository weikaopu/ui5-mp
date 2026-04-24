// https://ui5.github.io/webcomponents/components/Icon/
// https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview

const sapIcons = require('../utils/SAP-icons')

Component({
  options: {
    addGlobalClass: true
  },
  // 参考 ui5-text 风格，支持外部类名覆盖
  externalClasses: ['ui5-class'],
  properties: {
    src: {
      type: String,
      value: '',
      observer(newVal) {
        this._parseIcon(newVal)
      }
    },
    color: {
      type: String,
      value: 'currentColor'
    },
    size: {
      type: Number,
      value: 16
    }
  },
  data: {
    // 私有数据使用下划线前缀，参考 ui5-text
    _path: '',
    _viewBox: '0 0 16 16',
    _src: ''
  },
  lifetimes: {
    attached() {
      this._parseIcon(this.properties.src)
    }
  },
  methods: {
    _parseIcon(src) {
      const iconsData = sapIcons.data || {}
      let name = 'question-mark'

      if (src && typeof src === 'string' && src.startsWith('sap-icon://')) {
        name = src.replace('sap-icon://', '')
      }

      const icon = iconsData[name] || iconsData['question-mark'] || { path: '', viewBox: '0 0 16 16' }

      if (this.data._path !== icon.path) {
        const viewBox = icon.viewBox || '0 0 16 16'
        // 使用双引号构建 SVG 字符串
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path d="${icon.path}" fill="black"/></svg>`

        /**
         * 关键：
         * 1. 使用 %22 替换双引号
         * 2. 使用 %20 替换空格（这是导致 Data-URI 在 url() 中失效的主因）
         * 3. 保持其他 XML 必要转义
         */
        const encodedSvg = svgString.replaceAll('"', '%22').replaceAll(' ', '%20')
          .replaceAll('#', '%23').replaceAll('<', '%3C')
          .replaceAll('>', '%3E')

        this.setData({
          _path: icon.path,
          _viewBox: viewBox,
          _src: `data:image/svg+xml,${encodedSvg}`
        })
      }
    }
  }
})
