export default ({ briefing, objects, userMessage }) => `${briefing}

JSON: ${JSON.stringify(objects)}

COMMAND: ${userMessage}
`
