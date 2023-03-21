import {io} from 'socket.io-client'
export const socket = io('https://real-time-chat-steel.vercel.app',{
    autoConnect: false,
    withCredentials: true,
})