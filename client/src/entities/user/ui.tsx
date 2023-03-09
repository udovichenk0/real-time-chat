import avatar from './avatar.jpg'
import {AddFriendSvg} from "@/shared/ui/buttons/add-friend-svg";
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
    <div className='text-white flex justify-between'>
        <div className={'flex gap-3'}>
            <div className='w-[70px] h-[70px] relative'>
        {showOnlineStatus && <span className={`absolute w-[16px] h-[16px] ${connected ? 'bg-[#32CD32]' : 'bg-[#800000]'} rounded-full right-0 bottom-0`}></span>}
                <img src={avatar} className='w-full h-full object-cover rounded-full' alt="avatar"/>
            </div>
            <span className={'font-medium'}>{recipient.username}</span>
        </div>
        {acceptFriendship &&
        <div>
            <AddFriendSvg onClick={acceptFriendship}/>
        </div>}
    </div>
)
}