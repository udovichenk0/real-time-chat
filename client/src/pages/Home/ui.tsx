import {useState} from "react"
import {useSocket} from "@/processes/socket";
import {Chat} from "@/widgets/chat";
import {Sidebar} from "@/widgets/Sidebar";

export const Home = () => {
	const [chat, setChat] = useState('')
		useSocket()


	return (
		<div className="bg-[#404258] h-screen flex"> {/*#7B8FA1*/}
			<Sidebar setChat={setChat}/>
			{chat
			? <Chat friendId={chat}/>
			: <div className={'flex text-white font-medium items-center justify-center w-full h-full'}>
					<div className={'bg-[#3F497F] rounded-[20px] '}>
						<div className={'px-2 py-1'}>Select a chat to start conversation</div>
					</div>
			</div>}
		</div>
	)
}