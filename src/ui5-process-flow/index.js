const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义流程泳道。
     * 每个 Lane 包含: id, icon, label, position
     */
    lanes: {
      type: Array,
      value: []
    },
    /**
     * 定义流程节点。
     * 每个 Node 包含: id, laneId, title, state, children(Array of IDs)
     */
    nodes: {
      type: Array,
      value: []
    }
  },
  data: {
    processedLanes: [],
    processedNodes: [],
    maxColumns: 1,
    maxRows: 1,
    highlightedNodeId: null, // 当前高亮的节点 ID
    isPopoverOpen: false,
    popoverText: '',
    popoverStyle: ''
  },
  detached() {
    if (this._renderTimer) {
      clearTimeout(this._renderTimer)
    }
  },
  lifetimes: {
    ready() {
      this._labelBounds = []
      this._renderConnections()
    }
  },
  observers: {
    'nodes, lanes': function (nodes, lanes) {
      this._processFlowData(nodes, lanes)
    }
  },
  methods: {
    _processFlowData(nodes, lanes) {
      if (!lanes || lanes.length === 0 || !nodes || nodes.length === 0) return

      // 1. 构建图结构
      const adj = {}
      const reverseAdj = {}
      const nodeMap = {}
      nodes.forEach(n => {
        const id = String(n.id)
        nodeMap[id] = n
        adj[id] = (n.children || []).map(c => String(typeof c === 'object' ? c.nodeId : c))
        adj[id].forEach(childId => {
          if (!reverseAdj[childId]) reverseAdj[childId] = []
          reverseAdj[childId].push(id)
        })
      })

      // 2. 计算泳道内子列 (Sub-columns)
      // 逻辑：如果父子节点在同泳道，子节点 Level = 父节点 Level + 1
      const nodeSubCol = {}
      const getSubCol = (id) => {
        if (nodeSubCol[id] !== undefined) return nodeSubCol[id]
        const currNode = nodeMap[id]
        const parentsInSameLane = (reverseAdj[id] || [])
          .filter(pId => nodeMap[pId] && String(nodeMap[pId].lane) === String(currNode.lane))
        const subCol = parentsInSameLane.length === 0
          ? 0
          : Math.max.apply(Math, parentsInSameLane.map(getSubCol)) + 1
        nodeSubCol[id] = subCol
        return subCol
      }
      nodes.forEach(n => getSubCol(String(n.id)))

      // 3. 计算泳道宽度和起始列
      const sortedLanes = [].concat(lanes).sort((a, b) => a.position - b.position)
      const laneMeta = {}
      let currentGridCol = 1

      const processedLanes = sortedLanes.map(lane => {
        const nodesInLane = nodes.filter(n => String(n.lane) === String(lane.id))
        const laneWidth = nodesInLane.length > 0
          ? Math.max.apply(Math, nodesInLane.map(n => nodeSubCol[n.id])) + 1 : 1

        // 统计信息逻辑
        const statsMap = {}
        nodesInLane.forEach(n => {
          const state = n.state || 'Neutral'
          statsMap[state] = (statsMap[state] || 0) + 1
        })
        const statistics = Object.keys(statsMap).map(state => ({ state, value: statsMap[state] }))

        const meta = Object.assign({}, lane, {
          gridColumnStart: currentGridCol,
          laneWidth,
          statistics
        })
        laneMeta[String(lane.id)] = meta
        currentGridCol += laneWidth
        return meta
      })

      // 4. 分配物理列 (Grid Column)
      const nodeGridCol = {}
      nodes.forEach(n => {
        const id = String(n.id)
        const laneInfo = laneMeta[String(n.lane)]
        nodeGridCol[id] = laneInfo ? (laneInfo.gridColumnStart + nodeSubCol[id]) : 1
      })

      // 5. 分配物理行 (Grid Row) - 自动避让算法
      const nodeGridRow = {}
      const occupied = new Set() // 记录 "row-col" 占用情况
      const roots = nodes.filter(n => !reverseAdj[n.id] ||
        reverseAdj[n.id].length === 0).sort((a, b) => a.id - b.id)

      const assignRow = (id, rowHint) => {
        if (nodeGridRow[id] !== undefined) return
        let row = rowHint
        const col = nodeGridCol[id]
        while (occupied.has(`${row}-${col}`)) { row++ }
        nodeGridRow[id] = row
        occupied.add(`${row}-${col}`)
        // 深度优先遍历：子节点尝试继承父节点的行号
        if (adj[id]) {
          adj[id].forEach(childId => assignRow(childId, row))
        }
      }

      roots.forEach(root => assignRow(String(root.id), 2)) // 从第2行开始（第1行是标题）
      nodes.forEach(n => assignRow(String(n.id), 2)) // 兜底处理循环引用或孤立节点

      const processedNodes = nodes.map(n => Object.assign({}, n, {
        gridColumn: nodeGridCol[String(n.id)],
        gridRow: nodeGridRow[String(n.id)]
      }))

      this.setData({
        processedLanes,
        processedNodes,
        maxColumns: currentGridCol - 1,
        maxRows: Math.max.apply(Math, Object.values(nodeGridRow).concat([1]))
      }, () => {
        this._renderConnections()
      })
    },

    _renderConnections() {
      // 防止多次数据变动触发重叠渲染
      if (this._renderTimer) {
        clearTimeout(this._renderTimer)
      }

      wx.nextTick(() => {
        const self = this
        this._renderTimer = setTimeout(() => {
          const query = this.createSelectorQuery()
          query.select('#process-flow-container').boundingClientRect()
          query.selectAll('.ui5-process-flow-node-item').fields({ rect: true, size: true, dataset: true })
          query.select('#connection-canvas').node()

          query.exec((res) => {
            const container = res[0]
            const nodeRects = res[1]
            const canvasObj = res[2]?.node

            if (!container || !nodeRects || !canvasObj) return

            self._labelBounds = [] // 确保使用 self 引用组件实例

            const ctx = canvasObj.getContext('2d')
            const winInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
            const dpr = winInfo.pixelRatio
            const canvasW = container.width
            const canvasH = container.height

            // 优化 3: 使用 OffscreenCanvas 实现离屏渲染
            // 离屏渲染能有效减少大批量路径绘制时的闪烁，并提高复杂图表的交互性能
            const offscreenCanvas = wx.createOffscreenCanvas({
              type: '2d',
              width: Math.ceil(canvasW * dpr),
              height: Math.ceil(canvasH * dpr)
            })
            const offCtx = offscreenCanvas.getContext('2d')

            // 同步缩放比例至离屏环境
            offCtx.scale(dpr, dpr)

            // 清除离屏画布并设置基础样式
            offCtx.clearRect(0, 0, canvasW, canvasH)
            offCtx.strokeStyle = '#89919a'
            offCtx.fillStyle = '#89919a'
            offCtx.font = '10px Arial'
            offCtx.lineWidth = 1.5

            // 性能优化：在循环外获取比例并建立节点快速索引（从 O(N^2) 降至 O(N)）
            const rpxToPxScale = winInfo.windowWidth / 750
            const COLUMN_GAP_PX = 160 * rpxToPxScale // 同步 wxss 中的 160rpx
            const ROW_GAP_PX = 120 * rpxToPxScale // 同步 wxss 中的 120rpx，确保与 CSS 保持一致

            const processedNodeMap = {}
            self.data.processedNodes.forEach(n => {
              processedNodeMap[String(n.id)] = n
            })

            // 建立 ID 坐标映射表
            const nodePos = {}
            nodeRects.forEach(rect => {
              const nodeId = String(rect.dataset.id)
              const originalNode = processedNodeMap[nodeId]

              // 健壮性增强：如果 size 属性丢失，通过 rect 坐标反算宽高
              const w = rect.width || (rect.right - rect.left) || 120 // 赋予默认值防止 NaN
              const h = rect.height || (rect.bottom - rect.top) || 80

              nodePos[nodeId] = {
                x: rect.left - container.left,
                y: rect.top - container.top,
                w,
                h,
                // 存储网格列信息
                gridColumn: originalNode ? originalNode.gridColumn : 0,
                // 存储网格行信息
                gridRow: originalNode ? originalNode.gridRow : 0
              }
            })

            // 遍历节点并在离屏画布上绘制连线
            self.data.processedNodes.forEach(node => {
              const startNodeId = String(node.id)
              if (node.children && node.children.length > 0) {
                const start = nodePos[startNodeId]
                node.children.forEach(child => {
                  // 兼容处理：children 可能是 ID 数组，也可能是对象数组 [{nodeId, connectionLabel}]
                  const isObj = typeof child === 'object' && child !== null
                  const targetId = String(isObj ? child.nodeId : child)
                  const label = isObj ? child.connectionLabel : null

                  const end = nodePos[targetId]
                  if (start && end) {
                    // 判断当前连线是否属于高亮路径（起点或终点是高亮节点）
                    const hId = self.data.highlightedNodeId ? String(self.data.highlightedNodeId) : null
                    const isHighlighted = !!(hId && (startNodeId === hId || targetId === hId))

                    // 标签最大宽度限制为间隙宽度的 1.2 倍（允许轻微溢出至节点边空）
                    const labelMaxWidth = COLUMN_GAP_PX * 1.2
                    self._drawConnection(offCtx, start, end, label, COLUMN_GAP_PX, ROW_GAP_PX, isHighlighted, labelMaxWidth, self)
                  }
                })
              }
            })

            // 将离屏画布内容一次性同步到显示画布，实现无缝刷新
            const finalW = Math.ceil(canvasW * dpr)
            const finalH = Math.ceil(canvasH * dpr)
            canvasObj.width = finalW
            canvasObj.height = finalH
            ctx.drawImage(offscreenCanvas, 0, 0, finalW, finalH)
          })
        }, 100)
      })
    },

    _drawConnection(ctx, start, end, label, COLUMN_GAP_PX, ROW_GAP_PX, isHighlighted, labelMaxWidth, self) {
      ctx.save()

      // 根据高亮状态设置样式
      if (self.data.highlightedNodeId) {
        if (isHighlighted) {
          ctx.strokeStyle = '#0064d1' // SAP High-light Blue
          ctx.lineWidth = 3
          ctx.globalAlpha = 1
        } else {
          ctx.strokeStyle = '#d9d9d9' // Dimmed Gray
          ctx.globalAlpha = 0.3
        }
      } else {
        ctx.strokeStyle = '#89919a'
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 1
      }

      // 优化 5: 动态计算锚点。startY 和 endY 会随着各自节点的高度（h）变化而自动对齐中心
      // 获取网格信息
      const startCol = start.gridColumn
      const endCol = end.gridColumn
      const startRow = start.gridRow
      const endRow = end.gridRow

      // 逻辑判断：是否需要复杂避让
      const isBackward = endCol < startCol
      const isCrossLane = Math.abs(startCol - endCol) > 1
      const isDifferentRow = startRow !== endRow

      // 动态确定起止 X 坐标：正向从右出左入，反向从左出右入
      const startX = isBackward ? start.x : start.x + start.w
      const startY = start.y + start.h / 2
      const endX = isBackward ? end.x + end.w : end.x
      const endY = end.y + end.h / 2

      // 计算路径关键点
      // midX1: 靠近源节点的列间隙中心
      const midX1 = (startCol <= endCol)
        ? start.x + start.w + COLUMN_GAP_PX / 2
        : start.x - COLUMN_GAP_PX / 2

      // midX2: 靠近目标节点的列间隙中心
      const midX2 = (startCol <= endCol)
        ? end.x - COLUMN_GAP_PX / 2
        : end.x + end.w + COLUMN_GAP_PX / 2

      ctx.beginPath()
      ctx.moveTo(startX, startY)

      let labelX
      let labelY

      if (!isCrossLane && !isBackward && !isDifferentRow) {
        // 场景 A: 相邻泳道、同行的正向流。使用简单的 Z 字形
        const midX = (startX + endX) / 2
        ctx.lineTo(midX, startY)
        ctx.lineTo(midX, endY)
        labelX = midX
        labelY = startY
      } else {
        // 场景 B: 需要避让。路径走“行间隙（Row Gutter）”通道
        let midY
        if (endRow > startRow) {
          // 向下走：源节点底部间隙
          midY = start.y + start.h + ROW_GAP_PX / 2
        } else if (endRow < startRow) {
          // 向上走：源节点顶部间隙
          midY = start.y - ROW_GAP_PX / 2
        } else {
          // 同行但跨泳道或回溯
          // 规范：同行跨泳道从下方绕路，回溯从上方绕路
          midY = isBackward
            ? start.y - ROW_GAP_PX / 2
            : start.y + start.h + ROW_GAP_PX / 2
        }

        // 水平引出到间隙
        ctx.lineTo(midX1, startY)
        // 垂直转弯进入行间隙通道
        ctx.lineTo(midX1, midY)
        // 在行间隙通道中水平横跨
        ctx.lineTo(midX2, midY)
        // 到达目标列间隙，转弯对齐目标高度
        ctx.lineTo(midX2, endY)

        // 标签位置：如果是长距离横跨，放在水平通道中心；否则放在垂直段中心
        labelX = (midX1 + midX2) / 2
        labelY = (midX1 === midX2) ? (startY + endY) / 2 : midY
      }

      ctx.lineTo(endX, endY)
      ctx.stroke()

      // 优化 6: 增强箭头绘制逻辑
      ctx.fillStyle = ctx.strokeStyle // 箭头默认跟随线色
      // 如果处于高亮状态且当前线不是高亮线，箭头也需要变淡
      if (this.data.highlightedNodeId && isHighlighted) {
        ctx.fillStyle = '#0064d1'
      }

      const headlen = 10
      const arrowDir = isBackward ? 1 : -1
      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(endX + arrowDir * headlen, endY - headlen / 2)
      ctx.lineTo(endX + arrowDir * headlen, endY + headlen / 2)
      ctx.fill()

      // 如果存在标签且已启用，则在垂直连线中点绘制标签
      if (label && label.enabled && label.text) {
        self._drawConnectionLabel(ctx, labelX, labelY, label, labelMaxWidth)
      }

      ctx.restore()
    },

    _drawConnectionLabel(ctx, x, y, label, maxWidth) {
      const stateColors = {
        Positive: { bg: '#f6fdf9', text: '#107e3e' },
        Negative: { bg: '#fff4f4', text: '#bb0000' },
        Critical: { bg: '#fef7f1', text: '#e9730c' },
        Information: { bg: '#f5fafd', text: '#0a6ed1' },
        Neutral: { bg: '#f4f5f6', text: '#6a6d70' }
      }
      const config = stateColors[label.state] || stateColors.Neutral

      ctx.save()

      let displayText = label.text
      let textWidth = ctx.measureText(displayText).width

      // 文字截断逻辑
      if (maxWidth && textWidth > maxWidth) {
        while (displayText.length > 0 && textWidth > maxWidth) {
          displayText = displayText.substring(0, displayText.length - 1)
          textWidth = ctx.measureText(displayText + '...').width
        }
        displayText += '...'
      }

      const padding = 6
      const rectW = textWidth + padding * 2
      const rectH = 18

      // 绘制圆角背景
      ctx.fillStyle = config.bg
      ctx.shadowBlur = 2
      ctx.shadowColor = 'rgba(0,0,0,0.1)'

      const rx = x - rectW / 2
      const ry = y - rectH / 2

      // 记录标签边界用于点击检测 (坐标相对于 container)
      if (!this._labelBounds) {
        this._labelBounds = []
      }
      this._labelBounds.push({
        x: rx,
        y: ry,
        w: rectW,
        h: rectH,
        text: label.text
      })

      // 简易圆角矩形
      ctx.beginPath()
      ctx.moveTo(rx + 4, ry)
      ctx.lineTo(rx + rectW - 4, ry)
      ctx.arcTo(rx + rectW, ry, rx + rectW, ry + 4, 4)
      ctx.lineTo(rx + rectW, ry + rectH - 4)
      ctx.arcTo(rx + rectW, ry + rectH, rx + rectW - 4, ry + rectH, 4)
      ctx.lineTo(rx + 4, ry + rectH)
      ctx.arcTo(rx, ry + rectH, rx, ry + rectH - 4, 4)
      ctx.lineTo(rx, ry + 4)
      ctx.arcTo(rx, ry, rx + 4, ry, 4)
      ctx.fill()

      // 绘制文字
      ctx.shadowBlur = 0
      ctx.fillStyle = config.text
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(displayText, x, y)
      ctx.restore()
    },

    _onNodeClick(e) {
      /**
       * 节点被点击时触发
       * @event node-click
       */
      const { nodeId } = e.detail
      const clickedId = String(nodeId)

      // 点击节点切换高亮状态
      const newHighlightedId = this.data.highlightedNodeId === clickedId ? null : clickedId

      this.setData({ highlightedNodeId: newHighlightedId }, () => {
        this._renderConnections()
        this.triggerEvent('node-click', e.detail)
      })
    },

    _onCanvasTap(e) {
      // 使用 changedTouches 获取相对于视口的 clientX/Y，这与 boundingClientRect 的坐标系一致
      const touch = e.detail.x !== undefined ? e.detail : (e.changedTouches && e.changedTouches[0])
      if (!touch) return

      const query = this.createSelectorQuery()
      query.select('#process-flow-container').boundingClientRect().exec(res => {
        const container = res[0]
        if (!container) return

        // 将点击坐标从视口空间转换到容器空间
        const tapX = (touch.x || touch.clientX) - container.left
        const tapY = (touch.y || touch.clientY) - container.top

        // 碰撞检测：增加 HIT_SLOP (热区补偿) 提高点击灵敏度
        const HIT_SLOP = 10
        const hit = (this._labelBounds || []).find(b => {
          return tapX >= b.x - HIT_SLOP && tapX <= b.x + b.w + HIT_SLOP &&
            tapY >= b.y - HIT_SLOP && tapY <= b.y + b.h + HIT_SLOP
        })

        if (hit) {
          const popoverStyle = `left: ${hit.x + hit.w / 2}px; top: ${hit.y}px;`
          this.setData({
            popoverText: hit.text,
            popoverStyle,
            isPopoverOpen: true
          }, () => {
            const popover = this.selectComponent('#label-popover')
            if (popover) {
              popover.show('popover-anchor', this)
            }
          })
        } else {
          this.setData({
            isPopoverOpen: false
          })
        }
      })
    }
  }
})
