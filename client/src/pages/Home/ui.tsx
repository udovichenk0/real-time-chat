import {useState} from "react"
import {useSocket} from "@/processes/socket";
import {Chat} from "@/features/chat";
import {Sidebar} from "@/widgets/Sidebar";

export const Home = () => {
	const [chat, setChat] = useState('')
		useSocket()


	return (
		<div className="bg-[#404258] h-screen flex"> {/*#7B8FA1*/}
			<Sidebar setChat={setChat}/>
			{chat
			? <Chat friendId={chat}/>
			: <div>Select a chat</div>}
		</div>
	)
}