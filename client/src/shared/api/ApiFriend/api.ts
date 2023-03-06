import {baseApi} from "@/shared/api";
import {Friend} from "@/shared/api/ApiFriend/type";

const ApiFriend = baseApi.injectEndpoints({
    endpoints: builder => ({
        getFriends: builder.query<Friend[], {userId: string}>({
            query: ({userId}) => ({
                url: `get-friends?userId=${userId}`
            })
        }),

        addFriend: builder.mutation<any, {userId: string, friendName: string}>({
            query: ({userId, friendName}) => ({
                url: 'add-friend',
                method: 'POST',
                body: {
                    userId,
                    friendName
                }
            })
        })
    })
})

export const {useGetFriendsQuery, useAddFriendMutation} = ApiFriend