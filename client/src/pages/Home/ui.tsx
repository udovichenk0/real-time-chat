import { BaseModal } from "@/shared/ui/modals/base-modal"
import { useState } from "react"
import { AddFriendSvg } from "./assets"
import {AddFriendForm} from "@/features/add-friend";
import {useGetFriendsQuery} from "@/shared/api/ApiFriend";
import {MainLayout} from "@/widgets/layouts/main-layout";

export const Home = () => {
	const [modalState, toggleModalState] = useState(false)
	return (
		<MainLayout>
			<div className='flex items-center justify-center w-full'>
				<h2 className='text-white text-xl font-medium'>Select a chat to communicate</h2>
			</div>
		</MainLayout>
	)
}