import {useEffect, useRef} from "react";

import {useAction, useAppSelector} from "@/shared/lib/redux";
import { chatModel } from "@/entities/chat";
import { sessionModel } from "@/entities/session";
import {MessageForm} from "@/features/send-message";
import {Message} from "@/widgets/chat/message";
import {useScrollToBottom} from "@/shared/lib/use-scroll-to-bottom";
export const Chat = ({friendId}:{friendId: string}) => {
    const messages = useAppSelector(chatModel.selectors.messages)
    const session = useAppSelector(sessionModel.selectors.profile)
    const getMessages = useAction(chatModel.thunk.getMessages)
    const bottomRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
            getMessages({userId: session._id, friendId, page: 1})
    }, [friendId])
    useScrollToBottom(messages,friendId, bottomRef)


    return (
        <div className='flex flex-col w-full'>
            <div className={'px-4 pt-4 mb-4 overflow-auto h-screen scrollbar-thin scrollbar-thumb-dark-blue'}>
                <div className={'flex flex-col justify-end h-full'}>
                        {messages && messages.map(({sender, message, uid, createdAt}, id) => {
                            const date = new Date(createdAt)
                            return (
                                <div key={uid} ref={messages.length - 1 == id? bottomRef : undefined}>
                                    <Message message={message} sender={sender} sessionId={session.userId} date={date}/>
                                </div>
                            )
                        })}
                </div>
            </div>
            <MessageForm friendId={friendId}/>
        </div>
    )
}