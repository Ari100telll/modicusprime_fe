import MuiSnackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import {selectSnackbar, snackbarClose} from '../../../../store/slices/ui'
import {useAppDispatch, useAppSelector} from "../../../../store";

const Snackbar = () => {
  const dispatch = useAppDispatch()
  const {isOpen, type, message} = useAppSelector(selectSnackbar)

  const handleClose = () => {
    dispatch(snackbarClose())
  }

  return (
    <MuiSnackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    >

      <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
