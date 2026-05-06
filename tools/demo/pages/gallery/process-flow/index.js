
const SCENARIOS = {
  "cross": {
    lanes: [
      { id: "0", label: "Order", position: 0, icon: "order-status" },
      { id: "1", label: "Internal Processing", position: 1, icon: "tag-cloud-chart" },
      { id: "2", label: "Invoice", position: 2, icon: "payment-approval" }
    ],
    nodes: [
      { id: "S1", lane: "0", title: "Start Order", state: "Positive", children: ["S2", "S3"] },
      { id: "S2", lane: "1", title: "Internal Check", state: "Neutral", children: ["S3"] },
      { id: "S3", lane: "2", title: "Final Invoice", state: "Positive", children: [] }
    ]
  },
  "circular": {
    lanes: [
      { id: "0", label: "Request", position: 0, icon: "customer" },
      { id: "1", label: "Approval", position: 1, icon: "approvals" }
    ],
    nodes: [
      {
        id: "R1", lane: "0", title: "Submission", state: "Positive",
        children: ["R2"]
      },
      {
        id: "R2", lane: "1", title: "Manager Review", state: "Critical",
        children: [
          { nodeId: "R1", connectionLabel: { text: "Rejected", state: "Negative", enabled: true } },
          { nodeId: "R3", connectionLabel: { text: "Approved", state: "Positive", enabled: true } }
        ]
      },
      { id: "R3", lane: "1", title: "Archived", state: "Neutral" }
    ]
  },
  "complex": {
    lanes: [
      { id: "L1", label: "Assembly Line", position: 0, icon: "factory" },
      { id: "L2", label: "Quality Control", position: 1, icon: "inspect" }
    ],
    nodes: [
      { id: "N1", lane: "L1", title: "Base Unit", children: ["N2", "N3", "N4"] },
      { id: "N2", lane: "L1", title: "Part A", children: ["N5"] },
      { id: "N3", lane: "L1", title: "Part B", children: ["N5"] },
      { id: "N4", lane: "L1", title: "Part C", children: ["N5"] },
      { id: "N5", lane: "L1", title: "Final Assembly", children: ["N6"] },
      { id: "N6", lane: "L2", title: "Inspection", state: "Positive" }
    ]
  }
}

