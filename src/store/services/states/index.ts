import {baseApi} from '../base';
import {PaginationResult} from "../../../types/common/pagination-result";
import {CreateGroupPayload, CreateStatePayload, IStateGroup, IStateItem} from "./types";

export const statesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStateGroups: builder.query<PaginationResult<IStateGroup>, void>({
      query: () => 'states/groups/',
    }),
    createStateGroup: builder.mutation<IStateGroup, CreateGroupPayload>({
      query: (body) => ({
        url: 'states/groups/',
        method: 'POST',
        body,
      }),
    }),
    createState: builder.mutation<IStateItem, CreateStatePayload>({
      query: (body) => ({
        url: 'states/',
        method: 'POST',
        body,
      }),
    }),
    getStates: builder.query<PaginationResult<IStateItem>, string | void>({
      query: (groupId) => ({
        url: 'states/',
        params: groupId ? {group: groupId} : {},
      }),
    }),
  }),
});

export const {
  useGetStateGroupsQuery,
  useCreateStateGroupMutation,
  useCreateStateMutation,
  useGetStatesQuery,
} = statesApi;
