import {Action, createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApiFriend, Friend, useGetFriendsQuery} from "@/shared/api/ApiFriend";
import {createBaseSelector} from "@/shared/lib/redux";
import axios from "axios";


    const initialState = {
        users: [] as Friend[]
    }

    type State = typeof initialState

    const name = 'entity/user'

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            setUsers(state, action:PayloadAction<Friend[]>){
                state.users = [...action.payload]
            },
            updateConnectStatus(state, action:PayloadAction<{status:boolean, userId:string}>){
                state.users = state.users.map(friend =>
                    friend.recipient.userId !== action.payload.userId
                        ? friend
                        : {...friend, connected:action.payload.status}
                )
            }
        }
    })
    const baseSelector = createBaseSelector<State>(name)
    const users = createSelector(baseSelector, (state) => state.users)

    const setUsersThunk = createAsyncThunk('entity/users', async (userId:string, {dispatch}) => {
        const {data} = await axios<Friend[]>(`http://localhost:3001/get-friends?userId=${userId}`)
        dispatch(slice.actions.setUsers(data))
        return data
    })

    export const selectors = {
        users
    }
    export const actions = {
        setUsers: slice.actions.setUsers,
        updateConnectStatus: slice.actions.updateConnectStatus
    }

    export const thunks = {
        setUsersThunk
    }

    export const reducer = {[slice.name]: slice.reducer}