Page({
  _defaultData: null,

  data: {
    "nodes": [{
      "id": "1",
      "lane": "0",
      "title": "Sales Order 1",
      "titleAbbreviation": "SO 1",
      "type": "Single",
      "children": [{
        "nodeId": 10,
        "connectionLabel": {
          "id": "myButtonId1To10",
          "text": "3m",
          "enabled": true,
          "icon": "message-success",
          "state": "Positive"
        }
      }, {
        "nodeId": 11,
        "connectionLabel": {
          "id": "myButtonId1To11",
          "text": "2h 15m",
          "enabled": false,
          "state": "Neutral"
        }
      }, {
        "nodeId": 12,
        "connectionLabel": {
          "id": "myButtonId1To12",
          "text": "2d",
          "enabled": true,
          "state": "Critical"
        }
      }, {
        "nodeId": 13,
        "connectionLabel": {
          "id": "myButtonId1To13",
          "text": "2w 3d",
          "icon": "message-error",
          "enabled": true,
          "state": "Negative"
        }
      }],
      "state": "Positive",
      "stateText": "OK status",
      "focused": false,
      "texts": ["Sales Order Document Overdue long text for the wrap up all the aspects", "Not cleared"],
      "highlighted": false
    }, {
      "id": "10",
      "lane": "1",
      "title": "Outbound Delivery 40",
      "titleAbbreviation": "OD 40",
      "type": "Aggregated",
      "children": [{
        "nodeId": 14,
        "connectionLabel": {
          "id": "myButtonId10To14",
          "text": "6 years",
          "icon": "process",
          "enabled": true,
          "priority": 6,
          "state": "Negative"
        }
      }, {
        "nodeId": 21,
        "connectionLabel": {
          "id": "myButtonId10To21",
          "enabled": true,
          "text": "3d",
          "icon": "message-success",
          "state": "Positive"
        }
      }],
      "state": "Negative",
      "stateText": "NOT OK",
      "focused": false,
      "texts": ["text 1", "text 2"],
      "highlighted": false
    }, {
      "id": "11",
      "lane": "1",
      "title": "Outbound Delivery 43",
      "titleAbbreviation": "OD 43",
      "type": "Single",
      "children": [{
        "nodeId": 14,
        "connectionLabel": {
          "id": "myButtonId11To14",
          "icon": "process",
          "enabled": true,
          "priority": 7,
          "state": "Negative"
        }
      }, {
        "nodeId": 21,
        "connectionLabel": {
          "id": "myButtonId11To21",
          "icon": "message-warning",
          "text": "2d 1h",
          "enabled": true,
          "state": "Critical"
        }
      }],
      "state": "Neutral",
      "stateText": "Neutral",
      "focused": false,
      "texts": ["text 1", "text 2"],
      "highlighted": false
    }, {
      "id": "12",
      "lane": "1",
      "title": "Outbound Delivery 45",
      "titleAbbreviation": "OD 45",
      "type": "Single",
      "children": [{
        "nodeId": 14,
        "connectionLabel": {
          "id": "myButtonId12To14",
          "text": "2h 15m",
          "enabled": true,
          "priority": 7,
          "state": "Positive"
        }
      }],
      "state": "Critical",
      "stateText": "OD Issue",
      "focused": false,
      "texts": ["text 1", "text 2"],
      "highlighted": false
    }, {
      "id": "13",
      "lane": "1",
      "title": "Outbound Delivery 47",
      "titleAbbreviation": "OD 47",
      "type": "Single",
      "children": [{
        "nodeId": 14,
        "connectionLabel": {
          "id": "myButtonId13To14",
          "text": "6h 17m",
          "enabled": true,
          "priority": 7,
          "state": "Neutral"
        }
      }],
      "state": "Positive",
      "stateText": "OK",
      "focused": false,
      "texts": ["text 1", "text 2"],
      "highlighted": false
    }, {
      "id": "14",
      "lane": "1",
      "title": "Outbound Delivery 48",
      "titleAbbreviation": "OD 48",
      "type": "Aggregated",
      "children": [{
        "nodeId": 20,
        "connectionLabel": {
          "id": "myButtonId14To20",
          "text": "1d",
          "enabled": true,
          "state": "Neutral"
        }
      }],
      "state": "Negative",
      "stateText": "NOT OK",
      "focused": false,
      "texts": ["text 1", "text 2"],
      "highlighted": false
    }, {
      "id": "20",
      "lane": "2",
      "title": "Invoice 9",
      "titleAbbreviation": "I 9",
      "type": "Single",
      "children": [30],
      "state": "Neutral",
      "stateText": null,
      "focused": true,
      "texts": null,
      "highlighted": false
    }, {
      "id": "21",
      "lane": "2",
      "title": "Invoice Planned",
      "titleAbbreviation": "IP",
      "type": "Single",
      "children": null,
      "state": "PlannedNegative",
      "stateText": null,
      "focused": false,
      "texts": null,
      "highlighted": false
    }, {
      "id": "30",
      "lane": "3",
      "title": "Accounting Document 7",
      "titleAbbreviation": "AD 7",
      "type": "Single",
      "children": null,
      "state": "Positive",
      "stateText": "OK status",
      "focused": false,
      "texts": null,
      "highlighted": false
    }],
    "lanes": [{
      "id": "0",
      "icon": "order-status",
      "label": "Order Processing",
      "position": 0
    }, {
      "id": "1",
      "icon": "monitor-payments",
      "label": "Delivery Processing",
      "position": 1
    }, {
      "id": "2",
      "icon": "payment-approval",
      "label": "Invoicing",
      "position": 2
    }, {
      "id": "3",
      "icon": "money-bills",
      "label": "Accounting",
      "position": 3
    }]
  },
  onNodeClick(e) {
    const { nodeId } = e.detail
    wx.showToast({
      title: `Node ${nodeId} Clicked`,
      icon: 'none'
    })
  },
  switchTestData(e) {
    const type = e.currentTarget.dataset.type

    if (!this._defaultData) {
      this._defaultData = {
        nodes: this.data.nodes,
        lanes: this.data.lanes
      }
    }

    if (type === 'default') {
      this.setData(this._defaultData)
    } else if (SCENARIOS[type]) {
      this.setData({
        nodes: SCENARIOS[type].nodes,
        lanes: SCENARIOS[type].lanes
      })
    }
  }
})
