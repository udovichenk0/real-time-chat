import {AddFriendSvg} from "@/pages/Home/assets";
import {BaseModal} from "@/shared/ui/modals/base-modal";
import {AddFriendForm} from "@/features/add-friend";
import {Fragment, PropsWithChildren, useState} from "react";
import {useGetFriendsQuery} from "@/shared/api/ApiFriend";
import { sessionModel } from "@/entities/session";
import {useAppSelector} from "@/shared/lib/redux";
import {Link, NavLink} from "react-router-dom";
import avatar from './assets/avatar.jpg'
export const MainLayout = ({children}:PropsWithChildren) => {
    const [modalState, toggleModalState] = useState(false)
    const profile = useAppSelector(sessionModel.selectors.profile)
    const {data, isLoading} = useGetFriendsQuery({userId: profile.userId})
    console.log(data)
    return (
        <div className="bg-[#404258] h-screen flex"> {/*#7B8FA1*/}
            <div className="min-w-[400px] border-r-2 border-[#495579] h-screen bg-[#474E68] shadow-2xl"> {/*#567189*/}
                <div className="border-b-2 border-[#80888f] px-3 py-5 flex justify-between"> {/*#bg-[#65647C]*/}
                    <h2 className="font-medium text-[30px] text-white">Add Friend</h2>
                    <button onClick={() => toggleModalState(true)}><AddFriendSvg/></button>
                    <BaseModal toggle={toggleModalState} opened={modalState}>
                        <AddFriendForm/>
                    </BaseModal>
                </div>
                <div>
                    {data?.map(({recipient}) => {
                        return (
                            <NavLink key={recipient.userId} className={`p-3 text-white flex gap-3 ${'active' && 'bg-[#65647C]'}`} to={`/${recipient.userId}`}>
                                <div className='w-[70px] h-[70px]'>
                                    <img src={avatar} className='w-full h-full object-cover rounded-full' alt="avatar"/>
                                </div>
                                <span className={'font-medium'}>{recipient.username}</span>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {/*<div>*/}
                {children}
            {/*</div>*/}
        </div>
    )
}