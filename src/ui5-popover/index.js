// https://ui5.github.io/webcomponents/components/Popover/
const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义弹出框的标题文本。
     */
    headerText: {
      type: String,
      value: ''
    },
    /**
     * 定义弹出框是否打开。
     */
    open: {
      type: Boolean,
      value: false
    },
    /**
     * 定义触发弹出框的目标元素 ID。
     */
    opener: {
      type: String,
      value: ''
    },
    /**
     * 定义弹出框相对于目标元素的放置位置。可选值：Top, Bottom, Left, Right。
     */
    placementType: {
      type: String,
      value: 'Bottom'
    },
    /**
     * 是否显示背景遮罩。
     */
    modal: {
      type: Boolean,
      value: false
    },
    /**
     * 是否隐藏弹出框的小箭头。
     */
    hideArrow: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
    popoverTop: 0,
    popoverLeft: 0,
    arrowTop: 0,
    arrowLeft: 0,
    actualPlacement: 'Bottom'
  },
  observers: {
    open(open) {
      // 增加状态判断，只有在状态真正改变时才触发逻辑，避免死循环
      if (open && !this.data.visible) {
        this.show(this.data.opener)
      } else if (!open && this.data.visible) {
        this.close()
      }
    }
  },
  methods: {
    /**
     * 打开弹出框
     * @param {string} openerId 目标元素的 ID (不带 #)
     */
    show(openerId) {
      const id = openerId || this.data.opener
      if (!id) {
        console.error('ui5-popover: openerId is required to calculate position.')
        return
      }

      // 使用全局查询查找页面或父容器中的 Opener 节点
      wx.createSelectorQuery().select(`#${id}`).boundingClientRect((anchor) => {
        if (!anchor) return

        this.setData({
          visible: true,
          open: true // 同步状态，防止外部覆盖
        }, () => {
          // 在显示后立即计算内容尺寸以修正位置
          this.createSelectorQuery().select('.ui5-popover-root').boundingClientRect((popover) => {
            if (!popover) return

            const margin = 8 // 与目标的间距
            const sys = wx.getSystemInfoSync()
            const windowWidth = sys.windowWidth
            const windowHeight = sys.windowHeight

            let placement = this.data.placementType

            // 定义坐标计算函数
            const calculatePos = (p) => {
              let t = 0
              let l = 0
              switch (p) {
                case 'Top':
                  t = anchor.top - popover.height - margin
                  l = anchor.left + (anchor.width / 2) - (popover.width / 2)
                  break
                case 'Bottom':
                  t = anchor.bottom + margin
                  l = anchor.left + (anchor.width / 2) - (popover.width / 2)
                  break
                case 'Left':
                  t = anchor.top + (anchor.height / 2) - (popover.height / 2)
                  l = anchor.left - popover.width - margin
                  break
                case 'Right':
                  t = anchor.top + (anchor.height / 2) - (popover.height / 2)
                  l = anchor.right + margin
                  break
                default:
                  break
              }
              return { t, l }
            }

            let pos = calculatePos(placement)

            // 自动检测空间不足并翻转逻辑
            if (placement === 'Bottom' && pos.t + popover.height > windowHeight) {
              if (anchor.top > (windowHeight - anchor.bottom)) {
                placement = 'Top'
                pos = calculatePos(placement)
              }
            } else if (placement === 'Top' && pos.t < 0) {
              if ((windowHeight - anchor.bottom) > anchor.top) {
                placement = 'Bottom'
                pos = calculatePos(placement)
              }
            } else if (placement === 'Right' && pos.l + popover.width > windowWidth) {
              if (anchor.left > (windowWidth - anchor.right)) {
                placement = 'Left'
                pos = calculatePos(placement)
              }
            } else if (placement === 'Left' && pos.l < 0) {
              if ((windowWidth - anchor.right) > anchor.left) {
                placement = 'Right'
                pos = calculatePos(placement)
              }
            }

            // 最后的边界微调：确保不超出屏幕（保底逻辑）
            const finalTop = Math.max(10, Math.min(pos.t, windowHeight - popover.height - 10))
            const finalLeft = Math.max(10, Math.min(pos.l, windowWidth - popover.width - 10))

            // 计算箭头位置：使其指向 anchor 中心
            // 限制范围：避免箭头滑出弹出框边缘或叠加在圆角上 (圆角 16rpx 约为 8px)
            // const arrowSize = 10 // 20rpx / 2
            const safePadding = 16 // 避开圆角区域

            let arrowL = 0
            let arrowT = 0

            if (placement === 'Top' || placement === 'Bottom') {
              const anchorCenterX = anchor.left + (anchor.width / 2)
              arrowL = anchorCenterX - finalLeft
              arrowL = Math.max(safePadding, Math.min(arrowL, popover.width - safePadding))
            } else {
              const anchorCenterY = anchor.top + (anchor.height / 2)
              arrowT = anchorCenterY - finalTop
              arrowT = Math.max(safePadding, Math.min(arrowT, popover.height - safePadding))
            }

            this.setData({
              popoverTop: finalTop,
              popoverLeft: finalLeft,
              actualPlacement: placement,
              arrowLeft: arrowL,
              arrowTop: arrowT
            })
          }).exec()
        })
      }).exec()
    },

    /**
     * 关闭弹出框
     */
    close() {
      if (!this.data.visible) return

      this.setData({
        visible: false,
        open: false
      })
      this.triggerEvent('close')
    },
    _onBackdropTap() {
      this.close()
    }
  }
})
