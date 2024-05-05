import { createSlice } from "@reduxjs/toolkit"

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    itemId: null,
  },
  reducers: {
    setItemId: (state, action) => {
      state.itemId = action.payload.itemId
    },
    clearItemId: (state) => {
      state.itemId = null
    },
  },
})
export const { setItemId, clearItemId } = itemSlice.actions

export default itemSlice.reducer