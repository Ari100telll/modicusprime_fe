import React, {lazy, Suspense} from 'react'
import {Route, Routes as Switch} from 'react-router-dom'

const MainPage = lazy(() => import('../modules/main'))

const AppRouter = () => {
  return (
    <Suspense>
      <Switch>
        <Route path={''} element={<MainPage/>}/>
      </Switch>
    </Suspense>
  )
}

export default AppRouter
