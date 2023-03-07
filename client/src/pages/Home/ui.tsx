import {useState} from "react"
import {MainLayout} from "@/widgets/layouts/main-layout";
import {useSocket} from "@/processes/socket";

export const Home = () => {
		useSocket()
	return (
		<MainLayout>
			<div className='flex items-center justify-center w-full'>
				<h2 className='text-white text-xl font-medium'>Select a chat to communicate</h2>
			</div>
		</MainLayout>
	)
}