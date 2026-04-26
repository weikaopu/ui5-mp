// eslint-disable-next-line import/extensions, import/no-unresolved
const sapIcons = require('../../../components/utils/SAP-icons')
const iconTags = require('./SAP-icons-tags')

Page({
  data: {
    displayIcons: [],
    searchQuery: '',
    totalCount: 0
  },

  // 内存缓存，避免全量数据在 data 中频繁 setData 导致性能下降
  allIcons: [],

  onLoad() {
    this.prepareData()
  },

  prepareData() {
    wx.showLoading({ title: '加载中...' })

    // 合并两个数据源，预处理搜索索引
    const allIcons = Object.keys(sapIcons.data).sort().map(name => {
      const tags = iconTags[name] ? iconTags[name].tags : []
      return {
        name,
        tags,
        // 将搜索文本预合成，提高搜索效率
        searchTerms: (name + tags.join('')).toLowerCase()
      }
    })

    this.allIcons = allIcons

    // 初始渲染前 100 个，防止图标过多导致页面卡死
    this.setData({
      displayIcons: allIcons,
      totalCount: allIcons.length
    }, () => {
      wx.hideLoading()
    })
  },

  onSearch(e) {
    const query = e.detail.value.toLowerCase().trim()

    if (!query) {
      this.setData({ displayIcons: this.allIcons, totalCount: this.allIcons.length })
      return
    }

    // 执行搜索：匹配名称或 Tags
    const filtered = this.allIcons.filter(icon => icon.searchTerms.includes(query))

    this.setData({
      displayIcons: filtered,
      totalCount: filtered.length,
      searchQuery: query
    })
  },

  copyIconData(e) {
    const { name } = e.currentTarget.dataset
    const text = `${name}`

    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: `已复制: ${name}`,
          icon: 'none'
        })
      }
    })
  }
})
