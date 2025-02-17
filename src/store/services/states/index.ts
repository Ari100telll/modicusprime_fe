import {baseApi, TAG_TYPES} from '../base';
import {PaginationResult} from "../../../types/common/pagination-result";
import {CreateGroupPayload, CreateStatePayload, CreateTransitionPayload, IStateGroup, IStateItem, Transition} from "./types";

export const statesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStateGroups: builder.query<PaginationResult<IStateGroup>, void>({
      query: () => 'states/groups/',
      providesTags: [TAG_TYPES.StatesGroups],
    }),
    createStateGroup: builder.mutation<IStateGroup, CreateGroupPayload>({
      query: (body) => ({
        url: 'states/groups/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG_TYPES.StatesGroups],
    }),

    getStates: builder.query<PaginationResult<IStateItem>, string | void>({
      query: (groupId) => ({
        url: 'states/',
        params: groupId ? {group: groupId} : {},
      }),
      providesTags: [TAG_TYPES.States],

    }),
    createState: builder.mutation<IStateItem, CreateStatePayload>({
      query: (body) => ({
        url: 'states/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG_TYPES.States],
    }),
    getTransitions: builder.query<PaginationResult<Transition>, void>({
      query: () => 'states/transitions/',
      providesTags: [TAG_TYPES.Transitions],
    }),
    createTransition: builder.mutation<Transition, CreateTransitionPayload>({
      query: (body) => ({
        url: 'states/transitions/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG_TYPES.Transitions],
    })
  }),
});

export const {
  useGetStateGroupsQuery,
  useCreateStateGroupMutation,
  useCreateStateMutation,
  useGetStatesQuery,
  useGetTransitionsQuery,
  useCreateTransitionMutation
} = statesApi;
