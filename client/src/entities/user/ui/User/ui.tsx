import avatar from '../../avatar.jpg'
import {AddFriendSvg} from "@/shared/ui/buttons/add-friend-svg";
export const User = ({recipient, acceptFriendship}:any) => {
return (
    <div className='text-white flex justify-between'>
        <div className={'flex gap-3'}>
            <div className='w-[70px] h-[70px]'>
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