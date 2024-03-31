import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading:false,
  isAdminLogIn:false,
  isUserLogIn:false,
  modalOpen:false
}

export const productSlice = createSlice({
  name: 'productslice',
  initialState,
  reducers: {
    setIsAdminLogIn:(state,action)=>{
      state.isAdminLogIn = action.payload
    },
    setIsUserLogIn:(state,action)=>{
      state.isUserLogIn = action.payload
    },
    setModalOpen:(state,action)=>{
      state.modalOpen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsAdminLogIn,setIsUserLogIn,setModalOpen } = productSlice.actions

export default productSlice.reducer