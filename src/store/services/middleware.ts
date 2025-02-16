import {isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {snackbarOpen} from "../slices/ui";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // TODO Fix any
    const statusCode = Math.floor((action as any).payload.originalStatus / 100)

    if (statusCode === 5) {
      api.dispatch(
        snackbarOpen({
          type: 'error',
          message: 'Server error. Please try again later ',
        }),
      )
    }
  }

  return next(action)
}
