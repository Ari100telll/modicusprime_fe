import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'
import {RootState} from '../index'
import {logout, setTokens} from '../slices/user'
// import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes'

//dev-api.proofkeep.com/api/
export const BASE_URL = process.env.REACT_APP_BASE_URL

export enum TAG_TYPES {
  Main = 'Main',
}

const multipartEndpoints = [
  'createAuthor',
  'updateAuthor',
  'createArticle',
  'updateArticle',
  'createCustomNotification',
  'updateNotification',
  'sendCustomNotification',
  'exportUsersEmailsList',
  'exportUsersEmailsCSV',
  'getFilteredUsersCount',
]

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, {getState, endpoint}) => {
    if (!multipartEndpoints.includes(endpoint)) {
      if (!headers.get('Content-Type')) {
        headers.set('Content-Type', 'application/json')
      }

      if (headers.get('Content-Type') === 'undefined') {
        headers.delete('Content-Type')
      }
    }

    const {
      user: {accessToken},
    } = getState() as RootState | any

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

export const getQueryWithReauth = () => {
  let isRefreshing = false

  const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
  ) => {
    let result = await baseQuery(args, api, extraOptions)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (result.error && (result.error.status === 401 || result.error.originalStatus === 401)) {
      if (isRefreshing) {
        // if some failed request already has triggered refreshing - just wait for it ending, and continue via new tokens
        const resendRequestAfterGettingNewTokens = async () =>
          new Promise((resolve) => {
            setTimeout(async () => {
              if (isRefreshing) {
                resolve(resendRequestAfterGettingNewTokens())
              } else {
                // so, first refreshing request was done, and here we got a new refresh
                // token and can retry to send initial request
                resolve(await baseQuery(args, api, extraOptions))
              }
            }, 500)
          })

        result = (await resendRequestAfterGettingNewTokens()) as QueryReturnValue<
          unknown,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >
      } else {
        // if this request is first that failed 401 - then start token refreshing
        isRefreshing = true // - blocking all future refreshes

        const {
          user: {refreshToken},
        } = api.getState() as RootState

        const refreshResult: any = await baseQuery(
          {
            url: 'token/refresh/',
            method: 'POST',
            body: {refresh: refreshToken},
          },
          api,
          extraOptions,
        )

        if (refreshResult.data) {
          api.dispatch(
            setTokens({
              accessToken: refreshResult.data.access as string,
              refreshToken: refreshResult.data.refresh as string,
            }),
          )

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }

        isRefreshing = false // allow next refreshes
      }
    }

    return result
  }

  return baseQueryWithReauth
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: getQueryWithReauth(),
  endpoints: () => ({}),
  tagTypes: Object.values(TAG_TYPES),
})
