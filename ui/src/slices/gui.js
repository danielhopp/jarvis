import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createName: '',
  removeId: '',
  moveId: '',
  moveParentId: '',
  showJson: false,
  showBriefing: false
}

const slice = createSlice({
  name: 'gui',
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, { payload }) => payload,
    update: (state, { payload }) => ({
      ...state,
      ...payload
    })
  }
})

export default slice

export const { reset, set, update } = slice.actions
