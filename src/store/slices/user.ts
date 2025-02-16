import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../index'

export interface UserState {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (state, {payload: {accessToken, refreshToken}}: PayloadAction<Partial<UserState>>) => {
      if (accessToken !== undefined) state.accessToken = accessToken
      if (refreshToken !== undefined) state.refreshToken = refreshToken
    },

    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

// Action creators are generated for each case reducer function
export const {setTokens, logout} = userSlice.actions

export const selectAccessToken = (state: RootState) => state.user.accessToken

export default userSlice.reducer
