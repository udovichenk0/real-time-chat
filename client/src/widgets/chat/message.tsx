import {SessionUser} from "@/shared/api/auth";
import {dateConverter} from "@/shared/lib/date-converter";

export const Message = (
    {message, sender, sessionId, date}:
        {
            message:string,
            sender: SessionUser,
            sessionId: string,
            date: Date
        }
) => {
    const sessionUserSender = sender.userId == sessionId
    return (
        <div className={`flex ${sessionUserSender && 'justify-end'} justify-start`}>
            <div className={` ${sessionUserSender ? 'bg-[#ECF2FF]' : 'bg-[#C9EEFF]'} px-2 rounded-[8px] max-w-[50%] white flex items-end gap-2`}>
                <div className={'py-2 break-all'}>
                    <div className={'font-medium text-sm'}>{sender.username}</div>
                    <span>{message}</span>
                </div>
                <div className={'text-[10px] py-1 inline whitespace-nowrap'}>{dateConverter(date)}</div>
            </div>
        </div>
    )
}