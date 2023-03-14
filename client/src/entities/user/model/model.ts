import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Friend, getFriends, getPendingFriends} from "@/shared/api/ApiFriend";
import {createBaseSelector} from "@/shared/lib/redux";

    const initialState = {
        users: [] as Friend<'accepted'>[],
        pendingUsers: [] as Friend<'pending'>[]
    }

    type State = typeof initialState

    const name = 'entity/user'

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            setUser(state, action:PayloadAction<Friend<'accepted'>>){
              state.users.push(action.payload)
            },
            setUsers(state, action:PayloadAction<Friend<'accepted'>[]>){
                state.users = [...action.payload]
            },
            updateConnectStatus(state, action:PayloadAction<{status:boolean, userId:string}>){
                state.users = state.users.map(friend =>
                    friend.recipient.userId !== action.payload.userId
                        ? friend
                        : {...friend, connected:action.payload.status}
                )
            },

            setPendingUsers(state, action: PayloadAction<Friend<'pending'>[]>){
                state.pendingUsers = [...action.payload]
            },

            setPendingUser(state, action: PayloadAction<Friend<'pending'>>){
                state.pendingUsers.push(action.payload)
            },

            removePendingUser(state, action: PayloadAction<{userId: string}>){
            state.pendingUsers = state.pendingUsers.filter(({recipient}) => recipient.userId != action.payload.userId)
            }
        }
    })
    const baseSelector = createBaseSelector<State>(name)
    const users = createSelector(baseSelector, (state) => state.users)
    const pendingUsers = createSelector(baseSelector, state => state.pendingUsers)

    const setUsersThunk = createAsyncThunk<void, string>('entity/users', async (userId, {dispatch}) => {
        const data = await getFriends({userId})
        dispatch(slice.actions.setUsers(data))
    })

    const setPendUsersThunk = createAsyncThunk<void, string>('entity/users', async (userId, {dispatch}) => {
    const data = await getPendingFriends({userId})
        dispatch(slice.actions.setPendingUsers(data))
    })


    export const selectors = {
        users,
        pendingUsers
    }
    export const actions = {
        setUser: slice.actions.setUser,
        setUsers: slice.actions.setUsers,
        updateConnectStatus: slice.actions.updateConnectStatus,
        setPendingUsers: slice.actions.setPendingUsers,
        setPendingUser: slice.actions.setPendingUser,
        removePendingUser: slice.actions.removePendingUser
    }

    export const thunks = {
        setUsersThunk,
        setPendUsersThunk
    }

    export const reducer = {[slice.name]: slice.reducer}


