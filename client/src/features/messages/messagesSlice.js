import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

// Fetch all messages
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (connectionId, thunkAPI) => {
    try {
      const res = await api.get(`/messages/${connectionId}`)
      return res.data.messages
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

// Add a new message
export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ connectionId, content }, thunkAPI) => {
    try {
      const res = await api.post(`/messages/${connectionId}`, { content })
      return res.data.message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.items = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addMessage.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { resetMessages } = messagesSlice.actions
export default messagesSlice.reducer
