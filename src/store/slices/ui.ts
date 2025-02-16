import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../index";

type SnackbarType = 'error' | 'warning' | 'info' | 'success'

export interface UIState {
  snackbar: {
    isOpen: boolean
    message: string
    type: SnackbarType
  }
}

const initialState: UIState = {
  snackbar: {
    isOpen: false,
    message: '',
    type: 'info',
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    snackbarOpen: (
      state,
      {
        payload,
      }: PayloadAction<{
        message: string
        type: SnackbarType
        progress?: number | null
      }>,
    ) => {
      state.snackbar.isOpen = true
      state.snackbar.message = payload.message
      state.snackbar.type = payload.type
    },
    snackbarClose: (state) => {
      state.snackbar.isOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const {snackbarOpen, snackbarClose} = uiSlice.actions

export const selectSnackbar = (state: RootState) => state.ui.snackbar

export default uiSlice.reducer
