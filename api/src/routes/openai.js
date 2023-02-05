import Router from 'express-promise-router'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const settings = {
  model: 'text-davinci-003',
  max_tokens: 1000,
  temperature: 0.25
}

const router = new Router()

router.post('/', async (req, res) => {
  const { prompt, temperature } = req.body
  try {
    const completion = await openai.createCompletion({
      prompt,
      ...settings,
      temperature
    })
    res.json({
      response: completion?.data?.choices?.[0]?.text || null
    })
  } catch (error) {
    throw {
      userMessage: 'Sending prompt failed',
      error
    }
  }
})

export default router
