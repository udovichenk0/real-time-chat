import {expect, test, vi} from "vitest";
import {thunks, reducer, actions} from './model'
import {Friend} from "@/shared/api/ApiFriend";


test('test', async () => {
    const dispatch = vi.fn()
    const thunk = thunks.setUsersThunk('0877b162-1f68-45f8-8e5e-cc7f4f75a21c')

    await thunk(dispatch, () => ({}), {})
    console.log(dispatch.mock.calls)
    expect(2).toBe(2)
    expect(dispatch).toHaveBeenCalled()
})

test('should add array of friends in the store', () => {
    const friends:Friend<'accepted'>[] = [{
        _id: "64108f024ab698a17a07864b",
        recipient: {
            username: "denzeldenis1",
            userId: "df5255d6-0b9f-4b3e-bc98-9e4fbf4f14ef",
            __v: 0
        },
        status: "accepted",
        connected: false
    }]
    //@ts-ignore
    expect(reducer["entity/user"]({users: [] }, actions.setUsers(friends))).toEqual({
        users: friends
    })
})

test('should change connect status', () => {
    const state = {
        users: [
            {
                _id: "64108f024ab698a17a07864b",
                recipient: {
                    username: "denzeldenis1",
                    userId: "df5255d6-0b9f-4b3e-bc98-9e4fbf4f14ef",
                    __v: 0
                },
                status: "accepted",
                connected: false
            }
        ]
    }
    expect(reducer["entity/user"](state as any, actions.updateConnectStatus({status: true, userId: 'df5255d6-0b9f-4b3e-bc98-9e4fbf4f14ef'})))
        .toEqual({
            users: [
                {
                    _id: "64108f024ab698a17a07864b",
                    recipient: {
                        username: "denzeldenis1",
                        userId: "df5255d6-0b9f-4b3e-bc98-9e4fbf4f14ef",
                        __v: 0
                    },
                    status: "accepted",
                    connected: true
                }
            ]
        })

})


