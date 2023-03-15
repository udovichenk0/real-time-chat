import {useEffect} from "react";

import {socket} from "@/shared/lib/socket/socket";
import { usersModel } from "@/entities/user";
import {useAction} from "@/shared/lib/redux";
import { chatModel } from "@/entities/chat";
import {Friend} from "@/shared/api/ApiFriend";
export const useSocket = () => {
    const updateOnlineStatus = useAction(usersModel.actions.updateConnectStatus)
    const addMessage = useAction(chatModel.actions.addMessage)
    const setPendFriends = useAction(usersModel.actions.setPendingUsers)
    const setPendingFriend = useAction(usersModel.actions.setPendingUser)
    const removePendingUser = useAction(usersModel.actions.removePendingUser)
    const setUser = useAction(usersModel.actions.setUser)
    useEffect(() => {
    socket.connect()
        socket.on('receive-message', (sender, recipient, message, uid, createdAt) => {
            addMessage({sender, recipient, message, uid, createdAt})
        })
        socket.on('connected', (connected, userId) => {
            updateOnlineStatus({status: connected, userId})
        })

        socket.on('get-pend-friends', (friends:Friend<'pending'>[]) => {
            setPendFriends(friends)
        })

        socket.on('requested', (friend: Friend<'pending'>) => {
            setPendingFriend(friend)
        })

        socket.on('accept', (friend: Friend<'accepted'>) => {
            removePendingUser({userId: friend.recipient.userId})
            setUser(friend)
        })
        socket.on('request-accepted', (friend: Friend<'accepted'>) => {
            setUser(friend)
        })
        return () => {
         socket.off('connect_error')
        }
    }, [])
}