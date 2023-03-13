import {useEffect} from "react";

import {socket} from "@/shared/lib/socket/socket";
import { usersModel } from "@/entities/user";
import {useAction} from "@/shared/lib/redux";
import { chatModel } from "@/entities/chat";
export const useSocket = () => {
    const updateOnlineStatus = useAction(usersModel.actions.updateConnectStatus)
    const addMessage = useAction(chatModel.actions.addMessage)
    useEffect(() => {
    socket.connect()
        socket.on('receive-message', (sender, recipient, message, uid, createdAt) => {
            addMessage({sender, recipient, message, uid, createdAt})
        })
        socket.on('connected', (connected, userId) => {
            updateOnlineStatus({status: connected, userId})
        })
        socket.on('get-friends', (friends) => {
            console.log(friends)
        })
        return () => {
         socket.off('connect_error')
        }
    }, [])
}