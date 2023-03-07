import {BaseModal} from "@/shared/ui/modals/base-modal";
import {AddFriendForm} from "@/features/add-friend";
import {Fragment, PropsWithChildren, useState} from "react";
import {useAcceptFriendshipMutation, useGetFriendsQuery, useGetPendingFriendsQuery} from "@/shared/api/ApiFriend";
import { sessionModel } from "@/entities/session";
import {useAppSelector} from "@/shared/lib/redux";
import {NavLink} from "react-router-dom";
import {User} from "@/entities/user/ui/User/ui";
import {AddFriendSvg} from "@/shared/ui/buttons/add-friend-svg";

export const MainLayout = ({children}:PropsWithChildren) => {
    const [modalState, toggleModalState] = useState(false)
    const [pendingFriendsModalState, togglePendingFriendsModalState] = useState(false)

    const profile = useAppSelector(sessionModel.selectors.profile)

    const {data:friends} = useGetFriendsQuery({userId: profile.userId})
    const {data: pendingFriends} = useGetPendingFriendsQuery({userId: profile.userId})
    const [acceptFriendship] = useAcceptFriendshipMutation()

    return (
        <div className="bg-[#404258] h-screen flex"> {/*#7B8FA1*/}
            <div className="min-w-[400px] border-r-2 border-[#495579] h-screen bg-[#474E68] shadow-2xl"> {/*#567189*/}
                <div className="border-b-2 border-[#80888f] px-3 py-5 flex justify-between"> {/*#bg-[#65647C]*/}
                    <AddFriendSvg onClick={() => togglePendingFriendsModalState(true)}/>
                    <AddFriendSvg onClick={() => toggleModalState(true)}/>
                    <BaseModal toggle={togglePendingFriendsModalState} opened={pendingFriendsModalState} title={'Accept a friendship'}>
                        {pendingFriends?.map(({recipient}) => {
                            return (
                                <Fragment key={recipient.userId}>
                                    <User recipient={recipient} acceptFriendship={() => acceptFriendship({userId: profile.userId, friendId: recipient.userId})}/>
                                </Fragment>
                            )
                        })}
                    </BaseModal>
                    <BaseModal toggle={toggleModalState} opened={modalState} title={"Add Friend!"}>
                        <AddFriendForm/>
                    </BaseModal>
                </div>
                <div>
                    {friends?.map(({recipient}) => {
                        return (
                            <NavLink key={recipient.userId} className={`${'active' && 'bg-[#65647C]'}`} to={`/${recipient.userId}`}>
                                <div className={'p-3'}>
                                    <User recipient={recipient}/>
                                </div>
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