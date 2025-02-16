import React, {FC, useState} from 'react'
import {useLogInMutation} from "../../../../store/services/tokens";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {selectAccessToken, setTokens} from "../../../../store/slices/user";
import {snackbarOpen} from "../../../../store/slices/ui";
import {Box, Button, CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import {BaxWrapperStyled} from "./styles";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useAppDispatch, useAppSelector} from "../../../../store";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const [logIn, {isLoading}] = useLogInMutation()

  const methods = useForm({mode: 'onChange', defaultValues: {username: '', password: ''}})
  const {getValues, setError, control, handleSubmit, formState: {isValid, isDirty}} = methods

  const [showPw, setShowPw] = useState<boolean>(false)
  const isAuth = useAppSelector(selectAccessToken)

  const handleTogglePasswordVisibility = () => setShowPw(!showPw)

  const handleSignIn = async () => {
    try {
      const {username, password} = getValues()
      const {access, refresh} = await logIn({username, password}).unwrap()
      dispatch(setTokens({accessToken: access, refreshToken: refresh}))
    } catch (e) {
      setError('username', {type: 'custom', message: ''})
      setError('password', {type: 'custom', message: ''})
      dispatch(snackbarOpen({type: 'error', message: 'Email or password is not correct'}))
    }
  }

  const handleSignOut = () => {
    dispatch(setTokens({accessToken: '', refreshToken: ''}))
  }


  return (
    <BaxWrapperStyled>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            {!isAuth ? <>
              <Controller
                name='username'
                control={control}
                render={({field, fieldState: {error}}) => (
                  <TextField
                    label='Username'
                    {...field}
                    variant='filled'
                    error={!!error}
                    helperText={error?.message}
                    disabled={isLoading}
                  />
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({field, fieldState: {error}}) => (
                  <TextField
                    label='Password'
                    {...field}
                    variant='filled'
                    error={!!error}
                    helperText={error?.message}
                    disabled={isLoading}
                    type={showPw ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleTogglePasswordVisibility}
                            edge='end'
                          >
                            {showPw ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                  />
                )}
              />

              <Button disabled={!isValid || !isDirty} type='submit' fullWidth>
                {isLoading ? <CircularProgress size={24.5}/> : 'Sign In'}
              </Button>
            </> : (
              <>
                <Box>Authorized</Box>
                <Button fullWidth onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            )}
          </Box>
        </form>
      </FormProvider>
    </BaxWrapperStyled>
  )
}

export default LoginForm