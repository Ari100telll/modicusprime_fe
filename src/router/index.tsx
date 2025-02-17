import React, {lazy, Suspense} from 'react'
import {Route, Routes as Switch} from 'react-router-dom'
import TransitionsPage from "../pages/TransitionsPage";

const MainPage = lazy(() => import('../modules/main'))
const StatesPage = lazy(() => import('../pages/StatesPage'))

const AppRouter = () => {
  return (
    <Suspense>
      <Switch>
        <Route path={''} element={<MainPage/>}/>
        <Route path={'states/'} element={<StatesPage/>}/>
        <Route path={'transitions/'} element={<TransitionsPage />} />
      </Switch>
    </Suspense>
  )
}

export default AppRouter
