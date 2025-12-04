import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'

const initialState = {
    messages: []
}

// Fetch messages from server
export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async ({ token, userId }) => {
        const { data } = await api.post(
            '/api/message/get',
            { to_user_id: userId },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return data.success ? data : null
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

        // Completely replace messages
        setMessages: (state, action) => {
            state.messages = action.payload
        },

        // Add a new message (single)
        addMessages: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },

        // Clear all messages
        resetMessages: (state) => {
            state.messages = []
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            if (action.payload) {
                state.messages = action.payload.messages
            }
        })
    }
})

export const { setMessages, addMessages, resetMessages } = messagesSlice.actions

export default messagesSlice.reducer
