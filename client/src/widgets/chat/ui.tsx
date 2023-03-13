import {Fragment, useEffect} from "react";

import {useAction, useAppSelector} from "@/shared/lib/redux";
import { chatModel } from "@/entities/chat";
import { sessionModel } from "@/entities/session";
import {MessageForm} from "@/features/send-message";
import {Message} from "@/widgets/chat/message";
export const Chat = ({friendId}:{friendId: string}) => {
    const messages = useAppSelector(chatModel.selectors.messages)
    const session = useAppSelector(sessionModel.selectors.profile)

    const getMessages = useAction(chatModel.thunk.getMessages)

    useEffect(() => {
        getMessages({userId: session._id, friendId})
    }, [friendId])

    return (
        <div className='flex flex-col w-full'>
            <div className={'flex-1 inline-flex px-4 mb-8 flex-col justify-end gap-3'}>
                {messages.map(({sender, message, uid, createdAt}) => {
                    const date = new Date(createdAt)
                    return (
                        <Fragment key={uid}>
                            <Message message={message} sender={sender} sessionId={session.userId} date={date}/>
                        </Fragment>
                    )
                })}
            </div>
            <MessageForm friendId={friendId}/>
        </div>
    )
}