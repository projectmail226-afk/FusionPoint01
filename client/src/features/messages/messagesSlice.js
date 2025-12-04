import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch messages for a specific user
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ token, userId }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASEURL}/api/message/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.messages;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    // 👇 THIS FUNCTION MUST EXIST (Vercel error fixed)
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    // If you want to replace all messages at once
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
