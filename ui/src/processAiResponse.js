// Remove surrounding comments and markdown backticks from AI response
const cleanJSON = str =>
  str.substring(str.indexOf('['), 1 + str.lastIndexOf(']'))

export default ({ response, objectsBefore, messageBefore, responseAt }) => {
  let objects = null
  let isValidResponse = false
  const { response: plainResponse, conversationId, messageId } = response
  try {
    objects = JSON.parse(cleanJSON(plainResponse))
    isValidResponse = true
  } catch (err) {
    // Leave objects unchanged
  }

  return {
    ...messageBefore,
    responseAt,
    isValidResponse,
    chatgpt: {
      response: plainResponse,
      conversationId,
      messageId
    },
    objectsAfter: objects ? objects : objectsBefore
  }
}
