import axios from "axios";
import {Friend} from "@/shared/api/ApiFriend";

export const getFriends = async ({userId}:{userId:string}) => {
    const {data} = await axios<Friend<'accepted'>[]>('http://localhost:3001/get-friends', {
        params: {
            userId
        }
    })
    return data
}

export const getPendingFriends = async ({userId}:{userId:string}) => {
    const {data} = await axios<Friend<'pending'>[]>('http://localhost:3001/get-pending-friends', {
        params: {
            userId
        }
    })
    return data
}
