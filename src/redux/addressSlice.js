import { createSlice } from "@reduxjs/toolkit"

export const AddressSlice = createSlice({
  name: "item",
  initialState: {
    addressId: null,
  },
  reducers: {
    setAddressId: (state, action) => {
      state.addressId = action.payload.addressId
    },
    clearAddressId: (state) => {
      state.addressId = null
    },
  },
})
export const { setAddressId, clearAddressId } = AddressSlice.actions

export default AddressSlice.reducer