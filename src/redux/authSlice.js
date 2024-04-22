import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    decode: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload.token
      state.decode = action.payload.decode
    },
    clearAuthToken: (state) => {
      state.token = null
      state.decode = null
    },
  },
})

export const { setAuthToken, clearAuthToken } = authSlice.actions

export default authSlice.reducer
