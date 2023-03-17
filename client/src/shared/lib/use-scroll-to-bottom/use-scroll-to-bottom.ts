import {RefObject, useEffect} from "react";
import {Message} from "@/shared/api/ApiConversation";

export const useScrollToBottom = (messages: Message[],friendId:string, bottomRef: RefObject<any>) => {
    useEffect(() => {
        if(messages.length){
            bottomRef.current?.scrollIntoView(true)
        }
    }, [messages])
}