import {baseApi} from "@/shared/api";
import {Friend} from "@/shared/api/ApiFriend/type";

const ApiFriend = baseApi.injectEndpoints({
    endpoints: builder => ({
        getFriends: builder.query<Friend[], {userId: string}>({
            query: ({userId}) => ({
                url: `get-friends?userId=${userId}`
            }),
            providesTags: (result) =>
                result ? [
                    ...result.map(({recipient}) => ({type: 'Friend' as const, id: recipient.userId})),
                    {type: 'Friend', id: 'LIST'}
                ]
                    : [{type: 'Friend', id: 'LIST'}]
        }),
        getPendingFriends: builder.query<Friend[], {userId: string}>({
            query: ({userId}) => ({
                url: `get-pending-friends?userId=${userId}`
            }),
            providesTags: (result) =>
            result ? [
                    ...result.map(({recipient}) => ({type: 'Friend' as const, id: recipient.userId})),
                    {type: 'Friend', id: 'LIST'}
                ]
                : [{type: 'Friend', id: 'LIST'}]
        }),
        addFriend: builder.mutation<any, {userId: string, friendName: string}>({
            query: ({userId, friendName}) => ({
                url: 'add-friend',
                method: 'POST',
                body: {
                    userId,
                    friendName
                }
            }),
            invalidatesTags: [{type: 'Friend', id: 'LIST'}]
        }),
        acceptFriendship: builder.mutation<any, {userId: string, friendId: string}>({
            query: ({userId, friendId}) => ({
                url: 'accept-friendship',
                method: 'POST',
                body: {
                    userId, friendId
                }
            }),
            invalidatesTags: [{type: 'Friend', id: 'LIST'}]
        })
    })
})

export const {useGetFriendsQuery, useAddFriendMutation, useAcceptFriendshipMutation, useGetPendingFriendsQuery} = ApiFriend