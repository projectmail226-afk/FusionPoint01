// src/features/messages/messagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ token, userId }) => {
    const { data } = await api.get(`/api/message/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return data.messages
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    resetMessages: (state) => {
      state.messages = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
  }
})

export const { addMessage, resetMessages } = messagesSlice.actions
export default messagesSlice.reducer
