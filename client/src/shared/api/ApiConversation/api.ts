import {baseApi} from "@/shared/api";
import {Message} from "@/shared/api/ApiConversation/type";

export const ApiConversation = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], {userId:string, friendId: string}>({
            query: ({userId, friendId}) => ({
                url: 'get-messages',
                params: {userId, friendId},
            })
        })
    })
})

export const {useGetMessagesQuery} = ApiConversation