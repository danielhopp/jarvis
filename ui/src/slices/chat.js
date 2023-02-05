import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import generateId from '../generateId'
import renderPrompt from '../renderPrompt'
import { setState as setObjects } from './objects'
import initialBriefing from '../initialBriefing'
import processAiResponse from '../processAiResponse'

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api'
const initialTemperature = 0.25

export const sendMessage = createAsyncThunk(
  'async/serverSendMessage',
  async (payload, { requestId, dispatch, getState, rejectWithValue }) => {
    const {
      chat: {
        current: { threadId, userMessage, briefing, temperature }
      },
      objects: objectsBefore
    } = getState()

    const prompt = renderPrompt({
      briefing,
      objects: objectsBefore,
      userMessage
    })

    const messageBefore = {
      id: generateId(),
      requestId,
      threadId: threadId ? threadId : generateId(),
      createdAt: new Date().toISOString(),
      objectsBefore,
      briefing,
      userMessage,
      prompt,
      temperature
    }

    await dispatch(slice.actions.registerMessage(messageBefore))

    try {
      const response = await axios.post(`${apiEndpoint}/openai`, messageBefore)
      const responseAt = new Date().toISOString()

      const message = processAiResponse({
        response: response.data,
        objectsBefore,
        messageBefore,
        responseAt
      })
      if (message.isValidResponse) {
        await dispatch(setObjects(message.objectsAfter))
      }
      return message
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message
      return rejectWithValue({
        ...messageBefore,
        responseAt: new Date().toISOString(),
        error: errorMessage
      })
    }
  }
)

const initialState = {
  isLoading: false,
  current: {
    briefing: initialBriefing,
    temperature: initialTemperature,
    userMessage: '',
    threadId: null
  },
  threads: {}
}

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: () => initialState,
    updateCurrentProperties: (state, { payload }) => {
      Object.entries(payload).forEach(([key, property]) => {
        state.current[key] = property
      })
    },
    registerMessage: (state, { payload: message }) => {
      const { threadId } = message
      if (!state.threads[threadId]) {
        state.threads[threadId] = {}
      }
      state.threads[threadId][message.id] = message
      state.current.userMessage = ''
      state.current.threadId = threadId
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(sendMessage.fulfilled, (state, { payload: message }) => {
      const { threadId, id: messageId } = message
      state.threads[threadId][messageId] = message
      state.isLoading = false
    })
    builder.addCase(sendMessage.rejected, (state, { payload: message }) => {
      const { threadId, id: messageId } = message
      state.threads[threadId][messageId] = message
      state.isLoading = false
    })
  }
})

export default slice

export const { reset, updateCurrentProperties } = slice.actions
