import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createBaseSelector} from "@/shared/lib/redux";
import {Message} from "@/shared/api/ApiConversation";
import axios from "axios";


export const initialState = {
    messages: [] as Message[],
    isLoading: false,
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
            state.isLoading = false
        },
        startPending(state){
            state.isLoading = true
        },
    }
})


const getMessages = createAsyncThunk<void, {userId: string, friendId: string, page:number}>('entity/chat/thunk',
    async ({userId, friendId, page}, {dispatch}) => {
        const result = await axios<Message[]>('http://localhost:3001/get-messages', {params: {
            userId, friendId, page
            }})
        const data = result.data
        dispatch(slice.actions.startPending())
        if(data.length){
            dispatch(slice.actions.setMessages(data))
        }
})

const baseSelector = createBaseSelector<State>(name)
const messages = createSelector(baseSelector, state => state.messages)
const isChatLoading = createSelector(baseSelector, state => state.isLoading)
export const selectors = {
    messages,
    isChatLoading,
}

export const thunk = {
    getMessages,
}

export const actions = {
    addMessage: slice.actions.addMessage,
    setMessages: slice.actions.setMessages,
}
export const reducer = {[slice.name]:slice.reducer}