export default (error, req, res, next) => {
  console.log('Catched error: ', error)
  const { userMessage: message = null, status = 500, ...rest } = error
  res
    .status(status)
    .json(
      message
        ? {
            ...rest,
            message
          }
        : {
            message: 'Server error'
          }
    )
    .end()
}
