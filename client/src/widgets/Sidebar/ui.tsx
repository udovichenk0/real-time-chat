import {Fragment, useCallback, useEffect, useMemo, useState} from "react";

import {AddFriendForm} from "@/features/add-friend";

import { sessionModel } from "@/entities/session";
import {User, usersModel} from "@/entities/user";

import {AddFriendSvg} from "@/shared/ui/buttons/add-friend-svg";
import {BaseModal} from "@/shared/ui/modals/base-modal";
import {useAction, useAppSelector} from "@/shared/lib/redux";
import {
    Recipient,
    useAcceptFriendshipMutation,
    useGetPendingFriendsQuery
} from "@/shared/api/ApiFriend";




export const Sidebar = ({setChat}:{setChat: (id: string) => void}) => {
    const [modalState, toggleModalState] = useState(false)
    const [pendingFriendsModalState, togglePendingFriendsModalState] = useState(false)

    const profile = useAppSelector(sessionModel.selectors.profile)
    const friends = useAppSelector(usersModel.selectors.users)

    const {data: pendingFriends = []} = useGetPendingFriendsQuery({userId: profile.userId})
    const [acceptFriendship] = useAcceptFriendshipMutation()

    const setUsers = useAction(usersModel.thunks.setUsersThunk)

    const handleAcceptFriend = useCallback((recipient: Recipient) => {
        acceptFriendship({userId: profile.userId, friendId: recipient.userId})
        togglePendingFriendsModalState(false)
    }, [])

    useEffect(() => {
        console.log("change")
            // setUsers(profile.userId)
    }, [pendingFriends, acceptFriendship, handleAcceptFriend])

    return (
        <div className="min-w-[300px] border-r-2 border-[#495579] h-screen bg-[#474E68] shadow-2xl"> {/*#567189*/}
            <div className="border-b-2 border-[#80888f] px-3 py-5 flex justify-between"> {/*#bg-[#65647C]*/}
                <AddFriendSvg onClick={() => togglePendingFriendsModalState(true)}/>
                <AddFriendSvg onClick={() => toggleModalState(true)}/>
                <BaseModal toggle={togglePendingFriendsModalState} opened={pendingFriendsModalState} title={'Accept a friendship'}>
                    {pendingFriends.length ? pendingFriends?.map(({recipient}) => {
                        console.log(pendingFriends, profile.userId)
                            return (
                                <Fragment key={recipient.userId}>
                                    <User showOnlineStatus={false} recipient={recipient} acceptFriendship={() => handleAcceptFriend(recipient)}/>
                                </Fragment>
                            )
                        })
                        : <h1 className={'font-medium'}>No requests here</h1>
                    }
                </BaseModal>
                <BaseModal toggle={toggleModalState} opened={modalState} title={"Add Friend!"}>
                    <AddFriendForm toggleModal={toggleModalState}/>
                </BaseModal>
            </div>
            <div className={'flex flex-col'}>
                {friends?.map(({recipient, connected}) => {
                    return (
                        <button onClick={() => setChat(recipient.userId)} key={recipient.userId} className={'p-3'}>
                            <User recipient={recipient} connected={connected} showOnlineStatus={true}/>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}