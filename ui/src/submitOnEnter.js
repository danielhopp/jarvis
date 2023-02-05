export default submit => ({
  onKeyPress: event => {
    if (
      event.key === 'Enter' &&
      !(event.shiftKey || event.altKey || event.ctrlKey)
    ) {
      event.preventDefault()
      if (typeof submit === 'function') {
        submit()
      }
    }
  }
})
