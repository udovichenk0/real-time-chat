import axios from "axios";
import {Friend} from "@/shared/api/ApiFriend";

export const getFriends = async ({userId}:{userId:string}) => {
    const {data} = await axios<Friend<'accepted'>[]>('https://real-time-chat-steel.vercel.app/get-friends', {
        params: {
            userId
        }
    })
    return data
}

export const getPendingFriends = async ({userId}:{userId:string}) => {
    const {data} = await axios<Friend<'pending'>[]>('https://real-time-chat-steel.vercel.app/get-pending-friends', {
        params: {
            userId
        }
    })
    return data
}
