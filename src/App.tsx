import React from 'react'
import {Box, styled} from '@mui/material'
import AppRouter from "./router";
import Snackbar from "./modules/common/components/Snackbar";

const BoxContainerStyled = styled(Box)(() => {
  return {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    height: '100vh',
    width: '100vw',
  }
})

function App() {

  return (
    <BoxContainerStyled>
      <Snackbar />
      <AppRouter/>
    </BoxContainerStyled>
  )
}

export default App
