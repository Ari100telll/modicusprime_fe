import {baseApi, TAG_TYPES} from '../base'
import {IUser} from './types'
import {PaginationResult} from "../../../types/common/pagination-result";

export const mainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query<PaginationResult<IUser>, void>({
      query: () => ({url: 'users/'}),
      providesTags: [TAG_TYPES.Main],
    }),
  }),
})

export const {useGetUsersListQuery} = mainApi
