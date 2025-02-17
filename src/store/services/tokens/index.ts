import {baseApi, TAG_TYPES} from '../base'
import {LogInRequest, LogInResponse} from "./types";

export const tokensApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<LogInResponse, LogInRequest>({
      query: (credentials) => ({
        url: 'token/login/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [TAG_TYPES.Main],
    }),
  }),
})

export const {useLogInMutation} = tokensApi
