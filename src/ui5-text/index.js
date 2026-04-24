Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true
  },
  properties: {
    text: {
      type: String,
      value: ''
    },
    level: {
      type: String,
      value: 'Body'
    },
    wrapping: {
      type: Boolean,
      value: true
    },
    maxLines: {
      type: Number,
      value: 0
    },
    design: {
      type: String,
      value: 'Standard'
    },
    color: {
      type: String,
      value: ''
    }
  },
  observers: {
    'level, wrapping, design, maxLines, color': function (level, wrapping, design, maxLines, color) {
      const levelMap = {
        H1: 'ui5-text--h1',
        H2: 'ui5-text--h2',
        H3: 'ui5-text--h3',
        H4: 'ui5-text--h4',
        H5: 'ui5-text--h5',
        Subtitle: 'ui5-text--subtitle',
        Small: 'ui5-text--small',
        Body: 'ui5-text--body'
      }
      const designMap = {
        Standard: '',
        Subtle: 'ui5-text--subtle',
        Emphasized: 'ui5-text--emphasized'
      }

      console.log('wrapping: ' + wrapping)

      const classes = [
        'ui5-text',
        levelMap[level] || levelMap.Body,
        wrapping ? '' : 'ui5-text--no-wrap',
        designMap[design] || ''
      ].filter(Boolean).join(' ')


      let style = ''
      if (color) {
        style += `color: ${color};`
      }
      if (maxLines > 0) {
        style += 'display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;'
        style += `-webkit-line-clamp: ${maxLines};`
      }

      this.setData({
        _classes: classes,
        _style: style
      })
    }
  },
  data: {
    _classes: 'ui5-text ui5-text--body',
    _style: ''
  }
})
