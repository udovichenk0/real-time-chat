import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createBaseSelector} from "@/shared/lib/redux";
import {ApiConversation, Message} from "@/shared/api/ApiConversation";


export const initialState = {
    messages: [] as Message[]
}
type State = typeof initialState
const name = 'entity/chat'

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addMessage(state,action:PayloadAction<Message>){
            state.messages.push(action.payload)
        },
        setMessages(state, action:PayloadAction<Message[]>){
            state.messages = [...action.payload]
        }
    }
})

const getMessages = createAsyncThunk<void, {userId: string, friendId: string}>('entity/chat/thunk',
    async ({userId, friendId}, {dispatch}) => {
        const result = await dispatch(ApiConversation.endpoints.getMessages.initiate({userId, friendId}, {
            forceRefetch: true
        }))
        const data = result.data
        if(data){
        dispatch(slice.actions.setMessages(data))
        }
})



const baseSelector = createBaseSelector<State>(name)
const messages = createSelector(baseSelector, state => state.messages)

export const selectors = {
    messages
}

export const thunk = {
    getMessages
}

export const actions = {
    addMessage: slice.actions.addMessage,
    setMessages: slice.actions.setMessages
}
export const reducer = {[slice.name]:slice.reducer}