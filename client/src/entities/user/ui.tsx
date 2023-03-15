import avatar from './avatar.jpg'
import {AddFriend} from "@/shared/ui/buttons/add-friend";
import {Recipient} from "@/shared/api/ApiFriend";
export const User = (
    {recipient, acceptFriendship, showOnlineStatus, connected}:
        {
            recipient: Recipient,
            acceptFriendship?: () => void,
            showOnlineStatus: boolean,
            connected?: boolean
        }) => {
return (
    <div className='text-white flex justify-between items-center'>
        <div className={'flex gap-3'}>
            <div className='w-[50px] h-[50px] relative'>
        {showOnlineStatus && <span className={`absolute w-[16px] h-[16px] ${connected ? 'bg-[#32CD32]' : 'bg-[#800000]'} rounded-full right-0 bottom-0`}></span>}
                <img src={avatar} className='w-full h-full object-cover rounded-full' alt="avatar"/>
            </div>
            <span className={'text-sm font-medium'}>{recipient.username}</span>
        </div>
        {acceptFriendship &&
        <div>
            <AddFriend onClick={acceptFriendship}/>
        </div>}
    </div>
)
}