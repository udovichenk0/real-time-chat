import {SessionUser} from "@/shared/api/auth";

export type Message = {
    message: string,
    sender: SessionUser,
    recipient: SessionUser
    uid: string,
    createdAt: string
}