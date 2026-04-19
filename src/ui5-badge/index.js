Component({
  options: { addGlobalClass: true },
  properties: {
    icon: String,
    // colorScheme: 1 (Grey), 2 (Warning), 3 (Error), 4 (Success), 5 (Information)
    colorScheme: {
      type: String,
      value: '1'
    }
  }
})
