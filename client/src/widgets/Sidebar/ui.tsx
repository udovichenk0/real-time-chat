import {Fragment, useCallback, useEffect, useState} from "react";

import {AddFriendForm} from "@/features/add-friend";

import { sessionModel } from "@/entities/session";
import {User, usersModel} from "@/entities/user";

import {AddFriend} from "@/shared/ui/buttons/add-friend";
import {BaseModal} from "@/shared/ui/modals/base-modal";
import {useAction, useAppSelector} from "@/shared/lib/redux";
import {
    Recipient,
} from "@/shared/api/ApiFriend";
import {socket} from "@/shared/lib/socket/socket";
import {SearchFriend} from "./assets/search-svg";


export const Sidebar = ({setChat}:{setChat: (id: string) => void}) => {
    const [modalState, toggleModalState] = useState(false)
    const [pendingFriendsModalState, togglePendingFriendsModalState] = useState(false)

    const profile = useAppSelector(sessionModel.selectors.profile)
    const friends = useAppSelector(usersModel.selectors.users)
    const pendFriends = useAppSelector(usersModel.selectors.pendingUsers)

    const setUsers = useAction(usersModel.thunks.setUsersThunk)
    const setPendingUsers = useAction(usersModel.thunks.setPendUsersThunk)

    const handleAcceptFriend = useCallback((recipient: Recipient) => {
        socket.emit('accept-friendship', recipient.userId)
        togglePendingFriendsModalState(false)
    }, [])

    useEffect(() => {
            setPendingUsers(profile.userId)
            setUsers(profile.userId)
    }, [])
    return (
        <div className="min-w-[300px] border-r-2 border-[#495579] h-screen bg-[#474E68] shadow-2xl">
            {/*{s}*/}
            <div className="border-b-2 border-[#80888f] px-3 py-5 flex justify-between">
                <AddFriend onClick={() => togglePendingFriendsModalState(true)} pendFriends={pendFriends.length}/>
                <SearchFriend onClick={() => toggleModalState(true)}/>
                <BaseModal toggle={togglePendingFriendsModalState} opened={pendingFriendsModalState} title={'Accept a friendship'}>
                    <div className={'max-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-dark-blue'}>
                        <div className={'p-5 flex flex-col gap-4'}>
                            {pendFriends.length ? pendFriends?.map(({recipient}) => {
                                    return (
                                        <Fragment key={recipient.userId}>
                                            <User showOnlineStatus={false} recipient={recipient} acceptFriendship={() => handleAcceptFriend(recipient)}/>
                                        </Fragment>
                                    )
                                })
                                : <h1 className={'text-base font-medium'}>No requests here</h1>
                            }
                        </div>
                    </div>
                </BaseModal>
                <BaseModal toggle={toggleModalState} opened={modalState} title={"Add Friend!"}>
                    <AddFriendForm toggleModal={toggleModalState}/>
                </BaseModal>
            </div>
            <div className={'flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-dark-blue max-h-screen'}>
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