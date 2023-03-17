import {describe, expect, test} from "vitest";
import {actions, slice} from "./model";
        const payload = {
            message: 'hello',
            uid: 'asdfasf',
            createdAt: '1:20',
            sender: {
                username: 'Denis',
                _id: '123',
                userId: '1234'
            },
            recipient: {
                username: 'Liza',
                _id: '1234',
                userId: '12345'
            }
        }
        const payload2 = {
            message: '123',
            uid: 'asdfasf',
            createdAt: '1:20',
            sender: {
                username: 'Denis123',
                _id: '123',
                userId: '1234'
            },
            recipient: {
                username: 'Liza123',
                _id: '1234',
                userId: '12345'
            }
        }
        const msgs = [payload,payload2]
describe('chat reducers', () => {
    test('should add new messages', () => {
        // @ts-ignore
        expect(slice.reducer({messages: []}, actions.addMessage(payload))).toEqual({
            messages: [payload]
        })
        // @ts-ignore
        expect(slice.reducer({messages: [payload]}, actions.addMessage(payload2))).toEqual({
            messages: [payload, payload2]
        })
    })

    test('should set all messages', () => {
        // @ts-ignore
        expect(slice.reducer({messages: []}, actions.setMessages(msgs))).toEqual({
            messages: msgs
        })
    })
})
