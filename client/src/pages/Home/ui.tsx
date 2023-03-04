import { BaseModal } from "@/shared/ui/modals/base-modal"
import { useState } from "react"
import { AddFriendSvg } from "./assets"

export const Home = () => {
	const [modalState, toggleModalState] = useState(false)
	return (
		<div className="bg-dark-blue h-screen">
			<div className="w-[300px] border-r-2 border-[#798a9e] h-screen">
				<div className="border-b-2 border-[#80888f] px-3 py-5 flex justify-between">
					<h2 className="font-medium text-[30px] text-white">Add Friend</h2>
					<button onClick={() => toggleModalState(true)}><AddFriendSvg/></button>
					<BaseModal toggle={toggleModalState} opened={modalState}>
						<h2>aiosdjf</h2>
					</BaseModal>
				</div>
			</div>
		</div>
	)
}