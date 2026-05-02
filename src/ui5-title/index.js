const textBehavior = require('../behaviors/text-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true
  },
  behaviors: [textBehavior],
  properties: {
    text: {
      type: String,
      value: ''
    },
    level: {
      type: String,
      value: 'H1'
    },
    design: {
      type: String,
      value: 'Standard'
    },
    width: {
      type: String,
      value: ''
    }
  },
  observers: {
    'level, wrappingType, design, textAlign, width': function (level, wrappingType, design, textAlign, width) {
      const levelMap = {
        H1: 'ui5-title--h1',
        H2: 'ui5-title--h2',
        H3: 'ui5-title--h3',
        H4: 'ui5-title--h4',
        H5: 'ui5-title--h5',
        H6: 'ui5-title--h6'
      }
      const designMap = {
        Standard: '',
        Subtle: 'ui5-title--subtle',
        Emphasized: 'ui5-title--emphasized'
      }
      const alignMap = {
        Left: 'left',
        Center: 'center',
        Right: 'right'
      }

      const classes = [
        'ui5-title',
        levelMap[level] || levelMap.H1,
        wrappingType === 'Normal' ? '' : 'ui5-title--no-wrap',
        designMap[design] || ''
      ].filter(Boolean).join(' ')

      let style = `text-align: ${alignMap[textAlign] || 'left'};`
      if (width) {
        style += `width: ${width};`
      }

      this.setData({
        _classes: classes,
        _style: style
      })
    }
  },
  data: {
    _classes: 'ui5-title ui5-title--h1',
    _style: 'text-align: left;'
  }
})
